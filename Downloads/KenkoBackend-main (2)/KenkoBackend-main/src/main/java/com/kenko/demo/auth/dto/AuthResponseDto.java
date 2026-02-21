package com.kenko.demo.auth.dto;

import com.kenko.demo.user.entity.User.UserRole;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AuthResponseDto {

    private Long userId;
    private String email;
    private String firstName;
    private String lastName;
    private UserRole role;
    private Long orgId;
    private String accessToken;
    private String tokenType;
    private Long expiresIn;
}