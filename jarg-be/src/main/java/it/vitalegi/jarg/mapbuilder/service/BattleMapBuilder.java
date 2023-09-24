package it.vitalegi.jarg.mapbuilder.service;

import it.vitalegi.jarg.battle.map.BattleMapper;
import it.vitalegi.jarg.battle.model.BattleMap;
import it.vitalegi.jarg.battle.model.BattleMapPayload;
import it.vitalegi.jarg.battle.model.Coordinate;
import it.vitalegi.jarg.battle.model.PersonaGroup;
import it.vitalegi.jarg.battle.model.PersonaGroupType;
import it.vitalegi.jarg.battle.model.PersonaPlacement;
import it.vitalegi.jarg.battle.model.PlayerDisplacementRule;
import it.vitalegi.jarg.battle.model.Tile;
import it.vitalegi.jarg.battle.service.BattleService;
import it.vitalegi.jarg.persona.model.Persona;
import it.vitalegi.jarg.persona.service.PersonaService;
import it.vitalegi.jarg.util.CoordinateUtil;
import lombok.Getter;
import lombok.extern.log4j.Log4j2;

import java.util.Arrays;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Log4j2
public class BattleMapBuilder {

    public static final List<String> TERRAINS = Arrays.asList("terrain_01/isometric_0014.png", "terrain_02/isometric_0028.png", "terrain_03/isometric_0035.png", "terrain_04/isometric_0036.png", "terrain_05/isometric_0043.png", "terrain_06/isometric_0064.png");

    PersonaService personaService;

    BattleService battleService;

    int ownerId;

    @Getter
    BattleMapPayload payload;

    public BattleMapBuilder(PersonaService personaService, BattleService battleService, int ownerId) {
        this.personaService = personaService;
        this.battleService = battleService;
        this.ownerId = ownerId;
        payload = new BattleMapPayload();
    }

    public BattleMap create() {
        return BattleMapper.map(battleService.createBattle(payload, ownerId));
    }

    public void addTerrains(int x1, int y1, int x2, int y2, String terrain) {
        CoordinateUtil.getRectangle(x1, y1, x2, y2).forEach(c -> addTerrain(c, terrain));
    }

    public void addTerrain(Coordinate coordinate, String terrain) {
        var tiles = payload.getTiles().stream().filter(t -> !t.getCoordinate().equals(coordinate)).collect(Collectors.toList());
        var tile = new Tile();
        tile.setCoordinate(coordinate);
        tile.setAnimation(terrain);
        tile.setWalkable(true);
        tiles.add(tile);
        payload.setTiles(tiles);
    }

    public PersonaGroup addPlayerGroup(int ownerId) {
        var group = playerGroup(ownerId);
        payload.getGroups().add(group);
        return group;
    }

    public PersonaGroup addEnemyGroup() {
        var group = enemiesGroup();
        payload.getGroups().add(group);
        return group;
    }

    public PersonaPlacement addPersona(Persona persona, PersonaGroup group, Coordinate coordinate) {
        payload.getPersonae().add(persona);
        var placement = new PersonaPlacement(persona.getId(), coordinate, group.getId());
        payload.getPlacements().add(placement);
        return placement;
    }

    public void playerDisplacementRule(int max, List<Coordinate> allowedCoordinates) {
        payload.setPlayerDisplacementRule(new PlayerDisplacementRule());
        payload.getPlayerDisplacementRule().setMax(max);
        payload.getPlayerDisplacementRule().setAllowedCoordinates(allowedCoordinates);
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

    protected String getRandomTerrain() {
        final var TILES = Arrays.asList("terrain_01/isometric_0014.png", "terrain_02/isometric_0028.png", "terrain_03/isometric_0035.png", "terrain_04/isometric_0036.png", "terrain_05/isometric_0043.png", "terrain_06/isometric_0064.png");
        int id = (int) (Math.random() * TILES.size());
        return TILES.get(id);
    }
}
