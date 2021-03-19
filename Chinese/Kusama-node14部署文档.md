# Kusama-node14部署文档

1. 通过nvm安装node14
```bash
nvm install 14.15.2

# 安装完后自动应用14，切回10
nvm use 10.17.0

# 设置默认使用10.17.0,保证主程序默认用node10启动
nvm alias default 10.17.0

# 找到node14的路径
nvm which 14.15.2
/home/jadepool/.nvm/versions/node/v14.15.2/bin/node
```

2. 修改启动脚本配置，在jadepool-hub任务的env中增加环境变量JP_LATEST_NODE_PATH

  如果kusama进程起在master机器上，则只需要在master启动脚本中修改，如果起在agent上则只需要在agent启动脚本中修改

  增加的环境变量如下配置，路径填入上述查找的node14路径，其他配置保持不变
```bash
#master，找到jadepool-hub，添加JP_LATEST_NODE_PATH
  - cwd: /opt/jadepool/hub/jadepool/jadepool-hub/
    name: jadepool-hub
    script: bin/master.js
    watch: false
    kill_timeout: 300000
    env:
      NODE_ENV: dev
      JP_SECRET: 22b21f748ecd6a735d3c4a53b87db8e6
      JP_LATEST_NODE_PATH: /home/jadepool/.nvm/versions/node/v14.15.2/bin/node 
      
#agent，找到jadepool-hub-agent，添加JP_LATEST_NODE_PATH
  - cwd: ./
    name: jadepool-hub-agent
    script: bin/agent.js
    watch: false
    kill_timeout: 300000
    env:
      NODE_ENV: dev
      JP_LATEST_NODE_PATH: /home/jadepool/.nvm/versions/node/v14.15.2/bin/node 
```
3. 启动瑶池，启动区块链进程

