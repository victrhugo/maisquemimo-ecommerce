package com.maisquemimo.commerce.dto;

public record UserProfileResponse(
    String id,
    String name,
    String email,
    String role,
    boolean active
) {
}
