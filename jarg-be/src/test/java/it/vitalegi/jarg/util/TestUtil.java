package it.vitalegi.jarg.util;

import it.vitalegi.jarg.auth.SignupService;
import it.vitalegi.jarg.auth.model.NewUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class TestUtil {

    @Autowired
    SignupService service;

    public NewUser signupRandomUser() {
        var user = randomUser();
        service.signup(user);
        return user;
    }

    public NewUser randomUser() {
        return randomUser("password");
    }

    public NewUser randomUser(String password) {
        return user(UUID.randomUUID().toString(), password);
    }


    public NewUser user(String username, String password) {
        var out = new NewUser();
        out.setUsername(username);
        out.setPassword(password);
        return out;
    }

}
