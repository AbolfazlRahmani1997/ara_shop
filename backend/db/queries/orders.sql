-- name: CreateOrder :one
INSERT INTO orders (
    id, user_id, address_id, status, currency, subtotal, discount, shipping, total,
    coupon_id, coupon_code,
    shipping_full_name, shipping_phone, shipping_province, shipping_city, shipping_line1, shipping_postal_code
) VALUES (
    $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17
)
RETURNING *;

-- name: CreateOrderItem :one
INSERT INTO order_items (
    id, order_id, product_id, variant_id, product_name, variant_name, sku, unit_price, quantity, line_total
) VALUES (
    $1, $2, $3, $4, $5, $6, $7, $8, $9, $10
)
RETURNING *;

-- name: GetOrderByID :one
SELECT * FROM orders WHERE id = $1;

-- name: ListOrdersByUser :many
SELECT * FROM orders
WHERE user_id = $1
ORDER BY created_at DESC
LIMIT sqlc.arg('limit')::int OFFSET sqlc.arg('offset')::int;

-- name: CountOrdersByUser :one
SELECT COUNT(*) FROM orders WHERE user_id = $1;

-- name: ListOrdersAdmin :many
SELECT * FROM orders
WHERE (sqlc.narg('status')::text IS NULL OR status = sqlc.narg('status')::text)
ORDER BY created_at DESC
LIMIT sqlc.arg('limit')::int OFFSET sqlc.arg('offset')::int;

-- name: CountOrdersAdmin :one
SELECT COUNT(*) FROM orders
WHERE (sqlc.narg('status')::text IS NULL OR status = sqlc.narg('status')::text);

-- name: UpdateOrderStatus :one
UPDATE orders
SET status = $2, updated_at = now()
WHERE id = $1
RETURNING *;

-- name: ListOrderItems :many
SELECT * FROM order_items WHERE order_id = $1 ORDER BY product_name ASC;

-- name: CreatePayment :one
INSERT INTO payments (id, order_id, amount, provider, authority, status, transaction_id)
VALUES ($1, $2, $3, $4, $5, $6, $7)
RETURNING *;

-- name: GetPaymentByID :one
SELECT * FROM payments WHERE id = $1;

-- name: GetPaymentByOrderID :one
SELECT * FROM payments WHERE order_id = $1 ORDER BY created_at DESC LIMIT 1;

-- name: UpdatePayment :one
UPDATE payments
SET status = $2, transaction_id = $3, updated_at = now()
WHERE id = $1
RETURNING *;

-- name: GetCouponByCode :one
SELECT * FROM coupons WHERE lower(code) = lower($1);

-- name: GetCouponByID :one
SELECT * FROM coupons WHERE id = $1;

-- name: GetCouponByCodeForUpdate :one
SELECT * FROM coupons WHERE lower(code) = lower($1) FOR UPDATE;

-- name: CreateCoupon :one
INSERT INTO coupons (
    id, code, type, value, min_order_amount, max_discount, starts_at, expires_at, usage_limit, is_active
) VALUES (
    $1, $2, $3, $4, $5, $6, $7, $8, $9, $10
)
RETURNING *;

-- name: ListCoupons :many
SELECT * FROM coupons
ORDER BY created_at DESC
LIMIT sqlc.arg('limit')::int OFFSET sqlc.arg('offset')::int;

-- name: ConsumeCoupon :execrows
UPDATE coupons
SET usage_count = usage_count + 1, updated_at = now()
WHERE id = $1
  AND is_active = TRUE
  AND (usage_limit = 0 OR usage_count < usage_limit)
  AND (starts_at IS NULL OR starts_at <= now())
  AND (expires_at IS NULL OR expires_at > now());

-- name: CreateCouponUsage :one
INSERT INTO coupon_usages (id, coupon_id, user_id, order_id)
VALUES ($1, $2, $3, $4)
RETURNING *;
