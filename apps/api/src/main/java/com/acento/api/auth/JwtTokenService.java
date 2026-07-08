package com.acento.api.auth;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.UUID;

@Service
public class JwtTokenService {
    private final String issuer;

    public JwtTokenService(@Value("${acento.jwt.issuer}") String issuer) {
        this.issuer = issuer;
    }

    public TokenPreview createPreviewToken(UUID userId) {
        return new TokenPreview(userId, issuer, Instant.now().plusSeconds(3600), "jwt-signing-not-enabled-yet");
    }
}
