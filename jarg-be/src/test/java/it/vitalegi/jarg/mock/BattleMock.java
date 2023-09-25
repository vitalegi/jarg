package it.vitalegi.jarg.mock;

import com.fasterxml.jackson.core.type.TypeReference;
import it.vitalegi.jarg.battle.model.BattleMap;
import it.vitalegi.jarg.battle.model.BattleMapPayload;
import it.vitalegi.jarg.battle.model.Coordinate;
import it.vitalegi.jarg.battle.model.PersonaGroup;
import it.vitalegi.jarg.battle.model.PersonaGroupType;
import it.vitalegi.jarg.battle.model.PersonaPlacement;
import it.vitalegi.jarg.battle.model.Tile;
import it.vitalegi.jarg.battleaction.model.AddPersona;
import it.vitalegi.jarg.battleaction.model.AddPersonaRequest;
import it.vitalegi.jarg.battleaction.model.BattleAction;
import it.vitalegi.jarg.battleaction.model.DeletePersonaRequest;
import it.vitalegi.jarg.persona.model.Persona;
import org.opentest4j.AssertionFailedError;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Service;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.RequestPostProcessor;

import java.util.List;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@Profile("it")
@Service
public class BattleMock extends BaseMock {


    public ResultActions createRandom(RequestPostProcessor user) throws Exception {
        return mockMvc.perform(put("/battle/random").with(user));
    }

    public BattleMap createRandomOk(RequestPostProcessor user) throws Exception {
        return payloadJson(createRandom(user).andExpect(status().isOk()), BattleMap.class);
    }

    public ResultActions getBattle(RequestPostProcessor user, UUID battleId) throws Exception {
        return mockMvc.perform(get("/battle/" + battleId).with(user));
    }

    public BattleMap getBattleOk(RequestPostProcessor user, UUID battleId) throws Exception {
        return payloadJson(getBattle(user, battleId).andExpect(status().isOk()), BattleMap.class);
    }

    public ResultActions addPlayerPersona(RequestPostProcessor user, UUID battleId, AddPersonaRequest request) throws Exception {
        return postJson(user, "/battle/" + battleId + "/persona", request);
    }

    public List<BattleAction> addPlayerPersonaOk(RequestPostProcessor user, UUID battleId, AddPersonaRequest request) throws Exception {
        var response = addPlayerPersona(user, battleId, request);
        response.andExpect(status().isOk());
        return toBattleAction(response);
    }

    public ResultActions deletePlayerPersona(RequestPostProcessor user, UUID battleId, UUID personaId) throws Exception {
        return deleteJson(user, "/battle/" + battleId + "/persona", new DeletePersonaRequest(personaId));
    }

    public List<BattleAction> deletePlayerPersonaOk(RequestPostProcessor user, UUID battleId, UUID personaId) throws Exception {
        var response = deletePlayerPersona(user, battleId, personaId);
        response.andExpect(status().isOk());
        return toBattleAction(response);
    }

    protected List<BattleAction> toBattleAction(ResultActions response) throws Exception {
        response.andExpect(status().isOk());
        var payload = payload(response);
        return objectMapper.readValue(payload, new TypeReference<List<BattleAction>>() {
        });
    }

    public ResultActions getAvailableDisplacements(RequestPostProcessor user, UUID battleId) throws Exception {
        return getJson(user, "/battle/" + battleId + "/displacement/available");
    }

    public List<Coordinate> getAvailableDisplacementsOk(RequestPostProcessor user, UUID battleId) throws Exception {
        var response = getAvailableDisplacements(user, battleId);
        response.andExpect(status().isOk());
        var payload = payload(response);
        return objectMapper.readValue(payload, new TypeReference<List<Coordinate>>() {
        });
    }

    public void validateEqualsBattle(BattleMap expected, BattleMap actual) {
        assertEquals(expected.getBattleId(), actual.getBattleId());
        assertEquals(expected.getStatus(), actual.getStatus());
        assertEquals(expected.getOwnerId(), actual.getOwnerId());
        validateEqualsBattlePayload(expected.getBattle(), actual.getBattle());
    }

    public void validateEqualsBattlePayload(BattleMapPayload expected, BattleMapPayload actual) {
        validatePersonae(expected.getPersonae(), actual.getPersonae());
        assertEquals(expected.getGroups(), actual.getGroups());
        assertEquals(expected.getPlacements(), actual.getPlacements());
        assertEquals(expected.getTiles(), actual.getTiles());
    }

    public void validatePersonae(List<Persona> expected, List<Persona> actual) {
        assertEquals(expected.size(), actual.size());
        expected.forEach(e -> validatePersona(e, actual));
    }

    public void validatePersona(Persona expected, List<Persona> actual) {
        try {
            validatePersona(expected, actual.stream().filter(a -> a.getId().equals(expected.getId())).findFirst().orElse(null));
        } catch (AssertionFailedError ex) {
            throw new AssertionFailedError("Error validating " + expected.getName() + " " + expected.getId(), ex);
        }
    }

    public void validatePersona(Persona expected, Persona actual) {
        assertEquals(expected.getId(), actual.getId());
        assertEquals(expected.getName(), actual.getName());
        assertEquals(expected.getSkin(), actual.getSkin());
        assertEquals(expected.getLevel(), actual.getLevel());
        assertEquals(expected.getRace(), actual.getRace());
        assertEquals(expected.getClasses(), actual.getClasses());
        assertEquals(expected.getExp(), actual.getExp());
        assertEquals(expected.getBaseStats(), actual.getBaseStats());
        assertEquals(expected.getHp(), actual.getHp());
        assertEquals(expected.getMp(), actual.getMp());
        assertEquals(expected.getStatsGrowth(), actual.getStatsGrowth());
        assertEquals(expected.getSkills(), actual.getSkills());
    }

    public void validatePersonaGroupPlayers(List<PersonaGroup> groups) {
        for (var group : groups) {
            validatePersonaGroupPlayer(group);
        }
    }

    public void validatePersonaGroupPlayer(PersonaGroup group) {
        assertNotNull(group.getId());
        assertNotNull(group.getOwnerId());
        assertEquals(PersonaGroupType.PLAYER, group.getType());
    }

    public void validatePersonaGroupNpcs(List<PersonaGroup> groups) {
        for (var group : groups) {
            validatePersonaGroupNpc(group);
        }
    }

    public void validatePersonaGroupNpc(PersonaGroup group) {
        assertNotNull(group.getId());
        assertNull(group.getOwnerId());
        assertEquals(PersonaGroupType.NPC, group.getType());
    }

    public void validateTile(Tile tile) {
        assertNotNull(tile.getCoordinate());
        assertNotNull(tile.getAnimation());
        validateCoordinate(tile.getCoordinate());
    }

    public void validateCoordinate(Coordinate coordinate) {
        assertTrue(coordinate.getX() >= 0);
        assertTrue(coordinate.getY() >= 0);
    }

    public void validatePersonaPlacement(PersonaPlacement placement, List<Persona> personae, List<Tile> tiles) {
        assertNotNull(placement.getPersonaId());
        assertTrue(personae.stream().anyMatch(p -> p.getId().equals(placement.getPersonaId())), "One persona should exist with this ID " + placement.getPersonaId());
        assertTrue(tiles.stream().anyMatch(t -> t.getCoordinate().equals(placement.getCoordinate())), "One tile should exist with this coordinates " + placement.getCoordinate());
    }

    public void validateActionAddPersona(PersonaPlacement expected, BattleAction action) {
        assertTrue(action instanceof AddPersona);
        var obj = (AddPersona) action;
        assertEquals(expected, obj.getPersonaPlacement());
    }
}
