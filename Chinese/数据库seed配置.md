## seed
### data
```bash
key = MONGO_CFG
value = default/config/sweep/audit

key = MONGO_CFG:config
value = mongodb://jadepool:pwd@127.0.0.1/jadepool-cfg-prod

key = MONGO_CFG:default
value = mongodb://jadepool:pwd@127.0.0.1/jadepool-BN-prod
key = MONGO_CFG:audit


#记录每次热转冷数据，开启该功能后如不单独配置则会记录到default配置的库中
key = MONGO_CFG:sweep
value = mongodb://jadepool:pwd@127.0.0.1/jadepool-sweep-prod

key = REDIS_CFG
value = default

key = REDIS_CFG:default
value = redis://:pwd@127.0.0.1:6379
```

### config
```bash
key = client
value = 127.0.0.1
```



## redis AWS TLS 配置方式
```bash
"rediss://:passwprd@host:port"


"redis": {
    "default": {
      "host": "127.0.0.1",
      "port": "6379",
      "password:"xxx",
      "tls":{}
    }
  }
```
