package it.vitalegi.jarg.battle.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PersonaPlacement {
    UUID personaId;
    Coordinate coordinate;
    UUID groupId;
}
