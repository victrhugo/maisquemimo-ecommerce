package com.maisquemimo.commerce.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

/**
 * DTO para resposta de produtos
 */
public record ProductResponse(
    String id,
    String name,
    String slug,
    String description,
    BigDecimal price,
    BigDecimal originalPrice,
    String categoryId,
    Integer stockQuantity,
    String sku,
    Integer rating,
    Integer reviewCount,
    boolean isNew,
    boolean isFeatured,
    boolean active,
    boolean inStock,
    List<ProductImageDTO> images,
    LocalDateTime createdAt,
    LocalDateTime updatedAt
) {
    /**
     * DTO interno para imagens
     */
    public record ProductImageDTO(
        String id,
        String imageUrl,
        Integer displayOrder
    ) {
    }
}
