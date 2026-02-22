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
            // Crear organización test
            Optional<Organization> orgOpt = organizationRepository.findByEmail("test@clinica.com");
            Organization org;

            if (orgOpt.isEmpty()) {
                org = Organization.builder()
                        .orgId("ORG-TEST")
                        .name("Clínica Test Kenkō")
                        .email("test@clinica.com")
                        .phone("+1234567890")
                        .address("Av. Salud 123")
                        .city("Ciudad de México")
                        .country("México")
                        .status(OrgStatus.ACTIVE)
                        .build();
                org = organizationRepository.save(org);
                log.info("📋 Organización test creada: {}", org.getName());
            } else {
                org = orgOpt.get();
            }

            // Helper para crear usuarios si no existen
            createTestUserIfMissing("admin@test.com", "token123", "Admin", "Kenko", UserRole.ADMIN, org.getId());
            createTestUserIfMissing("doctor@test.com", "token123", "Dr. Juan", "García", UserRole.DOCTOR, org.getId());
            createTestUserIfMissing("receptionist@test.com", "token123", "Ana", "Sánchez", UserRole.RECEPTIONIST,
                    org.getId());
            createTestUserIfMissing("patient@test.com", "token123", "Pedro", "Pérez", UserRole.PATIENT, org.getId());
            createTestUserIfMissing("caregiver@test.com", "token123", "Carlos", "López", UserRole.CAREGIVER,
                    org.getId());
        };
    }

    private void createTestUserIfMissing(String email, String password, String firstName, String lastName,
            UserRole role,
            Long orgId) {
        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isEmpty()) {
            User user = User.builder()
                    .email(email)
                    .password(passwordEncoder.encode(password))
                    .firstName(firstName)
                    .lastName(lastName)
                    .role(role)
                    .status(UserStatus.ACTIVE)
                    .orgId(orgId)
                    .build();
            userRepository.save(user);
            log.info("👤 Usuario creado: {} ({}) / {}", email, role, password);
        } else {
            User user = userOpt.get();
            user.setPassword(passwordEncoder.encode(password));
            userRepository.save(user);
            log.info("✅ Usuario {} actualizado con nueva contraseña", email);
        }
    }
}
