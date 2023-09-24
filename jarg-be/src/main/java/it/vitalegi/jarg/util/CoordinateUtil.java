package it.vitalegi.jarg.util;

import it.vitalegi.jarg.battle.model.Coordinate;

import java.util.ArrayList;
import java.util.List;

public class CoordinateUtil {
    public static List<Coordinate> getRectangle(Coordinate coord1, Coordinate coord2) {
        return getRectangle(coord1.getX(), coord1.getY(), coord2.getX(), coord2.getY());
    }

    public static List<Coordinate> getRectangle(int x1, int y1, int x2, int y2) {
        List<Coordinate> coordinates = new ArrayList<>();
        for (int x = x1; x < x2; x++) {
            for (int y = y1; y < y2; y++) {
                coordinates.add(new Coordinate(x, y));
            }
        }
        return coordinates;
    }
}
