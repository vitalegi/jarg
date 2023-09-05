package it.vitalegi.jarg.mock;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors;
import org.springframework.test.web.servlet.request.RequestPostProcessor;

import java.util.UUID;

public class MockUtil {

    public static RequestPostProcessor user(String username, String... authorities) {
        var user = User.withUsername(username).password("password").authorities(authorities).build();
        return SecurityMockMvcRequestPostProcessors.user(user);
    }

    public static String randomUserId() {
        return UUID.randomUUID().toString();
    }

    public static SecurityMockMvcRequestPostProcessors.JwtRequestPostProcessor randomJwt() {
        return SecurityMockMvcRequestPostProcessors.jwt().jwt((jwt) -> jwt.subject(randomUserId()));
    }

    public static SecurityMockMvcRequestPostProcessors.JwtRequestPostProcessor jwt(String subject) {
        return SecurityMockMvcRequestPostProcessors.jwt().jwt((jwt) -> jwt.subject(subject));
    }

}
