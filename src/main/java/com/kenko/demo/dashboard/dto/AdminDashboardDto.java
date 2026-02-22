package com.kenko.demo.dashboard.dto;

import lombok.*;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AdminDashboardDto {

    private Long totalPacientes;
    private Long totalProfesionales;
    private Long totalCitas;
    private Long citasHoy;
    private Long ingresosMes;
    private Double tasaAusentismo;
    private Map<String, Long> citasPorEstado;
}