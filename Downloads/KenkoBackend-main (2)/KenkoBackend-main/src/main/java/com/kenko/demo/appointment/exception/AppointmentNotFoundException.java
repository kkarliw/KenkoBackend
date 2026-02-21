package com.kenko.demo.appointment.exception;

import org.springframework.http.HttpStatus;
import com.kenko.demo.common.exception.ApplicationException;

public class AppointmentNotFoundException extends ApplicationException {

    public AppointmentNotFoundException(String message) {
        super(message, HttpStatus.NOT_FOUND);
    }
}