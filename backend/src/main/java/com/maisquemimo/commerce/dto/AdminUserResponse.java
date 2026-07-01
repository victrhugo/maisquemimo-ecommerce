package com.maisquemimo.commerce.dto;

public record AdminUserResponse(
        String id,
        String name,
        String email,
        String role,
        boolean isActive
) {
}
