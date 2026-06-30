package com.maisquemimo.commerce.mapper;

import com.maisquemimo.commerce.dto.ProductImageRequest;
import com.maisquemimo.commerce.dto.ProductRequest;
import com.maisquemimo.commerce.dto.ProductResponse;
import com.maisquemimo.commerce.entity.Category;
import com.maisquemimo.commerce.entity.Product;
import com.maisquemimo.commerce.entity.ProductImage;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * Mapper para conversão entre Product e ProductRequest/ProductResponse
 */
@Component
public class ProductMapper {

    /**
     * Converte ProductRequest em Product Entity
     * Mantém valores nulos ou padrão para campos não fornecidos
     */
    public Product toEntity(ProductRequest request, Category category) {
        return Product.builder()
                .name(request.name())
                .description(request.description())
                .price(request.price())
                .originalPrice(request.originalPrice())
                .sku(request.sku())
                .category(category)
                .stockQuantity(request.stockQuantity())
                .isNew(request.isNew())
                .isFeatured(request.isFeatured())
                .active(true)
                .rating(0)
                .reviewCount(0)
                .build();
    }

    /**
     * Atualiza Product Entity com dados de ProductRequest
     * Preserva campos que não devem ser alterados (criação, id, etc)
     */
    public void updateEntityFromRequest(ProductRequest request, Product product, Category category) {
        product.setName(request.name());
        product.setDescription(request.description());
        product.setPrice(request.price());
        product.setOriginalPrice(request.originalPrice());
        product.setSku(request.sku());
        product.setCategory(category);
        product.setStockQuantity(request.stockQuantity());
        product.setIsNew(request.isNew());
        product.setIsFeatured(request.isFeatured());
    }

    /**
     * Converte Product Entity em ProductResponse DTO
     */
    public ProductResponse toResponse(Product product) {
        List<ProductResponse.ProductImageDTO> images = product.getImages() != null
                ? product.getImages().stream()
                    .map(img -> new ProductResponse.ProductImageDTO(
                        img.getId().toString(),
                        img.getImageUrl(),
                        img.getDisplayOrder()
                    ))
                    .toList()
                : java.util.List.of();

        return new ProductResponse(
            product.getId().toString(),
            product.getName(),
            product.getSlug(),
            product.getDescription(),
            product.getPrice(),
            product.getOriginalPrice(),
            product.getCategory().getId().toString(),
            product.getStockQuantity(),
            product.getSku(),
            product.getRating(),
            product.getReviewCount(),
            product.getIsNew(),
            product.getIsFeatured(),
            product.getActive(),
            product.isInStock(),
            images,
            product.getCreatedAt(),
            product.getUpdatedAt()
        );
    }

    /**
     * Cria ProductImage a partir de ProductImageRequest
     */
    public ProductImage imageRequestToEntity(ProductImageRequest request, Product product) {
        return ProductImage.builder()
                .imageUrl(request.imageUrl())
                .displayOrder(request.displayOrder())
                .product(product)
                .build();
    }
}
