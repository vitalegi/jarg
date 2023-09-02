package it.vitalegi.jarg.resources;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import it.vitalegi.jarg.auth.model.Auth;
import jakarta.servlet.http.Cookie;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.RequestPostProcessor;

import java.io.UnsupportedEncodingException;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

public abstract class RestResource {
    public static final String USER_1 = "user1";
    public static final String USER_2 = "user2";

    @Autowired
    protected MockMvc mockMvc;

    @Autowired
    protected ObjectMapper objectMapper;

    public RequestPostProcessor user1() {
        return user(USER_1);
    }

    public ResultActions tokenAccessOk(RequestPostProcessor user) throws Exception {
        return tokenAccess(user).andExpect(status().isOk());
    }

    public ResultActions tokenAccess(RequestPostProcessor user) throws Exception {
        return mockMvc.perform(post("/token/access").with(user));
    }

    public ResultActions tokenRefreshOk(RequestPostProcessor user) throws Exception {
        return tokenRefresh(user).andExpect(status().isOk());
    }

    public ResultActions tokenRefresh(RequestPostProcessor user) throws Exception {
        return mockMvc.perform(post("/token/refresh").with(user));
    }

    public ResultActions authIdentity() throws Exception {
        return mockMvc.perform(get("/auth/identity"));
    }

    public Auth authIdentityOk(Cookie cookie) throws Exception {
        var payload = payload(mockMvc.perform(get("/auth/identity").cookie(cookie)) //
                .andExpect(status().isOk()));
        return objectMapper.readValue(payload, Auth.class);
    }

    public String payload(ResultActions resultActions) throws UnsupportedEncodingException {
        return resultActions.andReturn().getResponse().getContentAsString();
    }

    public <E> E payloadJson(ResultActions resultActions, Class<E> clazz) throws UnsupportedEncodingException, JsonProcessingException {
        var payload = payload(resultActions);
        return objectMapper.readValue(payload, clazz);
    }

    public Auth authIdentityOk() throws Exception {
        return payloadJson(authIdentity().andExpect(status().isOk()), Auth.class);
    }

    public RequestPostProcessor user(String username, String... authorities) {
        var user = User.withUsername(username).password("password").authorities(authorities).build();
        return SecurityMockMvcRequestPostProcessors.user(user);
    }
}
