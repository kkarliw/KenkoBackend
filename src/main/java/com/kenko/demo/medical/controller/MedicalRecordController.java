package com.kenko.demo.medical.controller;

import com.kenko.demo.common.dto.ApiResponse;
import com.kenko.demo.common.dto.PaginationDto;
import com.kenko.demo.medical.dto.MedicalRecordRequestDto;
import com.kenko.demo.medical.dto.MedicalRecordResponseDto;
import com.kenko.demo.medical.service.MedicalRecordService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/medical-records")
@RequiredArgsConstructor
public class MedicalRecordController {

    private final MedicalRecordService medicalRecordService;

    @PostMapping
    public ResponseEntity<ApiResponse<MedicalRecordResponseDto>> createRecord(
            @Valid @RequestBody MedicalRecordRequestDto request,
            HttpServletRequest httpRequest) {
        Long doctorId = (Long) httpRequest.getAttribute("userId");
        Long orgId = (Long) httpRequest.getAttribute("orgId");

        MedicalRecordResponseDto response = medicalRecordService.createRecord(request, doctorId, orgId);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.ok(response, "Historia clínica creada exitosamente"));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<MedicalRecordResponseDto>> getRecord(
            @PathVariable Long id,
            HttpServletRequest httpRequest) {
        Long orgId = (Long) httpRequest.getAttribute("orgId");
        MedicalRecordResponseDto record = medicalRecordService.getRecordById(id, orgId);
        return ResponseEntity.ok(ApiResponse.ok(record, "Historia clínica obtenida"));
    }

    @GetMapping("/patient/{patientId}")
    public ResponseEntity<ApiResponse<PaginationDto<MedicalRecordResponseDto>>> getPatientRecords(
            @PathVariable Long patientId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            HttpServletRequest httpRequest) {
        Long orgId = (Long) httpRequest.getAttribute("orgId");
        Pageable pageable = PageRequest.of(page, size);

        Page<MedicalRecordResponseDto> records = medicalRecordService.getPatientRecords(patientId, orgId, pageable);

        PaginationDto<MedicalRecordResponseDto> response = PaginationDto.<MedicalRecordResponseDto>builder()
                .content(records.getContent())
                .pageNumber(records.getNumber())
                .pageSize(records.getSize())
                .totalElements(records.getTotalElements())
                .totalPages(records.getTotalPages())
                .last(records.isLast())
                .build();

        return ResponseEntity.ok(ApiResponse.ok(response, "Historias clínicas del paciente obtenidas"));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<PaginationDto<MedicalRecordResponseDto>>> getOrgRecords(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            HttpServletRequest httpRequest) {
        Long orgId = (Long) httpRequest.getAttribute("orgId");
        Pageable pageable = PageRequest.of(page, size);

        Page<MedicalRecordResponseDto> records = medicalRecordService.getOrgRecords(orgId, pageable);

        PaginationDto<MedicalRecordResponseDto> response = PaginationDto.<MedicalRecordResponseDto>builder()
                .content(records.getContent())
                .pageNumber(records.getNumber())
                .pageSize(records.getSize())
                .totalElements(records.getTotalElements())
                .totalPages(records.getTotalPages())
                .last(records.isLast())
                .build();

        return ResponseEntity.ok(ApiResponse.ok(response, "Historias clínicas de la organización obtenidas"));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<MedicalRecordResponseDto>> updateRecord(
            @PathVariable Long id,
            @Valid @RequestBody MedicalRecordRequestDto request,
            HttpServletRequest httpRequest) {
        Long orgId = (Long) httpRequest.getAttribute("orgId");
        MedicalRecordResponseDto response = medicalRecordService.updateRecord(id, request, orgId);
        return ResponseEntity.ok(ApiResponse.ok(response, "Historia clínica actualizada exitosamente"));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<String>> deleteRecord(
            @PathVariable Long id,
            HttpServletRequest httpRequest) {
        Long orgId = (Long) httpRequest.getAttribute("orgId");
        medicalRecordService.deleteRecord(id, orgId);
        return ResponseEntity.ok(ApiResponse.ok("Historia clínica eliminada exitosamente", "Registro removido"));
    }
}
