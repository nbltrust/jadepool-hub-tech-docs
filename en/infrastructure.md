<br>

![](image/infrastructure.png)

### Master

Jadepool Hub's chief command process. The whole system only has one "master" process.

### Agent

The process that runs managing each individual server. Each server only has one "agent" process.

### Worker

The process that processes requests or monitors blockchain. There can be multiple "worker" processes running on server, either with "master" or "agent" process.
