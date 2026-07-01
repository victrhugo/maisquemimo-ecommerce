package com.maisquemimo.commerce.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

/**
 * Configuração CORS para permitir requests do frontend
 * Funciona em dev (localhost:3000) e produção (domínios específicos)
 */
@Configuration
public class WebConfig {

    private static final List<String> DEFAULT_ALLOWED_ORIGIN_PATTERNS = List.of(
            "http://localhost:3000",
            "http://localhost:3001",
            "http://127.0.0.1:3000",
            "https://localhost:3000",
            "https://maisquemimo.com",
            "https://www.maisquemimo.com",
            "https://*.netlify.app"
    );

    /**
     * Configurar CORS via CorsConfigurationSource
     * Integra com Spring Security sem conflitos
     */
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();

        // ALLOWED_ORIGINS (comma separated) sobrescreve defaults para produção.
        List<String> allowedOriginPatterns = resolveAllowedOriginPatterns();

        config.setAllowedOriginPatterns(allowedOriginPatterns);

        // Métodos HTTP permitidos
        config.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"));

        // Headers permitidos
        config.setAllowedHeaders(Collections.singletonList("*"));

        // Headers que o cliente pode acessar
        config.setExposedHeaders(Arrays.asList(
                "Authorization",
                "Content-Type",
                "X-Total-Count",
                "X-Page-Count"
        ));

        // Permitir credentials (cookies, auth headers)
        config.setAllowCredentials(true);

        // Max age para preflight cache (em segundos)
        config.setMaxAge(3600L);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        // Aplicar CORS a todos os endpoints
        source.registerCorsConfiguration("/**", config);

        return source;
    }

    private List<String> resolveAllowedOriginPatterns() {
        String allowedOriginsEnv = System.getenv("ALLOWED_ORIGINS");
        if (allowedOriginsEnv == null || allowedOriginsEnv.isBlank()) {
            return DEFAULT_ALLOWED_ORIGIN_PATTERNS;
        }

        return Arrays.stream(allowedOriginsEnv.split(","))
                .map(String::trim)
                .filter(origin -> !origin.isBlank())
                .toList();
    }
}
