package it.vitalegi.jarg.battle.model;

import lombok.Data;

import java.util.UUID;

@Data
public class PersonaPlacement {
    UUID personaId;
    Coordinate coordinate;
    UUID groupId;
}
