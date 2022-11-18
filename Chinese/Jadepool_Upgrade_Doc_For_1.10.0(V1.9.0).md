**V1.9.0** to **V1.10.0**

## 测试环境升级步骤：

1. 关闭所有链进程

2. 关停瑶池 pm2 stop，stop完毕后pm2 kill

3. 程序和数据库备份

4. 替换程序版本

5. 恢复之前jadepool-hub/config下面的local配置（主要是数据库配置，如果数据库配在seed里，忽略此步骤）

6. 恢复jadepool-hub/lib和jadepool-hub/lib/seed-loader和jadepool-hub/lib/data-loader下的配置（go-node-ffi.so/server.data) 

7. 在启动脚本中添加jadepool-recon服务，NODE_ENV请根据具体环境配置，与其他服务一样

   ```
     - cwd: ./jadepool-hub
       name: jadepool-recon
       script: bin/recon.js
       exec_mode: "cluster"
       instances: 2
       watch: false
       merge_logs: true
       kill_timeout: 60000
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

7. 在启动脚本中添加jadepool-recon服务，NODE_ENV请根据具体环境配置，与其他服务一样

   ```
     - cwd: ./jadepool-hub
       name: jadepool-recon
       script: bin/recon.js
       exec_mode: "cluster"
       instances: 2
       watch: false
       merge_logs: true
       kill_timeout: 60000
       env:
         NODE_ENV: production
   ```
   
9. 启动瑶池
