package com.maisquemimo.commerce.dto;

import java.time.LocalDateTime;

public record CategoryResponse(
        String id,
        String name,
        String slug,
        String description,
        String imageUrl,
        boolean active,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {
}
