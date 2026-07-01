package com.maisquemimo.commerce.exception;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

/**
 * Tratamento global de exceções
 */
@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandler {

    /**
     * Trata ProductNotFoundException
     */
    @ExceptionHandler(ProductNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleProductNotFound(ProductNotFoundException ex) {
        log.warn("Produto não encontrado: {}", ex.getMessage());
        return buildError(HttpStatus.NOT_FOUND, ex.getMessage());
    }

    /**
     * Trata DuplicateProductSlugException
     */
    @ExceptionHandler(DuplicateProductSlugException.class)
    public ResponseEntity<ErrorResponse> handleDuplicateSlug(DuplicateProductSlugException ex) {
        log.warn("Slug duplicado: {}", ex.getMessage());
        return buildError(HttpStatus.CONFLICT, ex.getMessage());
    }

    /**
     * Trata DuplicateProductSkuException
     */
    @ExceptionHandler(DuplicateProductSkuException.class)
    public ResponseEntity<ErrorResponse> handleDuplicateSku(DuplicateProductSkuException ex) {
        log.warn("SKU duplicado: {}", ex.getMessage());
        return buildError(HttpStatus.CONFLICT, ex.getMessage());
    }

    /**
     * Trata CategoryNotFoundException
     */
    @ExceptionHandler(CategoryNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleCategoryNotFound(CategoryNotFoundException ex) {
        log.warn("Categoria não encontrada: {}", ex.getMessage());
        return buildError(HttpStatus.NOT_FOUND, ex.getMessage());
    }

    /**
     * Trata erros de validação
     */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, Object>> handleValidationExceptions(MethodArgumentNotValidException ex) {
        log.warn("Erro de validação: {}", ex.getMessage());

        Map<String, Object> body = new HashMap<>();
        body.put("status", HttpStatus.BAD_REQUEST.value());
        body.put("message", "Erro de validação");
        body.put("timestamp", LocalDateTime.now());

        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getFieldErrors().forEach(error ->
            errors.put(error.getField(), error.getDefaultMessage())
        );
        body.put("errors", errors);

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(body);
    }

    /**
     * Trata IllegalArgumentException
     */
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ErrorResponse> handleIllegalArgument(IllegalArgumentException ex) {
        log.warn("Argumento inválido: {}", ex.getMessage());
        return buildError(HttpStatus.BAD_REQUEST, ex.getMessage());
    }

    /**
     * Trata exceções genéricas
     */
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleGlobalException(Exception ex) {
        log.error("Erro não tratado: ", ex);
        return buildError(HttpStatus.INTERNAL_SERVER_ERROR, "Erro interno do servidor");
    }

    private ResponseEntity<ErrorResponse> buildError(HttpStatus status, String message) {
        ErrorResponse error = new ErrorResponse(status.value(), message, LocalDateTime.now());
        return ResponseEntity.status(status).body(error);
    }

    /**
     * Resposta padrão de erro
     */
    public record ErrorResponse(
        int status,
        String message,
        LocalDateTime timestamp
    ) {
    }
}
