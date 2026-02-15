package com.pollApp.realTimePollRooms.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(AlreadyVotedException.class)
    public ResponseEntity<Map<String, String>> handleAlreadyVoted(AlreadyVotedException ex) {
        Map<String, String> err = new HashMap<>();
        err.put("error", ex.getMessage());
        return ResponseEntity.status(HttpStatus.CONFLICT)
                .body(err);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> handleValidation(MethodArgumentNotValidException ex) {
        Map<String, String> err = new HashMap<>();
        ex.getBindingResult()
                .getFieldErrors()
                .forEach(error -> err.put(error.getField(), error.getDefaultMessage()));
        return ResponseEntity.badRequest()
                .body(err);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, String>> handleGeneral(Exception ex) {
        Map<String, String> err = new HashMap<>();
        err.put("error", "An unexpected error occurred" + ex.getMessage());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(err);
    }
}
