package com.acento.api.ai;

public record AiCoachRequest(AiCapability capability, String learnerInput, String dialect) {
}
