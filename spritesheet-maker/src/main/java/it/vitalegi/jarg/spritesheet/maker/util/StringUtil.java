package it.vitalegi.jarg.spritesheet.maker.util;

public class StringUtil {

    public static String getFirstNotNullOrEmpty(String... strs) {
        if (strs == null) {
            throw new IllegalArgumentException();
        }
        for (var i = 0; i < strs.length; i++) {
            if (isNotNullOrEmpty(strs[i])) {
                return strs[i];
            }
        }
        return null;
    }

    public static boolean isNotNullOrEmpty(String str) {
        return !isNullOrEmpty(str);
    }

    public static boolean isNullOrEmpty(String str) {
        if (str == null) {
            return true;
        }
        if (str.equals("")) {
            return true;
        }
        return str.trim().equals("");
    }

    public static String leftPad(String str, int len, char pad) {
        while (str.length() < len) {
            str = pad + str;
        }
        return str;
    }
}
