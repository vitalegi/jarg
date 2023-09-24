package it.vitalegi.jarg.util;

import java.util.List;

public class ArrayUtil {

    public static <E> E getRandomElement(List<E> elements) {
        if (elements.isEmpty()) {
            throw new IllegalArgumentException("Array is empty");
        }
        int index = (int) (Math.random() * elements.size());
        return elements.get(index);
    }
}
