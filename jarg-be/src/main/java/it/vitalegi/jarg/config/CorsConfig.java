package it.vitalegi.jarg.config;


import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Data
@Configuration
@ConfigurationProperties(prefix = "security.cors")
public class CorsConfig {
    List<String> allowedOrigins;
    List<String> allowedMethods;
    Boolean allowCredentials;
    List<String> allowedHeaders;
}
