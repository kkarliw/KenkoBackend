package com.kenko.demo.appointment.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.kenko.demo.appointment.entity.Appointment;
import com.kenko.demo.appointment.entity.Appointment.AppointmentStatus;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {

    Optional<Appointment> findByIdAndOrgId(Long id, Long orgId);

    /**
     * Obtener citas de una organización por estado
     */
    Page<Appointment> findByOrgIdAndStatus(Long orgId, AppointmentStatus status, Pageable pageable);

    /**
     * Buscar citas por doctor y fecha
     */
    @Query("SELECT a FROM Appointment a WHERE a.doctorId = :doctorId " +
            "AND a.orgId = :orgId " +
            "AND CAST(a.appointmentDate AS DATE) = :date " +
            "ORDER BY a.appointmentDate ASC")
    List<Appointment> findDoctorAppointmentsByDate(
            @Param("doctorId") Long doctorId,
            @Param("orgId") Long orgId,
            @Param("date") LocalDate date
    );

    /**
     * Buscar citas por rango de fechas
     */
    @Query("SELECT a FROM Appointment a WHERE a.orgId = :orgId " +
            "AND a.appointmentDate >= :startDate " +
            "AND a.appointmentDate < :endDate " +
            "ORDER BY a.appointmentDate ASC")
    List<Appointment> findAppointmentsByDateRange(
            @Param("orgId") Long orgId,
            @Param("startDate") LocalDateTime startDate,
            @Param("endDate") LocalDateTime endDate
    );

    /**
     * Buscar citas del paciente
     */
    @Query("SELECT a FROM Appointment a WHERE a.patientId = :patientId " +
            "AND a.orgId = :orgId " +
            "ORDER BY a.appointmentDate DESC")
    Page<Appointment> findPatientAppointments(
            @Param("patientId") Long patientId,
            @Param("orgId") Long orgId,
            Pageable pageable
    );

    /**
     * Buscar citas en rango de tiempo (para validar conflictos)
     */
    @Query("SELECT a FROM Appointment a WHERE " +
            "a.doctorId = :doctorId AND " +
            "a.orgId = :orgId AND " +
            "a.status NOT IN (AppointmentStatus.CANCELLED, AppointmentStatus.NO_SHOW) AND " +
            "a.appointmentDate BETWEEN :start AND :end")
    List<Appointment> findAppointmentsInTimeRange(
            @Param("doctorId") Long doctorId,
            @Param("orgId") Long orgId,
            @Param("start") LocalDateTime start,
            @Param("end") LocalDateTime end
    );
}