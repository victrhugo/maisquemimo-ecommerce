package com.maisquemimo.commerce.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Configuração CORS para permitir requests do frontend
 * Funciona em dev (localhost:3000) e produção (domínios específicos)
 */
@Configuration
public class WebConfig {

    /**
     * Configurar CORS via CorsConfigurationSource
     * Integra com Spring Security sem conflitos
     */
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();

        // ALLOWED_ORIGINS (comma separated) sobrescreve defaults para produção.
        String allowedOriginsEnv = System.getenv("ALLOWED_ORIGINS");
        List<String> allowedOriginPatterns;

        if (allowedOriginsEnv != null && !allowedOriginsEnv.isBlank()) {
            allowedOriginPatterns = Arrays.stream(allowedOriginsEnv.split(","))
                .map(String::trim)
                .filter(origin -> !origin.isBlank())
                .collect(Collectors.toList());
        } else {
            allowedOriginPatterns = Arrays.asList(
                "http://localhost:3000",          // Dev local
                "http://localhost:3001",          // Dev alternativo
                "http://127.0.0.1:3000",          // Dev 127.0.0.1
                "https://localhost:3000",         // Dev HTTPS
                "https://maisquemimo.com",        // Prod principal
                "https://www.maisquemimo.com",    // Prod www
                "https://*.netlify.app"           // Frontend Netlify
            );
        }

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
}
