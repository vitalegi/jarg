package it.vitalegi.jarg.auth;

import it.vitalegi.jarg.account.service.AccountService;
import it.vitalegi.jarg.auth.model.Auth;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;

@Log4j2
@Service
public class AuthService {

    @Autowired
    AccountService accountService;

    public Integer getAccountId() {
        var subject = getSubject();
        var accountId = accountService.getAccountId(subject);
        if (accountId == null) {
            log.info("Account is missing, add for {}", subject);
            accountId = accountService.addAccount(subject);
            if (accountId == null) {
                throw new IllegalArgumentException("Subject " + subject + " is unknown");
            }
            return accountId;
        }
        return accountId;
    }

    public Auth getJwtData() {
        var auth = new Auth();
        auth.setSubject(getSubject());
        var jwt = getJwt();
        if (jwt != null) {
            auth.setExpiresAt(jwt.getExpiresAt());
        }
        return auth;
    }

    public String getSubject() {
        var authentication = getAuthentication();
        if (authentication.getPrincipal() instanceof Jwt) {
            return ((Jwt) authentication.getPrincipal()).getSubject();
        }
        if (authentication.getPrincipal() instanceof User) {
            return ((User) authentication.getPrincipal()).getUsername();
        }
        throw new IllegalArgumentException("Can't extract username from " + authentication.getPrincipal().getClass());
    }

    private Jwt getJwt() {
        var authentication = getAuthentication();
        if (authentication.getPrincipal() instanceof Jwt) {
            return (Jwt) authentication.getPrincipal();
        } else {
            log.debug("{} is not a JWT", authentication.getPrincipal());
            return null;
        }
    }

    private Authentication getAuthentication() {
        return SecurityContextHolder.getContext().getAuthentication();
    }
}
