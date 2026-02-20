package com.kenko.demo.auth.exception;

import org.springframework.http.HttpStatus;
import com.kenko.demo.common.exception.ApplicationException;

public class AuthenticationException extends ApplicationException {

    public AuthenticationException(String message) {
        super(message, HttpStatus.UNAUTHORIZED);
    }
}