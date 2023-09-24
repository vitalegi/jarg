package it.vitalegi.jarg.battleaction.model;

import it.vitalegi.jarg.battle.model.PersonaPlacement;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AddPersona extends BattleAction {
    PersonaPlacement personaPlacement;
}
