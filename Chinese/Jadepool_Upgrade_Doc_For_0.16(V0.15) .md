**V0.15.*** to **V0.16.0**

## **BreakingChanges**

- **node需要升级到v14**

## 测试环境升级步骤：

1. 关停瑶池
2. **执行pm2 kill**
3. 程序和数据库备份
4. 替换程序版本
5. 恢复之前jadepool-hub/config下面的local配置（主要是数据库配置，如果数据库配在seed里，忽略此步骤）
6. 恢复jadepool-hub/lib和jadepool-hub/lib/seed-loader下的配置（go-node-ffi.so/server.data) 
7. 恢复jadepool-hub/lib/data-loader下的配置(如未使用8888端口的seed忽略此步骤) 
8. 通过nvm安装node14


```bash
nvm install 14.15.2

# 设置默认使用14.15.2
nvm alias default 14.15.2

# update in-memory PM2 with local PM2
# 如果报错pm2找不到需要重装: npm install -g pm2
pm2 update
```

8. 将启动脚本中filecoin-signer相关的配置删除（此服务已经迁移到主程序代码里，不需要再另外启用，没有配置的请忽略）

9. 清理consul数据（该脚本可在以后升级版本时定期执行，清理脏数据，脚本里的consul ip请自行替换）

   https://github.com/nbltrust/jadepool-hub-tech-docs/blob/master/Chinese/clearConsul.sh

   ```bash
   #!/usr/bin/env bash
   
   ID=$(curl http://127.0.0.1:8500/v1/agent/services |jq -r  '.[].ID')
   
   for var in $ID
   do
     curl --request PUT http://127.0.0.1:8500/v1/agent/service/deregister/${var} 
     echo $var 
   done
   
   echo done
   ```

10. 启动瑶池


****

## 生产环境升级步骤：

1. 关停瑶池
2. **执行pm2 kill**
3. 程序和数据库备份
4. 替换程序版本
5. 恢复之前jadepool-hub/config下面的local配置（主要是数据库配置，如果数据库配在seed里，忽略此步骤）
6. 恢复jadepool-hub/lib和jadepool-hub/lib/seed-loader下的配置（go-node-ffi.so/server.data) 
7. 恢复jadepool-hub/lib/data-loader下的配置(如未使用8888端口的seed忽略此步骤) 
8. 通过nvm安装node14

```bash
nvm install 14.15.2

# 设置默认使用14.15.2
nvm alias default 14.15.2

# update in-memory PM2 with local PM2
# 如果报错pm2找不到需要重装: npm install -g pm2
pm2 update
```

8. 将启动脚本中filecoin-signer相关的配置删除（此服务已经迁移到主程序代码里，不需要再另外启用，没有配置的请忽略）

9. 清理consul数据（该脚本可在以后升级版本时定期执行，清理脏数据，脚本里的consul ip请自行替换）

   https://github.com/nbltrust/jadepool-hub-tech-docs/blob/master/Chinese/clearConsul.sh

   ```bash
   #!/usr/bin/env bash
   
   ID=$(curl http://127.0.0.1:8500/v1/agent/services |jq -r  '.[].ID')
   
   for var in $ID
   do
     curl --request PUT http://127.0.0.1:8500/v1/agent/service/deregister/${var} 
     echo $var 
   done
   
   echo done
   ```

10. 启动瑶池