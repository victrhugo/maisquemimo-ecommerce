package com.maisquemimo.commerce.config;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.stereotype.Component;

import java.io.IOException;

/**
 * Filtro JWT para extrair e validar tokens na requisição
 */
@Slf4j
@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain) throws ServletException, IOException {

        try {
            String jwt = extractTokenFromRequest(request);

            if (StringUtils.hasText(jwt)
                    && SecurityContextHolder.getContext().getAuthentication() == null
                    && jwtService.isTokenValid(jwt)) {
                String email = jwtService.extractEmail(jwt);

                // Criar autenticação simples — em produção integrar com UserService
                var authentication = new UsernamePasswordAuthenticationToken(
                        email,
                        null,
                        null
                );
                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authentication);

                log.debug("JWT token validado para email: {}", email);
            }
        } catch (Exception e) {
            log.debug("Erro ao processar JWT token: {}", e.getMessage());
        }

        filterChain.doFilter(request, response);
    }

    /**
     * Extrai o JWT do header Authorization (Bearer token)
     */
    private String extractTokenFromRequest(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }

}
