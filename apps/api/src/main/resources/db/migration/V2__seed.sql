INSERT INTO app_users (id, email, display_name, auth_provider, preferred_dialect, anonymous, created_at)
VALUES ('11111111-1111-1111-1111-111111111111', 'demo@acento.app', 'Demo Learner', 'email', 'dominican', false, now());

INSERT INTO content_events (id, event_type, aggregate_id, actor, details, created_at)
VALUES ('22222222-2222-2222-2222-222222222222', 'CONTENT_SEED_READY', 'starter-content', 'system', 'Starter content is shipped from the content package and mirrored by API contracts.', now());
