package com.maisquemimo.commerce.dto;

public record StoreOrderItemResponse(
        String productId,
        String name,
        String imageUrl,
        long price,
        int quantity,
        long total
) {
}
