package it.vitalegi.jarg.battle.model;

import lombok.Data;

import java.util.List;

@Data
public class PlayerDisplacementRule {
    int max;
    List<Coordinate> allowedCoordinates;

}
