package it.vitalegi.jarg.exception;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.extern.log4j.Log4j2;
import org.slf4j.MDC;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Log4j2
@RestControllerAdvice
public class GlobalControllerExceptionHandler {
    @ExceptionHandler(Throwable.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ResponseEntity<Ex> handleConversion(RuntimeException ex) {
        logEx(ex);
        return new ResponseEntity<>(new Ex(ex.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    protected void logEx(Throwable e) {
        log.error(e.getClass().getSimpleName(), e);
    }

    @AllArgsConstructor
    @Data
    private static class Ex {
        String correlationId;
        String message;

        public Ex(String message) {
            this.correlationId = MDC.get("correlationId");
            this.message = message;
        }
    }
}
