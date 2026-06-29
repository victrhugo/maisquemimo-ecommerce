package com.maisquemimo.commerce.exception;

/**
 * Exceção quando um produto não é encontrado
 */
public class ProductNotFoundException extends RuntimeException {
    public ProductNotFoundException(String message) {
        super(message);
    }

    public ProductNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }

    public static ProductNotFoundException byId(String id) {
        return new ProductNotFoundException("Produto com ID '%s' não encontrado".formatted(id));
    }

    public static ProductNotFoundException bySlug(String slug) {
        return new ProductNotFoundException("Produto com slug '%s' não encontrado".formatted(slug));
    }
}
