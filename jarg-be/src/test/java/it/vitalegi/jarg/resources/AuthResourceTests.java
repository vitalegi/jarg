package it.vitalegi.jarg.resources;


import it.vitalegi.jarg.mock.AuthMock;
import lombok.extern.log4j.Log4j2;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.ActiveProfiles;

import static org.junit.jupiter.api.Assertions.assertEquals;


@Log4j2
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
@ActiveProfiles({"test", "it"})
public class AuthResourceTests {

    @Autowired
    AuthMock authMock;

    @WithMockUser("user2")
    @Test
    void when_identity_given_authenticatedUser_then_shouldRetrieveData() throws Exception {
        var auth = authMock.identityOk();
        assertEquals("user2", auth.getSubject());
    }
}