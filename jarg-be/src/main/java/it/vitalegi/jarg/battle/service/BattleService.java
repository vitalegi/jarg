package it.vitalegi.jarg.battle.service;

import it.vitalegi.jarg.battle.entity.BattleEntity;
import it.vitalegi.jarg.battle.map.BattleMapper;
import it.vitalegi.jarg.battle.model.BattleMap;
import it.vitalegi.jarg.battle.model.BattleMapPayload;
import it.vitalegi.jarg.battle.model.BattleStatus;
import it.vitalegi.jarg.battle.repository.BattleMapRepository;
import it.vitalegi.jarg.util.SerializrUtil;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Log4j2
@Service
public class BattleService {

    @Autowired
    BattleMapRepository battleMapRepository;

    public BattleEntity createBattle(BattleMapPayload map, int ownerId) {
        var entity = new BattleEntity();
        entity.setPayload(SerializrUtil.toByte(map));
        entity.setOwnerId(ownerId);
        var now = LocalDateTime.now();
        entity.setCreationDate(now);
        entity.setLastUpdate(now);
        entity.setStatus(BattleStatus.INIT);
        entity = battleMapRepository.save(entity);
        log.info("Create battle {} for user {}", entity.getBattleId(), ownerId);
        return entity;
    }

    public BattleStatus getBattleStatus(UUID battleId) {
        return battleMapRepository.getReferenceById(battleId).getStatus();
    }

    public void completeInitPhase(UUID battleId, int userId) {
        var battle = getBattleEntityCheckPermission(battleId, userId);
        if (battle.getStatus() != BattleStatus.INIT) {
            throw new IllegalArgumentException("Battle phase is invalid. Actual: " + battle.getStatus() + ", Expected: " + BattleStatus.INIT);
        }
        battle.setStatus(BattleStatus.ONGOING);
        updateBattle(battle);
    }

    protected BattleEntity updateBattlePayload(UUID battleId, BattleMapPayload payload) {
        var entity = battleMapRepository.getReferenceById(battleId);
        entity.setPayload(SerializrUtil.toByte(payload));
        return updateBattle(entity);
    }

    protected BattleEntity updateBattle(BattleEntity entity) {
        var now = LocalDateTime.now();
        entity.setLastUpdate(now);
        entity = battleMapRepository.save(entity);
        log.info("Update battle {}", entity.getBattleId());
        return entity;
    }

    public BattleMap getBattleCheckPermission(UUID battleId, int userId) {
        var entity = getBattleEntityCheckPermission(battleId, userId);
        return BattleMapper.map(entity);
    }

    public BattleEntity getBattleEntityCheckPermission(UUID battleId, int userId) {
        var battle = battleMapRepository.getReferenceById(battleId);
        if (battle == null) {
            throw new IllegalArgumentException("Battle " + battleId + " not found");
        }
        if (battle.getOwnerId() != userId) {
            throw new IllegalArgumentException("Access to this battle is not allowed");
        }
        return battle;
    }
}
