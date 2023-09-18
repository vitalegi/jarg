package it.vitalegi.jarg.battle.service;

import it.vitalegi.jarg.battle.model.*;
import it.vitalegi.jarg.persona.model.Persona;
import it.vitalegi.jarg.persona.service.PersonaService;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;

@Log4j2
@Service
public class BattleMapBuilderService {

    @Autowired
    PersonaService personaService;

    public BattleMap createRandomMap(int ownerId) {
        var out = new BattleMap();
        out.setId(UUID.randomUUID());
        out.setTiles(createRandomTiles());

        var playerGroup = playerGroup(ownerId);
        var enemiesGroup = enemiesGroup();
        out.setGroups(Arrays.asList(playerGroup, enemiesGroup));
        out.setPersonae(new ArrayList<>());
        var enemies = createRandomPersonae();
        out.getPersonae().addAll(enemies);
        out.setPlacements(createRandomPersonaPlacements(out.getTiles(), enemiesGroup, enemies));
        return out;
    }

    protected PersonaGroup playerGroup(int ownerId) {
        var playerGroup = new PersonaGroup();
        playerGroup.setId(UUID.randomUUID());
        playerGroup.setType(PersonaGroupType.PLAYER);
        playerGroup.setOwnerId(ownerId);
        return playerGroup;
    }

    protected PersonaGroup enemiesGroup() {
        var enemiesGroup = new PersonaGroup();
        enemiesGroup.setId(UUID.randomUUID());
        enemiesGroup.setType(PersonaGroupType.NPC);
        return enemiesGroup;
    }

    protected List<Persona> createRandomPersonae() {
        var personae = new ArrayList<Persona>();
        for (var i = 0; i < 5; i++) {
            personae.add(createRandomPersona());
        }
        return personae;
    }

    protected Persona createRandomPersona() {
        var out = personaService.createNpc();
        out.setId(UUID.randomUUID());
        return out;
    }

    protected List<PersonaPlacement> createRandomPersonaPlacements(List<Tile> tiles, PersonaGroup group, List<Persona> personae) {
        var placements = new ArrayList<PersonaPlacement>();
        for (Persona persona : personae) {
            placements.add(createRandomPersonaPlacement(tiles, group, persona, placements));
        }
        return placements;
    }

    protected PersonaPlacement createRandomPersonaPlacement(List<Tile> tiles, PersonaGroup group, Persona persona, List<PersonaPlacement> existingPlacements) {
        var placement = new PersonaPlacement();
        placement.setPersonaId(persona.getId());
        placement.setGroupId(group.getId());
        placement.setCoordinate(getRandomFreeCoordinates(tiles, existingPlacements));
        return placement;
    }

    protected Coordinate getRandomFreeCoordinates(List<Tile> tiles, List<PersonaPlacement> personae) {
        var available = tiles.stream() //
                .filter(Tile::isWalkable) //
                .filter(t -> personae.stream().noneMatch(p -> p.getCoordinate().equals(t.getCoordinate()))) //
                .toList();

        return available.get((int) (available.size() * Math.random())).getCoordinate();
    }


    protected List<Tile> createRandomTiles() {
        int maxX = 8;
        int maxY = 6;

        var tiles = new ArrayList<Tile>();
        for (var x = 0; x < maxX; x++) {
            for (var y = 0; y < maxY; y++) {
                tiles.add(createRandomTile(new Coordinate(x, y)));
            }
        }
        return tiles;
    }

    protected Tile createRandomTile(Coordinate coordinate) {
        var tile = new Tile();
        tile.setCoordinate(coordinate);
        tile.setAnimation(getRandomTerrain());
        tile.setWalkable(true);
        return tile;
    }

    protected String getRandomTerrain() {
        final var TILES = Arrays.asList("terrain_01/isometric_0014.png", "terrain_02/isometric_0028.png", "terrain_03/isometric_0035.png", "terrain_04/isometric_0036.png", "terrain_05/isometric_0043.png", "terrain_06/isometric_0064.png");
        int id = (int) (Math.random() * TILES.size());
        return TILES.get(id);
    }
}
