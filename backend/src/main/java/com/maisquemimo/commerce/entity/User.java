package com.maisquemimo.commerce.entity;

import jakarta.persistence.*;
import lombok.*;

/**
 * Entidade de usuário — tanto cliente quanto administrador
 */
@Entity
@Table(name = "users", uniqueConstraints = {
    @UniqueConstraint(columnNames = "email", name = "uk_users_email")
})
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class User extends BaseEntity {

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;

    @Column(name = "avatar_url")
    private String avatarUrl;

    @Column(nullable = false)
    private Boolean enabled = true;

    public enum Role {
        CUSTOMER,
        ADMIN
    }

}
