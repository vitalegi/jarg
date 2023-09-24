package it.vitalegi.jarg.battle.model;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
public class BattleMap {
    UUID battleId;
    Integer ownerId;
    LocalDateTime creationDate;
    LocalDateTime lastUpdate;
    BattleStatus status;
    BattleMapPayload battle;
}
