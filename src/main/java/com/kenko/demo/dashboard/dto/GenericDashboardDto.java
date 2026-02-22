package com.kenko.demo.dashboard.dto;

import com.kenko.demo.appointment.dto.AppointmentResponseDto;
import lombok.*;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GenericDashboardDto {

    private Long totalPatients;
    private Long totalPendingAppointments;
    private List<AppointmentResponseDto> appointmentsToday;
    private List<AppointmentResponseDto> upcomingAppointments;
}