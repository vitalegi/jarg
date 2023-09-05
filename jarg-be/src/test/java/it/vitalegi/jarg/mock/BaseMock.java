package it.vitalegi.jarg.mock;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;

import java.io.UnsupportedEncodingException;

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
