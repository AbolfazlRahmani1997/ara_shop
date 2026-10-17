-- name: CreateReview :one
INSERT INTO reviews (
    id, user_id, product_id, order_id, order_item_id, rating, title, body, is_verified_purchase, is_published
) VALUES (
    $1, $2, $3, $4, $5, $6, $7, $8, $9, $10
)
RETURNING *;

-- name: FindReviewableOrderItem :one
SELECT oi.id AS order_item_id, oi.order_id
FROM order_items oi
JOIN orders o ON o.id = oi.order_id
WHERE o.user_id = $1
  AND oi.product_id = $2
  AND o.status IN ('paid', 'processing', 'shipped', 'delivered')
  AND NOT EXISTS (
      SELECT 1 FROM reviews r WHERE r.order_item_id = oi.id
  )
ORDER BY o.created_at DESC
LIMIT 1;

-- name: ListPublishedReviews :many
SELECT
    r.id, r.user_id, r.product_id, r.order_id, r.order_item_id, r.rating, r.title, r.body,
    r.is_verified_purchase, r.is_published, r.created_at,
    u.first_name, u.last_name
FROM reviews r
JOIN users u ON u.id = r.user_id
WHERE r.product_id = $1 AND r.is_published = TRUE
ORDER BY r.created_at DESC
LIMIT sqlc.arg('limit')::int OFFSET sqlc.arg('offset')::int;

-- name: CountPublishedReviews :one
SELECT COUNT(*) FROM reviews WHERE product_id = $1 AND is_published = TRUE;

-- name: ListReviewsAdmin :many
SELECT
    r.id, r.user_id, r.product_id, r.order_id, r.order_item_id, r.rating, r.title, r.body,
    r.is_verified_purchase, r.is_published, r.created_at,
    u.first_name, u.last_name
FROM reviews r
JOIN users u ON u.id = r.user_id
ORDER BY r.created_at DESC
LIMIT sqlc.arg('limit')::int OFFSET sqlc.arg('offset')::int;

-- name: CountReviewsAdmin :one
SELECT COUNT(*) FROM reviews;

-- name: CreateWishlist :one
INSERT INTO wishlists (id, user_id) VALUES ($1, $2)
RETURNING *;

-- name: GetWishlistByUser :one
SELECT * FROM wishlists WHERE user_id = $1;

-- name: AddWishlistItem :one
INSERT INTO wishlist_items (id, wishlist_id, product_id)
VALUES ($1, $2, $3)
ON CONFLICT (wishlist_id, product_id)
DO UPDATE SET product_id = EXCLUDED.product_id
RETURNING *;

-- name: RemoveWishlistItem :execrows
DELETE FROM wishlist_items wi
USING wishlists w
WHERE wi.wishlist_id = w.id AND w.user_id = $1 AND wi.product_id = $2;

-- name: ListWishlistItems :many
SELECT
    wi.id, wi.product_id, wi.created_at,
    p.name, p.slug, p.price, p.currency, p.rating, p.is_active,
    b.name AS brand_name
FROM wishlist_items wi
JOIN wishlists w ON w.id = wi.wishlist_id
JOIN products p ON p.id = wi.product_id
JOIN brands b ON b.id = p.brand_id
WHERE w.user_id = $1
ORDER BY wi.created_at DESC;
