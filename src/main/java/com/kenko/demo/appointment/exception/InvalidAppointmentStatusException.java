package com.kenko.demo.appointment.exception;

import org.springframework.http.HttpStatus;
import com.kenko.demo.common.exception.ApplicationException;

public class InvalidAppointmentStatusException extends ApplicationException {

    public InvalidAppointmentStatusException(String message) {
        super(message, HttpStatus.BAD_REQUEST);
    }
}