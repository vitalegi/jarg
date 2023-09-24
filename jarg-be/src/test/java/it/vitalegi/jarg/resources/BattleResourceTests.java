package it.vitalegi.jarg.resources;


import it.vitalegi.jarg.battle.model.BattleMap;
import it.vitalegi.jarg.battle.model.BattleStatus;
import it.vitalegi.jarg.battle.model.Coordinate;
import it.vitalegi.jarg.battle.model.PersonaGroupType;
import it.vitalegi.jarg.battle.model.PersonaPlacement;
import it.vitalegi.jarg.battle.model.Tile;
import it.vitalegi.jarg.battle.service.BattleTransactionalService;
import it.vitalegi.jarg.battleaction.model.AddPersonaRequest;
import it.vitalegi.jarg.mock.AuthMock;
import it.vitalegi.jarg.mock.BattleMock;
import it.vitalegi.jarg.mock.MockUtil;
import it.vitalegi.jarg.mock.PersonaMock;
import it.vitalegi.jarg.persona.model.Persona;
import it.vitalegi.jarg.persona.service.PersonaService;
import lombok.extern.log4j.Log4j2;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;


@Log4j2
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
@ActiveProfiles({"test", "it"})
public class BattleResourceTests {

    @Autowired
    PersonaService personaService;

    @Autowired
    BattleTransactionalService battleTransactionalService;

    @Autowired
    PersonaMock personaMock;

    @Autowired
    AuthMock authMock;

    @Autowired
    BattleMock battleMock;

    @DisplayName("createRandomBattle - GIVEN logged in user WHEN createRandomBattle THEN battle is initialized properly")
    @Test
    void given_authorizedUser_when_createRandomBattle_then_shouldCreateBattle() throws Exception {
        var id1 = MockUtil.randomUserId();
        var jwt1 = MockUtil.jwt(id1);

        var response = battleMock.createRandomOk(jwt1);
        assertNotNull(response.getCreationDate());
        assertNotNull(response.getLastUpdate());
        assertNotNull(response.getOwnerId());
        assertEquals(BattleStatus.INIT, response.getStatus());
        var battle = response.getBattle();
        assertNotNull(response.getBattleId());

        assertEquals(2, battle.getGroups().size());
        battleMock.validatePersonaGroupPlayers(battle.getGroupsByType(PersonaGroupType.PLAYER));
        battleMock.validatePersonaGroupNpcs(battle.getGroupsByType(PersonaGroupType.NPC));

        battle.getTiles().forEach(battleMock::validateTile);
        battle.getPersonae().forEach(personaMock::validatePersona);
        battle.getPlacements().forEach(p -> battleMock.validatePersonaPlacement(p, battle.getPersonae(), battle.getTiles()));
    }

    @DisplayName("addPersona - GIVEN user is not authorized WHEN addPersona to a different battle THEN should fail")
    @Test
    void given_unauthorizedUser_when_addPersona_then_shouldFail() throws Exception {
        var jwt1 = MockUtil.randomJwt();
        var jwt2 = MockUtil.randomJwt();

        var battle = battleMock.createRandomOk(jwt1);
        var battleId = battle.getBattleId();

        var persona2 = createRandomPersona(authMock.accountId(jwt2), "A");

        var ex = battleMock.exception500(battleMock.addPlayerPersona(jwt2, battleId, new AddPersonaRequest(persona2.getId(), new Coordinate(0, 0))));
        assertEquals("Access to this battle is not allowed", ex.getMessage());
        battleMock.validateEqualsBattle(battle, battleMock.getBattleOk(jwt1, battleId));
    }

    @DisplayName("addPersona - GIVEN owner of a battle, persona of a different user WHEN addPersona to a battle THEN should fail")
    @Test
    void given_authorizedUser_personaNotOwned_when_addPersona_then_shouldFail() throws Exception {
        var jwt1 = MockUtil.randomJwt();
        var id1 = authMock.accountId(jwt1);
        var jwt2 = MockUtil.randomJwt();
        var id2 = authMock.accountId(jwt2);

        var battle = battleMock.createRandomOk(jwt1);
        var battleId = battle.getBattleId();

        var persona2 = createRandomPersona(authMock.accountId(jwt2), "A");

        var emptyTiles = getEmptyTiles(battle);
        var coordinate = emptyTiles.get(0).getCoordinate();

        var ex = battleMock.exception500(battleMock.addPlayerPersona(jwt1, battleId, new AddPersonaRequest(persona2.getId(), coordinate)));
        assertEquals("User " + id1 + " is not owner of " + persona2.getId() + ". owner: " + id2, ex.getMessage());

        battleMock.validateEqualsBattle(battle, battleMock.getBattleOk(jwt1, battleId));
    }


    @DisplayName("addPersona - GIVEN owner of a battle, unknown personaId WHEN addPersona to a battle THEN should fail")
    @Test
    void given_authorizedUser_personaNotExists_when_addPersona_then_shouldFail() throws Exception {
        var jwt1 = MockUtil.randomJwt();

        var battle = battleMock.createRandomOk(jwt1);
        var battleId = battle.getBattleId();
        var personaId = UUID.randomUUID();
        var ex = battleMock.exception500(battleMock.addPlayerPersona(jwt1, battleId, new AddPersonaRequest(personaId, new Coordinate(0, 0))));
        assertEquals("Persona " + personaId + " not found", ex.getMessage());
        battleMock.validateEqualsBattle(battle, battleMock.getBattleOk(jwt1, battleId));
    }

    @DisplayName("addPersona - GIVEN owner of a battle, persona already placed WHEN addPersona to a battle THEN should fail")
    @Test
    void given_authorizedUser_personaAlreadyPlaced_when_addPersona_then_shouldFail() throws Exception {
        var jwt1 = MockUtil.randomJwt();

        var battle = battleMock.createRandomOk(jwt1);
        battle = battleMock.getBattleOk(jwt1, battle.getBattleId());
        var battleId = battle.getBattleId();

        var persona1 = createRandomPersona(authMock.accountId(jwt1), "A");

        var emptyTiles = getEmptyTiles(battle);
        var coordinate = emptyTiles.get(0).getCoordinate();

        battleMock.addPlayerPersonaOk(jwt1, battleId, new AddPersonaRequest(persona1.getId(), coordinate));
        var battle2 = battleMock.getBattleOk(jwt1, battleId);

        var ex = battleMock.exception500(battleMock.addPlayerPersona(jwt1, battleId, new AddPersonaRequest(persona1.getId(), coordinate)));
        assertEquals("Persona " + persona1.getId() + " already placed", ex.getMessage());
        battleMock.validateEqualsBattle(battle2, battleMock.getBattleOk(jwt1, battleId));
    }

    @DisplayName("addPersona - GIVEN owner of a battle WHEN addPersona to a battle THEN should add persona")
    @Test
    void given_authorizedUser_when_addPersona_then_shouldAddPersona() throws Exception {
        var jwt1 = MockUtil.randomJwt();
        var id1 = authMock.accountId(jwt1);

        var battle = battleMock.createRandomOk(jwt1);
        var battleId = battle.getBattleId();

        var persona1 = createRandomPersona(authMock.accountId(jwt1), "A");

        var emptyTiles = getEmptyTiles(battle);
        var coordinate = emptyTiles.get(0).getCoordinate();
        var actions = battleMock.addPlayerPersonaOk(jwt1, battleId, new AddPersonaRequest(persona1.getId(), coordinate));
        assertEquals(1, actions.size());
        battleMock.validateActionAddPersona(new PersonaPlacement(persona1.getId(), coordinate, battle.getBattle().getGroupByOwnerId(id1).getId()), actions.get(0));

        var battle2 = battleMock.getBattleOk(jwt1, battleId);
        battleMock.validatePersona(persona1, battle2.getBattle().getPersonae());
        assertEquals(coordinate, battle2.getBattle().getPersonaPlacement(persona1.getId()).getCoordinate());
    }


    @DisplayName("addPersona - GIVEN owner of a battle WHEN addPersona to an occupied tile THEN should fail")
    @Test
    void given_authorizedUser_occupiedTile_when_addPersona_then_shouldAddPersona() throws Exception {
        var jwt1 = MockUtil.randomJwt();
        var id1 = authMock.accountId(jwt1);

        var battle = battleTransactionalService.createRandomMap(id1);
        var battleId = battle.getBattleId();

        var persona1 = createRandomPersona(id1, "A");
        var persona2 = createRandomPersona(id1, "B");

        var emptyTiles = getEmptyTiles(battle);
        var coordinate1 = emptyTiles.get(0).getCoordinate();
        battleTransactionalService.addPlayerPersona(battleId, id1, new AddPersonaRequest(persona1.getId(), coordinate1));
        var battle2 = battleTransactionalService.getBattle(battleId, id1);

        var ex = battleMock.exception500(battleMock.addPlayerPersona(jwt1, battleId, new AddPersonaRequest(persona2.getId(), coordinate1)));
        assertEquals("Position " + coordinate1 + " is already occupied", ex.getMessage());

        var battle3 = battleTransactionalService.getBattle(battleId, id1);
        battleMock.validateEqualsBattle(battle2, battle3);
    }


    private List<Tile> getEmptyTiles(BattleMap map) {
        return map.getBattle().getTiles().stream().filter(t -> map.getBattle().getPersonaeOnTile(t).isEmpty()).collect(Collectors.toList());
    }

    private List<Tile> getOccupiedTiles(BattleMap map) {
        return map.getBattle().getTiles().stream().filter(t -> !map.getBattle().getPersonaeOnTile(t).isEmpty()).collect(Collectors.toList());
    }

    private Persona createRandomPersona(int accountId, String name) {
        return personaService.create(accountId, name, 5, 10, "test");
    }
}