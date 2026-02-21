package com.kenko.demo.auth.service;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import com.kenko.demo.config.JwtConfig;
import com.kenko.demo.user.entity.User;

import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
@Slf4j
public class JwtTokenProvider {

    private final JwtConfig jwtConfig;

    public JwtTokenProvider(JwtConfig jwtConfig) {
        this.jwtConfig = jwtConfig;
    }

    /**
     * Genera un token JWT con información del usuario
     */
    public String generateAccessToken(User user) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("role", user.getRole().toString());
        claims.put("orgId", user.getOrgId());
        claims.put("email", user.getEmail());
        claims.put("firstName", user.getFirstName());
        claims.put("lastName", user.getLastName());

        return createToken(claims, user.getId().toString(), jwtConfig.getExpiration().getAccess());
    }

    /**
     * Crea el token JWT
     */
    private String createToken(Map<String, Object> claims, String subject, long expirationTime) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + expirationTime);

        return Jwts.builder()
                .setClaims(claims)
                .setSubject(subject)
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .setIssuer(jwtConfig.getIssuer())
                .signWith(
                        Keys.hmacShaKeyFor(jwtConfig.getSecret().getBytes(StandardCharsets.UTF_8)),
                        SignatureAlgorithm.HS512
                )
                .compact();
    }
    /**
     * Extrae el userId del token
     */
    public Long getUserIdFromToken(String token) {
        try {
            Claims claims = getClaimsFromToken(token);
            return Long.parseLong(claims.getSubject());
        } catch (Exception e) {
            log.error("Error extrayendo userId del token: {}", e.getMessage());
            return null;
        }
    }

    /**
     * Extrae el orgId del token
     */
    public Long getOrgIdFromToken(String token) {
        try {
            Claims claims = getClaimsFromToken(token);
            return ((Number) claims.get("orgId")).longValue();
        } catch (Exception e) {
            log.error("Error extrayendo orgId del token: {}", e.getMessage());
            return null;
        }
    }

    /**
     * Extrae el role del token
     */
    public String getRoleFromToken(String token) {
        try {
            Claims claims = getClaimsFromToken(token);
            return (String) claims.get("role");
        } catch (Exception e) {
            log.error("Error extrayendo role del token: {}", e.getMessage());
            return null;
        }
    }

    /**
     * Valida que el token sea válido
     */
    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder()
                    .setSigningKey(Keys.hmacShaKeyFor(jwtConfig.getSecret().getBytes(StandardCharsets.UTF_8)))
                    .build()
                    .parseClaimsJws(token);
            return true;
        } catch (SecurityException | MalformedJwtException e) {
            log.error("JWT inválido: {}", e.getMessage());
        } catch (ExpiredJwtException e) {
            log.error("Token expirado: {}", e.getMessage());
        } catch (UnsupportedJwtException e) {
            log.error("JWT no soportado: {}", e.getMessage());
        } catch (IllegalArgumentException e) {
            log.error("JWT claims está vacío: {}", e.getMessage());
        }
        return false;
    }

    /**
     * Extrae los claims del token
     */
    private Claims getClaimsFromToken(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(Keys.hmacShaKeyFor(jwtConfig.getSecret().getBytes(StandardCharsets.UTF_8)))
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
}