**V0.13.20** to **V0.15.4**

## **BreakingChanges**

- **V0.15.x版本的BTC使用bitcore node v8节点（弃用insight-api），需提前部署好。**
- 瑶池BTC链目前实现读写分离，也可将读节点和写节点配置为同一个
- BTC和blockstack都需要更换为bitcore node v8节点

## 测试环境升级步骤：

1. 在admin配置备份中把目前的瑶池配置备份

2. 记录下所有区块链的节点以及浏览器配置

3. **<font color=#FF0000>务必确保所有订单都为最终状态（完成or失败），没有未处理、处理中、冻结的订单</font>**，否则升级之后未处理完成的订单将不会被处理。确认完毕后关停瑶池（先在admin上关闭链进程，然后再关闭所有进程）

4. 程序和数据库备份

5. 替换程序版本

6. 恢复之前jadepool-hub/config下面的local配置（主要是数据库配置，如果数据库配在seed里，忽略此步骤）

7. 恢复jadepool-hub/lib和jadepool-hub/lib/seed-loader下的配置（go-node-ffi.so/server.data) 

8. 修改jadepool-hub-admin-fe启动配置

   - 修改启动脚本yml，把之前的jadepool-hub-admin-fe配置删除

   - 使用nginx反向代理指向jadepool-hub-admin-fe静态文件, nginx配置参考

      ```bash
      server {
       listen       3000;
     
       location / {
         # 此处填写jadepool-hub-admin-fe路径
         root   /opt/jadepool-hub/jadepool-hub-admin-fe/build;
         index  index.html index.htm;
     
         add_header Access-Control-Allow-Origin *;
         add_header Access-Control-Allow-Methods "POST, HEAD, PUT, PATCH, GET, DELETE";
         add_header Access-Control-Allow-Headers "cache-control, content-type, Origin, Authorization, Accept";
         add_header Access-Control-Allow-Credentials true;
     
         # First attempt to serve request as file, then
         # as directory, then fall back to displaying a 404.
         try_files $uri $uri/ =404;
         error_page 404 =301 /;
       }
     
       location /api {
         proxy_redirect off;
         proxy_pass http://localhost:7002;
         proxy_set_header Host $host:$server_port;
         proxy_set_header X-Real-IP $remote_addr;
         proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
         proxy_set_header REMOTE-HOST $remote_addr;
     
         expires 0m;
       }
     }
      ```

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

10. 重建数据库index（jadepool-BN-staging ）

   ```bash
   # 删除index
   db.getCollection('addresses').dropIndex('adminNormal')
   
   # 重建index
   db.getCollection('addresses').createIndex({ wallet: 1, type: 1, create_at: -1, incoming: 1, incomings: 1, mode: 1 }, { name: 'adminNormal' })
   ```

11. 重建完毕后，启动瑶池，启动nginx，在区块链配置界面将每个链的节点和浏览器配置重新填入，完成后可开启链进程


****

## 生产环境升级步骤：

1. 在admin配置备份中把目前的瑶池配置备份

2. 记录下所有区块链的节点以及浏览器配置

3. **<font color=#FF0000>务必确保所有订单都为最终状态（完成or失败），没有未处理、处理中、冻结的订单</font>**，否则升级之后未处理完成的订单将不会被处理。确认完毕后关停瑶池（先在admin上关闭链进程，然后再关闭所有进程）

4. 程序和数据库备份

5. 替换程序版本

6. 恢复之前jadepool-hub/config下面的local配置（主要是数据库配置，如果数据库配在seed里，忽略此步骤）

7. 恢复jadepool-hub/lib和jadepool-hub/lib/seed-loader下的配置（go-node-ffi.so/server.data) 

8. 修改jadepool-hub-admin-fe启动配置

   - 修改启动脚本yml，把之前的jadepool-hub-admin-fe配置删除

   - 使用nginx反向代理指向jadepool-hub-admin-fe静态文件, nginx配置参考

      ```bash
      server {
       listen       3000;
     
       location / {
         # 此处填写jadepool-hub-admin-fe路径
         root   /opt/jadepool-hub/jadepool-hub-admin-fe/build;
         index  index.html index.htm;
     
         add_header Access-Control-Allow-Origin *;
         add_header Access-Control-Allow-Methods "POST, HEAD, PUT, PATCH, GET, DELETE";
         add_header Access-Control-Allow-Headers "cache-control, content-type, Origin, Authorization, Accept";
         add_header Access-Control-Allow-Credentials true;
     
         # First attempt to serve request as file, then
         # as directory, then fall back to displaying a 404.
         try_files $uri $uri/ =404;
         error_page 404 =301 /;
       }
     
       location /api {
         proxy_redirect off;
         proxy_pass http://localhost:7002;
         proxy_set_header Host $host:$server_port;
         proxy_set_header X-Real-IP $remote_addr;
         proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
         proxy_set_header REMOTE-HOST $remote_addr;
     
         expires 0m;
       }
     }
      ```

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

10. 重建数据库index（jadepool-BN-prod ）

   ```bash
   # 删除index
   db.getCollection('addresses').dropIndex('adminNormal')
   
   # 重建index
   db.getCollection('addresses').createIndex({ wallet: 1, type: 1, create_at: -1, incoming: 1, incomings: 1, mode: 1 }, { name: 'adminNormal' })
   ```

11. 重建完毕后，启动瑶池，启动nginx，在区块链配置界面将每个链的节点和浏览器配置重新填入，完成后可开启链进程

