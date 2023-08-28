package it.vitalegi.jarg.util;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Service
public class ResourceUtil {
    @Autowired
    ObjectMapper om;

    public <E> List<E> readValues(String resource) {
        try {
            return om.readValue(ResourceUtil.class.getResourceAsStream(resource), new TypeReference<List<E>>() {
            });
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}
