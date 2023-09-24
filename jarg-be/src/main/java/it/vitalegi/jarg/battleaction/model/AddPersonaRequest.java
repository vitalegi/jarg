package it.vitalegi.jarg.battleaction.model;

import it.vitalegi.jarg.battle.model.Coordinate;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AddPersonaRequest {
    UUID personaId;
    Coordinate coordinate;
}
