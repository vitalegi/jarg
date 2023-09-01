package it.vitalegi.jarg.resource;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.stream.Collectors;

import it.vitalegi.jarg.auth.AuthService;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Log4j2
@RestController
@RequestMapping("/token")
public class TokenResource {

    @Autowired
    JwtEncoder encoder;

    @Autowired
    AuthService authService;

    @PostMapping("/access")
    public String token(Authentication authentication) {
        var scope = getScope(authentication);
        return buildJwt(authentication.getName(), scope);
    }

    @PostMapping("/refresh")
    public String renew(Authentication authentication) {
        var subject = authService.getSubject();
        var scope = getScope(authentication);
        return buildJwt(subject, scope);
    }

    protected String getScope(Authentication authentication) {
        return authentication.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.joining(" "));
    }

    protected String buildJwt(String subject, String scope) {
        var now = Instant.now();
        JwtClaimsSet claims = JwtClaimsSet.builder().issuer("self").issuedAt(now).expiresAt(now.plus(1, ChronoUnit.DAYS)).subject(subject).claim("scope", scope).build();
        return this.encoder.encode(JwtEncoderParameters.from(claims)).getTokenValue();
    }
}