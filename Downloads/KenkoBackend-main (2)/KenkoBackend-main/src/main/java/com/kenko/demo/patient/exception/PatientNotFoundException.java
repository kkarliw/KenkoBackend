package com.kenko.demo.patient.exception;

import org.springframework.http.HttpStatus;
import com.kenko.demo.common.exception.ApplicationException;

public class PatientNotFoundException extends ApplicationException {

    public PatientNotFoundException(String message) {
        super(message, HttpStatus.NOT_FOUND);
    }
}