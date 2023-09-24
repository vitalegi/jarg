package it.vitalegi.jarg.battle.model;

import it.vitalegi.jarg.persona.model.Persona;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Data
public class BattleMapPayload {

    List<Tile> tiles;
    List<Persona> personae;
    List<PersonaPlacement> placements;
    List<PersonaGroup> groups;
    PlayerDisplacementRule playerDisplacementRule;

    public BattleMapPayload() {
        tiles = new ArrayList<>();
        personae = new ArrayList<>();
        placements = new ArrayList<>();
        groups = new ArrayList<>();
    }

    public List<PersonaGroup> getGroupsByType(PersonaGroupType type) {
        return groups.stream().filter(g -> g.getType() == type).collect(Collectors.toList());
    }

    public PersonaGroup getGroup(UUID id) {
        return groups.stream().filter(g -> g.getId().equals(id)).findFirst().orElseThrow();
    }

    public PersonaGroup getGroupByPersonaId(UUID personaId) {
        var placement = getPersonaPlacement(personaId);
        return groups.stream().filter(g -> g.getId().equals(placement.getGroupId())).findFirst().orElseThrow();
    }

    public PersonaGroup getGroupByOwnerId(int ownerId) {
        return groups.stream().filter(g -> g.getOwnerId() != null).filter(g -> ownerId == g.getOwnerId()).findFirst().orElseThrow();
    }

    public List<PersonaPlacement> getPersonaeOnTile(Tile tile) {
        return getPersonaeOnCoordinate(tile.getCoordinate());
    }

    public List<PersonaPlacement> getPersonaeOnCoordinate(Coordinate coordinate) {
        return placements.stream().filter(p -> p.getCoordinate().equals(coordinate)).collect(Collectors.toList());
    }

    public PersonaPlacement getPersonaPlacement(UUID personaId) {
        return placements.stream().filter(p -> p.getPersonaId().equals(personaId)).findFirst().orElseThrow(() -> new IllegalArgumentException("Persona " + personaId + " doesn't have a placement"));
    }

    public Persona getPersona(UUID personaId) {
        return personae.stream().filter(p -> p.getId().equals(personaId)).findFirst().orElse(null);
    }
}
