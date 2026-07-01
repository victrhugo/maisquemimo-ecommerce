package com.maisquemimo.commerce.config;

import com.maisquemimo.commerce.entity.User;
import com.maisquemimo.commerce.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@RequiredArgsConstructor
@Slf4j
public class AdminUserSeedConfig {

    private static final String ADMIN_EMAIL = "erichris.santos@gmail.com";
    private static final String ADMIN_PASSWORD = "@Erika12";
    private static final String ADMIN_NAME = "Administrador";

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Bean
    public CommandLineRunner seedInitialAdmin() {
        return args -> {
            if (userRepository.existsByEmail(ADMIN_EMAIL)) {
                return;
            }

            User admin = User.builder()
                    .name(ADMIN_NAME)
                    .email(ADMIN_EMAIL)
                    .password(passwordEncoder.encode(ADMIN_PASSWORD))
                    .role(User.Role.ADMIN)
                    .enabled(true)
                    .build();

            userRepository.save(admin);
            log.info("Administrador inicial criado: {}", ADMIN_EMAIL);
        };
    }
}
