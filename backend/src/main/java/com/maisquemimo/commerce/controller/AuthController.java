package com.maisquemimo.commerce.controller;

import com.maisquemimo.commerce.config.JwtService;
import com.maisquemimo.commerce.dto.AuthTokenResponse;
import com.maisquemimo.commerce.dto.LoginRequest;
import com.maisquemimo.commerce.dto.RegisterRequest;
import com.maisquemimo.commerce.dto.UpdateProfileRequest;
import com.maisquemimo.commerce.dto.UserProfileResponse;
import com.maisquemimo.commerce.entity.User;
import com.maisquemimo.commerce.repository.UserRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

/**
 * Controlador de autenticação — login e registro
 */
@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@Slf4j
public class AuthController {

    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;

    @Value("${jwt.expiration}")
    private long tokenExpiration;

    @PostMapping("/register")
    public ResponseEntity<Object> register(@Valid @RequestBody RegisterRequest request) {
        if (userRepository.existsByEmail(request.email())) {
            return error(HttpStatus.CONFLICT, "Este email já está cadastrado");
        }

        User user = userRepository.save(buildCustomerUser(request));
        log.info("Novo usuário registrado: {}", user.getEmail());

        String token = jwtService.generateToken(user.getEmail(), user.getId(), roleClaim(user));
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(new AuthTokenResponse(token, tokenExpiration / 1000));
    }

    @PostMapping("/login")
    public ResponseEntity<Object> login(@Valid @RequestBody LoginRequest request) {
        User user = userRepository.findByEmail(request.email())
                .orElse(null);

        if (user == null || !passwordEncoder.matches(request.password(), user.getPassword())) {
            return error(HttpStatus.UNAUTHORIZED, "Email ou senha inválidos");
        }

        if (!user.getEnabled()) {
            return error(HttpStatus.FORBIDDEN, "Usuário desativado");
        }

        String token = jwtService.generateToken(user.getEmail(), user.getId(), roleClaim(user));
        log.info("Login bem-sucedido: {}", user.getEmail());

        return ResponseEntity.ok(new AuthTokenResponse(token, tokenExpiration / 1000));
    }

    @GetMapping("/me")
    public ResponseEntity<Object> me(Authentication authentication) {
        User user = currentUser(authentication);
        if (user == null) {
            return error(HttpStatus.UNAUTHORIZED, "Não autenticado");
        }

        return ResponseEntity.ok(toProfileResponse(user));
    }

    @PutMapping("/me")
    public ResponseEntity<Object> updateProfile(
            Authentication authentication,
            @Valid @RequestBody UpdateProfileRequest request
    ) {
        User user = currentUser(authentication);
        if (user == null) {
            return error(HttpStatus.UNAUTHORIZED, "Não autenticado");
        }

        boolean emailChanged = !user.getEmail().equalsIgnoreCase(request.email());
        if (emailChanged && userRepository.existsByEmail(request.email())) {
            return error(HttpStatus.CONFLICT, "Este email já está cadastrado");
        }

        user.setName(request.name());
        user.setEmail(request.email());
        User saved = userRepository.save(user);

        return ResponseEntity.ok(toProfileResponse(saved));
    }

    private User buildCustomerUser(RegisterRequest request) {
        return User.builder()
                .name(request.name())
                .email(request.email())
                .password(passwordEncoder.encode(request.password()))
                .role(User.Role.CUSTOMER)
                .build();
    }

    private User currentUser(Authentication authentication) {
        if (authentication == null || authentication.getName() == null || authentication.getName().isBlank()) {
            return null;
        }

        return userRepository.findByEmail(authentication.getName()).orElse(null);
    }

    private UserProfileResponse toProfileResponse(User user) {
        return new UserProfileResponse(
                user.getId().toString(),
                user.getName(),
                user.getEmail(),
                roleClaim(user),
                Boolean.TRUE.equals(user.getEnabled())
        );
    }

    private String roleClaim(User user) {
        if (user.getRole() == User.Role.ADMIN) {
            return "ADMIN";
        }

        return "CLIENT";
    }

    private ResponseEntity<Object> error(HttpStatus status, String message) {
        return ResponseEntity.status(status).body(new ErrorResponse(message));
    }

    record ErrorResponse(String message) {}

}
