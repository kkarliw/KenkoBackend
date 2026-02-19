package com.kenko.demo.appointment.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
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
     * Obtener todas las citas de la organización
     */
    public Page<AppointmentResponseDto> getAppointmentsByOrg(
            Long orgId,
            String status,
            Pageable pageable
    ) {
        Page<Appointment> appointments;

        try {
            if (status != null && !status.trim().isEmpty()) {
                AppointmentStatus appointmentStatus = AppointmentStatus.valueOf(status.toUpperCase());
                appointments = appointmentRepository.findByOrgIdAndStatus(orgId, appointmentStatus, pageable);
            } else {
                // Obtener todas sin filtro
                List<Appointment> allAppointments = appointmentRepository.findAll();
                List<Appointment> orgAppointments = allAppointments.stream()
                        .filter(a -> a.getOrgId().equals(orgId))
                        .collect(Collectors.toList());

                int start = (int) pageable.getOffset();
                int end = Math.min((start + pageable.getPageSize()), orgAppointments.size());
                List<Appointment> pageContent = orgAppointments.subList(start, end);

                appointments = new PageImpl<>(pageContent, pageable, orgAppointments.size());
            }
        } catch (IllegalArgumentException e) {
            throw new InvalidAppointmentStatusException("Estado inválido: " + status);
        }

        return appointments.map(this::convertToDto);
    }

    /**
     * Obtener cita por ID
     */
    public AppointmentResponseDto getAppointmentById(Long appointmentId, Long orgId) {
        Appointment appointment = appointmentRepository.findByIdAndOrgId(appointmentId, orgId)
                .orElseThrow(() -> new AppointmentNotFoundException("Cita no encontrada"));
        return convertToDto(appointment);
    }

    /**
     * Crear una nueva cita
     */
    public AppointmentResponseDto createAppointment(
            AppointmentRequestDto request,
            Long orgId
    ) {
        LocalDateTime appointmentDateTime = LocalDateTime.of(
                request.getAppointmentDate(),
                request.getAppointmentTime()
        );

        if (appointmentDateTime.isBefore(LocalDateTime.now())) {
            throw new InvalidAppointmentStatusException("La cita no puede ser en el pasado");
        }

        Patient patient = patientRepository.findById(request.getPatientId())
                .orElseThrow(() -> new ApplicationException("Paciente no encontrado", HttpStatus.NOT_FOUND));

        if (!patient.getOrgId().equals(orgId)) {
            throw new ApplicationException("Paciente no pertenece a tu organización", HttpStatus.FORBIDDEN);
        }

        LocalDateTime startTime = appointmentDateTime.minusMinutes(5);
        LocalDateTime endTime = appointmentDateTime.plusMinutes((request.getDurationMinutes() != null ? request.getDurationMinutes() : 30) + 5);

        List<Appointment> conflicting = appointmentRepository.findAppointmentsInTimeRange(
                request.getDoctorId(),
                orgId,
                startTime,
                endTime
        );

        if (!conflicting.isEmpty()) {
            throw new InvalidAppointmentStatusException("El doctor no tiene disponibilidad en ese horario");
        }

        Appointment appointment = Appointment.builder()
                .patientId(request.getPatientId())
                .doctorId(request.getDoctorId())
                .orgId(orgId)
                .appointmentDate(appointmentDateTime)
                .durationMinutes(request.getDurationMinutes() != null ? request.getDurationMinutes() : 30)
                .reason(request.getType())
                .notes(request.getNotes())
                .location("Consultorio")
                .status(AppointmentStatus.PENDING)
                .build();

        appointment = appointmentRepository.save(appointment);
        log.info("Cita creada: ID={}", appointment.getId());

        return convertToDto(appointment);
    }

    /**
     * Cambiar estado de cita
     */
    public AppointmentResponseDto updateAppointmentStatus(
            Long appointmentId,
            UpdateAppointmentStatusDto request,
            Long orgId
    ) {
        Appointment appointment = appointmentRepository.findByIdAndOrgId(appointmentId, orgId)
                .orElseThrow(() -> new AppointmentNotFoundException("Cita no encontrada"));

        if (!isValidTransition(appointment.getStatus(), request.getStatus())) {
            throw new InvalidAppointmentStatusException(
                    String.format("No se puede cambiar de %s a %s",
                            appointment.getStatus(), request.getStatus())
            );
        }

        if (request.getStatus() == AppointmentStatus.CANCELLED) {
            if (request.getCancelReason() == null || request.getCancelReason().isBlank()) {
                throw new InvalidAppointmentStatusException("Motivo de cancelación requerido");
            }
            appointment.setCancelledAt(LocalDateTime.now());
            appointment.setCancelReason(request.getCancelReason());
        }

        appointment.setStatus(request.getStatus());
        appointment = appointmentRepository.save(appointment);

        log.info("Estado de cita actualizado: ID={}", appointmentId);
        return convertToDto(appointment);
    }

    /**
     * Eliminar cita
     */
    public void deleteAppointment(Long appointmentId, Long orgId) {
        Appointment appointment = appointmentRepository.findByIdAndOrgId(appointmentId, orgId)
                .orElseThrow(() -> new AppointmentNotFoundException("Cita no encontrada"));
        appointmentRepository.delete(appointment);
        log.info("Cita eliminada: ID={}", appointmentId);
    }

    /**
     * Agenda del doctor para hoy
     */
    public List<AppointmentResponseDto> getDoctorAgendaToday(Long doctorId, Long orgId) {
        List<Appointment> appointments = appointmentRepository
                .findDoctorAppointmentsByDate(doctorId, orgId, LocalDate.now());
        return appointments.stream().map(this::convertToDto).collect(Collectors.toList());
    }

    /**
     * Citas del paciente
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
     * Validar transición de estados
     */
    private boolean isValidTransition(AppointmentStatus current, AppointmentStatus next) {
        return switch(current) {
            case PENDING -> next == AppointmentStatus.CONFIRMED || next == AppointmentStatus.CANCELLED;
            case CONFIRMED -> next == AppointmentStatus.CHECKED_IN || next == AppointmentStatus.CANCELLED || next == AppointmentStatus.NO_SHOW;
            case CHECKED_IN -> next == AppointmentStatus.COMPLETED;
            case COMPLETED -> false;
            case CANCELLED -> false;
            case NO_SHOW -> false;
        };
    }

    /**
     * Convertir entidad a DTO
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
                .type(appointment.getReason())
                .notes(appointment.getNotes())
                .location(appointment.getLocation())
                .createdAt(appointment.getCreatedAt())
                .updatedAt(appointment.getUpdatedAt())
                .cancelledAt(appointment.getCancelledAt())
                .cancelReason(appointment.getCancelReason())
                .build();
    }
}