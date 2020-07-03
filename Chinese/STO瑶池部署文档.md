## 瑶池部署文档
### 一 环境准备及依赖组件安装
最基础的一套瑶池,需要启动这些服务:
- 瑶池服务可以部署在单台服务器上,也可以以微服务的方式部署到多台服务器上。
- mongo数据库建议部署在单独一台服务器上,建议做主从，从库只读，用来做日常查询、问题调查等。
- redis数据库。
- consul用于服务发现。
- seed有条件也建议单独部署在一台机器上，IP白名单配置时需要配置外网IP，并确保端口对瑶池服务器开放。
- 全节点需要提前准备好，因为有些链的全节点需要同步很久。

建议将这些服务放在一个局域网中，外层配置防火墙。
本文将以最简的方式(部署在单台服务器)来介绍整个部署过程。如需微服务的方式,请参考进一步的文档。


1. 建议服务器配置：

> 4核8G内存2M带宽以上，ubuntu16.04/centos7

2. 预先安装：

* 增加用户jadepool

```
useradd -r -m jadepool
su - jadepool
```

* 安装node及pm2工具

```
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash  //执行完上述命令后，会有提示，配置nvm命令的环境变量
nvm install 10.17.0
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
wget http://download.redis.io/releases/redis-5.0.0.tar.gz
tar xzf redis-5.0.0.tar.gz
cd redis-5.0.0 
make
```

* 安装consul, 需要在hub master和agent上分别安装consul
```bash
wget https://releases.hashicorp.com/consul/1.6.0/consul_1.6.0_linux_amd64.zip
sudo apt install unzip
unzip consul_1.6.0_linux_amd64.zip
sudo mv consul /usr/bin/
```

### 二 部署瑶池 
1. 请在服务器新建工作目录，并将收到的瑶池版本放到工作目录，为了方便描述用$WORKSPACE表示工作目录：

```
cd $WORKSPACE
tar -xzvf jadepool-hub-V0.15.0-alpha.0-full.tar.gz

tar -xzvf jadepool-hub-admin-V0.15.0-alpha.0.tar.gz

tar -xzvf jadepool-hub-admin-fe-V0.15.0-alpha.0.tar.gz

tar -xzvf seed-R1.2.1.190121.tar.gz
```

2. 修改数据库连接方式

vim ./jadepool-hub/config/local-production.json 

⚠️ NODE_ENV=production会读local-production.json配置

​      NODE_ENV=staging会读local-staging.json配置

​      NODE_ENV=dev会读local-dev.json配置

```
{
  "mongo": {
    "default": "mongodb://用户名:密码@ip:27017/jadepool-BN-prod",
    "config": "mongodb://用户名:密码@ip:27017/jadepool-cfg-prod"
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

vim pm2.config.yml       (master)

⚠️ NODE_ENV启动模式production对应主网，staging/dev对应测试网

```
apps:
  - cwd: ./jadepool-hub/
    name: jadepool-security
    script: bin/security.js
    exec_mode: "cluster"
    instances: 3
    watch: false
    kill_timeout: 60000
    merge_logs: true
    env:
      NODE_ENV: dev
  - cwd: ./jadepool-hub/
    name: jadepool-config
    script: bin/config.js
    exec_mode: "cluster"
    instances: 2
    watch: false
    kill_timeout: 60000
    merge_logs: true
    env:
      NODE_ENV: dev
  - cwd: ./jadepool-hub/
    name: jadepool-health
    script: bin/health.js
    exec_mode: "cluster"
    instances: 1
    watch: false
    kill_timeout: 60000
    merge_logs: true
    env:
      NODE_ENV: dev
  - cwd: ./jadepool-hub/
    name: jadepool-hub
    script: bin/master.js
    watch: false
    kill_timeout: 300000
    env:
      NODE_ENV: dev
  - cwd: ./jadepool-hub/
    name: jadepool-notification
    script: bin/notification.js
    exec_mode: "cluster"
    instances: 2
    watch: false
    kill_timeout: 60000
    env:
      NODE_ENV: dev
  - cwd: ./jadepool-hub/
    name: jadepool-biz-monitor
    script: bin/biz-monitor.js
    exec_mode: "cluster"
    instances: 1
    watch: false
    kill_timeout: 60000
    env:
      NODE_ENV: dev
  - cwd: ./jadepool-hub-admin/
    name: jadepool-hub-admin
    script: bin/main.js
    exec_mode: "cluster"
    instances: 2
    watch: false
    merge_logs: true
    kill_timeout: 300000    
    env:
      NODE_ENV: dev
  - cwd: ./jadepool-hub-admin-fe/
    name: jadepool-hub-admin-fe
    script: node_modules/.bin/nuxt
    args: 'start --spa'
    watch: false
    error_file : ./logs/pm2-jadepool-hub-admin-fe-error.log
    out_file : ./logs/pm2-jadepool-hub-admin-fe-out.log
```



4. 配置seed（可参见seed使用文档https://nbltrust.github.io/jadepool-hub-tech-docs/zh-hans/seed-init.html）
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
seed和瑶池程序部署在同一台机器的话白名单中加入127.0.0.1即可：
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

5. 配置agent（按需）

- agent环境预装依赖
  - 安装node及pm2工具
  -  consul

- agent pm2 配置文件

​       vim pm2.config.yml 

```
apps:
  - cwd: ./jadepool-hub/
    name: jadepool-hub-agent
    script: bin/agent.js
    watch: false
    kill_timeout: 300000
    env:
      NODE_ENV: dev
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



6. 配置cold-signer
- 在离线机器上准备好环境（Mac）
```bash
node 10.17.0
```
- 解压cold-signer.tar.gz
- 启动json-rpc-svr（signer依赖js-signer程序，启动signer前确保js-signer已经启动）
```bash
pm2 start js-signer/json-rpc-svr.js
```
- 初始化signer
> ./signer

Example:
```
➜  cold-signer ./signer --export
data path: "./".
lock file successfully
The signer has not been initialized, please type "yes" to continue.
-> yes
Input password first time.
->
Input password again.
->
Initialization finished. Please start the server again.
```


- 导出根公钥
> ./signer --export

Example:
```
➜  cold-signer ./signer --export
data path: "./".
Please input passowrd.
->
Password is correct.
config.json md5[99914b932bd37a50b983c5e7c90ae93b] pass check
data.json md5[99914b932bd37a50b983c5e7c90ae93b] pass check
seed.json md5[ac88e47bf042a35268783c8cf1a4ee6a] pass check
The extended root public key is: [xpub69PdZy6PeSQvgqJbjCqKdiBseCGhN5N4iPFdyjSymoD6myVQCmkjudRQtWwLVB93gyCg7rj63hgySWiFXvhPoULH5Lx6347NcB6J2LSk7mn]
```

- 在seed里面设置根公钥
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
-> root_xpub
Please input the data.
-> xpub69PdZy6PeSQvgqJbjCqKdiBseCGhN5N4iPFdyjSymoD6myVQCmkjudRQtWwLVB93gyCg7rj63hgySWiFXvhPoULH5Lx6347NcB6J2LSk7mn
root_xpub:xpub69PdZy6PeSQvgqJbjCqKdiBseCGhN5N4iPFdyjSymoD6myVQCmkjudRQtWwLVB93gyCg7rj63hgySWiFXvhPoULH5Lx6347NcB6J2LSk7mn
Setting data finished. Please start the server again.
```


### 三 启动

1. 启动seed
```
cd $WORKSPACE
screen -S seed
cd R1.2.1.190121
./seed --path=./data/
```
2. 启动瑶池
```
cd $WORKSPACE
pm2 start pm2.config.yml
```
3. 跑初始化脚本（⚠️ NODE_ENV启动模式production对应主网，staging/dev对应测试网，根据瑶池的启动模式来配置）
```
NODE_ENV=dev node build/index.bundle.js -m do -a do-wallet-template-import
```



### 四 ChangeLog

- 瑶池启动脚本增加 jadepool-biz-monitor 服务
- 需要在seed配置cold-signer导出的根公钥
- 需要运行钱包初始化脚本
  - 脚本运行完之后会生成运营钱包op_wallet（walletID：MANUAL_OP)
  - 默认配置DSTOKEN代币并且在钱包中开启

- 需要在admin页面的系统配置里设置sudoKey才能调用st相关接口
