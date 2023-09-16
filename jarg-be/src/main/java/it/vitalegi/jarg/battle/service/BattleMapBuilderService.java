package it.vitalegi.jarg.battle.service;

import it.vitalegi.jarg.battle.model.*;
import it.vitalegi.jarg.persona.service.PersonaService;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

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
        out.setPersonas(new ArrayList<>());
        out.getPersonas().addAll(createRandomPersonas(out.getTiles(), enemiesGroup));
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

    protected List<BattlePersona> createRandomPersonas(List<Tile> tiles, PersonaGroup group) {
        var personas = new ArrayList<BattlePersona>();
        for (var i = 0; i < 5; i++) {
            personas.add(createRandomPersona(getRandomFreeCoordinates(tiles, personas), group));
        }
        return personas;
    }

    protected Coordinate getRandomFreeCoordinates(List<Tile> tiles, List<BattlePersona> personas) {
        var available = tiles.stream() //
                .filter(Tile::isWalkable) //
                .filter(t -> personas.stream().noneMatch(p -> p.getCoordinate().equals(t.getCoordinate()))) //
                .collect(Collectors.toList());

        return available.get((int) (available.size() * Math.random())).getCoordinate();
    }

    protected BattlePersona createRandomPersona(Coordinate coordinate, PersonaGroup group) {
        var out = new BattlePersona();
        out.setCoordinate(coordinate);
        out.setPersona(personaService.createNpc());
        out.getPersona().setId(UUID.randomUUID());
        out.setGroupId(group.getId());
        return out;
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
        final var TILES = Arrays.asList("terrain_01/isometric_pixel_0014.png", "terrain_02/isometric_pixel_0028.png", "terrain_03/isometric_pixel_0035.png", "terrain_04/isometric_pixel_0036.png", "terrain_05/isometric_pixel_0043.png", "terrain_06/isometric_pixel_0064.png");
        int id = (int) (Math.random() * TILES.size());
        return TILES.get(id);
    }
}
