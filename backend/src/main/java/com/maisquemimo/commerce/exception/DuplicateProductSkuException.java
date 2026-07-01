package com.maisquemimo.commerce.exception;

/**
 * Exceção quando um SKU de produto já existe
 */
public class DuplicateProductSkuException extends IllegalArgumentException {

    public DuplicateProductSkuException(String sku) {
        super("SKU '%s' já existe".formatted(sku));
    }
}
