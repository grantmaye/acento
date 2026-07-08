package com.acento.api.ai;

import org.springframework.stereotype.Component;

@Component
public class DeferredAiCoach implements AiCoachPort {
    @Override
    public AiCoachResponse preview(AiCoachRequest request) {
        return new AiCoachResponse("AI coaching is architected as a port and will be implemented in a later phase.", false);
    }
}
