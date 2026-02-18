package com.kenko.demo.appointment.dto;

import com.kenko.demo.appointment.entity.Appointment.AppointmentStatus;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UpdateAppointmentStatusDto {

    @NotNull(message = "Estado de cita es requerido")
    private AppointmentStatus status;

    private String cancelReason; // Si el status es CANCELLED
}