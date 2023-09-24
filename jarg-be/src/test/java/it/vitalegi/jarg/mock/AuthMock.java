package it.vitalegi.jarg.mock;

import it.vitalegi.jarg.auth.model.Auth;
import jakarta.servlet.http.Cookie;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Service;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.RequestPostProcessor;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@Profile("it")
@Service
public class AuthMock extends BaseMock {

    public ResultActions identity() throws Exception {
        return mockMvc.perform(get("/auth/identity"));
    }

    public Auth identityOk(Cookie cookie) throws Exception {
        var payload = payload(mockMvc.perform(get("/auth/identity").cookie(cookie)) //
                .andExpect(status().isOk()));
        return objectMapper.readValue(payload, Auth.class);
    }

    public Auth identityOk() throws Exception {
        return payloadJson(identity().andExpect(status().isOk()), Auth.class);
    }

    public Integer accountId(RequestPostProcessor user) throws Exception {
        var auth = payloadJson(mockMvc.perform(get("/auth/identity").with(user)), Auth.class);
        return auth.getAccountId();
    }
}
