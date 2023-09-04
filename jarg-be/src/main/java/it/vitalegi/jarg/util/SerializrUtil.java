package it.vitalegi.jarg.util;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.IOException;

public class SerializrUtil {

    private static ObjectMapper om;

    static {
        om = new ObjectMapper();
    }

    public static <E> byte[] toByte(E obj) {
        try {
            return om.writeValueAsBytes(obj);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }

    public static <E> E fromByte(byte[] obj, Class<E> clazz) {
        try {
            return om.readValue(obj, clazz);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}
