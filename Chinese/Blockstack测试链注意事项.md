# Blockstack

1. 水龙头地址：https://testnet.blockstack.org/

2. blockstack testnet 每天都会 reset，因此测试时需要清除瑶池之前保存的blockstack测试数据：

   - 删除ruler/block （必做）

     ```bash
     db.getCollection('rulers').remove({type:'Blockstack'})
     db.getCollection('blocks').remove({type:'Blockstack'})
     ```
     
   
   - 删除orders/audits（不做会影响统计数据）
   
     ```bash
     db.getCollection('orders').remove({type:'STX'})
     db.getCollection('audits').remove({type:{$in:['STX','STXBTC']}})
     ```
 3. 如果遇到标尺高度比区块高度大的情况，请先检查BTC，Blockstack节点是否正常，然后再执行上述操作。
