package com.kenko.demo.appointment.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.NotBlank;
import lombok.*;
import java.time.LocalDate;
import java.time.LocalTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AppointmentRequestDto {

    @NotNull(message = "Id del paciente es requerido")
    private Long patientId;

    @NotNull(message = "Id del doctor es requerido")
    private Long doctorId;

    @NotNull(message = "Fecha de cita es requerida")
    private LocalDate appointmentDate;

    @NotNull(message = "Hora de cita es requerida")
    private LocalTime appointmentTime;

    private Integer durationMinutes = 30;

    @NotBlank(message = "Tipo de cita es requerido")
    private String type;

    private String notes;
}