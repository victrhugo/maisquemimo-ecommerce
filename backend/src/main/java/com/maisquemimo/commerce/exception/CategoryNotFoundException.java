package com.maisquemimo.commerce.exception;

/**
 * Exceção quando a categoria informada não existe
 */
public class CategoryNotFoundException extends IllegalArgumentException {

    public CategoryNotFoundException() {
        super("Categoria não encontrada");
    }
}
