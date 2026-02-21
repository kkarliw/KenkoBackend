package com.kenko.demo.dashboard.controller;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.kenko.demo.dashboard.dto.AdminDashboardDto;
import com.kenko.demo.dashboard.dto.DoctorDashboardDto;
import com.kenko.demo.dashboard.dto.ReceptionistDashboardDto;
import com.kenko.demo.dashboard.dto.GenericDashboardDto;
import com.kenko.demo.dashboard.service.DashboardService;
import com.kenko.demo.common.dto.ApiResponse;

@RestController
@RequestMapping("/dashboard")
@RequiredArgsConstructor
public class DashboardController {

        private final DashboardService dashboardService;

        /**
         * Dashboard genérico - Compatible con frontend (cualquier rol)
         */
        @GetMapping("/{userId}")
        public ResponseEntity<ApiResponse<GenericDashboardDto>> getGenericDashboard(
                        @PathVariable Long userId,
                        HttpServletRequest httpRequest) {
                Long orgId = (Long) httpRequest.getAttribute("orgId");

                GenericDashboardDto response = dashboardService.getGenericDashboard(userId, orgId);

                return ResponseEntity.ok(
                                ApiResponse.ok(response, "Dashboard obtenido"));
        }

        /**
         * Dashboard para ADMIN
         */
        @GetMapping("/admin")
        public ResponseEntity<ApiResponse<AdminDashboardDto>> getAdminDashboard(
                        HttpServletRequest httpRequest) {
                Long orgId = (Long) httpRequest.getAttribute("orgId");

                AdminDashboardDto response = dashboardService.getAdminDashboard(orgId);

                return ResponseEntity.ok(
                                ApiResponse.ok(response, "Dashboard admin obtenido"));
        }

        /**
         * Dashboard para DOCTOR
         */
        @GetMapping("/doctor")
        public ResponseEntity<ApiResponse<DoctorDashboardDto>> getDoctorDashboard(
                        HttpServletRequest httpRequest) {
                Long doctorId = (Long) httpRequest.getAttribute("userId");
                Long orgId = (Long) httpRequest.getAttribute("orgId");

                DoctorDashboardDto response = dashboardService.getDoctorDashboard(doctorId, orgId);

                return ResponseEntity.ok(
                                ApiResponse.ok(response, "Dashboard doctor obtenido"));
        }

        /**
         * Dashboard para RECEPCIONISTA
         */
        @GetMapping("/receptionist")
        public ResponseEntity<ApiResponse<ReceptionistDashboardDto>> getReceptionistDashboard(
                        HttpServletRequest httpRequest) {
                Long orgId = (Long) httpRequest.getAttribute("orgId");

                ReceptionistDashboardDto response = dashboardService.getReceptionistDashboard(orgId);

                return ResponseEntity.ok(
                                ApiResponse.ok(response, "Dashboard recepcionista obtenido"));
        }
}