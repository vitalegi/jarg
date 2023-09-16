package it.vitalegi.jarg.resources;


import it.vitalegi.jarg.mock.MockUtil;
import it.vitalegi.jarg.mock.PersonaMock;
import it.vitalegi.jarg.persona.model.NewPersonaBuilder;
import it.vitalegi.jarg.persona.model.Persona;
import lombok.extern.log4j.Log4j2;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import java.util.Arrays;
import java.util.stream.Collectors;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;


@Log4j2
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
@ActiveProfiles({"test", "it"})
public class PersonaResourceTests {

    @Autowired
    PersonaMock personaMock;

    @Test
    void given_authorizedUser_when_createPersona_then_shouldCreatePersona() throws Exception {
        var id1 = MockUtil.randomUserId();
        var jwt1 = MockUtil.jwt(id1);

        var persona1 = personaMock.createPersonaOk(jwt1, new NewPersonaBuilder().name("A").skin("skin").classId(500).raceId(600).build());
        assertNotNull(persona1.getId());
        assertEquals("A", persona1.getName());
        assertEquals("skin", persona1.getSkin());
        assertEquals(500, persona1.getClasses().get(0).getDef().getId());
        assertEquals(600, persona1.getRace().getId());

        var persona2 = personaMock.getMyPersonasOk(jwt1);
        assertEquals(1, persona2.size());
        assertEquals(persona1, persona2.get(0));
    }

    @Test
    void given_authorizedUser_when_getMyPersonas_then_shouldRetrieveCorrectPersonas() throws Exception {
        var jwt1 = MockUtil.randomJwt();
        var jwt2 = MockUtil.randomJwt();

        var persona1 = personaMock.createPersonaOk(jwt1, new NewPersonaBuilder().name("A").build());
        var persona2 = personaMock.createPersonaOk(jwt1, new NewPersonaBuilder().name("B").build());
        var persona3 = personaMock.createPersonaOk(jwt2, new NewPersonaBuilder().name("C").build());
        var persona4 = personaMock.createPersonaOk(jwt2, new NewPersonaBuilder().name("D").build());

        var personas1 = personaMock.getMyPersonasOk(jwt1).stream().map(Persona::getName).sorted().collect(Collectors.toList());
        var personas2 = personaMock.getMyPersonasOk(jwt2).stream().map(Persona::getName).sorted().collect(Collectors.toList());
        assertEquals(Arrays.asList("A", "B"), personas1);
        assertEquals(Arrays.asList("C", "D"), personas2);
    }
}