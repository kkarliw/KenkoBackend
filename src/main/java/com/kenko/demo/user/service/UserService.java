package com.kenko.demo.user.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.kenko.demo.user.dto.CreateUserRequestDto;
import com.kenko.demo.user.dto.UserDto;
import com.kenko.demo.user.entity.User;
import com.kenko.demo.user.entity.User.UserRole;
import com.kenko.demo.user.entity.User.UserStatus;
import com.kenko.demo.user.repository.UserRepository;
import com.kenko.demo.common.exception.ApplicationException;
import org.springframework.http.HttpStatus;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public User findById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new ApplicationException("Usuario no encontrado", HttpStatus.NOT_FOUND));
    }

    public User findByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ApplicationException("Usuario no encontrado", HttpStatus.NOT_FOUND));
    }

    public Page<User> getUsersByOrganization(Long orgId, Pageable pageable) {
        return userRepository.findByOrgId(orgId, pageable);
    }

    public Page<User> searchUsers(Long orgId, String query, Pageable pageable) {
        return userRepository.findByOrgIdAndFirstNameContainingIgnoreCaseOrLastNameContainingIgnoreCase(
                orgId, query, query, pageable
        );
    }

    public UserDto getUserByIdDto(Long id, Long orgId) {
        User user = findById(id);

        if (!user.getOrgId().equals(orgId)) {
            throw new ApplicationException("Usuario no pertenece a esta organización", HttpStatus.FORBIDDEN);
        }

        return convertToDto(user);
    }

    public UserDto createUser(CreateUserRequestDto request, Long orgId) {
        // Validar que el email no exista
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new ApplicationException("Email ya registrado", HttpStatus.CONFLICT);
        }

        // Crear usuario
        User user = User.builder()
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .orgId(orgId)
                .role(request.getRole())
                .status(UserStatus.ACTIVE)
                .phone(request.getPhone())
                .specialization(request.getSpecialization())
                .licenseNumber(request.getLicenseNumber())
                .department(request.getDepartment())
                .build();

        user = userRepository.save(user);
        log.info("Usuario creado: ID={}, Email={}, Role={}", user.getId(), user.getEmail(), user.getRole());

        return convertToDto(user);
    }

    public UserDto updateUser(Long id, UserDto request, Long orgId) {
        User user = findById(id);

        if (!user.getOrgId().equals(orgId)) {
            throw new ApplicationException("Usuario no pertenece a esta organización", HttpStatus.FORBIDDEN);
        }

        if (request.getFirstName() != null) user.setFirstName(request.getFirstName());
        if (request.getLastName() != null) user.setLastName(request.getLastName());
        if (request.getPhone() != null) user.setPhone(request.getPhone());
        if (request.getSpecialization() != null) user.setSpecialization(request.getSpecialization());
        if (request.getLicenseNumber() != null) user.setLicenseNumber(request.getLicenseNumber());
        if (request.getDepartment() != null) user.setDepartment(request.getDepartment());

        user = userRepository.save(user);
        log.info("Usuario actualizado: ID={}", id);

        return convertToDto(user);
    }

    public void deleteUser(Long id, Long orgId) {
        User user = findById(id);

        if (!user.getOrgId().equals(orgId)) {
            throw new ApplicationException("Usuario no pertenece a esta organización", HttpStatus.FORBIDDEN);
        }

        userRepository.delete(user);
        log.info("Usuario eliminado: ID={}", id);
    }

    public UserDto convertToDto(User user) {
        return UserDto.builder()
                .id(user.getId())
                .email(user.getEmail())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .role(user.getRole())
                .status(user.getStatus())
                .phone(user.getPhone())
                .specialization(user.getSpecialization())
                .licenseNumber(user.getLicenseNumber())
                .department(user.getDepartment())
                .build();
    }
}