package com.kenko.demo.appointment.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.NotBlank;
import lombok.*;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AppointmentRequestDto {

    @NotNull(message = "Id del paciente es requerido")
    private Long patientId;

    @NotNull(message = "Id del doctor es requerido")
    private Long doctorId;

    @NotNull(message = "Fecha de cita es requerida")
    private LocalDateTime appointmentDate;

    private Integer durationMinutes;

    @NotBlank(message = "Motivo de la cita es requerido")
    private String reason;

    private String notes;
    private String location;
}