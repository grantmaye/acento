package com.acento.api.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {
    @Bean
    OpenAPI openAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Acento API")
                        .version("0.1.0")
                        .description("Language-learning platform API for lessons, dialects, progress, and future AI practice.")
                        .license(new License().name("MIT")));
    }
}
