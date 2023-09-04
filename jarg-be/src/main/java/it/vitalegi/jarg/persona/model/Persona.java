package it.vitalegi.jarg.persona.model;

import lombok.Data;

import java.util.List;
import java.util.UUID;

@Data
public class Persona {
    long id;
    String name;
    String skin;
    int level;
    Race race;
    List<PersonaClass> classes;
    long exp;
    BaseStats baseStats;
    ConsumableStat hp;
    ConsumableStat mp;
    StatsGrowth statsGrowth;
    List<Skill> skills;
}
