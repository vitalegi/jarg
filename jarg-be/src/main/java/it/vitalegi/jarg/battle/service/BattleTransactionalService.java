package it.vitalegi.jarg.battle.service;

import it.vitalegi.jarg.battle.model.BattleMap;
import it.vitalegi.jarg.battle.model.Coordinate;
import it.vitalegi.jarg.battleaction.model.AddPersonaRequest;
import it.vitalegi.jarg.battleaction.model.BattleAction;
import it.vitalegi.jarg.battleaction.model.DeletePersonaRequest;
import it.vitalegi.jarg.mapbuilder.service.BattleMapBuilderRandomService;
import jakarta.transaction.Transactional;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Log4j2
@Service
@Transactional
public class BattleTransactionalService {
    @Autowired
    BattleMapBuilderRandomService battleMapBuilderRandomService;

    @Autowired
    BattleService battleService;

    @Autowired
    AddPlayerActionService addPlayerActionService;

    public BattleMap createRandomMap(int userId) {
        return battleMapBuilderRandomService.createMap(userId);
    }

    public List<BattleAction> addPlayerPersona(UUID battleId, int userId, AddPersonaRequest addPersona) {
        return addPlayerActionService.addPlayerPersona(battleId, userId, addPersona);
    }

    public List<BattleAction> removePlayerPersona(UUID battleId, int userId, DeletePersonaRequest deletePersonaRequest) {
        return addPlayerActionService.removePlayerPersona(battleId, userId, deletePersonaRequest.getPersonaId());
    }

    public BattleMap getBattle(UUID battleId, int userId) {
        return battleService.getBattleCheckPermission(battleId, userId);
    }

    public List<Coordinate> getAvailableDisplacements(UUID battleId, int userId) {
        return addPlayerActionService.getAvailableDisplacements(battleId, userId);
    }
}
