package it.vitalegi.jarg.battle.entity;

import it.vitalegi.jarg.battle.model.BattleStatus;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.JdbcTypeCode;

import java.time.LocalDateTime;
import java.util.UUID;

@Table(name = "battle")
@Entity(name = "battle")
@Getter
@Setter
public class BattleEntity {

    @Id
    @GeneratedValue
    @JdbcTypeCode(java.sql.Types.VARCHAR)
    private UUID battleId;
    private Integer ownerId;
    private LocalDateTime creationDate;
    private LocalDateTime lastUpdate;
    @Enumerated(EnumType.STRING)
    private BattleStatus status;
    private byte[] payload;
}
