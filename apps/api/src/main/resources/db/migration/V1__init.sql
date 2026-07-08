CREATE TABLE app_users (
    id UUID PRIMARY KEY,
    email VARCHAR(180) UNIQUE,
    display_name VARCHAR(120),
    auth_provider VARCHAR(40) NOT NULL,
    preferred_dialect VARCHAR(40),
    anonymous BOOLEAN NOT NULL,
    created_at TIMESTAMPTZ NOT NULL
);

CREATE TABLE user_progress (
    id UUID PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES app_users(id),
    lesson_id VARCHAR(120) NOT NULL,
    status VARCHAR(40) NOT NULL,
    confidence_score INTEGER NOT NULL,
    updated_at TIMESTAMPTZ NOT NULL
);

CREATE TABLE favorites (
    id UUID PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES app_users(id),
    content_type VARCHAR(40) NOT NULL,
    content_id VARCHAR(120) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL
);

CREATE TABLE content_events (
    id UUID PRIMARY KEY,
    event_type VARCHAR(80) NOT NULL,
    aggregate_id VARCHAR(120),
    actor VARCHAR(120) NOT NULL,
    details TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL
);
