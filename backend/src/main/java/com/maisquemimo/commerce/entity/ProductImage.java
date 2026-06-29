package com.maisquemimo.commerce.entity;

import jakarta.persistence.*;
import lombok.*;

/**
 * Entidade de imagem do produto
 */
@Entity
@Table(name = "product_images")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProductImage extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @Column(nullable = false)
    private String imageUrl;

    @Column(nullable = false)
    private Integer displayOrder = 0;

}
