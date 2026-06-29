package com.maisquemimo.commerce.exception;

/**
 * Exceção quando um slug de produto já existe
 */
public class DuplicateProductSlugException extends RuntimeException {
    public DuplicateProductSlugException(String slug) {
        super("Já existe um produto com o slug '%s'".formatted(slug));
    }
}
