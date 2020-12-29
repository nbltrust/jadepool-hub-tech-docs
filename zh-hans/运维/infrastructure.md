<br>

![](image/infrastructure.png)

<br>

### Master服务

Jadepool Hub系统的总指挥进程。整个系统只有一个Master进程。

### Agent服务

分管每个服务器的代理进程。每个服务器只有一个Agent进程。Agent进程管理Worker进程。

### Worker服务

负责处理业务的最底层进程。Worker进程可以有多个，可以起在Master服务所在服务器或Agent服务所在服务器。基于当前的代码实现，每一条区块链使用单独一个Worker进程。
