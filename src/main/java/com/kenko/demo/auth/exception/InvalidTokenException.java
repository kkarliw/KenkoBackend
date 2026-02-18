package com.kenko.demo.auth.exception;

import org.springframework.http.HttpStatus;
import com.kenko.demo.common.exception.ApplicationException;

public class InvalidTokenException extends ApplicationException {

    public InvalidTokenException(String message) {
        super(message, HttpStatus.UNAUTHORIZED);
    }
}