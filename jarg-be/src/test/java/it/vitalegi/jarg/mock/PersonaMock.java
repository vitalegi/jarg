package it.vitalegi.jarg.mock;

import com.fasterxml.jackson.core.type.TypeReference;
import it.vitalegi.jarg.persona.model.NewPersona;
import it.vitalegi.jarg.persona.model.Persona;
import it.vitalegi.jarg.persona.service.PersonaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Service;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.RequestPostProcessor;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@Profile("it")
@Service
public class PersonaMock extends BaseMock {

    public ResultActions getMyPersonae(RequestPostProcessor user) throws Exception {
        return mockMvc.perform(get("/persona").with(user));
    }

    public List<Persona> getMyPersonaeOk(RequestPostProcessor user) throws Exception {
        var payload = payload(getMyPersonae(user).andExpect(status().isOk()));
        return objectMapper.readValue(payload, new TypeReference<>() {
        });
    }

    public ResultActions createPersona(RequestPostProcessor user, NewPersona obj) throws Exception {
        return mockMvc.perform(withJsonPayload(put("/persona").with(user), obj));
    }

    public Persona createPersonaOk(RequestPostProcessor user, NewPersona obj) throws Exception {
        var payload = payload(createPersona(user, obj).andExpect(status().isOk()));
        return objectMapper.readValue(payload, Persona.class);
    }

    public void validatePersona(Persona persona) {
        assertNotNull(persona.getId());
        assertNotNull(persona.getName());
        assertNotNull(persona.getSkin());
        assertNotNull(persona.getRace());
        assertNotNull(persona.getRace().getId());
        assertNotNull(persona.getClasses());
        assertNotNull(persona.getHp());
        assertNotNull(persona.getMp());
        assertNotNull(persona.getBaseStats());
        assertNotNull(persona.getStatsGrowth());
        assertNotNull(persona.getSkills());
    }

}
