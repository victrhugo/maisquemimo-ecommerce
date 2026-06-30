package com.maisquemimo.commerce.repository;

import com.maisquemimo.commerce.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface ProductRepository extends JpaRepository<Product, UUID> {
    Optional<Product> findBySlug(String slug);
    Optional<Product> findBySku(String sku);

    Page<Product> findByCategoryIdAndActive(UUID categoryId, boolean active, Pageable pageable);

    @Query("SELECT p FROM Product p WHERE p.active = true AND p.isFeatured = true ORDER BY p.createdAt DESC")
    Page<Product> findFeaturedProducts(Pageable pageable);

    @Query("SELECT p FROM Product p WHERE p.active = true AND p.isNew = true ORDER BY p.createdAt DESC")
    Page<Product> findNewProducts(Pageable pageable);

    @Query("SELECT p FROM Product p WHERE p.active = true AND LOWER(p.name) LIKE LOWER(CONCAT('%', :search, '%'))")
    Page<Product> searchByName(@Param("search") String search, Pageable pageable);
}
