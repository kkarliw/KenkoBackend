package com.kenko.demo.dashboard.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.kenko.demo.dashboard.dto.AdminDashboardDto;
import com.kenko.demo.dashboard.dto.DoctorDashboardDto;
import com.kenko.demo.dashboard.dto.ReceptionistDashboardDto;
import com.kenko.demo.dashboard.dto.GenericDashboardDto;
import com.kenko.demo.appointment.dto.AppointmentResponseDto;
import com.kenko.demo.appointment.entity.Appointment;
import com.kenko.demo.appointment.entity.Appointment.AppointmentStatus;
import com.kenko.demo.appointment.repository.AppointmentRepository;
import com.kenko.demo.appointment.service.AppointmentService;
import com.kenko.demo.patient.repository.PatientRepository;
import com.kenko.demo.user.repository.UserRepository;
import com.kenko.demo.user.entity.User.UserRole;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class DashboardService {

    private final AppointmentRepository appointmentRepository;
    private final PatientRepository patientRepository;
    private final UserRepository userRepository;
    private final AppointmentService appointmentService;

    /**
     * Dashboard genérico - compatible con frontend
     */
    public GenericDashboardDto getGenericDashboard(Long userId, Long orgId) {
        LocalDate today = LocalDate.now();
        LocalDateTime startOfDay = today.atStartOfDay();
        LocalDateTime endOfDay = today.plusDays(1).atStartOfDay();

        // Total de pacientes
        long totalPatients = patientRepository.findByOrgId(orgId, null).getTotalElements();

        // Citas pendientes
        long totalPendingAppointments = appointmentRepository
                .findByOrgIdAndStatus(orgId, AppointmentStatus.PENDING, null)
                .getTotalElements();

        // Citas de hoy
        List<Appointment> todayAppointments = appointmentRepository
                .findAppointmentsByDateRange(orgId, startOfDay, endOfDay);

        List<AppointmentResponseDto> appointmentsTodayDto = todayAppointments.stream()
                .map(appointmentService::convertToDto)
                .collect(Collectors.toList());

        // Próximas 5 citas
        List<Appointment> allAppointments = appointmentRepository
                .findAppointmentsByDateRange(orgId, LocalDateTime.now(), LocalDateTime.now().plusDays(30));

        List<AppointmentResponseDto> upcomingAppointmentsDto = allAppointments.stream()
                .filter(a -> a.getAppointmentDate().isAfter(LocalDateTime.now()))
                .sorted((a, b) -> a.getAppointmentDate().compareTo(b.getAppointmentDate()))
                .limit(5)
                .map(appointmentService::convertToDto)
                .collect(Collectors.toList());

        return GenericDashboardDto.builder()
                .totalPatients(totalPatients)
                .totalPendingAppointments(totalPendingAppointments)
                .appointmentsToday(appointmentsTodayDto)
                .upcomingAppointments(upcomingAppointmentsDto)
                .build();
    }

    /**
     * Dashboard para ADMIN
     */
    public AdminDashboardDto getAdminDashboard(Long orgId) {
        LocalDate today = LocalDate.now();
        LocalDateTime startOfDay = today.atStartOfDay();
        LocalDateTime endOfDay = today.plusDays(1).atStartOfDay();

        // Total de pacientes
        long totalPacientes = patientRepository.findByOrgId(orgId, null).getTotalElements();

        // Total de profesionales (DOCTORS)
        long totalProfesionales = userRepository.findByOrgIdAndRole(orgId, UserRole.DOCTOR).size();

        // Citas de hoy
        List<Appointment> todayAppointments = appointmentRepository
                .findAppointmentsByDateRange(orgId, startOfDay, endOfDay);

        // Agrupar citas por estado
        Map<String, Long> citasPorEstado = todayAppointments.stream()
                .collect(Collectors.groupingBy(
                        a -> a.getStatus().toString().toLowerCase(),
                        Collectors.counting()
                ));

        // Total de citas confirmadas
        long totalCitas = appointmentRepository
                .findByOrgIdAndStatus(orgId, AppointmentStatus.CONFIRMED, null)
                .getTotalElements();

        long citasHoy = todayAppointments.size();
        double tasaAusentismo = calculateNoShowRate(orgId);

        return AdminDashboardDto.builder()
                .totalPacientes(totalPacientes)
                .totalProfesionales(totalProfesionales)
                .totalCitas(totalCitas)
                .citasHoy(citasHoy)
                .ingresosMes(0L) // TODO: Implementar cuando exista módulo de finanzas
                .tasaAusentismo(tasaAusentismo)
                .citasPorEstado(citasPorEstado)
                .build();
    }

    /**
     * Dashboard para DOCTOR
     */
    public DoctorDashboardDto getDoctorDashboard(Long doctorId, Long orgId) {
        LocalDate today = LocalDate.now();
        LocalDate weekLater = today.plusDays(7);

        // Citas de hoy
        List<Appointment> todayAppointments = appointmentRepository
                .findDoctorAppointmentsByDate(doctorId, orgId, today);

        long citasHoy = todayAppointments.size();

        // Citas de la semana
        List<Appointment> weekAppointments = appointmentRepository
                .findAppointmentsByDateRange(orgId, today.atStartOfDay(), weekLater.atStartOfDay());

        long citasSemana = weekAppointments.stream()
                .filter(a -> a.getDoctorId().equals(doctorId))
                .count();

        // Total de pacientes activos
        long pacientesActivos = patientRepository.findByOrgId(orgId, null).getTotalElements();

        // Próxima cita
        AppointmentResponseDto proximaCita = todayAppointments.stream()
                .min((a, b) -> a.getAppointmentDate().compareTo(b.getAppointmentDate()))
                .map(appointmentService::convertToDto)
                .orElse(null);

        return DoctorDashboardDto.builder()
                .citasHoy(citasHoy)
                .citasSemana(citasSemana)
                .pacientesActivos(pacientesActivos)
                .proximaCita(proximaCita)
                .build();
    }

    /**
     * Dashboard para RECEPTIONIST
     */
    public ReceptionistDashboardDto getReceptionistDashboard(Long orgId) {
        LocalDate today = LocalDate.now();
        LocalDateTime startOfDay = today.atStartOfDay();
        LocalDateTime endOfDay = today.plusDays(1).atStartOfDay();

        // Citas de hoy
        List<Appointment> todayAppointments = appointmentRepository
                .findAppointmentsByDateRange(orgId, startOfDay, endOfDay);

        long citasHoy = todayAppointments.size();

        // Citas pendientes
        long citasPendientes = todayAppointments.stream()
                .filter(a -> a.getStatus() == AppointmentStatus.PENDING)
                .count();

        // Citas confirmadas
        long citasConfirmadas = todayAppointments.stream()
                .filter(a -> a.getStatus() == AppointmentStatus.CONFIRMED)
                .count();

        return ReceptionistDashboardDto.builder()
                .citasHoy(citasHoy)
                .citasPendientes(citasPendientes)
                .citasConfirmadas(citasConfirmadas)
                .pacientesRegistradosHoy(0L) // TODO: Implementar cuando exista endpoint de creación
                .build();
    }

    /**
     * Calcular tasa de ausencia (NO_SHOW / total confirmadas)
     */
    private double calculateNoShowRate(Long orgId) {
        try {
            long totalConfirmed = appointmentRepository
                    .findByOrgIdAndStatus(orgId, AppointmentStatus.CONFIRMED, null)
                    .getTotalElements();

            long noShowCount = appointmentRepository
                    .findByOrgIdAndStatus(orgId, AppointmentStatus.NO_SHOW, null)
                    .getTotalElements();

            return totalConfirmed > 0 ? (double) noShowCount / totalConfirmed : 0;
        } catch (Exception e) {
            return 0;
        }
    }
}