package com.acento.api.auth;

import java.time.Instant;
import java.util.UUID;

public record TokenPreview(UUID userId, String issuer, Instant expiresAt, String note) {
}
