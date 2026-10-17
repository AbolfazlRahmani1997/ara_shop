-- name: UpsertBeautyProfile :one
INSERT INTO beauty_profiles (
    id, user_id, skin_type, skin_tone, skin_concerns, hair_type, budget, preferences
) VALUES (
    $1, $2, $3, $4, $5, $6, $7, $8
)
ON CONFLICT (user_id) DO UPDATE SET
    skin_type = EXCLUDED.skin_type,
    skin_tone = EXCLUDED.skin_tone,
    skin_concerns = EXCLUDED.skin_concerns,
    hair_type = EXCLUDED.hair_type,
    budget = EXCLUDED.budget,
    preferences = EXCLUDED.preferences,
    updated_at = now()
RETURNING *;

-- name: GetBeautyProfileByUser :one
SELECT * FROM beauty_profiles WHERE user_id = $1;

-- name: CreateConversation :one
INSERT INTO beauty_conversations (id, user_id) VALUES ($1, $2)
RETURNING *;

-- name: GetConversationForUser :one
SELECT * FROM beauty_conversations WHERE id = $1 AND user_id = $2;

-- name: TouchConversation :exec
UPDATE beauty_conversations SET updated_at = now() WHERE id = $1;

-- name: CreateBeautyMessage :one
INSERT INTO beauty_messages (id, conversation_id, role, content, recommendations)
VALUES ($1, $2, $3, $4, $5)
RETURNING *;

-- name: ListRecentMessages :many
SELECT * FROM beauty_messages
WHERE conversation_id = $1
ORDER BY created_at DESC
LIMIT sqlc.arg('limit')::int;

-- name: CreateAdminUser :one
INSERT INTO admin_users (id, user_id) VALUES ($1, $2)
ON CONFLICT (user_id) DO UPDATE SET user_id = EXCLUDED.user_id
RETURNING *;

-- name: CreateAuditLog :one
INSERT INTO audit_logs (id, actor_id, action, entity_type, entity_id, metadata)
VALUES ($1, $2, $3, $4, $5, $6)
RETURNING *;

-- name: DashboardStats :one
SELECT
    (SELECT COUNT(*) FROM users) AS user_count,
    (SELECT COUNT(*) FROM products WHERE is_active = TRUE) AS product_count,
    (SELECT COUNT(*) FROM orders) AS order_count,
    (SELECT COUNT(*) FROM orders WHERE status = 'pending_payment') AS pending_order_count,
    (SELECT COALESCE(SUM(total), 0)::bigint FROM orders WHERE status IN ('paid', 'processing', 'shipped', 'delivered')) AS revenue;
