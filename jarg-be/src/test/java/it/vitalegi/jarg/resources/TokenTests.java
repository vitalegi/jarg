package it.vitalegi.jarg.resources;


import com.fasterxml.jackson.databind.ObjectMapper;
import it.vitalegi.jarg.auth.model.Auth;
import it.vitalegi.jarg.resource.TokenResource;
import lombok.extern.log4j.Log4j2;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;

import java.util.Base64;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@Log4j2
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
@ActiveProfiles("test")
public class TokenTests extends RestResource {

    @Test
    void given_validCredentials_when_tokenAccess_then_shouldBeAuthenticated() throws Exception {
        var auth = user(USER_1);

        var response = tokenAccessOk(auth).andReturn().getResponse();
        var cookie = response.getCookie(TokenResource.AUTH_COOKIE);
        assertNotNull(cookie, "tokenAccess should set AUTH cookie");

        String payload = mockMvc.perform(get("/auth/identity").cookie(cookie)) //
                .andExpect(status().isOk()).andReturn().getResponse().getContentAsString();
        var out = objectMapper.readValue(payload, Auth.class);
        assertEquals(USER_1, out.getSubject());
    }

    @Test
    void given_invalidCredentials_when_tokenAccess_then_shouldNotGenerateCookie() throws Exception {
        var response = mockMvc.perform(auth(post("/token/access"), "unknown", "unknown")) //
                .andExpect(status().is(401)).andReturn().getResponse();
        var cookie = response.getCookie(TokenResource.AUTH_COOKIE);
        assertNull(cookie, "tokenAccess should NOT set AUTH cookie");
    }

    @Test
    void given_validCredentials_when_tokenRefresh_then_shouldRegenerateCookie() throws Exception {
        var auth = user(USER_1);

        var response = tokenAccessOk(auth).andReturn().getResponse();
        var cookie = response.getCookie(TokenResource.AUTH_COOKIE);
        assertNotNull(cookie, "tokenAccess should set AUTH cookie");

        var response2 = tokenRefreshOk(auth).andReturn().getResponse();
        var cookie2 = response2.getCookie(TokenResource.AUTH_COOKIE);
        assertNotNull(cookie2, "tokenRefresh should set AUTH cookie");
    }

    MockHttpServletRequestBuilder auth(MockHttpServletRequestBuilder builder, String username, String password) {
        var auth = username + ":" + password;
        builder.header("Authorization", "Basic " + Base64.getEncoder().encodeToString(auth.getBytes()));
        return builder;
    }


}