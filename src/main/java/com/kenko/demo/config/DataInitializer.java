package com.kenko.demo.config;

import com.kenko.demo.organization.entity.Organization;
import com.kenko.demo.organization.entity.Organization.OrgStatus;
import com.kenko.demo.organization.repository.OrganizationRepository;
import com.kenko.demo.user.entity.User;
import com.kenko.demo.user.entity.User.UserRole;
import com.kenko.demo.user.entity.User.UserStatus;
import com.kenko.demo.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

@Configuration
@RequiredArgsConstructor
@Slf4j
public class DataInitializer {

    private final UserRepository userRepository;
    private final OrganizationRepository organizationRepository;
    private final PasswordEncoder passwordEncoder;

    @Bean
    public CommandLineRunner initTestData() {
        return args -> {
            // Verificar si el usuario ya existe
            Optional<User> existingUser = userRepository.findByEmail("admin1@test.com");
            if (existingUser.isPresent()) {
                log.info("✅ Usuario test (admin1@test.com) ya existe");
                return;
            }

            // Crear organización test
            Optional<Organization> orgOpt = organizationRepository.findByEmail("org@test.com");
            Organization org;

            if (orgOpt.isEmpty()) {
                org = Organization.builder()
                        .orgId("ORG-TEST01")
                        .name("Test Organization")
                        .email("org@test.com")
                        .phone("+1234567890")
                        .address("Test Address")
                        .city("Test City")
                        .country("Test Country")
                        .status(OrgStatus.ACTIVE)
                        .build();
                org = organizationRepository.save(org);
                log.info("📋 Organización test creada: {}", org.getName());
            } else {
                org = orgOpt.get();
            }

            // Crear usuario test
            User testUser = User.builder()
                    .email("admin1@test.com")
                    .password(passwordEncoder.encode("admin123"))
                    .firstName("Admin")
                    .lastName("Test")
                    .role(UserRole.ADMIN)
                    .status(UserStatus.ACTIVE)
                    .orgId(org.getId())
                    .build();

            userRepository.save(testUser);
            log.info("👤 Usuario test creado: admin1@test.com / admin123");
        };
    }
}
