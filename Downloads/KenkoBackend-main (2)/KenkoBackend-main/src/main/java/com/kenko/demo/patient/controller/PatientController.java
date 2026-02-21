package com.kenko.demo.patient.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.kenko.demo.patient.dto.CreatePatientRequestDto;
import com.kenko.demo.patient.dto.PatientResponseDto;
import com.kenko.demo.patient.service.PatientService;
import com.kenko.demo.common.dto.ApiResponse;
import com.kenko.demo.common.dto.PaginationDto;

@RestController
@RequestMapping("/patients")
@RequiredArgsConstructor
public class PatientController {

        private final PatientService patientService;

        /**
         * Crear paciente
         */
        @PostMapping
        public ResponseEntity<ApiResponse<PatientResponseDto>> createPatient(
                        @Valid @RequestBody CreatePatientRequestDto request,
                        HttpServletRequest httpRequest) {
                Long orgId = (Long) httpRequest.getAttribute("orgId");

                PatientResponseDto response = patientService.createPatient(request, orgId);

                return ResponseEntity.status(HttpStatus.CREATED)
                                .body(ApiResponse.ok(response, "Paciente creado exitosamente"));
        }

        /**
         * Obtener paciente por ID
         */
        @GetMapping("/{id}")
        public ResponseEntity<ApiResponse<PatientResponseDto>> getPatient(
                        @PathVariable Long id,
                        HttpServletRequest httpRequest) {
                Long orgId = (Long) httpRequest.getAttribute("orgId");

                PatientResponseDto patient = patientService.getPatientById(id, orgId);

                return ResponseEntity.ok(
                                ApiResponse.ok(patient, "Paciente obtenido"));
        }

        /**
         * Buscar/listar pacientes
         */
        @GetMapping
        public ResponseEntity<ApiResponse<PaginationDto<PatientResponseDto>>> searchPatients(
                        @RequestParam(required = false) String search,
                        @RequestParam(defaultValue = "0") int page,
                        @RequestParam(defaultValue = "10") int size,
                        HttpServletRequest httpRequest) {
                Long orgId = (Long) httpRequest.getAttribute("orgId");

                Pageable pageable = PageRequest.of(page, size);
                Page<PatientResponseDto> patients = patientService
                                .searchPatients(orgId, search != null ? search : "", pageable);

                PaginationDto<PatientResponseDto> response = PaginationDto.<PatientResponseDto>builder()
                                .content(patients.getContent())
                                .pageNumber(patients.getNumber())
                                .pageSize(patients.getSize())
                                .totalElements(patients.getTotalElements())
                                .totalPages(patients.getTotalPages())
                                .last(patients.isLast())
                                .build();

                return ResponseEntity.ok(
                                ApiResponse.ok(response, "Búsqueda de pacientes completada"));
        }

        /**
         * Actualizar paciente
         */
        @PutMapping("/{id}")
        public ResponseEntity<ApiResponse<PatientResponseDto>> updatePatient(
                        @PathVariable Long id,
                        @Valid @RequestBody CreatePatientRequestDto request,
                        HttpServletRequest httpRequest) {
                Long orgId = (Long) httpRequest.getAttribute("orgId");

                PatientResponseDto response = patientService.updatePatient(id, request, orgId);

                return ResponseEntity.ok(
                                ApiResponse.ok(response, "Paciente actualizado exitosamente"));
        }

        /**
         * Eliminar paciente
         */
        @DeleteMapping("/{id}")
        public ResponseEntity<ApiResponse<String>> deletePatient(
                        @PathVariable Long id,
                        HttpServletRequest httpRequest) {
                Long orgId = (Long) httpRequest.getAttribute("orgId");

                patientService.deletePatient(id, orgId);

                return ResponseEntity.ok(
                                ApiResponse.ok("Paciente eliminado exitosamente", "Paciente removido"));
        }
}
