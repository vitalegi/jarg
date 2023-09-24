package it.vitalegi.jarg.mapbuilder.service;

import it.vitalegi.jarg.battle.model.BattleMap;
import it.vitalegi.jarg.battle.model.Coordinate;
import it.vitalegi.jarg.battle.model.Tile;
import it.vitalegi.jarg.battle.service.BattleService;
import it.vitalegi.jarg.persona.model.Persona;
import it.vitalegi.jarg.persona.service.PersonaService;
import it.vitalegi.jarg.util.ArrayUtil;
import it.vitalegi.jarg.util.CoordinateUtil;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Log4j2
@Service
public class BattleMapBuilderRandomService {

    @Autowired
    PersonaService personaService;

    @Autowired
    BattleMapBuilderFactory battleMapBuilderFactory;

    public BattleMap createMap(int ownerId) {

        var builder = battleMapBuilderFactory.init(ownerId);
        builder.addTerrains(0, 0, 10, 8, ArrayUtil.getRandomElement(BattleMapBuilder.TERRAINS));
        builder.addTerrains(3, 2, 6, 4, ArrayUtil.getRandomElement(BattleMapBuilder.TERRAINS));

        builder.addPlayerGroup(ownerId);
        var enemiesGroup = builder.addEnemyGroup();

        var playerArea = CoordinateUtil.getRectangle(0, 0, 4, 8);
        var enemyArea = CoordinateUtil.getRectangle(8, 0, 10, 8);

        for (int i = 0; i < 5; i++) {
            builder.addPersona(createRandomPersona(), enemiesGroup, getRandomFreeCoordinates(builder, enemyArea));
        }
        builder.playerDisplacementRule(5, playerArea);

        return builder.create();
    }

    protected Persona createRandomPersona() {
        var out = personaService.createNpc();
        out.setId(UUID.randomUUID());
        return out;
    }

    protected Coordinate getRandomFreeCoordinates(BattleMapBuilder factory, List<Coordinate> designatedArea) {
        var available = factory.getPayload().getTiles().stream() //
                .filter(Tile::isWalkable) //
                .filter(t -> designatedArea.stream().anyMatch(c -> t.getCoordinate().equals(c))) //
                .filter(t -> factory.getPayload().getPersonaeOnCoordinate(t.getCoordinate()).isEmpty()) //
                .toList();

        return ArrayUtil.getRandomElement(available).getCoordinate();
    }

}
