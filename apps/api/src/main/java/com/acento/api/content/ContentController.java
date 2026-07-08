package com.acento.api.content;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/public/content")
public class ContentController {
    @GetMapping("/dialects")
    List<String> dialects() {
        return List.of("dominican", "puerto_rican", "cuban", "mexican", "colombian", "venezuelan", "argentine", "chilean", "spain");
    }

    @GetMapping("/status")
    ContentStatus status() {
        return new ContentStatus("starter-content", "Content is authored in packages/content and prepared for API ingestion.");
    }
}
