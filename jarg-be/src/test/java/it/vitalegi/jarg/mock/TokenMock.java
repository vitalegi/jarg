package it.vitalegi.jarg.mock;

import it.vitalegi.jarg.auth.model.Auth;
import jakarta.servlet.http.Cookie;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Service;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.RequestPostProcessor;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@Profile("it")
@Service
public class TokenMock extends BaseMock {


    public ResultActions accessOk(RequestPostProcessor user) throws Exception {
        return access(user).andExpect(status().isOk());
    }

    public ResultActions access(RequestPostProcessor user) throws Exception {
        return mockMvc.perform(post("/token/access").with(user));
    }

    public ResultActions refreshOk(RequestPostProcessor user) throws Exception {
        return refresh(user).andExpect(status().isOk());
    }

    public ResultActions refresh(RequestPostProcessor user) throws Exception {
        return mockMvc.perform(post("/token/refresh").with(user));
    }

}
