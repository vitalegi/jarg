package it.vitalegi.jarg.config;

import com.nimbusds.jose.jwk.JWK;
import com.nimbusds.jose.jwk.JWKSet;
import com.nimbusds.jose.jwk.RSAKey;
import com.nimbusds.jose.jwk.source.ImmutableJWKSet;
import com.nimbusds.jose.jwk.source.JWKSource;
import com.nimbusds.jose.proc.SecurityContext;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.converter.RsaKeyConverters;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtEncoder;
import org.springframework.security.oauth2.server.resource.web.BearerTokenAuthenticationEntryPoint;
import org.springframework.security.oauth2.server.resource.web.access.BearerTokenAccessDeniedHandler;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.io.ByteArrayInputStream;
import java.security.interfaces.RSAPrivateKey;
import java.security.interfaces.RSAPublicKey;

@Log4j2
@Configuration
@EnableWebSecurity
public class SecurityConfig {
    // JWT auth: https://github.com/spring-projects/spring-security-samples/blob/main/servlet/spring-boot/java/jwt/login/src/test/java/example/web/HelloControllerTests.java
    @Autowired
    CorsConfig config;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        // @formatter:off
        http.authorizeHttpRequests(r -> r.requestMatchers(HttpMethod.OPTIONS).permitAll()
                .requestMatchers("/favicon.ico").permitAll()
                .requestMatchers("/v3/api-docs.yaml", "/v3/api-docs", "/v3/api-docs/*", "/swagger-ui/**").permitAll()
                .requestMatchers("/token/access").permitAll()
                .anyRequest().authenticated()
        )
                .csrf(csrf -> csrf.disable())
                .httpBasic(Customizer.withDefaults())
                .oauth2ResourceServer(oauth2 -> oauth2.jwt(Customizer.withDefaults()))
                .sessionManagement((session) -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .exceptionHandling((exceptions) -> exceptions
                        .authenticationEntryPoint(new BearerTokenAuthenticationEntryPoint())
                        .accessDeniedHandler(new BearerTokenAccessDeniedHandler()))
                .cors(c -> c.configurationSource(corsConfigurationSource()));
        return http.build();
        // @formatter:on
    }

    @Bean
    UserDetailsService users() {
        // @formatter:off
        return new InMemoryUserDetailsManager(
                User.withUsername("user")
                        .password("{noop}password")
                        .authorities("app")
                        .build()
        );
        // @formatter:on
    }

    @Bean
    JwtDecoder jwtDecoder(@Value("${security.auth.jwt.publicKey}") String publicKey) {
        var pub = loadPublicKey(publicKey);
        return NimbusJwtDecoder.withPublicKey(pub).build();
    }

    @Bean
    JwtEncoder jwtEncoder(@Value("${security.auth.jwt.publicKey}") String publicKey, @Value("${security.auth.jwt.privateKey}") String privateKey) {
        var pub = loadPublicKey(publicKey);
        var pk = loadPrivateKey(privateKey);
        JWK jwk = new RSAKey.Builder(pub).privateKey(pk).build();
        JWKSource<SecurityContext> jwks = new ImmutableJWKSet<>(new JWKSet(jwk));
        return new NimbusJwtEncoder(jwks);
    }

    CorsConfigurationSource corsConfigurationSource() {
        log.info("CORS configuration");
        log.info("allowedOrigins={}", config.getAllowedOrigins());
        log.info("allowedMethods={}", config.getAllowedMethods());
        log.info("allowCredentials={}", config.getAllowCredentials());
        log.info("allowedHeaders={}", config.getAllowedHeaders());
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(config.getAllowedOrigins());
        configuration.setAllowedMethods(config.getAllowedMethods());
        configuration.setAllowCredentials(config.getAllowCredentials());
        configuration.setAllowedHeaders(config.getAllowedHeaders());
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    private RSAPublicKey loadPublicKey(String publicKey) {
        publicKey = publicKey.replace("KEY-----", "KEY-----\n").replace("-----END", "\n-----END");
        return RsaKeyConverters.x509().convert(new ByteArrayInputStream(publicKey.getBytes()));
    }

    private RSAPrivateKey loadPrivateKey(String privateKey) {
        privateKey = privateKey.replace("KEY-----", "KEY-----\n").replace("-----END", "\n-----END");
        return RsaKeyConverters.pkcs8().convert(new ByteArrayInputStream(privateKey.getBytes()));
    }
}
