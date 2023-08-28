# README

## Prerequisites

- JDK 17
- Maven

```
$env:M2_HOME = 'C:\a\software\apache-maven-3.9.2'
$env:JAVA_HOME = 'C:\a\software\jdk-20.0.1'
$env:PATH = $env:M2_HOME + '\bin;' + $env:JAVA_HOME + '\bin;' + $env:PATH
```

## Compile

```bash
mvn clean package
```

## Run

```bash
#java -jar "-Dspring.profiles.active=prod" ./target/jarg-0.0.1.jar

./mvnw spring-boot:run
```

## OpenApi definition

| Description  | Local                                                       | Prod                                                        |
|--------------|-------------------------------------------------------------|-------------------------------------------------------------|
| OpenApi WEB  | [/swagger-ui/](http://localhost:8080/swagger-ui/index.html) | [/swagger-ui/](http://localhost:8081/swagger-ui/index.html) |
| OpenApi JSON | [/v3/api-docs](http://localhost:8080/v3/api-docs)           | [/v3/api-docs](http://localhost:8081/v3/api-docs)           |
| OpenApi YAML | [/v3/api-docs.yaml](http://localhost:8080/v3/api-docs.yaml) | [/v3/api-docs.yaml](http://localhost:8081/v3/api-docs.yaml) |
