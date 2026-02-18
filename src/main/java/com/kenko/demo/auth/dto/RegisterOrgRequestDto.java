package com.kenko.demo.auth.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RegisterOrgRequestDto {

    @NotBlank(message = "Nombre de organización es requerido")
    @Size(min = 3, max = 100, message = "Nombre debe estar entre 3 y 100 caracteres")
    private String orgName;

    @NotBlank(message = "Email es requerido")
    @Email(message = "Email debe ser válido")
    private String email;

    @NotBlank(message = "Contraseña es requerida")
    @Size(min = 8, message = "Contraseña debe tener al menos 8 caracteres")
    private String password;

    @NotBlank(message = "Nombre del admin es requerido")
    private String adminFirstName;

    @NotBlank(message = "Apellido del admin es requerido")
    private String adminLastName;

    private String phone;
    private String address;
    private String city;
    private String country;
}
