package it.vitalegi.jarg.mapbuilder.service;

import it.vitalegi.jarg.battle.service.BattleService;
import it.vitalegi.jarg.persona.service.PersonaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BattleMapBuilderFactory {

    @Autowired
    PersonaService personaService;

    @Autowired
    BattleService battleService;


    public BattleMapBuilder init(int ownerId) {
        return new BattleMapBuilder(personaService, battleService, ownerId);
    }
}
