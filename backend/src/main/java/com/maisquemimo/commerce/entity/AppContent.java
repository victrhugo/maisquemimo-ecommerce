package com.maisquemimo.commerce.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Armazena configuracoes de conteudo administrativo em JSON.
 */
@Entity
@Table(name = "app_contents")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AppContent extends BaseEntity {

    @Column(name = "content_key", nullable = false, unique = true, length = 100)
    private String contentKey;

    @Column(name = "payload", nullable = false, columnDefinition = "TEXT")
    private String payload;
}
