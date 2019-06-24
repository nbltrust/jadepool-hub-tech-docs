from **V0.11.23** to **V0.11.25**

### 测试环境升级步骤：

 （老步骤，具体请参照我们之前给出的文档）

1. 停瑶池

2. 程序和数据库备份

3. 替换程序版本

4. 执行配置还原脚本

   （新步骤）

5. 执行以下脚本，注意注释中的事项

```bash
NODE_ENV=dev node build/index.bundle.js -m do -a do-addresses-set-incoming,LTC,Neo,Qtum //设置LTC,Neo,Qtum
```

6. 数据库jadepool-BN-dev的block表手动重建index
```bash
db.getCollection('orders').dropIndex("sendOrders")
db.getCollection('blocks').createIndex({ scaned: 1, type: 1, height: 1 }, { name: 'findByScanned', partialFilterExpression: { scaned: false }})
```

7. 启动瑶池




### 生产环境升级步骤：

（老步骤，具体请参照我们之前给出的文档）

1. 停瑶池

2. 程序和数据库备份

3. 替换程序版本

4. 执行配置还原脚本

   （新步骤）

5. 执行以下脚本，注意注释中的事项

```bash
NODE_ENV=production node build/index.bundle.js -m do -a do-addresses-set-incoming,LTC,Neo,Qtum //设置LTC,Neo,Qtum
```

6. 数据库jadepool-BN-prod的block表手动重建index
```bash
db.getCollection('orders').dropIndex("sendOrders")
db.getCollection('blocks').createIndex({ scaned: 1, type: 1, height: 1 }, { name: 'findByScanned', partialFilterExpression: { scaned: false }})
```

7. 启动瑶池
