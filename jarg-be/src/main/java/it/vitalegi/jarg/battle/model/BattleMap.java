package it.vitalegi.jarg.battle.model;

import it.vitalegi.jarg.persona.model.Persona;
import lombok.Data;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Data
public class BattleMap {

    UUID id;
    List<Tile> tiles;
    List<Persona> personae;
    List<PersonaPlacement> placements;
    List<PersonaGroup> groups;

    public List<PersonaGroup> getGroupsByType(PersonaGroupType type) {
        return groups.stream().filter(g -> g.getType() == type).collect(Collectors.toList());
    }

    public PersonaGroup getGroup(UUID id) {
        return groups.stream().filter(g -> g.getId().equals(id)).findFirst().orElseThrow();
    }
}
