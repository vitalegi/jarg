package it.vitalegi.jarg.battleaction.model;

import it.vitalegi.jarg.battle.model.PersonaPlacement;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
public class DeletePersona extends BattleAction {
    UUID personaId;
}
