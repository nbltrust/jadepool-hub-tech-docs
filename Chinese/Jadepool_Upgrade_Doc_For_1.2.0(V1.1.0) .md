**V1.1.0** to **V1.2.0**

## 测试环境升级步骤：

1. 关闭所有链进程

2. 关停瑶池 pm2 stop，stop完毕后pm2 kill

3. 程序和数据库备份

4. 替换程序版本

5. 恢复之前jadepool-hub/config下面的local配置（主要是数据库配置，如果数据库配在seed里，忽略此步骤）

6. 恢复jadepool-hub/lib和jadepool-hub/lib/seed-loader和jadepool-hub/lib/data-loader下的配置（go-node-ffi.so/server.data) 

7. 添加数据库配置

   如果数据库配置在local-dev.json文件中：

   vim local-dev.json，增加sweep数据库配置，用于记录热转冷检测数据，如不单独配置则会记录到default配置的库中

   ```bash
   {
     "mongo": {
       "default": "mongodb://用户名:密码@ip:27017/jadepool-BN-dev",
       "config": "mongodb://用户名:密码@ip:27017/jadepool-cfg-dev",
       "sweep": "mongodb://用户名:密码@ip:27017/jadepool-sweep-dev"
     },
     "redis":{
         "default": {
           "host": "127.0.0.1",
           "port": "6379"
           }
     }
   }
   ```

   如果数据库配置在dataseed中，按照如下key-value配置dataseed

   ```bash
   key = MONGO_CFG
   value = default/config/sweep
   
   key = MONGO_CFG:config
   value = mongodb://jadepool:pwd@127.0.0.1/jadepool-cfg-dev
   
   key = MONGO_CFG:default
   value = mongodb://jadepool:pwd@127.0.0.1/jadepool-BN-dev
   
   key = MONGO_CFG:sweep
   value = mongodb://jadepool:pwd@127.0.0.1/jadepool-sweep-dev
   ```

8. 在启动脚本中添加snapshot服务，NODE_ENV请根据具体环境配置，与其他服务一样

   ```
     - cwd: ./jadepool-hub
       name: jadepool-snapshot
       script: bin/snapshot.js
       exec_mode: "cluster"
       instances: 2
       watch: false
       kill_timeout: 60000
       merge_logs: false
       env:
         NODE_ENV: dev
   ```

9. 启动瑶池


****

## 生产环境升级步骤：

1. 关闭所有链进程

2. 关停瑶池 pm2 stop，stop完毕后pm2 kill

3. 程序和数据库备份

4. 替换程序版本

5. 恢复之前jadepool-hub/config下面的local配置（主要是数据库配置，如果数据库配在seed里，忽略此步骤）

6. 恢复jadepool-hub/lib和jadepool-hub/lib/seed-loader和jadepool-hub/lib/data-loader下的配置（go-node-ffi.so/server.data) 

7. 添加数据库配置

   如果数据库配置在local-production.json文件中：

   vim local-production.json，增加sweep数据库配置，用于记录热转冷检测数据，如不单独配置则会记录到default配置的库中

   ```bash
   {
     "mongo": {
       "default": "mongodb://用户名:密码@ip:27017/jadepool-BN-prod",
       "config": "mongodb://用户名:密码@ip:27017/jadepool-cfg-prod",
       "sweep": "mongodb://用户名:密码@ip:27017/jadepool-sweep-prod"
     },
     "redis":{
         "default": {
           "host": "127.0.0.1",
           "port": "6379"
           }
     },
     "logLevel": "NOTICE"
   }
   ```

   如果数据库配置在dataseed中，按照如下key-value配置dataseed

   ```bash
   key = MONGO_CFG
   value = default/config/sweep
   
   key = MONGO_CFG:config
   value = mongodb://jadepool:pwd@127.0.0.1/jadepool-cfg-prod
   
   key = MONGO_CFG:default
   value = mongodb://jadepool:pwd@127.0.0.1/jadepool-BN-prod
   
   key = MONGO_CFG:sweep
   value = mongodb://jadepool:pwd@127.0.0.1/jadepool-sweep-prod
   ```

8. 在启动脚本中添加snapshot服务，NODE_ENV请根据具体环境配置，与其他服务一样

   ```
     - cwd: ./jadepool-hub
       name: jadepool-snapshot
       script: bin/snapshot.js
       exec_mode: "cluster"
       instances: 2
       watch: false
       kill_timeout: 60000
       merge_logs: false
       env:
         NODE_ENV: production
   ```

9. 启动瑶池
