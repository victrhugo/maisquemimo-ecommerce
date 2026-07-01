CREATE TABLE IF NOT EXISTS app_contents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    content_key VARCHAR(100) NOT NULL UNIQUE,
    payload TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_app_contents_key ON app_contents(content_key);
