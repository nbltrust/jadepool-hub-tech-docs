from **V0.11.X** to **V0.13.5(及以上)**

**BreakingChanges**

1. 项目名称修改

   - jadepool-bn => jadepool-hub
   - jadepool-api => jadepool-hub-admin
   - jadepool-admin => jadepool-hub-admin-fe

2. 依赖增加

   - Redis 5.x
   - NodeJS版本 10.16.x
   - 服务发现consul 1.5.3（多机模式需要在每台机子上安装consul）
     安装consul详见 [瑶池部署文档](https://github.com/nbltrust/jadepool-doc/blob/master/Chinese/瑶池部署文档.md)
      
3. **第三方接入修改**
  
   - 详见 [release-note](https://github.com/nbltrust/jadepool-doc/releases/tag/V0.13.0-alpha.0)
   - 第三方接入参考示例 [Stellar](https://github.com/nbltrust/jadepool-agent-xlm)
   
4. API-v1不再维护
   -  API-v2 [文档](https://nbltrust.github.io/jadepool-hub-api-docs/#v2-api)

### 测试环境升级步骤：

1. admin配置备份中把目前的瑶池配置备份，记录节点/水位/代币等配置（由于新版本配置目录更改，原来的config merge脚本无法恢复区块链相关配置，需要最后直接在admin修改保存到数据库里，之后区块链相关的local配置文件可以弃用）

2. 确认订单都完成后，停瑶池

3. 程序和数据库备份

4. 替换程序版本

5. 恢复之前config下面的local配置（主要是数据库配置，不要跑config merge脚本）

6. 恢复jadepool-hub/lib下的配置（go-node-ffi.so/server.data) ，jadepool-hub-admin的lib和config以后可不用恢复

7. 项目名称修改--修改yml启动脚本

8. 启动redis版本 v5.0，并配置

   ```bash
   // config配置格式
   {
     "redis": {
       "default": {
         "host": "127.0.0.1",
         "port": "6379"
       }
     }
   }
   
   // seed配置格式
   REDIS_CFG: "default"
   REDIS_CFG:default: "redis://127.0.0.1:6379"
   ```

9. 删除index
   NODE_ENV=dev  node build/index.bundle.js -m do -a do-db-rebuild-indexes
   db.getCollection('agendaJobs').dropIndexes()
   
10. 升级脚本

    NODE_ENV=dev  node build/index.bundle.js -m do -a do-upgrade-blockchains-config

11. 审计脚本

    NODE_ENV=dev  node build/index.bundle.js -m do -a do-audits-recalculate

12. 启动瑶池，根据之前的配置在admin上进行修改（主要是节点配置），确认节点配置正确

13. 关闭瑶池，跑地址升级脚本

    NODE_ENV=dev node build/index.bundle.js -m do -a do-addresses-set-incoming,incomingOnly
    
14. 再次启动瑶池


### 生产环境升级步骤：

1. admin配置备份中把目前的瑶池配置备份，记录节点/水位/代币等配置（由于新版本配置目录更改，原来的config merge脚本无法恢复区块链相关配置，需要最后直接在admin修改保存到数据库里，之后区块链相关的local配置文件可以弃用）

2. 确认订单都完成后，停瑶池

3. 程序和数据库备份

4. 替换程序版本

5. 恢复之前config下面的local配置（主要是数据库配置，不要跑config merge脚本）

6. 恢复jadepool-hub/lib下的配置（go-node-ffi.so/server.data) ，jadepool-hub-admin的lib和config以后可不用恢复

7. 项目名称修改--修改yml启动脚本

8. 启动redis版本 v5.0，并配置

   ```bash
   // config配置格式
   {
     "redis": {
       "default": {
         "host": "127.0.0.1",
         "port": "6379"
       }
     }
   }
   
   // seed配置格式
   REDIS_CFG: "default"
   REDIS_CFG:default: "redis://127.0.0.1:6379"
   ```

9. 删除index

   NODE_ENV=production node build/index.bundle.js -m do -a do-db-rebuild-indexes
   db.getCollection('agendaJobs').dropIndexes()

10. 升级脚本

    NODE_ENV=production  node build/index.bundle.js -m do -a do-upgrade-blockchains-config

11. 审计脚本

    NODE_ENV=production  node build/index.bundle.js -m do -a do-audits-recalculate
    
12. 启动瑶池，根据之前的配置在admin上进行修改（主要是节点配置），确认节点配置正确

13. 关闭瑶池，跑地址升级脚本

    NODE_ENV=production node build/index.bundle.js -m do -a do-addresses-set-incoming,incomingOnly
    
14. 再次启动瑶池
