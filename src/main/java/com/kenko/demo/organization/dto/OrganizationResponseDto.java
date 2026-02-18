package com.kenko.demo.organization.dto;


import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrganizationResponseDto {

    private Long id;
    private String orgId;
    private String name;
    private String email;
    private String phone;
    private String address;
    private String city;
    private String country;
    private String status;
    private String createdAt;
}