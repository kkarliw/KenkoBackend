package com.kenko.demo.dashboard.dto;

import com.kenko.demo.appointment.dto.AppointmentResponseDto;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DoctorDashboardDto {

    private Long citasHoy;
    private Long citasSemana;
    private Long pacientesActivos;
    private AppointmentResponseDto proximaCita;
}