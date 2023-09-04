package it.vitalegi.jarg.auth.service;


import it.vitalegi.jarg.auth.SignupService;
import it.vitalegi.jarg.auth.model.NewUser;
import it.vitalegi.jarg.util.TestUtil;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import static org.junit.jupiter.api.Assertions.assertThrows;

@SpringBootTest
@ActiveProfiles("test")
public class SignupServiceTests {

    @Autowired
    SignupService service;

    @Autowired
    TestUtil testUtil;

    @Test
    void given_newUser_when_signup_then_userIsCreated() {
        service.signup(testUtil.randomUser());
    }

    @Test
    void given_existingUser_when_signup_then_exception() {
        var user = testUtil.randomUser();
        service.signup(user);
        assertThrows(IllegalArgumentException.class, () -> service.signup(user));
    }
}
