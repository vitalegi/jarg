package it.vitalegi.jarg.util;

import it.vitalegi.jarg.battle.model.BattleMap;
import it.vitalegi.jarg.battle.model.Coordinate;
import it.vitalegi.jarg.mapbuilder.service.BattleMapBuilder;
import it.vitalegi.jarg.mapbuilder.service.BattleMapBuilderFactory;
import it.vitalegi.jarg.mock.AuthMock;
import it.vitalegi.jarg.persona.model.Persona;
import it.vitalegi.jarg.persona.service.PersonaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Profile;
import org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@Profile("it")
public class BattleMapTestBuilder {

    @Autowired
    BattleMapBuilderFactory factory;

    @Autowired
    AuthMock authMock;

    @Autowired
    PersonaService personaService;

    public BattleMap map1(SecurityMockMvcRequestPostProcessors.JwtRequestPostProcessor auth) throws Exception {
        return map1(authMock.accountId(auth));
    }

    public BattleMap map1(int ownerId) {

        var builder = factory.init(ownerId);
        builder.addTerrains(0, 0, 10, 8, BattleMapBuilder.TERRAINS.get(0));
        builder.addTerrains(3, 2, 6, 4, BattleMapBuilder.TERRAINS.get(1));

        builder.addPlayerGroup(ownerId);
        var enemiesGroup = builder.addEnemyGroup();

        var playerArea = map1PlayerArea();
        var enemyArea = CoordinateUtil.getRectangle(8, 0, 10, 8);

        for (int i = 0; i < 5; i++) {
            builder.addPersona(createRandomPersona(), enemiesGroup, enemyArea.get(i));
        }
        builder.playerDisplacementRule(5, playerArea);

        return builder.create();
    }

    public List<Coordinate> map1PlayerArea() {
        return CoordinateUtil.getRectangle(2, 0, 4, 8);
    }

    protected Persona createRandomPersona() {
        var out = personaService.createNpc();
        out.setId(UUID.randomUUID());
        return out;
    }
}
