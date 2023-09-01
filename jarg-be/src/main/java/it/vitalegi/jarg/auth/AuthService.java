package it.vitalegi.jarg.auth;

import it.vitalegi.jarg.auth.model.Auth;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;

@Log4j2
@Service
public class AuthService {

    public Auth getJwtData() {
        var jwt = getJwt();
        var auth = new Auth();
        auth.setSubject(jwt.getSubject());
        auth.setExpiresAt(jwt.getExpiresAt());
        return auth;
    }

    public String getSubject() {
        return getJwt().getSubject();
    }

    public Jwt getJwt() {
        var authentication = getAuthentication();
        if (authentication.getPrincipal() instanceof Jwt) {
            return (Jwt) authentication.getPrincipal();
        }
        throw new IllegalArgumentException("Auth token is not JWT " + authentication.getPrincipal().getClass());

    }


    public void register() {

    }

    public void login() {

    }

    protected Authentication getAuthentication() {
        return SecurityContextHolder.getContext().getAuthentication();
    }
}
