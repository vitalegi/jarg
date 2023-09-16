package it.vitalegi.jarg.battle.model;

import lombok.Data;

import java.util.UUID;

@Data
public class PersonaGroup {
    UUID id;
    PersonaGroupType type;
    Integer ownerId;
}
