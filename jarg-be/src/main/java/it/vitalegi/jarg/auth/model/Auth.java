package it.vitalegi.jarg.auth.model;

import lombok.Data;

import java.time.Instant;

@Data
public class Auth {

    Integer accountId;
    String subject;
    Instant expiresAt;
}
