package com.kenko.demo.user.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.kenko.demo.user.dto.CreateUserRequestDto;
import com.kenko.demo.user.dto.UserDto;
import com.kenko.demo.user.service.UserService;
import com.kenko.demo.common.dto.ApiResponse;
import com.kenko.demo.common.dto.PaginationDto;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

        private final UserService userService;

        /**
         * Obtener todos los usuarios de la organización
         */
        @GetMapping
        public ResponseEntity<ApiResponse<PaginationDto<UserDto>>> getUsers(
                        @RequestParam(defaultValue = "0") int page,
                        @RequestParam(defaultValue = "10") int size,
                        HttpServletRequest httpRequest) {
                Long orgId = (Long) httpRequest.getAttribute("orgId");

                Pageable pageable = PageRequest.of(page, size);
                Page<UserDto> users = userService.getUsersByOrganization(orgId, pageable)
                                .map(userService::convertToDto);

                PaginationDto<UserDto> response = PaginationDto.<UserDto>builder()
                                .content(users.getContent())
                                .pageNumber(users.getNumber())
                                .pageSize(users.getSize())
                                .totalElements(users.getTotalElements())
                                .totalPages(users.getTotalPages())
                                .last(users.isLast())
                                .build();

                return ResponseEntity.ok(
                                ApiResponse.ok(response, "Usuarios obtenidos"));
        }

        /**
         * Crear usuario
         */
        @PostMapping
        public ResponseEntity<ApiResponse<UserDto>> createUser(
                        @Valid @RequestBody CreateUserRequestDto request,
                        HttpServletRequest httpRequest) {
                Long orgId = (Long) httpRequest.getAttribute("orgId");

                UserDto response = userService.createUser(request, orgId);

                return ResponseEntity.status(HttpStatus.CREATED)
                                .body(ApiResponse.ok(response, "Usuario creado exitosamente"));
        }

        /**
         * Obtener usuario por ID
         */
        @GetMapping("/{id}")
        public ResponseEntity<ApiResponse<UserDto>> getUserById(
                        @PathVariable Long id,
                        HttpServletRequest httpRequest) {
                Long orgId = (Long) httpRequest.getAttribute("orgId");

                UserDto response = userService.getUserByIdDto(id, orgId);

                return ResponseEntity.ok(
                                ApiResponse.ok(response, "Usuario obtenido"));
        }

        /**
         * Actualizar usuario
         */
        @PutMapping("/{id}")
        public ResponseEntity<ApiResponse<UserDto>> updateUser(
                        @PathVariable Long id,
                        @Valid @RequestBody UserDto request,
                        HttpServletRequest httpRequest) {
                Long orgId = (Long) httpRequest.getAttribute("orgId");

                UserDto response = userService.updateUser(id, request, orgId);

                return ResponseEntity.ok(
                                ApiResponse.ok(response, "Usuario actualizado"));
        }

        /**
         * Eliminar usuario
         */
        @DeleteMapping("/{id}")
        public ResponseEntity<ApiResponse<String>> deleteUser(
                        @PathVariable Long id,
                        HttpServletRequest httpRequest) {
                Long orgId = (Long) httpRequest.getAttribute("orgId");

                userService.deleteUser(id, orgId);

                return ResponseEntity.ok(
                                ApiResponse.ok("Usuario eliminado exitosamente", "Usuario removido"));
        }
}
