package it.vitalegi.jarg.battle.repository;

import it.vitalegi.jarg.battle.entity.BattleEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface BattleMapRepository extends JpaRepository<BattleEntity, UUID> {

    List<BattleEntity> findAllByOwnerId(Integer ownerId);

    List<BattleEntity> findAllByOwnerIdAndStatus(Integer ownerId, String status);
}
