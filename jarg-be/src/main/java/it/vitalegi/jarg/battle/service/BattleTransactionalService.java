package it.vitalegi.jarg.battle.service;

import it.vitalegi.jarg.battle.model.BattleMap;
import it.vitalegi.jarg.battleaction.model.AddPersonaRequest;
import it.vitalegi.jarg.battleaction.model.BattleAction;
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
    BattleMapBuilderService battleMapBuilderService;

    @Autowired
    BattleService battleService;

    @Autowired
    BattleActionService battleActionService;

    public BattleMap createRandomMap(int userId) {
        return battleMapBuilderService.createRandomMap(userId);
    }

    public List<BattleAction> addPlayerPersona(UUID battleId, int userId, AddPersonaRequest addPersona) {
        return battleActionService.addPlayerPersona(battleId, userId, addPersona);
    }

    public BattleMap getBattle(UUID battleId, int userId) {
        return battleService.getBattleCheckPermission(battleId, userId);
    }
}
