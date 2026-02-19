package com.kenko.demo.auth.filter;

import com.kenko.demo.auth.service.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import java.io.IOException;
import java.util.ArrayList;

@Component
@RequiredArgsConstructor
@Slf4j
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtTokenProvider jwtTokenProvider;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

        // ✅ PERMITIR RUTAS PÚBLICAS CON /api/v1 PREFIX
        String uri = request.getRequestURI();
        log.debug("Verificando URI: {}", uri);

        if (isPublicUrl(uri)) {
            log.debug("URI es pública, saltando autenticación JWT");
            filterChain.doFilter(request, response);
            return;
        }

        try {
            String token = getTokenFromRequest(request);

            if (token != null && jwtTokenProvider.validateToken(token)) {
                Long userId = jwtTokenProvider.getUserIdFromToken(token);
                String role = jwtTokenProvider.getRoleFromToken(token);
                Long orgId = jwtTokenProvider.getOrgIdFromToken(token);

                UsernamePasswordAuthenticationToken auth =
                        new UsernamePasswordAuthenticationToken(
                                userId,
                                null,
                                new ArrayList<>()
                        );

                SecurityContextHolder.getContext().setAuthentication(auth);
                request.setAttribute("orgId", orgId);
                request.setAttribute("userId", userId);
                request.setAttribute("role", role);

                log.debug("✅ Usuario autenticado: {} con orgId: {}", userId, orgId);
            } else {
                log.warn("⚠️ Token no válido o ausente para URI: {}", uri);
            }
        } catch (Exception e) {
            log.error("❌ Error al procesar JWT: {}", e.getMessage());
            SecurityContextHolder.clearContext();
        }

        filterChain.doFilter(request, response);
    }

    private boolean isPublicUrl(String uri) {
        // ✅ CORRECTO - Incluir /api/v1 en comparaciones
        boolean isPublic = uri.equals("/api/v1/auth/login") ||
                uri.equals("/api/v1/auth/register-organization") ||
                uri.equals("/api/v1/health") ||
                uri.startsWith("/api/v1/auth/login") ||
                uri.startsWith("/api/v1/auth/register-organization") ||
                uri.startsWith("/api/v1/health");

        if (isPublic) {
            log.debug("✅ URI pública identificada: {}", uri);
        }
        return isPublic;
    }

    private String getTokenFromRequest(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }
}