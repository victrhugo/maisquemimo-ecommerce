package com.maisquemimo.commerce.repository;

import com.maisquemimo.commerce.entity.ProductImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductImageRepository extends JpaRepository<ProductImage, String> {
    List<ProductImage> findByProductIdOrderByDisplayOrder(String productId);
    void deleteByProductId(String productId);
}
