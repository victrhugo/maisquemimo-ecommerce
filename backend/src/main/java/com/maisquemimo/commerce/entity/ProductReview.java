package com.maisquemimo.commerce.entity;

import jakarta.persistence.*;
import lombok.*;

/**
 * Entidade de avaliação/review de produto
 */
@Entity
@Table(name = "product_reviews")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProductReview extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private User customer;

    @Column(nullable = false)
    private Integer rating;

    @Column(columnDefinition = "TEXT")
    private String comment;

    @Column(nullable = false)
    @Builder.Default
    private Boolean verified = false;

    @Column(nullable = false)
    @Builder.Default
    private Boolean approved = false;

}
