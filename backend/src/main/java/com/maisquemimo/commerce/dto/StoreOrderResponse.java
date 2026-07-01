package com.maisquemimo.commerce.dto;

import java.util.List;

public record StoreOrderResponse(
        String id,
        String number,
        String status,
        List<StoreOrderItemResponse> items,
        long subtotal,
        long discount,
        long shipping,
        long total,
        String createdAt,
        String updatedAt,
        Customer customer,
        Address shippingAddress,
        String trackingCode
) {
    public record Customer(String name, String email) {
    }

    public record Address(
            String street,
            String number,
            String complement,
            String neighborhood,
            String city,
            String state,
            String zipCode
    ) {
    }
}
