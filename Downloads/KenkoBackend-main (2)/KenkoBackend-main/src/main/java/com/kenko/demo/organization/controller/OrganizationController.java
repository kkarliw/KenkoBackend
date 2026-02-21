package com.kenko.demo.organization.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.kenko.demo.organization.dto.OrganizationResponseDto;
import com.kenko.demo.organization.service.OrganizationService;
import com.kenko.demo.common.dto.ApiResponse;

@RestController
@RequestMapping("/organizations")
@RequiredArgsConstructor
public class OrganizationController {

        private final OrganizationService organizationService;

        /**
         * Obtener mi organización
         */
        @GetMapping("/me")
        public ResponseEntity<ApiResponse<OrganizationResponseDto>> getMyOrganization(
                        HttpServletRequest httpRequest) {
                Long orgId = (Long) httpRequest.getAttribute("orgId");

                OrganizationResponseDto response = organizationService.getOrganizationDto(orgId);

                return ResponseEntity.ok(
                                ApiResponse.ok(response, "Organización obtenida"));
        }

        /**
         * Actualizar mi organización
         */
        @PutMapping("/me")
        public ResponseEntity<ApiResponse<OrganizationResponseDto>> updateMyOrganization(
                        @RequestBody OrganizationResponseDto request,
                        HttpServletRequest httpRequest) {
                Long orgId = (Long) httpRequest.getAttribute("orgId");

                OrganizationResponseDto response = organizationService.updateOrganization(orgId, request);

                return ResponseEntity.ok(
                                ApiResponse.ok(response, "Organización actualizada"));
        }
}