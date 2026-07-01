package com.maisquemimo.commerce.dto;

import java.util.List;

public record AdminOrderResponse(
        String id,
        String number,
        String customerName,
        String customerEmail,
        String status,
        long total,
        String createdAt,
        List<AdminOrderItemResponse> items
) {
}
