package it.vitalegi.jarg.auth.model;

import lombok.Data;

import java.time.Instant;

@Data
public class Auth {
    String subject;

    Instant expiresAt;
}
