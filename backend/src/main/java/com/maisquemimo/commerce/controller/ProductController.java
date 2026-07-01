package com.maisquemimo.commerce.controller;

import com.maisquemimo.commerce.dto.ProductRequest;
import com.maisquemimo.commerce.dto.ProductResponse;
import com.maisquemimo.commerce.service.ProductService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Controller para endpoints de produtos
 * Público: GET endpoints
 * Privado: POST, PUT, DELETE (requer autenticação)
 */
@RestController
@RequestMapping("/products")
@RequiredArgsConstructor
@Slf4j
public class ProductController {

    private final ProductService productService;

    /**
     * GET /api/products
     * Listar todos os produtos com paginação
     */
    @GetMapping
    public ResponseEntity<Page<ProductResponse>> listAll(
            @PageableDefault(size = 20, page = 0, sort = "createdAt", direction = Sort.Direction.DESC)
            Pageable pageable) {
        log.info("GET /api/products - Listando produtos");
        return ResponseEntity.ok(productService.findAll(pageable));
    }

    /**
     * GET /api/products/featured
     * Listar produtos destacados
     */
    @GetMapping("/featured")
    public ResponseEntity<Page<ProductResponse>> listFeatured(
            @PageableDefault(size = 10, page = 0, sort = "createdAt", direction = Sort.Direction.DESC)
            Pageable pageable) {
        log.info("GET /api/products/featured - Listando produtos destacados");
        return ResponseEntity.ok(productService.findFeatured(pageable));
    }

    /**
     * GET /api/products/new
     * Listar produtos novos
     */
    @GetMapping("/new")
    public ResponseEntity<Page<ProductResponse>> listNew(
            @PageableDefault(size = 10, page = 0, sort = "createdAt", direction = Sort.Direction.DESC)
            Pageable pageable) {
        log.info("GET /api/products/new - Listando produtos novos");
        return ResponseEntity.ok(productService.findNew(pageable));
    }

    /**
     * GET /api/products/search?q=termo
     * Buscar produtos por termo
     */
    @GetMapping("/search")
    public ResponseEntity<Page<ProductResponse>> search(
            @RequestParam(name = "q") String searchTerm,
            @PageableDefault(size = 20, page = 0, sort = "createdAt", direction = Sort.Direction.DESC)
            Pageable pageable) {
        log.info("GET /api/products/search - Buscando: {}", searchTerm);
        return ResponseEntity.ok(productService.search(searchTerm, pageable));
    }

    /**
     * GET /api/products/category/:categoryId
     * Listar produtos de uma categoria
     */
    @GetMapping("/category/{categoryId}")
    public ResponseEntity<Page<ProductResponse>> listByCategory(
            @PathVariable String categoryId,
            @PageableDefault(size = 20, page = 0, sort = "createdAt", direction = Sort.Direction.DESC)
            Pageable pageable) {
        log.info("GET /api/products/category/{} - Listando produtos", categoryId);
        return ResponseEntity.ok(productService.findByCategory(categoryId, pageable));
    }

    /**
     * GET /api/products/:id
     * Buscar produto por ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<ProductResponse> getById(@PathVariable String id) {
        log.info("GET /api/products/{} - Buscando produto", id);
        return ResponseEntity.ok(productService.findById(id));
    }

    /**
     * GET /api/products/slug/:slug
     * Buscar produto por slug (público)
     */
    @GetMapping("/slug/{slug}")
    public ResponseEntity<ProductResponse> getBySlug(@PathVariable String slug) {
        log.info("GET /api/products/slug/{} - Buscando produto por slug", slug);
        return ResponseEntity.ok(productService.findBySlug(slug));
    }

    /**
     * POST /api/products
     * Criar novo produto (admin)
     */
    @PostMapping
    public ResponseEntity<ProductResponse> create(
            @Valid @RequestBody ProductRequest request) {
        log.info("POST /api/products - Criando novo produto");
        ProductResponse response = productService.create(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    /**
     * PUT /api/products/:id
     * Atualizar produto (admin)
     */
    @PutMapping("/{id}")
    public ResponseEntity<ProductResponse> update(
            @PathVariable String id,
            @Valid @RequestBody ProductRequest request) {
        log.info("PUT /api/products/{} - Atualizando produto", id);
        ProductResponse response = productService.update(id, request);
        return ResponseEntity.ok(response);
    }

    /**
     * DELETE /api/products/:id
     * Deletar produto (admin)
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable String id) {
        log.info("DELETE /api/products/{} - Deletando produto", id);
        productService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
