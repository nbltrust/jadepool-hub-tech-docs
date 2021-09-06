### 环境准备及依赖组件安装
最基础的一套Jadepool Hub,需要启动这些服务:
- Jadepool Hub服务可以部署在单台服务器上,也可以以微服务的方式部署到多台服务器上。
- mongo数据库建议部署在单独一台服务器上,建议做主从，从库只读，用来做日常查询、问题调查等。
- redis数据库。
- consul用于服务发现。
- seed有条件也建议单独部署在一台机器上，IP白名单配置时需要配置外网IP，并确保端口对Jadepool Hub服务器开放。
- 全节点需要提前准备好，因为有些链的全节点需要同步很久。

建议将这些服务放在一个局域网中，外层配置防火墙。
本文将以最简的方式(部署在单台服务器)来介绍整个部署过程。如需微服务的方式,请参考进一步的文档。


1. 建议服务器配置：

> 4核8G内存2M带宽以上，ubuntu16.04

2. 预先安装：

* 增加用户jadepool

```
useradd -r -m jadepool
su - jadepool
```

* 安装node及pm2工具

```
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash  //执行完上述命令后，会有提示，配置nvm命令的环境变量
nvm install 8.16.0
npm install pm2 -g    //全局安装pm2
sudo apt-get install screen      //安装screen
```

* 安装mongo

```
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 9DA31620334BD75D9DCB49F368818C72E52529D4
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/4.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org=4.0.10 mongodb-org-server=4.0.10 mongodb-org-shell=4.0.10 mongodb-org-mongos=4.0.10 mongodb-org-tools=4.0.10

```

```
// 启动mongod
sudo service mongod start
```
请自行设置数据库用户名密码，和配置主从。

* 安装redis(5.0版本以上)
```bash
sudo apt-get install redis-server
sudo systemctl enable redis-server.service
```

* 安装consul, 需要在hub master和agent上分别安装consul
```bash
wget https://releases.hashicorp.com/consul/1.6.0/consul_1.6.0_linux_amd64.zip
sudo apt install unzip
unzip consul_1.6.0_linux_amd64.zip
sudo mv consul /usr/bin/
```

### 部署Jadepool Hub 
1. 请在服务器新建工作目录，并将收到的Jadepool Hub版本放到工作目录，为了方便描述用$WORKSPACE表示工作目录：

```
cd $WORKSPACE
tar -xzvf jadepool-hub-V0.13.0-alpha.4-full.tar.gz

tar -xzvf jadepool-hub-admin-V0.13.0-alpha.4.tar.gz

tar -xzvf jadepool-hub-admin-fe-V0.13.0-alpha.4.tar.gz

tar -xzvf seed-R1.2.1.190121.tar.gz
```

2. 修改数据库连接方式

vim ./jadepool-hub/config/local-production.json
```
{
  "mongo": {
    "default": "mongodb://用户名:密码@ip/jadepool-BN-prod?replicaSet=replSet",
    "config": "mongodb://用户名:密码@ip/jadepool-cfg-prod?replicaSet=replSet",
    "mubsub": "mongodb://用户名:密码@ip/jadepool-mubsub-prod?replicaSet=replSet"
  },
  "redis":{
      "default": {
        "host": "127.0.0.1",
        "port": "6379"
        }
  },
  "logLevel": "NOTICE",
  "logColors": "off"
}
```

vim ./jadepool-hub-admin/config/local-production.json
```
{
  "mongo": {
    "default": "mongodb://用户名:密码@ip/jadepool-BN-prod?replicaSet=replSet",
    "config": "mongodb://用户名:密码@ip/jadepool-cfg-prod?replicaSet=replSet",
    "mubsub": "mongodb://用户名:密码@ip/jadepool-mubsub-prod?replicaSet=replSet"
  },
  "redis":{
      "default": {
        "host": "127.0.0.1",
        "port": "6379"
        }
  },
  "logLevel": "NOTICE",
  "logColors": "off"
}
```

3. 新建pm2配置文件

vim pm2.config.yml

```
apps:
  - cwd: ./jadepool-hub/
    script: build/index.bundle.js
    watch: false
    name: jadepool-hub
    kill_timeout: 300000
    error_file : ./logs/pm2-jadepool-hub-error.log
    out_file : ./logs/pm2-jadepool-hub-out.log
    env:
      NODE_ENV: production
      JP_MODE: app
      JP_HOST: 127.0.0.1
      JP_AUTO_START: false

  - cwd: ./jadepool-hub-admin/
    script: build/index.bundle.js
    watch: false
    name: jadepool-hub-admin
    kill_timeout: 300000
    error_file : ./logs/pm2-jadepool-hub-admin-error.log
    out_file : ./logs/pm2-jadepool-hub-admin-out.log
    env:
      NODE_ENV: production

  - cwd: ./jadepool-hub-admin-fe/
    name: jadepool-hub-admin-fe
    script: node_modules/.bin/nuxt
    args: 'start --spa'
    watch: false
    error_file : ./logs/pm2-jadepool-hub-admin-fe-error.log
    out_file : ./logs/pm2-jadepool-hub-admin-fe-out.log
```


4. 配置seed
* 初始化seed
```
cd ./R1.2.1.190121
mkdir data
./seed --path=./data/                    // 初始化seed,该密码十分关键，请让组织中领导或关键角色设置；请务必记住设置的密码，忘记密码将不能恢复；
```
Example:
```shell
root@iZuf630rhzsgifukuqati2Z:/home/jadepool/R1.2.1.190121# ./seed --path=./data/
data path: "./data/", port: "8899".
lock file successfully
The seed has not been initialized, please type "yes" to continue.
-> yes
Input password first time.
->
Input password again.
->
Initialization finished. Please start the server again.
```

* 设置冷钱包地址
设置冷钱包地址,需要将支持的链都需要配置;
> ./seed --path=./data/ --data

Example:
```
root@iZuf630rhzsgifukuqati2Z:/home/jadepool/R1.2.1.190121# ./seed --path=./data/ --data
data path: "./data/", port: "8899".
Please input passowrd.
->
Password is correct.
config.json md5[99914b932bd37a50b983c5e7c90ae93b] pass check
data.json md5[99914b932bd37a50b983c5e7c90ae93b] pass check
seed.json md5[c974f57e1093e3e5677f7626d3f44967] pass check
You are set the data now.
Please input the name first.
-> BTC
Please input the data.
-> mkujRHixR3LJMHrKPFKXshWtPW1Z5ecoup
BTC:mkujRHixR3LJMHrKPFKXshWtPW1Z5ecoup
Setting data finished. Please start the server again.
```

* 设置IP白名单
seed和Jadepool Hub程序部署在同一台机器的话白名单中加入127.0.0.1即可：
> ./seed --path=./data/ --config

Example:
```
root@iZuf630rhzsgifukuqati2Z:/home/jadepool/R1.2.1.190121# ./seed --path=./data/ --config
data path: "./data/", port: "8899".
Please input passowrd.
->
Password is correct.
config.json md5[99914b932bd37a50b983c5e7c90ae93b] pass check
data.json md5[ba7cdc200b7933d353aaa3d3bdf27d97] pass check
seed.json md5[c974f57e1093e3e5677f7626d3f44967] pass check
You are set the config now.
Please input the name first.
-> client
Please input the config.
-> 127.0.0.1
client:127.0.0.1
Setting config finished. Please start the server again.
```

* 查看刚才的设置
> ./seed --path=./data/ --list 

Example:
```
root@iZuf630rhzsgifukuqati2Z:/home/jadepool/R1.2.1.190121# ./seed --path=./data/ --list
data path: "./data/", port: "8899".
Please input passowrd.
->
Password is correct.
config.json md5[31460fd0a6fc20712927d905688a9a76] pass check
data.json md5[80ed94cc9760a16f1d7822f9626cc1f3] pass check
seed.json md5[c974f57e1093e3e5677f7626d3f44967] pass check
The data list is:
EOS: "hotwallet/5KBefyZPfqRH6pJiaGFgua7dupA4sQeVomzq9QssyBWX14udekE/coldwallet"
ETH: "0x0050AbF889f6EeAC47801aC7bDa27e2E1a1eEaB5"
Irisnet: "iaa1u0smu2au9ar64v3755cacxxkamcfd5lexcshzw"
LTC: "mmsFKCZWY42RiEg6HFFzYNHRYbyuG7svs5"
USDT: "msQKET8mMYS5p4xbuqgGX9fAHV2rW39k66"
BTC: "mkujRHixR3LJMHrKPFKXshWtPW1Z5ecoup"
Cosmos: "cosmos1u0e3p6tr6h2ugdptjdpj5a5usv2lznyec9fw5y"
The config list is:
client: "127.0.0.1"
```

* 将提供的R1.2.1.190121.tar.gz中的go-node-ffi.so文件复制到jadepool-hub/lib文件夹下:
```bash
cp ./R1.2.1.190121/go-node-ffi.so ./jadepool-hub/lib/
```

* 修改jadepool-hub/lib/seed-loader/server.data中的地址为seed所在机器的地址:
```bash
vi ./jadepool-hub/lib/seed-loader/server.data

# 将地址改为seed服务器所在的ip以及端口
```

* master和agent上分别安装consul
```bash
# download then install
wget https://releases.hashicorp.com/consul/1.6.0/consul_1.6.0_linux_amd64.zip
sudo apt install unzip
unzip consul_1.6.0_linux_amd64.zip
sudo mv consul /usr/bin/

# start consul server
mkdir /etc/consul.d
nohup consul agent -server -bootstrap-expect=1 -data-dir=/tmp/consul -node=master -bind=172.31.231.213 -config-dir=/etc/consul.d -client 0.0.0.0 -ui > ./consul-server.log 2>&1 &

# start consul agent1
mkdir /etc/consul.d
nohup consul agent -data-dir=/tmp/consul -node=agent1 -bind=172.19.2.35 -config-dir=/etc/consul.d > ./consul-agent1.log 2>&1 &
# agent1 join consul cluster
consul join 172.19.2.135

# start consul agent2
mkdir /etc/consul.d
nohup  consul agent -data-dir=/tmp/consul -node=agent2 -bind=172.19.2.144 -config-dir=/etc/consul.d > ./consul-agent2.log 2>&1 &
# agent2 join consul cluster
consul join 172.19.2.135
```
consul文档可以参考[官方文档](https://www.consul.io/docs/index.html)

### 启动
1. 启动seed
```
cd $WORKSPACE
screen -S seed
cd R1.2.1.190121
./seed --path=./data/
```
2. 启动Jadepool Hub
```
cd $WORKSPACE
pm2 start pm2.config.yml
```


### 起链，以及通信配置

1. 访问下面链接，初始化admin账号,并登录,请务必记清楚设置的密码
> http://IP:3000

2. 进 高级管理->区块链管理->查看详情(选择您需要开启的链，点击查看详情)->区块链配置->节点配置，修改全节点的地址，如下图：

![image-20190605213249446](https://ws1.sinaimg.cn/large/006tNc79ly1g6434jj82xj31h70u0wga.jpg)

3. 选择您需要的链，点击启用：

![image-20190605213403221](https://ws1.sinaimg.cn/large/006tNc79ly1g64369hasrj31he0u0juc.jpg)

4. 高级管理->进程管理 中，分别启动您需要的链进程和general：

![image-20190605213203676](https://ws3.sinaimg.cn/large/006tNc79ly1g6437wc4j2j31gy0u0n0i.jpg)

5. 回到首页，进入default钱包(或者您希望的那个钱包)，钱包设置->应用管理，点击添加应用，填入应用ID/通信公钥/编码方式等：

![image-20190605213737221](https://ws3.sinaimg.cn/large/006tNc79ly1g643dmm68aj31hm0u0q4e.jpg)

6. 配置回调地址，请将前置应用接收回调消息的地址配入Jadepool Hub：

![image-20190605214113347](https://ws4.sinaimg.cn/large/006tNc79ly1g643ephi2sj31hq0u0jt6.jpg)

7. 前端应用用来接收Jadepool Hub通知的服务，需要配置Jadepool Hub的ECC公钥，Jadepool Hub的ECC公钥在这里查询：
高级管理->Jadepool
![image-20190605214245623](https://ws3.sinaimg.cn/large/006tNc79ly1g643hjuuduj31hh0u00un.jpg)

### 安全架构及建议
1. 整体架构图
   ![image-20190809214245623](https://ws3.sinaimg.cn/large/006tNc79gy1g5tk5kw8mfj30ys0u0aav.jpg)
2. 网络隔离
   安全角度划分了管理区、fullnode区、Jadepool Hub程序及数据库区、冷钱包seed区
   每个区使用单独vpc物理隔离
   可用性角度，可以吧程序和mongo副本集放置在不同可用区
3. 安全组及ACL规则
   每个区域定制单独的安全组，并设置防火墙ACL策略(禁用所有协议，开放固定的ip和服务端口)
4. vpn、堡垒机
   通过vpn线路进行所有的管理操作。需要登录服务器管理，统一使用堡垒机操作，保证所有操作均被记录。
5. 数据库集群级备份策略
   副本集策略，1个是主节点，2个是从节点
   备份策略 每日完备+oplogs
   备份文件上传至对象存储（例如 oss\s3），并定期放到冷存储中做长久保存(例如：Glacier)
6. 监控 elk\zabbix\脚本
   elk监控日志变化的并筛选报错，借助webhook发送报警
   zabbix主要监控系统基础项和程序运行状态
   python脚本定制实时监控脚本（例如监控fullnode块高和同步节点情况）
   报警方式主要集成了微信、邮件   
   
