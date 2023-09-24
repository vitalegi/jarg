package it.vitalegi.jarg.resource;

import it.vitalegi.jarg.auth.AuthService;
import it.vitalegi.jarg.util.StringUtil;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.Instant;
import java.util.stream.Collectors;

@Log4j2
@RestController
@RequestMapping("/token")
public class TokenResource {

    public static final String AUTH_COOKIE = "auth";

    public static final int AUTH_DURATION = 60 * 60 * 24 * 7;

    @Value("${security.auth.jwt.cookie.domain}")
    String cookieDomain;

    @Autowired
    JwtEncoder encoder;

    @Autowired
    AuthService authService;

    @PostMapping("/access")
    public void token(Authentication authentication, HttpServletResponse response) {
        var scope = getScope(authentication);
        var jwt = buildJwt(authentication.getName(), scope);
        response.addCookie(auth(jwt));
    }

    @PostMapping("/refresh")
    public void renew(Authentication authentication, HttpServletResponse response) {
        var subject = authService.getSubject();
        var scope = getScope(authentication);
        var jwt = buildJwt(subject, scope);
        response.addCookie(auth(jwt));
    }

    protected String getScope(Authentication authentication) {
        return authentication.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.joining(" "));
    }

    protected String buildJwt(String subject, String scope) {
        var now = Instant.now();
        JwtClaimsSet claims = JwtClaimsSet.builder() //
                .issuer("self") //
                .issuedAt(now) //
                .expiresAt(now.plusSeconds(AUTH_DURATION)) //
                .subject(subject) //
                .claim("scope", scope) //
                .build();
        return encoder.encode(JwtEncoderParameters.from(claims)).getTokenValue();
    }

    protected Cookie auth(String jwt) {
        var cookie = new Cookie(AUTH_COOKIE, jwt);
        cookie.setSecure(true);
        cookie.setPath("/");
        cookie.setHttpOnly(true);
        cookie.setMaxAge(AUTH_DURATION);
        cookie.setAttribute("SameSite", "Lax");
        if (StringUtil.isNotNullOrEmpty(cookieDomain)) {
            cookie.setDomain(cookieDomain);
        }
        return cookie;
    }
}