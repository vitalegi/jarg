package it.vitalegi.jarg.resource;


import io.swagger.v3.oas.annotations.Operation;
import it.vitalegi.jarg.auth.AuthService;
import it.vitalegi.jarg.auth.SignupService;
import it.vitalegi.jarg.auth.model.Auth;
import it.vitalegi.jarg.auth.model.NewUser;
import it.vitalegi.jarg.logging.Performance;
import it.vitalegi.jarg.logging.Type;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Log4j2
@RequestMapping("/auth")
@RestController
@Performance(Type.ENDPOINT)
public class AuthResource {

    @Autowired
    AuthService authService;

    @Autowired
    SignupService signupService;

    @GetMapping("/identity")
    public Auth getIdentity() {
        var auth = authService.getJwtData();
        auth.setAccountId(authService.getAccountId());
        return auth;
    }

    @Operation(description = "Register the user")
    @PostMapping("/signup")
    public void register(@RequestBody NewUser newUser) {
        signupService.signup(newUser);
    }
}
