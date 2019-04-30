### 测试环境升级步骤：

​      （老步骤，具体请参照我们之前给出的文档）

1. 停瑶池

2. 程序和数据库备份

3. 替换程序版本

4. 执行配置还原脚本

   

   （新步骤）

5. 执行以下脚本，注意注释中的事项

```bash
NODE_ENV=dev node build/index.bundle.js -m do -a do-recover-old-apps     // ecc配置升级脚本
NODE_ENV=dev node build/index.bundle.js -m do -a do-db-rebuild-indexes   // 数据库表删除index
NODE_ENV=dev node build/index.bundle.js -m do -a do-addresses-set-incoming,BTC,USDT   // 设置incoming脚本
NODE_ENV=dev node build/index.bundle.js -m do -a do-scatter-utxo-for-usdt             // 给USDT地址打钱脚本, 有开USDT的话
```
6. 修改pm2配置，将程序包路径改为build/index.bundle.js
7. 启动瑶池
8. 需要superadmin给运维角色增加应用配置的权限，并检查ecc配置和回调地址的设置







### 生产环境升级步骤：

​      （老步骤，具体请参照我们之前给出的文档）

1. 停瑶池

2. 程序和数据库备份

3. 替换程序版本

4. 执行配置还原脚本

   

   （新步骤）

5. 执行以下脚本，注意注释中的事项

```bash
NODE_ENV=production node build/index.bundle.js -m do -a do-recover-old-apps    // ecc配置升级脚本
NODE_ENV=production node build/index.bundle.js -m do -a do-db-rebuild-indexes   // 数据库表删除index
NODE_ENV=production node build/index.bundle.js -m do -a do-addresses-set-incoming,BTC,USDT   // 设置incoming脚本
NODE_ENV=production node build/index.bundle.js -m do -a do-scatter-utxo-for-usdt   // 给USDT地址打钱脚本, 有开USDT的话
```
6. 修改pm2配置，将程序包路径改为build/index.bundle.js
7. 启动瑶池
8. 需要superadmin给运维角色增加应用配置的权限，并检查ecc配置和回调地址的设置