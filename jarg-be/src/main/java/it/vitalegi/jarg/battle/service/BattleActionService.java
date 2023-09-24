package it.vitalegi.jarg.battle.service;

import it.vitalegi.jarg.battle.model.BattleMapPayload;
import it.vitalegi.jarg.battle.model.PersonaPlacement;
import it.vitalegi.jarg.battleaction.model.AddPersona;
import it.vitalegi.jarg.battleaction.model.AddPersonaRequest;
import it.vitalegi.jarg.battleaction.model.BattleAction;
import it.vitalegi.jarg.persona.service.PersonaService;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.UUID;

@Log4j2
@Service
public class BattleActionService {

    @Autowired
    BattleService battleService;

    @Autowired
    PersonaService personaService;

    public List<BattleAction> addPlayerPersona(UUID battleId, int userId, AddPersonaRequest addPersona) {
        var battle = getBattlePayload(battleId, userId);
        var exists = battle.getPersona(addPersona.getPersonaId());
        if (exists != null) {
            throw new IllegalArgumentException("Persona " + addPersona.getPersonaId() + " already placed");
        }
        if (!battle.getPersonaeOnCoordinate(addPersona.getCoordinate()).isEmpty()) {
            throw new IllegalArgumentException("Position " + addPersona.getCoordinate() + " is already occupied");
        }
        var group = battle.getGroupByOwnerId(userId);
        var persona = personaService.getPersonaCheckPermissions(addPersona.getPersonaId(), userId);

        battle.getPersonae().add(persona);
        var placement = new PersonaPlacement();
        placement.setPersonaId(persona.getId());
        placement.setCoordinate(addPersona.getCoordinate());
        placement.setGroupId(group.getId());
        battle.getPlacements().add(placement);

        battleService.updateBattlePayload(battleId, battle);

        return Arrays.asList(new AddPersona(placement));
    }

    protected BattleMapPayload getBattlePayload(UUID battleId, int userId) {
        return battleService.getBattleCheckPermission(battleId, userId).getBattle();
    }
}
