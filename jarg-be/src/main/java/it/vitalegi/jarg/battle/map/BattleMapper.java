package it.vitalegi.jarg.battle.map;

import it.vitalegi.jarg.battle.entity.BattleEntity;
import it.vitalegi.jarg.battle.model.BattleMap;
import it.vitalegi.jarg.battle.model.BattleMapPayload;
import it.vitalegi.jarg.util.SerializrUtil;

public class BattleMapper {
    public static BattleMap map(BattleEntity in) {
        var out = new BattleMap();
        out.setBattleId(in.getBattleId());
        out.setBattle(SerializrUtil.fromByte(in.getPayload(), BattleMapPayload.class));
        out.setStatus(in.getStatus());
        out.setOwnerId(in.getOwnerId());
        out.setLastUpdate(in.getLastUpdate());
        out.setCreationDate(in.getCreationDate());
        return out;
    }
}
