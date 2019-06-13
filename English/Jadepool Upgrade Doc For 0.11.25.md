from **V0.11.20** to **V0.11.25**

### 测试环境升级步骤：

 （老步骤，具体请参照我们之前给出的文档）

1. 查看代币管理中所有ERC20代币，记录下配置-Coin默认配置中没有**币种类型**和**消耗Gas上限**这两项配置的ERC20代币

2. 停瑶池

3. 程序和数据库备份

4. 替换程序版本

5. 执行配置还原脚本

   （新步骤）

6. 修改pm2配置，将程序包路径改为build/index.bundle.js

7. 执行以下脚本，注意注释中的事项

```bash
NODE_ENV=dev node build/index.bundle.js -m do -a do-recover-old-apps     // ecc配置升级脚本
NODE_ENV=dev node build/index.bundle.js -m do -a do-db-rebuild-indexes   // 数据库表删除index
NODE_ENV=dev node build/index.bundle.js -m do -a do-addresses-set-incoming,BTC   // 设置incoming脚本
NODE_ENV=dev node build/index.bundle.js -m do -a do-scatter-utxo-for-usdt             // 给USDT地址打钱脚本, 有开USDT的话
NODE_ENV=dev node build/index.bundle.js -m do -a do-addresses-set-incoming,LTC,Neo,Qtum //设置LTC,Neo,Qtum
```

7. 如果上述第1步有未设置的ERC20币种，需要额外执行此步骤：

   在瑶池启动脚本pm2配置中，jadepool-bn添加JP_AUTO_START=false参数（该配置为启动瑶池后不自动启链，已添加的请忽略），启动瑶池，通过admin将上述**币种类型**和**消耗Gas上限**配置到ERC20代币中：
   
   - 币种类型：ERC20
   - 消耗Gas上限：100000
   
   配置完成后停瑶池，在jadepool-cfg-dev数据库中，执行以下更新脚本
   
```bash
db.configdats.update({path:'tokens',origin:/abi/},{$set：{customized:true}},false,true)
```

8. 执行以下脚本，注意注释中的事项
```bash
NODE_ENV=dev node build/index.bundle.js -m do -a do-addresses-set-incoming,ETH //设置ETH地址
```

9. 启动瑶池，等待数据库重建index后，再启动链

10. 需要superadmin给运维角色增加应用配置的权限，并检查ecc配置和回调地址的设置



### 生产环境升级步骤：

（老步骤，具体请参照我们之前给出的文档）

1. 查看代币管理中所有ERC20代币，记录下配置-Coin默认配置中没有**币种类型**和**消耗Gas上限**这两项配置的ERC20代币

2. 停瑶池

3. 程序和数据库备份

4. 替换程序版本

5. 执行配置还原脚本

   （新步骤）

6. 修改pm2配置，将程序包路径改为build/index.bundle.js

7. 执行以下脚本，注意注释中的事项

```bash
NODE_ENV=production node build/index.bundle.js -m do -a do-recover-old-apps     // ecc配置升级脚本
NODE_ENV=production node build/index.bundle.js -m do -a do-db-rebuild-indexes   // 数据库表删除index
NODE_ENV=production node build/index.bundle.js -m do -a do-addresses-set-incoming,BTC   // 设置incoming脚本
NODE_ENV=production node build/index.bundle.js -m do -a do-scatter-utxo-for-usdt             // 给USDT地址打钱脚本, 有开USDT的话
NODE_ENV=production node build/index.bundle.js -m do -a do-addresses-set-incoming,LTC,Neo,Qtum //设置LTC,Neo,Qtum
```

7. 如果上述第1步有未设置的ERC20币种，需要额外执行此步骤：

   在瑶池启动脚本pm2配置中，jadepool-bn添加JP_AUTO_START=false参数（该配置为启动瑶池后不自动启链，已添加的请忽略），启动瑶池，通过admin将上述**币种类型**和**消耗Gas上限**配置到ERC20代币中：

   - 币种类型：ERC20
   - 消耗Gas上限：100000

   配置完成后停瑶池，在jadepool-cfg-prod数据库中，执行以下更新脚本

```bash
db.configdats.update({path:'tokens',origin:/abi/},{$set：{customized:true}},false,true)
```

8. 执行以下脚本，注意注释中的事项

```bash
NODE_ENV=production node build/index.bundle.js -m do -a do-addresses-set-incoming,ETH //设置ETH地址
```

9. 启动瑶池，等待数据库重建index后，再启动链

10. 需要superadmin给运维角色增加应用配置的权限，并检查ecc配置和回调地址的设置