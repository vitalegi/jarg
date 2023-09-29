package it.vitalegi.jarg.battle.service;

import it.vitalegi.jarg.battle.model.BattleMapPayload;
import it.vitalegi.jarg.battle.model.Coordinate;
import it.vitalegi.jarg.battle.model.PersonaPlacement;
import it.vitalegi.jarg.battle.model.Tile;
import it.vitalegi.jarg.battleaction.model.AddPersona;
import it.vitalegi.jarg.battleaction.model.AddPersonaRequest;
import it.vitalegi.jarg.battleaction.model.DeletePersona;
import it.vitalegi.jarg.persona.model.Persona;
import it.vitalegi.jarg.persona.service.PersonaService;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Log4j2
@Service
public class AddPlayerActionService {

    @Autowired
    BattleService battleService;

    @Autowired
    PersonaService personaService;

    public AddPersona addPlayerPersona(UUID battleId, int userId, AddPersonaRequest addPersona) {
        var battle = getBattlePayload(battleId, userId);
        var exists = battle.getPersona(addPersona.getPersonaId());
        if (exists != null) {
            throw new IllegalArgumentException("Persona " + addPersona.getPersonaId() + " already displaced");
        }
        var group = battle.getGroupByOwnerId(userId);
        var persona = personaService.getPersonaCheckPermissions(addPersona.getPersonaId(), userId);

        validateAddPersona(battle, userId, addPersona.getCoordinate(), persona);

        battle.getPersonae().add(persona);
        var placement = new PersonaPlacement();
        placement.setPersonaId(persona.getId());
        placement.setCoordinate(addPersona.getCoordinate());
        placement.setGroupId(group.getId());
        battle.getPlacements().add(placement);

        battleService.updateBattlePayload(battleId, battle);

        return new AddPersona(placement);
    }


    public DeletePersona deletePlayerPersona(UUID battleId, int userId, UUID personaId) {
        var battle = getBattlePayload(battleId, userId);
        var exists = battle.getPersona(personaId);
        if (exists == null) {
            throw new IllegalArgumentException("Persona " + personaId + " not displaced");
        }
        var persona = personaService.getPersonaCheckPermissions(personaId, userId);

        battle.getPersonae().removeIf(p -> persona.getId().equals(personaId));
        battle.getPlacements().removeIf(p -> p.getPersonaId().equals(personaId));
        battleService.updateBattlePayload(battleId, battle);
        log.info("Battle {} - removed persona {}", battleId, personaId);

        return new DeletePersona(personaId);
    }


    public List<Coordinate> getAvailableDisplacements(UUID battleId, int userId) {
        var battle = getBattlePayload(battleId, userId);
        if (!acceptDisplacementCount(battle, userId)) {
            return Collections.emptyList();
        }
        return battle.getTiles().stream().map(Tile::getCoordinate) //
                .filter(c -> acceptDisplacementCoordinate(battle, c)) //
                .filter(c -> battle.getPersonaeOnCoordinate(c).isEmpty()) //
                .collect(Collectors.toList());
    }

    protected BattleMapPayload getBattlePayload(UUID battleId, int userId) {
        return battleService.getBattleCheckPermission(battleId, userId).getBattle();
    }

    protected void validateAddPersona(BattleMapPayload battle, int userId, Coordinate coordinate, Persona persona) {
        if (!battle.getPersonaeOnCoordinate(coordinate).isEmpty()) {
            throw new IllegalArgumentException("Position " + coordinate + " is already occupied");
        }
        if (!acceptDisplacementCoordinate(battle, coordinate)) {
            throw new IllegalArgumentException("Coordinate " + coordinate + " is invalid for displacement");
        }

        if (!acceptDisplacementCount(battle, userId)) {
            throw new IllegalArgumentException("Max number of personae already displaced, " + battle.getPlayerDisplacementRule().getMax());
        }
    }

    protected boolean acceptDisplacementCount(BattleMapPayload battle, int userId) {
        var group = battle.getGroupByOwnerId(userId);
        var count = battle.getPlacements().stream().filter(p -> p.getGroupId().equals(group.getId())).count();
        return count < battle.getPlayerDisplacementRule().getMax();
    }

    protected boolean acceptDisplacementCoordinate(BattleMapPayload battle, Coordinate coordinate) {
        return battle.getPlayerDisplacementRule().getAllowedCoordinates().stream().anyMatch(c -> c.equals(coordinate));
    }

}
