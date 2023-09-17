package it.vitalegi.jarg.mock;

import it.vitalegi.jarg.battle.model.*;
import it.vitalegi.jarg.persona.model.Persona;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Service;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.RequestPostProcessor;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@Profile("it")
@Service
public class BattleMock extends BaseMock {

    public ResultActions createRandom(RequestPostProcessor user) throws Exception {
        return mockMvc.perform(put("/battle/random").with(user));
    }

    public BattleMap createRandomOk(RequestPostProcessor user) throws Exception {
        var payload = payload(createRandom(user).andExpect(status().isOk()));
        return objectMapper.readValue(payload, BattleMap.class);
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

    public void validatePersonaPlacement(PersonaPlacement placement, List<Persona> personas, List<Tile> tiles) {
        assertNotNull(placement.getPersonaId());
        assertTrue(personas.stream().anyMatch(p -> p.getId().equals(placement.getPersonaId())), "One persona should exist with this ID " + placement.getPersonaId());
        assertTrue(tiles.stream().anyMatch(t -> t.getCoordinate().equals(placement.getCoordinate())), "One tile should exist with this coordinates " + placement.getCoordinate());
    }
}
