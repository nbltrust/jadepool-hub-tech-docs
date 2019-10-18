## BTC全节点以及insight-api部署文档

1. 建议服务器配置：

> 4核8G内存800G硬盘，ubuntu16.04

2. 安装步骤：

```
sudo useradd -m -r  bitcore
su - bitcore
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash
nvm use v4
npm install -g bitcore
bitcore create mynode
cd mynode/
bitcore install insight-api insight-ui
```

3. 启动:
```
nohup bitcored > bitcored. log 2>&1 &
```