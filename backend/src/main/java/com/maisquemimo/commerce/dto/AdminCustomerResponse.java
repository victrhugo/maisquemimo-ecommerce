package com.maisquemimo.commerce.dto;

public record AdminCustomerResponse(
        String id,
        String name,
        String email,
        String phone,
        String city,
        String state,
        int ordersCount,
        long totalSpent,
        String lastOrderDate
) {
}
