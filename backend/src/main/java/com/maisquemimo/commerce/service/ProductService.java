package com.maisquemimo.commerce.service;

import com.maisquemimo.commerce.dto.ProductRequest;
import com.maisquemimo.commerce.dto.ProductResponse;
import com.maisquemimo.commerce.entity.Category;
import com.maisquemimo.commerce.entity.Product;
import com.maisquemimo.commerce.exception.DuplicateProductSlugException;
import com.maisquemimo.commerce.exception.ProductNotFoundException;
import com.maisquemimo.commerce.mapper.ProductMapper;
import com.maisquemimo.commerce.repository.CategoryRepository;
import com.maisquemimo.commerce.repository.ProductImageRepository;
import com.maisquemimo.commerce.repository.ProductRepository;
import com.google.common.base.CaseFormat;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

/**
 * Serviço de negócio para gestão de produtos
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class ProductService {

    private final ProductRepository productRepository;
    private final ProductImageRepository productImageRepository;
    private final CategoryRepository categoryRepository;
    private final ProductMapper productMapper;

    /**
     * Busca todos os produtos ativos com paginação
     */
    @Transactional(readOnly = true)
    public Page<ProductResponse> findAll(Pageable pageable) {
        log.debug("Buscando todos os produtos ativos");
        return productRepository
                .findAll(pageable)
                .map(productMapper::toResponse);
    }

    /**
     * Busca produtos ativos por categoria
     */
    @Transactional(readOnly = true)
    public Page<ProductResponse> findByCategory(String categoryId, Pageable pageable) {
        log.debug("Buscando produtos da categoria: {}", categoryId);
        UUID categoryUuid = parseUuid(categoryId, "categoryId");
        return productRepository
            .findByCategoryIdAndActive(categoryUuid, true, pageable)
                .map(productMapper::toResponse);
    }

    /**
     * Busca produtos destacados
     */
    @Transactional(readOnly = true)
    public Page<ProductResponse> findFeatured(Pageable pageable) {
        log.debug("Buscando produtos destacados");
        return productRepository
                .findFeaturedProducts(pageable)
                .map(productMapper::toResponse);
    }

    /**
     * Busca produtos novos
     */
    @Transactional(readOnly = true)
    public Page<ProductResponse> findNew(Pageable pageable) {
        log.debug("Buscando produtos novos");
        return productRepository
                .findNewProducts(pageable)
                .map(productMapper::toResponse);
    }

    /**
     * Busca produto por ID
     */
    @Transactional(readOnly = true)
    public ProductResponse findById(String id) {
        log.debug("Buscando produto por ID: {}", id);
        UUID productId = parseUuid(id, "id");
        return productRepository
            .findById(productId)
                .map(productMapper::toResponse)
                .orElseThrow(() -> ProductNotFoundException.byId(id));
    }

    /**
     * Busca produto por slug (público)
     */
    @Transactional(readOnly = true)
    public ProductResponse findBySlug(String slug) {
        log.debug("Buscando produto por slug: {}", slug);
        return productRepository
                .findBySlug(slug)
                .filter(Product::getActive)
                .map(productMapper::toResponse)
                .orElseThrow(() -> ProductNotFoundException.bySlug(slug));
    }

    /**
     * Busca produtos por termo
     */
    @Transactional(readOnly = true)
    public Page<ProductResponse> search(String term, Pageable pageable) {
        log.debug("Buscando produtos com termo: {}", term);
        return productRepository
                .searchByName(term, pageable)
                .map(productMapper::toResponse);
    }

    /**
     * Cria novo produto
     */
    @Transactional
    public ProductResponse create(ProductRequest request) {
        log.info("Criando novo produto: {}", request.name());
        UUID categoryId = parseUuid(request.categoryId(), "categoryId");

        // Validar categoria
        Category category = categoryRepository
            .findById(categoryId)
                .orElseThrow(() -> new IllegalArgumentException("Categoria não encontrada"));

        // Gerar slug
        String slug = generateSlug(request.name());

        // Verificar duplicação de slug
        if (productRepository.findBySlug(slug).isPresent()) {
            throw new DuplicateProductSlugException(slug);
        }

        // Verificar duplicação de SKU
        if (productRepository.findBySku(request.sku()).isPresent()) {
            throw new IllegalArgumentException("SKU '%s' já existe".formatted(request.sku()));
        }

        // Criar produto
        Product product = productMapper.toEntity(request, category);
        product.setSlug(slug);
        Product savedProduct = productRepository.save(product);

        // Salvar imagens
        if (request.images() != null && !request.images().isEmpty()) {
            var images = request.images().stream()
                    .map(img -> productMapper.imageRequestToEntity(img, savedProduct))
                    .toList();
            productImageRepository.saveAll(images);
            savedProduct.setImages(images);
        }

        log.info("Produto criado com sucesso: ID={}", savedProduct.getId());
        return productMapper.toResponse(savedProduct);
    }

    /**
     * Atualiza produto existente
     */
    @Transactional
    public ProductResponse update(String id, ProductRequest request) {
        log.info("Atualizando produto: {}", id);
        UUID productId = parseUuid(id, "id");
        UUID categoryId = parseUuid(request.categoryId(), "categoryId");

        Product product = productRepository
            .findById(productId)
                .orElseThrow(() -> ProductNotFoundException.byId(id));

        // Validar categoria
        Category category = categoryRepository
            .findById(categoryId)
                .orElseThrow(() -> new IllegalArgumentException("Categoria não encontrada"));

        // Verificar slug único (excluindo o próprio produto)
        String newSlug = generateSlug(request.name());
        if (!product.getSlug().equals(newSlug)) {
            if (productRepository.findBySlug(newSlug).isPresent()) {
                throw new DuplicateProductSlugException(newSlug);
            }
            product.setSlug(newSlug);
        }

        // Verificar SKU único (excluindo o próprio produto)
        if (!product.getSku().equals(request.sku())) {
            if (productRepository.findBySku(request.sku()).isPresent()) {
                throw new IllegalArgumentException("SKU '%s' já existe".formatted(request.sku()));
            }
        }

        // Atualizar campos
        productMapper.updateEntityFromRequest(request, product, category);
        product = productRepository.save(product);

        // Atualizar imagens
        if (request.images() != null) {
            productImageRepository.deleteByProductId(productId);
            if (!request.images().isEmpty()) {
                Product savedProduct = product;
                var images = request.images().stream()
                        .map(img -> productMapper.imageRequestToEntity(img, savedProduct))
                        .toList();
                productImageRepository.saveAll(images);
                product.setImages(images);
            }
        }

        log.info("Produto atualizado com sucesso: ID={}", id);
        return productMapper.toResponse(product);
    }

    /**
     * Deleta produto (soft delete)
     */
    @Transactional
    public void delete(String id) {
        log.info("Deletando produto: {}", id);
        UUID productId = parseUuid(id, "id");

        Product product = productRepository
            .findById(productId)
                .orElseThrow(() -> ProductNotFoundException.byId(id));

        product.setActive(false);
        productRepository.save(product);

        log.info("Produto deletado (soft delete): ID={}", id);
    }

    /**
     * Gera slug a partir do nome do produto
     * Ex: "Meu Produto Legal" -> "meu-produto-legal"
     */
    private String generateSlug(String name) {
        return CaseFormat.UPPER_CAMEL.to(CaseFormat.LOWER_HYPHEN, name)
                .replaceAll("[^a-z0-9-]", "")
                .replaceAll("-+", "-")
                .replaceAll("^-|-$", "");
    }

    private UUID parseUuid(String raw, String fieldName) {
        try {
            return UUID.fromString(raw);
        } catch (IllegalArgumentException ex) {
            throw new IllegalArgumentException("%s inválido: '%s'".formatted(fieldName, raw), ex);
        }
    }
}
