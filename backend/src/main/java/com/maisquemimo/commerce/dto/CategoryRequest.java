package com.maisquemimo.commerce.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record CategoryRequest(
        @NotBlank(message = "Nome da categoria e obrigatorio")
        @Size(min = 2, max = 100, message = "Nome deve ter entre 2 e 100 caracteres")
        String name,

        @NotBlank(message = "Slug da categoria e obrigatorio")
        @Size(min = 2, max = 100, message = "Slug deve ter entre 2 e 100 caracteres")
        String slug,

        String description,
        String imageUrl,
        Boolean active
) {
}
