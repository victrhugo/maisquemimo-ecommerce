package com.maisquemimo.commerce.dto;

public record AdminOrderItemResponse(
        String name,
        int quantity,
        long price
) {
}
