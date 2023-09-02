package it.vitalegi.jarg.util;

public class StringUtil {

    public static boolean isNullOrEmpty(String str) {
        return str == null || str.isBlank();
    }

    public static boolean isNotNullOrEmpty(String str) {
        return !isNullOrEmpty(str);
    }
}
