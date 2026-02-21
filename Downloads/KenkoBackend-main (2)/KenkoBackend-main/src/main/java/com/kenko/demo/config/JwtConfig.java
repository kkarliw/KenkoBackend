package com.kenko.demo.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Component
@ConfigurationProperties(prefix = "jwt")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class JwtConfig {

    private String secret;
    private Expiration expiration;
    private String issuer;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Expiration {
        private long access;
        private long refresh;
    }
}