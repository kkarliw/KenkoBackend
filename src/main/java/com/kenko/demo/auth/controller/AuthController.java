package com.kenko.demo.auth.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import com.kenko.demo.auth.dto.LoginRequestDto;
import com.kenko.demo.auth.dto.RegisterOrgRequestDto;
import com.kenko.demo.auth.dto.AuthResponseDto;
import com.kenko.demo.auth.service.AuthService;
import com.kenko.demo.common.dto.ApiResponse;
import com.kenko.demo.user.dto.UserDto;
import com.kenko.demo.user.entity.User;
import com.kenko.demo.user.repository.UserRepository;
import com.kenko.demo.common.exception.ApplicationException;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

        private final AuthService authService;
        private final UserRepository userRepository;

        /**
         * Login
         */
        @PostMapping("/login")
        public ResponseEntity<ApiResponse<AuthResponseDto>> login(
                        @Valid @RequestBody LoginRequestDto request,
                        HttpServletRequest httpRequest) {
                AuthResponseDto response = authService.login(request);

                return ResponseEntity.ok(
                                ApiResponse.ok(response, "Login exitoso"));
        }

        /**
         * Registrar organización
         */
        @PostMapping("/register-organization")
        public ResponseEntity<ApiResponse<AuthResponseDto>> registerOrganization(
                        @Valid @RequestBody RegisterOrgRequestDto request,
                        HttpServletRequest httpRequest) {
                AuthResponseDto response = authService.registerOrganization(request);

                return ResponseEntity.status(HttpStatus.CREATED)
                                .body(ApiResponse.ok(response, "Organización registrada exitosamente"));
        }

        /**
         * Obtener datos del usuario autenticado
         */
        @GetMapping("/me")
        public ResponseEntity<ApiResponse<UserDto>> getCurrentUser() {
                // 1. Obtener Authentication desde SecurityContext
                Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

                // 2. Manejar caso donde authentication sea null
                if (authentication == null || !authentication.isAuthenticated()) {
                        throw new ApplicationException("Usuario no autenticado",
                                        org.springframework.http.HttpStatus.UNAUTHORIZED);
                }

                // 3. Extraer principal como Long userId
                Long userId;
                try {
                        userId = (Long) authentication.getPrincipal();
                } catch (ClassCastException e) {
                        throw new ApplicationException("Token inválido",
                                        org.springframework.http.HttpStatus.UNAUTHORIZED);
                }

                // 4. Consultar User desde UserRepository
                User user = userRepository.findById(userId)
                                .orElseThrow(() -> new ApplicationException("Usuario no encontrado",
                                                org.springframework.http.HttpStatus.NOT_FOUND));

                // 5. Retornar DTO seguro (sin password)
                UserDto userDto = UserDto.builder()
                                .id(user.getId())
                                .email(user.getEmail())
                                .firstName(user.getFirstName())
                                .lastName(user.getLastName())
                                .role(user.getRole())
                                .status(user.getStatus())
                                .phone(user.getPhone())
                                .specialization(user.getSpecialization())
                                .licenseNumber(user.getLicenseNumber())
                                .department(user.getDepartment())
                                .build();

                return ResponseEntity.ok(
                                ApiResponse.ok(userDto, "Datos del usuario obtenidos"));
        }
}