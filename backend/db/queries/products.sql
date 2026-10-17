-- name: CreateProduct :one
INSERT INTO products (
    id, brand_id, category_id, name, slug, description, short_description,
    price, compare_at_price, currency, is_active, suitable_skin_types, concerns, tags
) VALUES (
    $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14
)
RETURNING *;

-- name: UpdateProduct :one
UPDATE products
SET
    brand_id = $2,
    category_id = $3,
    name = $4,
    slug = $5,
    description = $6,
    short_description = $7,
    price = $8,
    compare_at_price = $9,
    currency = $10,
    is_active = $11,
    suitable_skin_types = $12,
    concerns = $13,
    tags = $14,
    updated_at = now()
WHERE id = $1
RETURNING *;

-- name: DeactivateProduct :execrows
UPDATE products
SET is_active = FALSE, updated_at = now()
WHERE id = $1;

-- name: GetProductByID :one
SELECT
    p.id, p.brand_id, p.category_id, p.name, p.slug, p.description, p.short_description,
    p.price, p.compare_at_price, p.currency, p.rating, p.review_count, p.is_active,
    p.suitable_skin_types, p.concerns, p.tags, p.created_at, p.updated_at,
    b.name AS brand_name, b.slug AS brand_slug,
    c.name AS category_name, c.slug AS category_slug
FROM products p
JOIN brands b ON b.id = p.brand_id
JOIN categories c ON c.id = p.category_id
WHERE p.id = $1;

-- name: GetProductBySlug :one
SELECT
    p.id, p.brand_id, p.category_id, p.name, p.slug, p.description, p.short_description,
    p.price, p.compare_at_price, p.currency, p.rating, p.review_count, p.is_active,
    p.suitable_skin_types, p.concerns, p.tags, p.created_at, p.updated_at,
    b.name AS brand_name, b.slug AS brand_slug,
    c.name AS category_name, c.slug AS category_slug
FROM products p
JOIN brands b ON b.id = p.brand_id
JOIN categories c ON c.id = p.category_id
WHERE p.slug = $1;

-- name: ListProducts :many
SELECT
    p.id, p.brand_id, p.category_id, p.name, p.slug, p.description, p.short_description,
    p.price, p.compare_at_price, p.currency, p.rating, p.review_count, p.is_active,
    p.suitable_skin_types, p.concerns, p.tags, p.created_at, p.updated_at,
    b.name AS brand_name, b.slug AS brand_slug,
    c.name AS category_name, c.slug AS category_slug,
    img.url AS image_url, img.alt AS image_alt
FROM products p
JOIN brands b ON b.id = p.brand_id
JOIN categories c ON c.id = p.category_id
LEFT JOIN LATERAL (
    SELECT url, alt
    FROM product_images
    WHERE product_id = p.id
    ORDER BY sort_order ASC, created_at ASC
    LIMIT 1
) img ON TRUE
WHERE (sqlc.arg('include_inactive')::bool OR p.is_active = TRUE)
  AND (
        sqlc.narg('search')::text IS NULL
        OR p.name ILIKE '%' || sqlc.narg('search')::text || '%'
        OR b.name ILIKE '%' || sqlc.narg('search')::text || '%'
        OR c.name ILIKE '%' || sqlc.narg('search')::text || '%'
      )
  AND (sqlc.narg('category_slug')::text IS NULL OR c.slug = sqlc.narg('category_slug')::text)
  AND (sqlc.narg('brand_slug')::text IS NULL OR b.slug = sqlc.narg('brand_slug')::text)
  AND (sqlc.narg('min_price')::bigint IS NULL OR p.price >= sqlc.narg('min_price')::bigint)
  AND (sqlc.narg('max_price')::bigint IS NULL OR p.price <= sqlc.narg('max_price')::bigint)
  AND (sqlc.narg('skin_type')::text IS NULL OR sqlc.narg('skin_type')::text = ANY (p.suitable_skin_types))
  AND (
        sqlc.narg('category_match')::text IS NULL
        OR c.slug = sqlc.narg('category_match')::text
        OR sqlc.narg('category_match')::text = ANY (p.tags)
      )
  AND (
        cardinality(sqlc.arg('concerns')::text[]) = 0
        OR p.concerns && sqlc.arg('concerns')::text[]
      )
ORDER BY
    CASE WHEN sqlc.arg('sort')::text = 'price_asc' THEN p.price END ASC,
    CASE WHEN sqlc.arg('sort')::text = 'price_desc' THEN p.price END DESC,
    CASE WHEN sqlc.arg('sort')::text = 'rating' THEN p.rating END DESC,
    CASE WHEN sqlc.arg('sort')::text = 'popular' THEN p.review_count END DESC,
    p.created_at DESC
LIMIT sqlc.arg('limit')::int OFFSET sqlc.arg('offset')::int;

-- name: CountProducts :one
SELECT COUNT(*)
FROM products p
JOIN brands b ON b.id = p.brand_id
JOIN categories c ON c.id = p.category_id
WHERE (sqlc.arg('include_inactive')::bool OR p.is_active = TRUE)
  AND (
        sqlc.narg('search')::text IS NULL
        OR p.name ILIKE '%' || sqlc.narg('search')::text || '%'
        OR b.name ILIKE '%' || sqlc.narg('search')::text || '%'
        OR c.name ILIKE '%' || sqlc.narg('search')::text || '%'
      )
  AND (sqlc.narg('category_slug')::text IS NULL OR c.slug = sqlc.narg('category_slug')::text)
  AND (sqlc.narg('brand_slug')::text IS NULL OR b.slug = sqlc.narg('brand_slug')::text)
  AND (sqlc.narg('min_price')::bigint IS NULL OR p.price >= sqlc.narg('min_price')::bigint)
  AND (sqlc.narg('max_price')::bigint IS NULL OR p.price <= sqlc.narg('max_price')::bigint)
  AND (sqlc.narg('skin_type')::text IS NULL OR sqlc.narg('skin_type')::text = ANY (p.suitable_skin_types))
  AND (
        sqlc.narg('category_match')::text IS NULL
        OR c.slug = sqlc.narg('category_match')::text
        OR sqlc.narg('category_match')::text = ANY (p.tags)
      )
  AND (
        cardinality(sqlc.arg('concerns')::text[]) = 0
        OR p.concerns && sqlc.arg('concerns')::text[]
      );

-- name: CreateProductImage :one
INSERT INTO product_images (id, product_id, url, alt, sort_order)
VALUES ($1, $2, $3, $4, $5)
RETURNING *;

-- name: DeleteProductImages :exec
DELETE FROM product_images WHERE product_id = $1;

-- name: ListProductImages :many
SELECT * FROM product_images
WHERE product_id = $1
ORDER BY sort_order ASC, created_at ASC;

-- name: CreateVariant :one
INSERT INTO product_variants (id, product_id, name, sku, price, attributes)
VALUES ($1, $2, $3, $4, $5, $6)
RETURNING *;

-- name: UpdateVariant :one
UPDATE product_variants
SET name = $2, sku = $3, price = $4, attributes = $5, updated_at = now()
WHERE id = $1 AND product_id = $6
RETURNING *;

-- name: CreateInventory :one
INSERT INTO inventory (id, variant_id, stock)
VALUES ($1, $2, $3)
RETURNING *;

-- name: SetInventoryStock :exec
UPDATE inventory
SET stock = $2, updated_at = now()
WHERE variant_id = $1;

-- name: ListVariantsByProduct :many
SELECT
    v.id, v.product_id, v.name, v.sku, v.price, v.attributes, v.created_at, v.updated_at,
    i.stock
FROM product_variants v
JOIN inventory i ON i.variant_id = v.id
WHERE v.product_id = $1
ORDER BY v.created_at ASC;

-- name: GetVariantByID :one
SELECT
    v.id, v.product_id, v.name, v.sku, v.price, v.attributes,
    i.stock,
    p.name AS product_name, p.slug AS product_slug, p.is_active, p.currency
FROM product_variants v
JOIN inventory i ON i.variant_id = v.id
JOIN products p ON p.id = v.product_id
WHERE v.id = $1;

-- name: DecrementInventory :execrows
UPDATE inventory
SET stock = stock - sqlc.arg('quantity')::int, updated_at = now()
WHERE variant_id = sqlc.arg('variant_id') AND stock >= sqlc.arg('quantity')::int;

-- name: RestoreInventory :execrows
UPDATE inventory
SET stock = stock + sqlc.arg('quantity')::int, updated_at = now()
WHERE variant_id = sqlc.arg('variant_id');

-- name: ListInventory :many
SELECT
    i.id, i.variant_id, i.stock, i.updated_at,
    v.sku, v.name AS variant_name, v.price,
    p.id AS product_id, p.name AS product_name, p.is_active
FROM inventory i
JOIN product_variants v ON v.id = i.variant_id
JOIN products p ON p.id = v.product_id
ORDER BY p.name ASC, v.name ASC
LIMIT sqlc.arg('limit')::int OFFSET sqlc.arg('offset')::int;

-- name: CountInventory :one
SELECT COUNT(*) FROM inventory;

-- name: RecomputeProductRating :one
UPDATE products
SET
    rating = COALESCE((
        SELECT AVG(rating)::float8 FROM reviews
        WHERE product_id = $1 AND is_published = TRUE
    ), 0),
    review_count = (
        SELECT COUNT(*)::int FROM reviews
        WHERE product_id = $1 AND is_published = TRUE
    ),
    updated_at = now()
WHERE id = $1
RETURNING *;
