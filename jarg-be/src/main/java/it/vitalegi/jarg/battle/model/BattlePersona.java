package it.vitalegi.jarg.battle.model;

import it.vitalegi.jarg.persona.model.Persona;
import lombok.Data;

import java.util.UUID;

@Data
public class BattlePersona {
    Persona persona;
    Coordinate coordinate;
    UUID groupId;
}
