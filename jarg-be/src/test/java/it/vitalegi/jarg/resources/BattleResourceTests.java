package it.vitalegi.jarg.resources;


import it.vitalegi.jarg.battle.model.PersonaGroupType;
import it.vitalegi.jarg.mock.AuthMock;
import it.vitalegi.jarg.mock.BattleMock;
import it.vitalegi.jarg.mock.MockUtil;
import it.vitalegi.jarg.mock.PersonaMock;
import lombok.extern.log4j.Log4j2;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;


@Log4j2
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
@ActiveProfiles({"test", "it"})
public class BattleResourceTests {

    @Autowired
    PersonaMock personaMock;

    @Autowired
    AuthMock authMock;

    @Autowired
    BattleMock battleMock;

    @Test
    void given_authorizedUser_when_createRandomBattle_then_shouldCreateBattle() throws Exception {
        var id1 = MockUtil.randomUserId();
        var jwt1 = MockUtil.jwt(id1);

        var battle = battleMock.createRandomOk(jwt1);
        assertNotNull(battle.getId());

        assertEquals(2, battle.getGroups().size());
        battleMock.validatePersonaGroupPlayers(battle.getGroupsByType(PersonaGroupType.PLAYER));
        battleMock.validatePersonaGroupNpcs(battle.getGroupsByType(PersonaGroupType.NPC));

        battle.getTiles().forEach(battleMock::validateTile);
        battle.getPersonae().forEach(personaMock::validatePersona);
        battle.getPlacements().forEach(p -> battleMock.validatePersonaPlacement(p, battle.getPersonae(), battle.getTiles()));
    }
}