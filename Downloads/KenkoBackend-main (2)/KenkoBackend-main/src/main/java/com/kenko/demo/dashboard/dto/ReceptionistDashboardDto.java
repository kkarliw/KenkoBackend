package com.kenko.demo.dashboard.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReceptionistDashboardDto {

    private Long citasHoy;
    private Long citasPendientes;
    private Long citasConfirmadas;
    private Long pacientesRegistradosHoy;
}