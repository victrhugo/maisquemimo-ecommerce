package com.maisquemimo.commerce.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import java.math.BigDecimal;
import java.util.List;

/**
 * DTO para requisição de criação/atualização de produtos
 */
public record ProductRequest(
    @NotBlank(message = "Nome do produto é obrigatório")
    @Size(min = 3, max = 150, message = "Nome deve ter entre 3 e 150 caracteres")
    String name,

    @NotBlank(message = "Descrição é obrigatória")
    @Size(min = 10, max = 500, message = "Descrição deve ter entre 10 e 500 caracteres")
    String description,

    @NotNull(message = "Preço é obrigatório")
    @DecimalMin(value = "0.01", message = "Preço deve ser maior que 0")
    @DecimalMax(value = "999999.99", message = "Preço não pode exceder 999.999,99")
    BigDecimal price,

    @DecimalMin(value = "0", message = "Preço original não pode ser negativo")
    @DecimalMax(value = "999999.99", message = "Preço original não pode exceder 999.999,99")
    BigDecimal originalPrice,

    @NotNull(message = "Categoria é obrigatória")
    String categoryId,

    @NotNull(message = "Quantidade em estoque é obrigatória")
    @Min(value = 0, message = "Quantidade não pode ser negativa")
    Integer stockQuantity,

    @NotBlank(message = "SKU é obrigatório")
    @Size(min = 3, max = 50, message = "SKU deve ter entre 3 e 50 caracteres")
    String sku,

    boolean isNew,
    boolean isFeatured,
    
    @Valid
    List<ProductImageRequest> images
) {
}
