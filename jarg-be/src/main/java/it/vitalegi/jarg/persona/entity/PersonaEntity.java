package it.vitalegi.jarg.persona.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.JdbcTypeCode;

import java.util.UUID;

@Table(name = "persona")
@Entity(name = "persona")
@Getter
@Setter
public class PersonaEntity {

    @Id
    @GeneratedValue
    @JdbcTypeCode(java.sql.Types.VARCHAR)
    private UUID personaId;

    private Integer ownerId;

    private byte[] payload;

}
