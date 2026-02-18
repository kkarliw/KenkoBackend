package com.kenko.demo.appointment.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.kenko.demo.appointment.dto.AppointmentRequestDto;
import com.kenko.demo.appointment.dto.AppointmentResponseDto;
import com.kenko.demo.appointment.dto.UpdateAppointmentStatusDto;
import com.kenko.demo.appointment.entity.Appointment;
import com.kenko.demo.appointment.entity.Appointment.AppointmentStatus;
import com.kenko.demo.appointment.exception.AppointmentNotFoundException;
import com.kenko.demo.appointment.exception.InvalidAppointmentStatusException;
import com.kenko.demo.appointment.repository.AppointmentRepository;
import com.kenko.demo.patient.entity.Patient;
import com.kenko.demo.patient.repository.PatientRepository;
import com.kenko.demo.user.repository.UserRepository;
import com.kenko.demo.common.exception.ApplicationException;
import org.springframework.http.HttpStatus;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
public class AppointmentService {

    private final AppointmentRepository appointmentRepository;
    private final UserRepository userRepository;
    private final PatientRepository patientRepository;

    /**
     * Crear una nueva cita
     */
    public AppointmentResponseDto createAppointment(
            AppointmentRequestDto request,
            Long orgId
    ) {
        // 1. Validar que la fecha sea en el futuro
        if (request.getAppointmentDate().isBefore(LocalDateTime.now())) {
            throw new InvalidAppointmentStatusException("La cita no puede ser en el pasado");
        }

        // 2. Validar paciente existe y pertenece a orgId
        Patient patient = patientRepository.findById(request.getPatientId())
                .orElseThrow(() -> new ApplicationException("Paciente no encontrado", HttpStatus.NOT_FOUND));

        if (!patient.getOrgId().equals(orgId)) {
            throw new ApplicationException("Paciente no pertenece a tu organización", HttpStatus.FORBIDDEN);
        }

        // 3. Validar conflicto horario (mismo doctor, overlapping)
        List<Appointment> conflicting = appointmentRepository.findAppointmentsInTimeRange(
                request.getDoctorId(),
                orgId,
                request.getAppointmentDate().minusMinutes(5),
                request.getAppointmentDate().plusMinutes(35)
        );

        if (!conflicting.isEmpty()) {
            throw new InvalidAppointmentStatusException(
                    "El doctor no tiene disponibilidad en ese horario"
            );
        }

        // 4. Crear cita
        Appointment appointment = Appointment.builder()
                .patientId(request.getPatientId())
                .doctorId(request.getDoctorId())
                .orgId(orgId)
                .appointmentDate(request.getAppointmentDate())
                .durationMinutes(request.getDurationMinutes() != null ? request.getDurationMinutes() : 30)
                .reason(request.getReason())
                .notes(request.getNotes())
                .location(request.getLocation() != null ? request.getLocation() : "Consultorio")
                .status(AppointmentStatus.PENDING)
                .build();

        appointment = appointmentRepository.save(appointment);
        log.info("Cita creada: ID={}, Paciente={}, Doctor={}",
                appointment.getId(), request.getPatientId(), request.getDoctorId());

        return convertToDto(appointment);
    }

    /**
     * Cambiar el estado de una cita
     */
    public AppointmentResponseDto updateAppointmentStatus(
            Long appointmentId,
            UpdateAppointmentStatusDto request,
            Long orgId
    ) {
        Appointment appointment = appointmentRepository.findByIdAndOrgId(appointmentId, orgId)
                .orElseThrow(() -> new AppointmentNotFoundException("Cita no encontrada"));

        // Validar transiciones de estado
        if (!isValidTransition(appointment.getStatus(), request.getStatus())) {
            throw new InvalidAppointmentStatusException(
                    String.format("No se puede cambiar de %s a %s",
                            appointment.getStatus(),
                            request.getStatus())
            );
        }

        // Si es cancelación, validar motivo
        if (request.getStatus() == AppointmentStatus.CANCELLED) {
            if (request.getCancelReason() == null || request.getCancelReason().isBlank()) {
                throw new InvalidAppointmentStatusException("Motivo de cancelación requerido");
            }
            appointment.setCancelledAt(LocalDateTime.now());
            appointment.setCancelReason(request.getCancelReason());
        }

        appointment.setStatus(request.getStatus());

        log.info("Estado de cita actualizado: ID={}, Estado={}", appointmentId, request.getStatus());

        appointment = appointmentRepository.save(appointment);
        return convertToDto(appointment);
    }

    /**
     * Obtener agenda del doctor para hoy
     */
    public List<AppointmentResponseDto> getDoctorAgendaToday(Long doctorId, Long orgId) {
        LocalDate today = LocalDate.now();
        List<Appointment> appointments = appointmentRepository
                .findDoctorAppointmentsByDate(doctorId, orgId, today);

        return appointments.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    /**
     * Obtener agenda del doctor para una fecha específica
     */
    public List<AppointmentResponseDto> getDoctorAgendaByDate(
            Long doctorId,
            LocalDate date,
            Long orgId
    ) {
        List<Appointment> appointments = appointmentRepository
                .findDoctorAppointmentsByDate(doctorId, orgId, date);

        return appointments.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    /**
     * Obtener mis citas (para el paciente)
     */
    public Page<AppointmentResponseDto> getPatientAppointments(
            Long patientId,
            Long orgId,
            Pageable pageable
    ) {
        return appointmentRepository
                .findPatientAppointments(patientId, orgId, pageable)
                .map(this::convertToDto);
    }

    /**
     * Obtener citas por rango de fechas
     */
    public List<AppointmentResponseDto> getAppointmentsByDateRange(
            Long orgId,
            LocalDate startDate,
            LocalDate endDate
    ) {
        LocalDateTime startDateTime = startDate.atStartOfDay();
        LocalDateTime endDateTime = endDate.atTime(LocalTime.MAX);

        List<Appointment> appointments = appointmentRepository
                .findAppointmentsByDateRange(orgId, startDateTime, endDateTime);

        return appointments.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    /**
     * Validar transiciones de estado válidas
     */
    private boolean isValidTransition(AppointmentStatus current, AppointmentStatus next) {
        return switch(current) {
            case PENDING -> next == AppointmentStatus.CONFIRMED || next == AppointmentStatus.CANCELLED;
            case CONFIRMED -> next == AppointmentStatus.CHECKED_IN || next == AppointmentStatus.CANCELLED || next == AppointmentStatus.NO_SHOW;
            case CHECKED_IN -> next == AppointmentStatus.COMPLETED; // ✅ AHORA EXISTE COMPLETED
            case COMPLETED -> false; // No se puede cambiar de COMPLETED
            case CANCELLED -> false; // No se puede cambiar de CANCELLED
            case NO_SHOW -> false;   // No se puede cambiar de NO_SHOW
        };
    }

    /**
     * Convertir entidad a DTO con nombres
     */
    public AppointmentResponseDto convertToDto(Appointment appointment) {
        String patientName = "Paciente";
        String doctorName = "Doctor";

        try {
            patientName = userRepository.findById(appointment.getPatientId())
                    .map(u -> u.getFirstName() + " " + u.getLastName())
                    .orElse("Paciente");

            doctorName = userRepository.findById(appointment.getDoctorId())
                    .map(u -> u.getFirstName() + " " + u.getLastName())
                    .orElse("Doctor");
        } catch (Exception e) {
            log.warn("Error obteniendo nombres para cita {}", appointment.getId());
        }

        return AppointmentResponseDto.builder()
                .id(appointment.getId())
                .patientId(appointment.getPatientId())
                .doctorId(appointment.getDoctorId())
                .patientName(patientName)
                .doctorName(doctorName)
                .appointmentDate(appointment.getAppointmentDate())
                .durationMinutes(appointment.getDurationMinutes())
                .status(appointment.getStatus())
                .reason(appointment.getReason())
                .notes(appointment.getNotes())
                .location(appointment.getLocation())
                .createdAt(appointment.getCreatedAt())
                .updatedAt(appointment.getUpdatedAt())
                .cancelledAt(appointment.getCancelledAt())
                .cancelReason(appointment.getCancelReason())
                .build();
    }
}