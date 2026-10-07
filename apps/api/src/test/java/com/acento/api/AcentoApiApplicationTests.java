package com.acento.api;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.testcontainers.containers.PostgreSQLContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@Testcontainers
@SpringBootTest
@AutoConfigureMockMvc
class AcentoApiApplicationTests {
    @Autowired
    MockMvc mvc;

    @Autowired
    JdbcTemplate jdbc;

    @Container
    static PostgreSQLContainer<?> postgres = new PostgreSQLContainer<>("postgres:16-alpine");

    @DynamicPropertySource
    static void datasourceProperties(DynamicPropertyRegistry registry) {
        registry.add("spring.datasource.url", postgres::getJdbcUrl);
        registry.add("spring.datasource.username", postgres::getUsername);
        registry.add("spring.datasource.password", postgres::getPassword);
    }

    @Test
    void contextLoads() {
    }

    @Test
    void publicContentContractDescribesTheScaffold() throws Exception {
        mvc.perform(get("/api/public/content/dialects"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(9))
                .andExpect(jsonPath("$[0]").value("dominican"));
        mvc.perform(get("/api/public/content/status"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.source").value("starter-content"));
    }

    @Test
    void migrationsCreateTheSeedWithoutLearnerProgress() {
        assertEquals(1, jdbc.queryForObject("SELECT count(*) FROM app_users", Integer.class));
        assertEquals(0, jdbc.queryForObject("SELECT count(*) FROM user_progress", Integer.class));
        assertEquals(0, jdbc.queryForObject("SELECT count(*) FROM favorites", Integer.class));
        assertEquals(1, jdbc.queryForObject("SELECT count(*) FROM content_events", Integer.class));
    }
}
