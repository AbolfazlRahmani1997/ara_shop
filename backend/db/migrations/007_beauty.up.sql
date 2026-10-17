CREATE TABLE beauty_profiles (
    id UUID PRIMARY KEY,
    user_id UUID NOT NULL UNIQUE REFERENCES users (id) ON DELETE CASCADE,
    skin_type TEXT NOT NULL DEFAULT '',
    skin_tone TEXT NOT NULL DEFAULT '',
    skin_concerns JSONB NOT NULL DEFAULT '[]',
    hair_type TEXT NOT NULL DEFAULT '',
    budget BIGINT CHECK (budget IS NULL OR budget >= 0),
    preferences JSONB NOT NULL DEFAULT '{}',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE beauty_conversations (
    id UUID PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX beauty_conversations_user_id_idx ON beauty_conversations (user_id, updated_at DESC);

CREATE TABLE beauty_messages (
    id UUID PRIMARY KEY,
    conversation_id UUID NOT NULL REFERENCES beauty_conversations (id) ON DELETE CASCADE,
    role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
    content TEXT NOT NULL,
    recommendations JSONB NOT NULL DEFAULT '[]',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX beauty_messages_conversation_id_idx ON beauty_messages (conversation_id, created_at);
