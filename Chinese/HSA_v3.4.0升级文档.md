# HSA_v3.4.0升级文档

### 升级步骤 

1. 关停瑶池和HSA

2. 备份原HSA程序及相关数据文件

3. 解压新版本包，把旧版本所在目录下的data文件夹恢复到新版目录中
4. `./hsa config --network`    配置测试网/主网模式
5. `./hsa config --dataloader`    配置dataloader公钥
6. `./hsa white --path 'root:root@tcp(127.0.0.1:3306)/dataloader?charset=utf8mb4&parseTime=True&loc=Local' `  配置dataloader MYSQL数据库路径
   
7. `./hsa --info `  查看配置，确保dataloader publicKey，white address mysql path，isTestnet配置成功
8. `./hsa cold --add name,chain,address ` 添加冷钱包地址（与seed里冷钱包相同，添加时需要注意区分chain:BTC/ETH）
9. `./hsa cold --list` 查看已经配置的冷钱包地址

10. `./hsa --server `启动HSA

11. 启动瑶池
    
12. 进入瑶池admin页面-高级管理-区块链配置-Ethereum页面-下载智能合约，点击HSA，下载智能合约配置文件20230110133473_Ethereum_export_contracts_for_HSA.json，将配置文件导入到HSA

`./hsa --tokens  ~/20230110133473_Ethereum_export_contracts_for_HSA.json`

1.  重启HSA，加载最新的智能合约配置

2.  `./hsa white --list` dataloader审批完白名单后，可通过此命令查看白名单是否添加成功

    


