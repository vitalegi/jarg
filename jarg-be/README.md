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

#### Certificate

```bash
$env:APP_JWT_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCtZGFVhW1hYlpL/xtxCiD4gSnfew6+8pU4B+exm2bRHMRJoEaU/fE+O7zoeOpTFudzxVY5pua9MsYAYtKggQGjasGCYAakY762Ts8luTRNSWMcoKc4rW7PLkYm/uBpXkNAuxSRRWntVyudv0JUXAqSPkQkd7ZWJuIaBfI2KDUpVpC8z0AHx71DfmTmG32h/CuNZksjL/zIgMzosawvDEsbK8cW0wHS5S76N2X6B4fCKm5PeXpHue7Rg8v7nCQxiT4IUmZBjEGKc03yqiFPPB21bEm+4il6ee7KBrH5UPAhI2V+vDXxOgzIeLUp0TLOeoFstuihn7afJrkPzuGNPqnXAgMBAAECggEACnYq10BIfrPdSIY5BM4nJMc/nFpuOSrQF67bwGAPc+DSnlybau7oHiii4mXf7CkkHYc+XMEgsoanOAETve0QCROZCaw7NQedoJ31qqGCMdg9MM4n+L1Mw8Gs0uUq62tCuduaceoTFOe0W9KyhlN9VyCG96pPZ+L1s7tAchsP8Lv3fkjX6YVs5W1mj3KNoyPTrW/EbnQY7pI6xTq2U6qUZK14oAqfVxBuF5Xyopjc1uGz5Bsx0GzSCtbOEpmVH6mjy4cJBL2t0hJtY5PWQOqEWO0qfS3UJdkm6esOALJQV+ykzskjvJk6Vh9fvt0cPEkQOXoroswsXr/UJUrpVTvX5QKBgQDzj9w2DV7L9XBFY/qz+7DSneFWm96Nmcq5xexQU6Y/P9+rsX8FfNDMbM0nbBaIXhps4+iH3HzjtBfpNgBqxcjDfl9TAL6ICwQPUTOvUM1YTOzEJtG6g6ek2XWC+yNOiR4dqNpcqg/j9u47FwQOIgGqXIU2XWNsQDLLNjRGPMK1XQKBgQC2PyyJ36ZSvXep8m0c4mCHoTp9MfF+jDhpCkRr/FCqt2ge4Vi69Nzx7taNzmyl2Q8f6kgxbTGNyTaFzwzxe3TPGjoVTpd0x5hIX8G1M3teMRmPFrYFm2AyXoA0ajkAahZNsDo7Dhubh3Zv3zumsV+A+b8NhbDpfWEiQCxBxFxUwwKBgQDuJavb7hbStpmgP7HSajbquRSr6pwhOE7QdoYpxKC5F2tMJbFdXD2MpJW0BivCCsEr12x161DyFBWNIhAmVl2HSPlL315tBthhYbR3pzohLJYU9R/8jt5MgZQ1DfnnwIqB1agtEtuWussVW9vLNdULDovyLD4aimsf51AVnTOEwQKBgAfoneotxm34wuShHJMQT9gS6xLbw/sV4qzMQUPeYzHFW8NbTBpw3dWx46Wru5NG5B0icZeTgX8BqFgOMCWakesa3EJocrIipz0cyq8uWMAxqUZIWgXMRFRrPW0I3whhki4045IEfrY1HrKkIVaOg/J45A2WK6M2SazO1BzWhJs5AoGBAI3XDf3uBmmdRjF+yYtlcnmOaRqSkHlq9AdI6vDkjI5FGGXPErbjM7jm2lr6wI9enkvDg6d8ex7rH7c6wVRxKl7Q5qiDR0SscBF56G93GhhEq0iP5e57GGCbS1bOjyffK3OHBaUDM8t5f4VegTKtHGmgvm4NjhWRLssPGHQU9wB1-----END PRIVATE KEY-----"
$env:APP_JWT_PUBLIC_KEY="-----BEGIN PUBLIC KEY-----MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEArWRhVYVtYWJaS/8bcQog+IEp33sOvvKVOAfnsZtm0RzESaBGlP3xPju86HjqUxbnc8VWOabmvTLGAGLSoIEBo2rBgmAGpGO+tk7PJbk0TUljHKCnOK1uzy5GJv7gaV5DQLsUkUVp7Vcrnb9CVFwKkj5EJHe2VibiGgXyNig1KVaQvM9AB8e9Q35k5ht9ofwrjWZLIy/8yIDM6LGsLwxLGyvHFtMB0uUu+jdl+geHwipuT3l6R7nu0YPL+5wkMYk+CFJmQYxBinNN8qohTzwdtWxJvuIpennuygax+VDwISNlfrw18ToMyHi1KdEyznqBbLbooZ+2nya5D87hjT6p1wIDAQAB-----END PUBLIC KEY-----"
```

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

##### Env
```
$env:DATASOURCE_URL = 'jdbc:postgresql://localhost:5433/jarg'
$env:DATASOURCE_USERNAME = 'jarg001'
$env:DATASOURCE_PASSWORD = 'password001'
```

#### Run

```bash
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
