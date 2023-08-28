package it.vitalegi.jarg.config;

import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Log4j2
@Configuration
@EnableWebSecurity
public class SecurityConfig {
    @Autowired
    CorsConfig config;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.authorizeHttpRequests(r -> r.requestMatchers(HttpMethod.OPTIONS).permitAll() //
                                         .requestMatchers("/favicon.ico").permitAll() //
                                         .requestMatchers("/v3/api-docs.yaml", "/v3/api-docs", "/v3/api-docs/*",
                                                 "/swagger-ui/**")
                                         .permitAll() //
                                         .anyRequest().permitAll());
        http.cors(c -> c.configurationSource(corsConfigurationSource()));
        return http.build();
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
}
