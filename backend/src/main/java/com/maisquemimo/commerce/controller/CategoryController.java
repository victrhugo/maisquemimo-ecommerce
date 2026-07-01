package com.maisquemimo.commerce.controller;

import com.maisquemimo.commerce.dto.CategoryRequest;
import com.maisquemimo.commerce.dto.CategoryResponse;
import com.maisquemimo.commerce.entity.Category;
import com.maisquemimo.commerce.repository.CategoryRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Comparator;
import java.util.List;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryRepository categoryRepository;

    @GetMapping("/categories")
    public ResponseEntity<List<CategoryResponse>> listPublic() {
        List<CategoryResponse> categories = categoryRepository.findAll().stream()
                .filter(Category::getActive)
                .sorted(Comparator.comparing(Category::getName, String.CASE_INSENSITIVE_ORDER))
                .map(this::toResponse)
                .toList();
        return ResponseEntity.ok(categories);
    }

    @GetMapping("/admin/categories")
    public ResponseEntity<List<CategoryResponse>> listAdmin() {
        List<CategoryResponse> categories = categoryRepository.findAll().stream()
                .sorted(Comparator.comparing(Category::getCreatedAt).reversed())
                .map(this::toResponse)
                .toList();
        return ResponseEntity.ok(categories);
    }

    @PostMapping("/admin/categories")
    public ResponseEntity<CategoryResponse> create(@Valid @RequestBody CategoryRequest request) {
        Category category = Category.builder()
                .name(request.name())
                .slug(request.slug())
                .description(request.description())
                .imageUrl(request.imageUrl())
                .active(request.active() == null || request.active())
                .build();

        Category saved = categoryRepository.save(category);
        return ResponseEntity.status(HttpStatus.CREATED).body(toResponse(saved));
    }

    @PutMapping("/admin/categories/{id}")
    public ResponseEntity<CategoryResponse> update(@PathVariable String id, @Valid @RequestBody CategoryRequest request) {
        UUID categoryId = UUID.fromString(id);
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new IllegalArgumentException("Categoria nao encontrada"));

        category.setName(request.name());
        category.setSlug(request.slug());
        category.setDescription(request.description());
        category.setImageUrl(request.imageUrl());
        if (request.active() != null) {
            category.setActive(request.active());
        }

        Category saved = categoryRepository.save(category);
        return ResponseEntity.ok(toResponse(saved));
    }

    @DeleteMapping("/admin/categories/{id}")
    public ResponseEntity<Void> delete(@PathVariable String id) {
        UUID categoryId = UUID.fromString(id);
        categoryRepository.deleteById(categoryId);
        return ResponseEntity.noContent().build();
    }

    private CategoryResponse toResponse(Category category) {
        return new CategoryResponse(
                category.getId().toString(),
                category.getName(),
                category.getSlug(),
                category.getDescription(),
                category.getImageUrl(),
                Boolean.TRUE.equals(category.getActive()),
                category.getCreatedAt(),
                category.getUpdatedAt()
        );
    }
}
