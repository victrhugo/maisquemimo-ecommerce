package com.maisquemimo.commerce.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record AdminUserRequest(
        @NotBlank(message = "Nome e obrigatorio")
        String name,

        @NotBlank(message = "Email e obrigatorio")
        @Email(message = "Email invalido")
        String email,

        @NotBlank(message = "Role e obrigatoria")
        String role,

        Boolean isActive
) {
}
