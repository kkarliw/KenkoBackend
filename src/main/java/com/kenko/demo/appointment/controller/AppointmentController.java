package com.kenko.demo.appointment.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.kenko.demo.appointment.dto.AppointmentRequestDto;
import com.kenko.demo.appointment.dto.AppointmentResponseDto;
import com.kenko.demo.appointment.dto.UpdateAppointmentStatusDto;
import com.kenko.demo.appointment.service.AppointmentService;
import com.kenko.demo.common.dto.ApiResponse;
import com.kenko.demo.common.dto.PaginationDto;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/v1/appointments")
@RequiredArgsConstructor
public class AppointmentController {

    private final AppointmentService appointmentService;

    /**
     * Crear cita
     */
    @PostMapping
    public ResponseEntity<ApiResponse<AppointmentResponseDto>> createAppointment(
            @Valid @RequestBody AppointmentRequestDto request,
            HttpServletRequest httpRequest
    ) {
        Long orgId = (Long) httpRequest.getAttribute("orgId");

        AppointmentResponseDto response = appointmentService.createAppointment(request, orgId);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.ok(response, "Cita creada exitosamente"));
    }

    /**
     * Cambiar estado de cita
     */
    @PatchMapping("/{id}/status")
    public ResponseEntity<ApiResponse<AppointmentResponseDto>> updateAppointmentStatus(
            @PathVariable Long id,
            @Valid @RequestBody UpdateAppointmentStatusDto request,
            HttpServletRequest httpRequest
    ) {
        Long orgId = (Long) httpRequest.getAttribute("orgId");

        AppointmentResponseDto response = appointmentService.updateAppointmentStatus(id, request, orgId);

        return ResponseEntity.ok(
                ApiResponse.ok(response, "Estado de cita actualizado")
        );
    }

    /**
     * Agenda del doctor para hoy
     */
    @GetMapping("/doctor/agenda/today")
    public ResponseEntity<ApiResponse<List<AppointmentResponseDto>>> getDoctorAgendaToday(
            HttpServletRequest httpRequest
    ) {
        Long doctorId = (Long) httpRequest.getAttribute("userId");
        Long orgId = (Long) httpRequest.getAttribute("orgId");

        List<AppointmentResponseDto> appointments = appointmentService
                .getDoctorAgendaToday(doctorId, orgId);

        return ResponseEntity.ok(
                ApiResponse.ok(appointments, "Agenda del día obtenida")
        );
    }

    /**
     * Agenda del doctor por fecha
     */
    @GetMapping("/doctor/agenda")
    public ResponseEntity<ApiResponse<List<AppointmentResponseDto>>> getDoctorAgenda(
            @RequestParam String date,
            HttpServletRequest httpRequest
    ) {
        Long doctorId = (Long) httpRequest.getAttribute("userId");
        Long orgId = (Long) httpRequest.getAttribute("orgId");

        LocalDate searchDate = LocalDate.parse(date);
        List<AppointmentResponseDto> appointments = appointmentService
                .getDoctorAgendaByDate(doctorId, searchDate, orgId);

        return ResponseEntity.ok(
                ApiResponse.ok(appointments, "Agenda obtenida")
        );
    }

    /**
     * Mis citas (paciente)
     */
    @GetMapping("/patient/my-appointments")
    public ResponseEntity<ApiResponse<PaginationDto<AppointmentResponseDto>>> getMyAppointments(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            HttpServletRequest httpRequest
    ) {
        Long patientId = (Long) httpRequest.getAttribute("userId");
        Long orgId = (Long) httpRequest.getAttribute("orgId");

        Pageable pageable = PageRequest.of(page, size);
        Page<AppointmentResponseDto> appointments = appointmentService
                .getPatientAppointments(patientId, orgId, pageable);

        PaginationDto<AppointmentResponseDto> response = PaginationDto.<AppointmentResponseDto>builder()
                .content(appointments.getContent())
                .pageNumber(appointments.getNumber())
                .pageSize(appointments.getSize())
                .totalElements(appointments.getTotalElements())
                .totalPages(appointments.getTotalPages())
                .last(appointments.isLast())
                .build();

        return ResponseEntity.ok(
                ApiResponse.ok(response, "Mis citas obtenidas")
        );
    }
}
