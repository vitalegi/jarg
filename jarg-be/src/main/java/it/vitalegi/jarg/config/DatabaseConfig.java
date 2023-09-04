package it.vitalegi.jarg.config;

import lombok.extern.log4j.Log4j2;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@Log4j2
@Configuration
@EnableJpaRepositories(basePackages = "it.vitalegi")
public class DatabaseConfig {

}
