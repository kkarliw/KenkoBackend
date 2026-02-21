package com.kenko.demo.auth.service;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.kenko.demo.auth.dto.LoginRequestDto;
import com.kenko.demo.auth.dto.RegisterOrgRequestDto;
import com.kenko.demo.auth.dto.AuthResponseDto;
import com.kenko.demo.auth.exception.AuthenticationException;
import com.kenko.demo.organization.entity.Organization;
import com.kenko.demo.organization.entity.Organization.OrgStatus;
import com.kenko.demo.organization.repository.OrganizationRepository;
import com.kenko.demo.user.entity.User;
import com.kenko.demo.user.entity.User.UserRole;
import com.kenko.demo.user.entity.User.UserStatus;
import com.kenko.demo.user.repository.UserRepository;

import java.util.UUID;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
public class AuthService {

    private final UserRepository userRepository;
    private final OrganizationRepository organizationRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final PasswordEncoder passwordEncoder;

    /**
     * Login de usuario existente
     */
    public AuthResponseDto login(LoginRequestDto request) {
        // Buscar usuario por email
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new AuthenticationException("Email o contraseña inválidos"));

        // Validar contraseña
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new AuthenticationException("Email o contraseña inválidos");
        }

        // Validar que el usuario esté activo
        if (user.getStatus() == UserStatus.INACTIVE) {
            throw new AuthenticationException("Usuario inactivo");
        }

        // Generar token
        String accessToken = jwtTokenProvider.generateAccessToken(user);

        log.info("Login exitoso para usuario: {}", request.getEmail());

        return AuthResponseDto.builder()
                .userId(user.getId())
                .email(user.getEmail())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .role(user.getRole())
                .orgId(user.getOrgId())
                .accessToken(accessToken)
                .tokenType("Bearer")
                .expiresIn(3600L) // 1 hora en segundos
                .build();
    }

    /**
     * Registrar nueva organización con usuario admin
     */
    public AuthResponseDto registerOrganization(RegisterOrgRequestDto request) {
        // Validar que el email no exista
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new AuthenticationException("Email ya registrado");
        }

        // Generar ID único para la organización
        String orgId = "ORG-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();

        // Crear organización
        Organization organization = Organization.builder()
                .orgId(orgId)
                .name(request.getOrgName())
                .email(request.getEmail())
                .phone(request.getPhone())
                .address(request.getAddress())
                .city(request.getCity())
                .country(request.getCountry())
                .status(OrgStatus.ACTIVE)
                .build();

        organization = organizationRepository.save(organization);
        log.info("Organización creada: {} (ID: {})", organization.getName(), organization.getId());

        // Crear usuario ADMIN
        User adminUser = User.builder()
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .firstName(request.getAdminFirstName())
                .lastName(request.getAdminLastName())
                .orgId(organization.getId())
                .role(UserRole.ADMIN)
                .status(UserStatus.ACTIVE)
                .build();

        adminUser = userRepository.save(adminUser);
        log.info("Usuario ADMIN creado: {}", adminUser.getEmail());

        // Generar token para el usuario admin
        String accessToken = jwtTokenProvider.generateAccessToken(adminUser);

        return AuthResponseDto.builder()
                .userId(adminUser.getId())
                .email(adminUser.getEmail())
                .firstName(adminUser.getFirstName())
                .lastName(adminUser.getLastName())
                .role(adminUser.getRole())
                .orgId(organization.getId())
                .accessToken(accessToken)
                .tokenType("Bearer")
                .expiresIn(3600L)
                .build();
    }
}
