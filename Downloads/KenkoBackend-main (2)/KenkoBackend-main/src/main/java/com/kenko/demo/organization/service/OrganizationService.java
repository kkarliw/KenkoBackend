package com.kenko.demo.organization.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.kenko.demo.organization.dto.OrganizationResponseDto;
import com.kenko.demo.organization.entity.Organization;
import com.kenko.demo.organization.repository.OrganizationRepository;
import com.kenko.demo.common.exception.ApplicationException;
import org.springframework.http.HttpStatus;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class OrganizationService {

    private final OrganizationRepository organizationRepository;
    private static final DateTimeFormatter DATE_FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss");

    public Organization findById(Long id) {
        return organizationRepository.findById(id)
                .orElseThrow(() -> new ApplicationException("Organización no encontrada", HttpStatus.NOT_FOUND));
    }

    public Organization findByOrgId(String orgId) {
        return organizationRepository.findByOrgId(orgId)
                .orElseThrow(() -> new ApplicationException("Organización no encontrada", HttpStatus.NOT_FOUND));
    }

    public OrganizationResponseDto getOrganizationDto(Long orgId) {
        Organization org = findById(orgId);
        return convertToDto(org);
    }

    public OrganizationResponseDto updateOrganization(Long orgId, OrganizationResponseDto request) {
        Organization org = findById(orgId);

        if (request.getName() != null) org.setName(request.getName());
        if (request.getEmail() != null) org.setEmail(request.getEmail());
        if (request.getPhone() != null) org.setPhone(request.getPhone());
        if (request.getAddress() != null) org.setAddress(request.getAddress());
        if (request.getCity() != null) org.setCity(request.getCity());
        if (request.getCountry() != null) org.setCountry(request.getCountry());

        org = organizationRepository.save(org);
        log.info("Organización actualizada: ID={}", orgId);

        return convertToDto(org);
    }

    private OrganizationResponseDto convertToDto(Organization org) {
        return OrganizationResponseDto.builder()
                .id(org.getId())
                .orgId(org.getOrgId())
                .name(org.getName())
                .email(org.getEmail())
                .phone(org.getPhone())
                .address(org.getAddress())
                .city(org.getCity())
                .country(org.getCountry())
                .status(org.getStatus().toString())
                .createdAt(org.getCreatedAt() != null ? org.getCreatedAt().format(DATE_FORMATTER) : null)
                .build();
    }
}