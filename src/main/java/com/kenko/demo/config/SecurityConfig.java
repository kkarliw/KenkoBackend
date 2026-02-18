package com.kenko.demo.config;

import com.kenko.demo.auth.filter.JwtAuthenticationFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    private final SecurityHeadersFilter securityHeadersFilter;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http
                .csrf(csrf -> csrf.disable())
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .sessionManagement(session ->
                        session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )
                .authorizeHttpRequests(auth -> auth

                        // =====================
                        // PÚBLICOS - VAN PRIMERO
                        // =====================
                        .requestMatchers(HttpMethod.POST, "/api/v1/auth/login").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/v1/auth/register-organization").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/v1/health").permitAll()

                        // =====================
                        // AUTH
                        // =====================
                        .requestMatchers(HttpMethod.GET, "/api/v1/auth/me")
                        .hasAnyRole("ADMIN", "DOCTOR", "RECEPTIONIST", "PATIENT", "CAREGIVER")

                        // =====================
                        // ORGANIZATION
                        // =====================
                        .requestMatchers(HttpMethod.GET, "/api/v1/organization/me").authenticated()
                        .requestMatchers(HttpMethod.PUT, "/api/v1/organization/me").hasRole("ADMIN")

                        // =====================
                        // USERS
                        // =====================
                        .requestMatchers(HttpMethod.GET, "/api/v1/users").authenticated()
                        .requestMatchers(HttpMethod.POST, "/api/v1/users").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.GET, "/api/v1/users/**").authenticated()
                        .requestMatchers(HttpMethod.PUT, "/api/v1/users/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/api/v1/users/**").hasRole("ADMIN")

                        // =====================
                        // PATIENTS
                        // =====================
                        .requestMatchers(HttpMethod.GET, "/api/v1/patients/**")
                        .hasAnyRole("ADMIN", "DOCTOR", "RECEPTIONIST", "PATIENT", "CAREGIVER")
                        .requestMatchers(HttpMethod.POST, "/api/v1/patients")
                        .hasAnyRole("ADMIN", "RECEPTIONIST")
                        .requestMatchers(HttpMethod.PUT, "/api/v1/patients/**")
                        .hasAnyRole("ADMIN", "RECEPTIONIST")
                        .requestMatchers(HttpMethod.DELETE, "/api/v1/patients/**")
                        .hasRole("ADMIN")

                        // =====================
                        // APPOINTMENTS
                        // =====================
                        .requestMatchers(HttpMethod.GET, "/api/v1/appointments")
                        .hasAnyRole("ADMIN", "DOCTOR", "RECEPTIONIST", "PATIENT", "CAREGIVER")
                        .requestMatchers(HttpMethod.GET, "/api/v1/appointments/**")
                        .hasAnyRole("ADMIN", "DOCTOR", "RECEPTIONIST", "PATIENT", "CAREGIVER")
                        .requestMatchers(HttpMethod.POST, "/api/v1/appointments")
                        .hasAnyRole("RECEPTIONIST", "DOCTOR", "ADMIN", "CAREGIVER")
                        .requestMatchers(HttpMethod.PATCH, "/api/v1/appointments/**")
                        .hasAnyRole("RECEPTIONIST", "DOCTOR", "ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/api/v1/appointments/**")
                        .hasRole("ADMIN")

                        // =====================
                        // TASKS
                        // =====================
                        .requestMatchers(HttpMethod.GET, "/api/v1/tasks").authenticated()
                        .requestMatchers(HttpMethod.POST, "/api/v1/tasks")
                        .hasAnyRole("ADMIN", "DOCTOR")
                        .requestMatchers(HttpMethod.PATCH, "/api/v1/tasks/**").authenticated()
                        .requestMatchers(HttpMethod.DELETE, "/api/v1/tasks/**").hasRole("ADMIN")

                        // =====================
                        // NOTIFICATIONS
                        // =====================
                        .requestMatchers(HttpMethod.GET, "/api/v1/notifications/**").authenticated()
                        .requestMatchers(HttpMethod.POST, "/api/v1/notifications").authenticated()
                        .requestMatchers(HttpMethod.PUT, "/api/v1/notifications/**").authenticated()
                        .requestMatchers(HttpMethod.DELETE, "/api/v1/notifications/**").authenticated()

                        // =====================
                        // DASHBOARD
                        // =====================
                        .requestMatchers(HttpMethod.GET, "/api/v1/dashboard/**").authenticated()

                        // =====================
                        // ADMIN
                        // =====================
                        .requestMatchers("/api/v1/admin/**").hasRole("ADMIN")

                        // =====================
                        // TODO LO DEMÁS REQUIERE AUTH
                        // =====================
                        .anyRequest().authenticated()
                )
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
                .addFilterBefore(securityHeadersFilter, JwtAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config)
            throws Exception {
        return config.getAuthenticationManager();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList(
                "http://localhost:3000",
                "http://localhost:3001",
                "http://localhost:8080",
                "http://localhost:8081",
                "http://localhost:8082",      // ✅ IMPORTANTE - Frontend aquí
                "http://localhost:5173",
                "http://127.0.0.1:3000",
                "http://127.0.0.1:3001",
                "http://127.0.0.1:8080",
                "http://127.0.0.1:8081",
                "http://127.0.0.1:8082"       // ✅ AGREGAR ESTO
        ));
        configuration.setAllowedMethods(Arrays.asList(
                "GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"
        ));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setAllowCredentials(true);
        configuration.setMaxAge(3600L);

        UrlBasedCorsConfigurationSource source =
                new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);

        return source;
    }
}