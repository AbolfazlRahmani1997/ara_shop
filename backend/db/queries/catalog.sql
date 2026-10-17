-- name: CreateBrand :one
INSERT INTO brands (id, name, slug, description, is_active)
VALUES ($1, $2, $3, $4, $5)
RETURNING *;

-- name: UpdateBrand :one
UPDATE brands
SET name = $2, slug = $3, description = $4, is_active = $5, updated_at = now()
WHERE id = $1
RETURNING *;

-- name: DeleteBrand :execrows
DELETE FROM brands WHERE id = $1;

-- name: GetBrandByID :one
SELECT * FROM brands WHERE id = $1;

-- name: GetBrandBySlug :one
SELECT * FROM brands WHERE slug = $1 AND is_active = TRUE;

-- name: ListActiveBrands :many
SELECT * FROM brands WHERE is_active = TRUE ORDER BY name ASC;

-- name: ListAllBrands :many
SELECT * FROM brands ORDER BY name ASC;

-- name: CreateCategory :one
INSERT INTO categories (id, name, slug, description, sort_order, is_active)
VALUES ($1, $2, $3, $4, $5, $6)
RETURNING *;

-- name: UpdateCategory :one
UPDATE categories
SET name = $2, slug = $3, description = $4, sort_order = $5, is_active = $6, updated_at = now()
WHERE id = $1
RETURNING *;

-- name: DeleteCategory :execrows
DELETE FROM categories WHERE id = $1;

-- name: GetCategoryByID :one
SELECT * FROM categories WHERE id = $1;

-- name: GetCategoryBySlug :one
SELECT * FROM categories WHERE slug = $1 AND is_active = TRUE;

-- name: ListActiveCategories :many
SELECT * FROM categories WHERE is_active = TRUE ORDER BY sort_order ASC, name ASC;

-- name: ListAllCategories :many
SELECT * FROM categories ORDER BY sort_order ASC, name ASC;
