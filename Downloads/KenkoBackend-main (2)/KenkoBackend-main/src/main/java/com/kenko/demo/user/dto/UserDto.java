package com.kenko.demo.user.dto;

import com.kenko.demo.user.entity.User.UserRole;
import com.kenko.demo.user.entity.User.UserStatus;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserDto {

    private Long id;
    private String email;
    private String firstName;
    private String lastName;
    private UserRole role;
    private UserStatus status;
    private String phone;
    private String specialization;
    private String licenseNumber;
    private String department;
}