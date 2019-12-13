from **V0.13.1** to **V0.13.7**

**BreakingChanges**
- NodeJS版本需要升级到 v10.17.0

### 测试环境升级步骤：

1. 在admin配置备份中把目前的瑶池配置备份

2. 确认订单都完成后，关停瑶池（先在admin上关闭链进程
，然后再关闭所有进程）

3. 程序和数据库备份

4. 替换程序版本

5. 恢复之前jadepool-hub/config下面的local配置（主要是数据库配置，如果数据库配在seed里，忽略此步骤）

6. 恢复jadepool-hub/lib和jadepool-hub/lib/seed-loader下的配置（go-node-ffi.so/server.data) 
   
7. 在jadepool-hub目录下跑地址升级脚本（NODE_ENV根据自己的启动模式来配置）

    NODE_ENV=dev node build/index.bundle.js -m do -a do-addresses-set-incoming,incomingOnly
    
8. 启动瑶池


### 生产环境升级步骤：

1. 在admin配置备份中把目前的瑶池配置备份

2. 确认订单都完成后，关停瑶池（先在admin上关闭链进程
，然后再关闭所有进程）

3. 程序和数据库备份

4. 替换程序版本

5. 恢复之前jadepool-hub/config下面的local配置（主要是数据库配置，如果数据库配在seed里，忽略此步骤）

6. 恢复jadepool-hub/lib和jadepool-hub/lib/seed-loader下的配置（go-node-ffi.so/server.data) 
   
7. 在jadepool-hub目录下跑地址升级脚本

    NODE_ENV=production node build/index.bundle.js -m do -a do-addresses-set-incoming,incomingOnly
    
8. 启动瑶池
