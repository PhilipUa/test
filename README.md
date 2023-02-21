
## AWS Services

```bash
1. create route 53
2. create certiface domain
3. create user pool
4. create secret manager
```

## Deploy to AWS
```bash
$ sls create_domain

$ sls deploy

```

## Docker app installation Local
```bash

$ docker build --platform=linux/amd64 -t <image tag name> .

$ docker run -v $HOME/.aws:/root/.aws -p 9000:8080 <image tag name>

$ curl -XPOST "http://localhost:9000/2015-03-31/functions/function/invocations" -d '{}'

```
