package com.maisquemimo.commerce.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.Collections;

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

        // Permite múltiplas origins (dev + prod)
        config.setAllowedOrigins(Arrays.asList(
                "http://localhost:3000",           // Dev local
                "http://localhost:3001",           // Dev alternativo
                "http://localhost:8080",           // Backend local
                "https://localhost:3000",          // Dev HTTPS
                "http://127.0.0.1:3000",           // Dev 127.0.0.1
                "http://maisquemimo.com",          // Prod
                "https://maisquemimo.com",         // Prod HTTPS
                "http://www.maisquemimo.com",      // Prod www
                "https://www.maisquemimo.com"      // Prod www HTTPS
        ));

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
