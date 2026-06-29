package com.maisquemimo.commerce.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;

/**
 * DTO para imagens de produto
 */
public record ProductImageRequest(
    @NotBlank(message = "URL da imagem é obrigatória")
    String imageUrl,

    @Min(value = 0, message = "Ordem não pode ser negativa")
    Integer displayOrder
) {
}
