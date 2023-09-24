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

### Remote

```bash
$env:APP_JWT_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----<key>-----END PRIVATE KEY-----"
$env:APP_JWT_PUBLIC_KEY="-----BEGIN PUBLIC KEY-----<key>-----END PUBLIC KEY-----"

java -jar "-Dspring.profiles.active=prod" ./target/jarg-0.0.1.jar
```

### Local

#### Database setup

```
CREATE ROLE jarg001 WITH
LOGIN
NOSUPERUSER
NOCREATEDB
NOCREATEROLE
INHERIT
NOREPLICATION
CONNECTION LIMIT -1
PASSWORD 'password001';
```

```
CREATE DATABASE jarg
WITH
OWNER = jarg001
ENCODING = 'UTF8'
CONNECTION LIMIT = -1
IS_TEMPLATE = False;
```

#### Run

```bash
$env:spring_profiles_active = 'local'
mvn spring-boot:run
```

### Certificate creation

RSA key genenerated with OpenSSL 3 (<https://cryptotools.net/rsagen>, <https://www.ssl.com/it/come/installa-openssl-su-windows-con-cygwin/>)

```
# Create Private Key (PKCS#8)
openssl genrsa -out private.pem

# Create Public Key
openssl rsa -in private.pem -pubout -out public.pem
```


## OpenApi definition

| Description  | Local                                                       | Prod                                                        |
|--------------|-------------------------------------------------------------|-------------------------------------------------------------|
| OpenApi WEB  | [/swagger-ui/](http://localhost:8080/swagger-ui/index.html) | [/swagger-ui/](http://localhost:8081/swagger-ui/index.html) |
| OpenApi JSON | [/v3/api-docs](http://localhost:8080/v3/api-docs)           | [/v3/api-docs](http://localhost:8081/v3/api-docs)           |
| OpenApi YAML | [/v3/api-docs.yaml](http://localhost:8080/v3/api-docs.yaml) | [/v3/api-docs.yaml](http://localhost:8081/v3/api-docs.yaml) |

## Postman

- Create an environment, with key `env` and value:
  - `local` for local environment
- import collection `jarg-be/postman/jarg.postman_collection.json`
- Enjoy :)
