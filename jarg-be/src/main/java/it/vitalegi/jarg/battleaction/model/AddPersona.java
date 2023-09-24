package it.vitalegi.jarg.battleaction.model;

import it.vitalegi.jarg.battle.model.PersonaPlacement;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
public class AddPersona extends BattleAction {
    PersonaPlacement personaPlacement;
}
