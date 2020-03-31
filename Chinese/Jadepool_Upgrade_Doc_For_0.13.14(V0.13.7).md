**V0.13.7** to **V0.13.14**

### **BreakingChanges**

- **V0.13.9之后是多进程版本，每个链可以启动多个进程。**

- **Stellar已经迁移到hub项目里，不再作为第三方ledger存在，以后使用该链可直接在hub启动，不需要另起agent-xlm服务**

  

### 测试环境升级步骤：

1. 在admin配置备份中把目前的瑶池配置备份

2. 确认订单都完成后，关停瑶池（先在admin上关闭链进程，然后再关闭所有进程）

3. 程序和数据库备份

4. 替换程序版本

5. 恢复之前jadepool-hub/config下面的local配置（主要是数据库配置，如果数据库配在seed里，忽略此步骤）

6. 如果有第三方链接入，需要恢复之前实现的链的相关配置

7. 恢复jadepool-hub/lib和jadepool-hub/lib/seed-loader下的配置（go-node-ffi.so/server.data) 

8. 修改启动脚本yml，需要在启动脚本里加上微服务配置，包括

   jadepool-security：与seed交互

   jadepool-config：配置中心

   jadepool-notification：发送回调

   jadepool-health：监测进程状态

   jadepool-addrbook：余额查询，与saas配合使用，**如果不用saas则不用配置**

   **具体配置可参考jadepool-hub/pm2/master-dev.yml，**

   **jadepool-hub-admin也需要修改，具体参考jadepool-hub-admin/pm2/dev.yml，**

   **另外注意，自行配置其他环境变量的需要在每个服务中配置相应的环境变量**（如果是staging环境，则需修改NODE_ENV=staging）

9. 启动瑶池，暂时不要启链，保证jadepool-config正常运行后，跑以下升级脚本（**需要加上其他自行配置的环境变量，如JP_SECRET等**）

10. 为了精确显示余额（如ETH充值地址中不够汇总的余额），需要在jadepool-hub目录下跑incoming脚本

  ```bash
  NODE_ENV=dev node build/index.bundle.js -m do -a do-addresses-set-incoming
  
  # 如果是staging环境，则需修改NODE_ENV=staging
  NODE_ENV=staging node build/index.bundle.js -m do -a do-addresses-set-incoming
  ```

11. 对于V0.11.22及之前版本生成的没有mode字段的充值地址，可以通过该脚本升级地址设置mode

   ```bash
   NODE_ENV=dev node build/index.bundle.js -m do -a do-addresses-upgrade-mode
   
   # 如果是staging环境，则需修改NODE_ENV=staging
   NODE_ENV=staging node build/index.bundle.js -m do -a do-addresses-upgrade-mode
   ```

12. 以上脚本如果数据量较多，运行时间会比较长，运行完之后可以正常启动链进程



### 生产环境升级步骤：

1. 在admin配置备份中把目前的瑶池配置备份

2. 确认订单都完成后，关停瑶池（先在admin上关闭链进程，然后再关闭所有进程）

3. 程序和数据库备份

4. 替换程序版本

5. 恢复之前jadepool-hub/config下面的local配置（主要是数据库配置，如果数据库配在seed里，忽略此步骤）

6. 如果有第三方链接入，需要恢复之前实现的链的相关配置

7. 恢复jadepool-hub/lib和jadepool-hub/lib/seed-loader下的配置（go-node-ffi.so/server.data) 

8. 修改启动脚本yml，需要在启动脚本里加上微服务配置，包括

   jadepool-security：与seed交互

   jadepool-config：配置中心

   jadepool-notification：发送回调

   jadepool-health：监测进程状态

   jadepool-addrbook：余额查询，与saas配合使用，**如果不用saas则不用配置**

   **具体配置可参考jadepool-hub/pm2/master-production.yml，**

   **jadepool-hub-admin也需要修改，具体参考jadepool-hub-admin/pm2/production.yml，**

   **另外注意，自行配置其他环境变量的需要在每个微服务中配置相应的环境变量**

9. 启动瑶池，暂时不要启链，保证jadepool-config正常运行后，跑以下升级脚本（**需要加上其他自行配置的环境变量，如JP_SECRET等**）


9. 为了精确显示余额（如ETH充值地址中不够汇总的余额），需要在jadepool-hub目录下跑incoming脚本

   ```bash
   NODE_ENV=production build/index.bundle.js -m do -a do-addresses-set-incoming
   ```

9. 对于V0.11.22及之前版本生成的没有mode字段的充值地址，可以通过该脚本升级地址设置mode

   ```bash
   NODE_ENV=production build/index.bundle.js -m do -a do-addresses-upgrade-mode
   ```

11. 以上脚本如果数据量较多，运行时间会比较长，运行完之后可以正常启动链进程
