package it.vitalegi.jarg.exception;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.slf4j.MDC;

@AllArgsConstructor
@Data
public class Ex {
    String correlationId;
    String message;

    public Ex(String message) {
        this.correlationId = MDC.get("correlationId");
        this.message = message;
    }
}
