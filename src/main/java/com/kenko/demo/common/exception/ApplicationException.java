package com.kenko.demo.common.exception;
import org.springframework.http.HttpStatus;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ApplicationException extends RuntimeException {

    private HttpStatus statusCode;
    private String message;

    public ApplicationException(String message, HttpStatus statusCode) {
        super(message);
        this.message = message;
        this.statusCode = statusCode;
    }

    public ApplicationException(String message) {
        super(message);
        this.message = message;
        this.statusCode = HttpStatus.BAD_REQUEST;
    }
}
