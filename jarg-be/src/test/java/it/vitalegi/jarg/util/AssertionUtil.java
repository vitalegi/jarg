package it.vitalegi.jarg.util;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class AssertionUtil {

    public static <E> void assertEqualsArrays(List<E> expected, List<E> actual) {
        assertEquals(expected.size(), actual.size());
        for (var i = 0; i < expected.size(); i++) {
            var e = expected.get(i);
            if (actual.stream().noneMatch(a -> a.equals(e))) {
                throw new AssertionError("Element " + e + " (" + i + ") doesn't have a corresponding value. Actual: " + actual + ". Expected: " + expected);
            }
        }
    }
}
