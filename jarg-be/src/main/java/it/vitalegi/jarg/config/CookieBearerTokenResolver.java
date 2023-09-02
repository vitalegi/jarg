package it.vitalegi.jarg.config;

import it.vitalegi.jarg.resource.TokenResource;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.oauth2.server.resource.web.BearerTokenResolver;

import java.util.Arrays;

@Log4j2
public class CookieBearerTokenResolver implements BearerTokenResolver {
    @Override
    public String resolve(HttpServletRequest request) {
        var cookies = request.getCookies();
        if (cookies == null) {
            return null;
        }
        var cookie = Arrays.stream(cookies).filter(c -> TokenResource.AUTH_COOKIE.equals(c.getName())).findFirst().orElse(null);
        if (cookie == null) {
            return null;
        }
        return cookie.getValue();
    }
}
