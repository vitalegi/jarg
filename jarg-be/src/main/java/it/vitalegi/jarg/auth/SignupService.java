package it.vitalegi.jarg.auth;

import it.vitalegi.jarg.auth.model.NewUser;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.UserDetailsManager;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Log4j2
@Service
public class SignupService {

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    UserDetailsManager userDetailsManager;

    public void signup(NewUser newUser) {
        if (userDetailsManager.userExists(newUser.getUsername())) {
            throw new IllegalArgumentException("Username already in use");
        }
        log.info("Signup {}", newUser.getUsername());

        var authorities = new ArrayList<GrantedAuthority>();
        authorities.add(new SimpleGrantedAuthority("USER"));

        var user = new User(newUser.getUsername(), passwordEncoder.encode(newUser.getPassword()), authorities);
        userDetailsManager.createUser(user);
    }
}
