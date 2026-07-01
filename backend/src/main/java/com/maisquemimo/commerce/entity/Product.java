package com.maisquemimo.commerce.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

/**
 * Entidade de produto
 */
@Entity
@Table(name = "products", indexes = {
    @Index(name = "idx_products_slug", columnList = "slug"),
    @Index(name = "idx_products_category", columnList = "category_id"),
    @Index(name = "idx_products_active", columnList = "active")
})
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Product extends BaseEntity {

    @Column(nullable = false, length = 200)
    private String name;

    @Column(nullable = false, unique = true, length = 200)
    private String slug;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal price;

    @Column(precision = 10, scale = 2)
    private BigDecimal originalPrice;

    @Column(name = "image_url")
    private String imageUrl;

    @Column(name = "sku", unique = true)
    private String sku;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    @Column(nullable = false)
    @Builder.Default
    private Integer stockQuantity = 0;

    @Column(nullable = false)
    @Builder.Default
    private Boolean isNew = false;

    @Column(nullable = false)
    @Builder.Default
    private Boolean isFeatured = false;

    @Column(nullable = false)
    @Builder.Default
    private Boolean active = true;

    @Column(nullable = false)
    @Builder.Default
    private Integer rating = 0;

    @Column(nullable = false)
    @Builder.Default
    private Integer reviewCount = 0;

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @Builder.Default
    private List<ProductImage> images = new ArrayList<>();

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @Builder.Default
    private List<ProductReview> reviews = new ArrayList<>();

    public boolean isInStock() {
        return stockQuantity > 0;
    }

}
