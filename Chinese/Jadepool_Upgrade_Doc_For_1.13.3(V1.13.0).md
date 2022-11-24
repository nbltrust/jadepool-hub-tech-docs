**V1.13.0** to **V1.13.3**

## 测试环境升级步骤：

0. 安装node v16.18.0

  ```
    nvm install 16.18.0

    //获取node16路径
    nvm which 16.18.0
    -> /Users/nemo/.nvm/versions/node/v16.18.0/bin/node  

    // 恢复使用node14
    nvm use v14.17.0
    nvm alias default 14.17.0
  ```

1. 关闭所有链进程

2. 关停瑶池 pm2 stop，stop完毕后pm2 kill

3. 程序和数据库备份

4. 替换程序版本

5. 恢复之前jadepool-hub/config下面的local配置（主要是数据库配置，如果数据库配在seed里，忽略此步骤）

6. 恢复jadepool-hub/lib和jadepool-hub/lib/seed-loader和jadepool-hub/lib/data-loader下的配置（go-node-ffi.so/server.data) 

7. 在启动脚本中jadepool-hub下添加环境变量JP_LATEST_NODE_PATH，填入上述获取到的node v16.18.0的路径，

   ```
    - cwd: ./
      name: jadepool-hub
      script: bin/master.js
      watch: false
      kill_timeout: 300000
      env:
        NODE_ENV: dev
        JP_LATEST_NODE_PATH: /Users/nemo/.nvm/versions/node/v16.18.0/bin/node
   ```
8. 如果是多机环境部署，需要在agent机器安装node16（步骤同0）,并在agent机器的yml启动文件中也添加JP_LATEST_NODE_PATH

9. 启动瑶池


****

## 生产环境升级步骤：

0. 安装node v16.18.0

  ```
    nvm install 16.18.0

    //获取node16路径
    nvm which 16.18.0
    -> /Users/nemo/.nvm/versions/node/v16.18.0/bin/node  

    // 恢复使用node14
    nvm use v14.17.0
    nvm alias default 14.17.0
  ```

1. 关闭所有链进程

2. 关停瑶池 pm2 stop，stop完毕后pm2 kill

3. 程序和数据库备份

4. 替换程序版本

5. 恢复之前jadepool-hub/config下面的local配置（主要是数据库配置，如果数据库配在seed里，忽略此步骤）

6. 恢复jadepool-hub/lib和jadepool-hub/lib/seed-loader和jadepool-hub/lib/data-loader下的配置（go-node-ffi.so/server.data) 

7. 在启动脚本中jadepool-hub下添加环境变量JP_LATEST_NODE_PATH，填入上述获取到的node v16.18.0的路径

   ```
    - cwd: ./
      name: jadepool-hub
      script: bin/master.js
      watch: false
      kill_timeout: 300000
      env:
        NODE_ENV: production
        JP_LATEST_NODE_PATH: /Users/nemo/.nvm/versions/node/v16.18.0/bin/node
   ```

8. 如果是多机环境部署，需要在agent机器安装node16（步骤同0）,并在agent机器的yml启动文件中也添加JP_LATEST_NODE_PATH

9. 启动瑶池
