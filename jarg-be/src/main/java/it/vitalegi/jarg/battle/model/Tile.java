package it.vitalegi.jarg.battle.model;

import lombok.Data;

@Data
public class Tile {
    Coordinate coordinate;
    String animation;
    boolean walkable;
}