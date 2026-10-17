-- name: GetCartByUser :one
SELECT * FROM carts WHERE user_id = $1;

-- name: GetCartByUserForUpdate :one
SELECT * FROM carts WHERE user_id = $1 FOR UPDATE;

-- name: CreateCart :one
INSERT INTO carts (id, user_id) VALUES ($1, $2)
RETURNING *;

-- name: TouchCart :exec
UPDATE carts SET updated_at = now() WHERE id = $1;

-- name: ListCartItems :many
SELECT
    ci.id, ci.cart_id, ci.variant_id, ci.quantity,
    v.name AS variant_name, v.sku, v.price, v.attributes,
    i.stock,
    p.id AS product_id, p.name AS product_name, p.slug AS product_slug, p.is_active, p.currency
FROM cart_items ci
JOIN product_variants v ON v.id = ci.variant_id
JOIN inventory i ON i.variant_id = v.id
JOIN products p ON p.id = v.product_id
WHERE ci.cart_id = $1
ORDER BY ci.created_at ASC;

-- name: GetCartItemForUser :one
SELECT ci.id, ci.cart_id, ci.variant_id, ci.quantity
FROM cart_items ci
JOIN carts c ON c.id = ci.cart_id
WHERE ci.id = $1 AND c.user_id = $2;

-- name: UpsertCartItem :one
INSERT INTO cart_items (id, cart_id, variant_id, quantity)
VALUES ($1, $2, $3, $4)
ON CONFLICT (cart_id, variant_id)
DO UPDATE SET quantity = cart_items.quantity + EXCLUDED.quantity, updated_at = now()
RETURNING *;

-- name: UpdateCartItemQuantity :one
UPDATE cart_items
SET quantity = $3, updated_at = now()
WHERE id = $1 AND cart_id = $2
RETURNING *;

-- name: DeleteCartItem :execrows
DELETE FROM cart_items ci
USING carts c
WHERE ci.id = $1 AND ci.cart_id = c.id AND c.user_id = $2;

-- name: ClearCartItems :exec
DELETE FROM cart_items WHERE cart_id = $1;
