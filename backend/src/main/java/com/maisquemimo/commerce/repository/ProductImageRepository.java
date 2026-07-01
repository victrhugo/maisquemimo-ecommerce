package com.maisquemimo.commerce.repository;

import com.maisquemimo.commerce.entity.ProductImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface ProductImageRepository extends JpaRepository<ProductImage, UUID> {
    void deleteByProductId(UUID productId);
}
