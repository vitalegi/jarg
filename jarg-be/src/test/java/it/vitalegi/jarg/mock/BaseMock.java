package it.vitalegi.jarg.mock;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import it.vitalegi.jarg.exception.Ex;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import org.springframework.test.web.servlet.request.RequestPostProcessor;

import java.io.UnsupportedEncodingException;
import java.util.List;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

public abstract class BaseMock {

    @Autowired
    protected MockMvc mockMvc;

    @Autowired
    protected ObjectMapper objectMapper;

    public String payload(ResultActions resultActions) throws UnsupportedEncodingException {
        return resultActions.andReturn().getResponse().getContentAsString();
    }

    public <E> E payloadJson(ResultActions resultActions, Class<E> clazz) throws UnsupportedEncodingException, JsonProcessingException {
        var payload = payload(resultActions);
        return objectMapper.readValue(payload, clazz);
    }

    public Ex exception500(ResultActions resultActions) throws Exception {
        resultActions.andExpect(status().is5xxServerError());
        return payloadJson(resultActions, Ex.class);
    }

    public <E> List<E> payloadListJson(ResultActions resultActions, Class<E> clazz) throws UnsupportedEncodingException, JsonProcessingException {
        var payload = payload(resultActions);
        return objectMapper.readValue(payload, new TypeReference<List<E>>() {
        });
    }


    public ResultActions postJson(RequestPostProcessor user, String url, Object request) throws Exception {
        return mockMvc.perform(post(url).with(csrf()).with(user).contentType(MediaType.APPLICATION_JSON).content(objectMapper.writeValueAsString(request)));
    }

    public ResultActions getJson(RequestPostProcessor user, String url) throws Exception {
        return mockMvc.perform(get(url).with(user).contentType(MediaType.APPLICATION_JSON));
    }


    protected MockHttpServletRequestBuilder withJsonPayload(MockHttpServletRequestBuilder builder, Object obj) {
        builder.contentType(MediaType.APPLICATION_JSON);
        var om = new ObjectMapper();
        try {
            builder.content(om.writeValueAsBytes(obj));
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
        return builder;
    }
}
