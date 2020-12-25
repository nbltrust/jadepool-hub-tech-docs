# services/filecoin-signer部署文档

1. 通过nvm安装node14
```bash
nvm install 14.15.2

# 安装完后自动应用12，切回10
nvm use 10.17.0

# 设置默认使用10.17.0,保证主程序默认用node10启动
nvm alias default 10.17.0

# 找到node14的路径
nvm which 14.15.2
```

2. 新建启动脚本配置（或者在原来的配置文件里添加）
vim start-filecoin-signer.yml
```bash
apps:
  - cwd: /opt/jadepool/hub/jadepool/jadepool-hub/services/filecoin-signer #指定运行路径
    interpreter: /root/.nvm/versions/node/v14.15.2/bin/node  # 指定上述获取的node14的路径
    name: jadepool-filecoin-signer
    script: bin/index.js
    # exec_mode: "cluster"  // 不能用这个模式起
    # instances: 1
    watch: false
    kill_timeout: 60000
    merge_logs: true
    env:
      NODE_ENV: dev # 启动模式对应主程序配置
      JP_DEFAULT_CONSUL: 'http://127.0.0.1:8500' # consul默认在本地可不配置
```
3. pm2 start start-filecoin-signer.yml （或者配置到原来的文件中一起启动）

