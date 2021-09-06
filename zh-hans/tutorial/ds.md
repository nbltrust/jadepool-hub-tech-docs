**注意：**
1. 请先完成[准备工作](../AML混币安全托管/safe-preparation.html)。
2. 确保运营钱包的热主地址（对需要使用的DS代币）拥有exchange权限。
3. 确保运营钱包的热主地址有足够的ETH用作手续费。

### 流程

假设使用的DS代币叫ABC。

1. 创建用户钱包（钱包模式是离线签名，API传入mode=manual） 

2. 注册投资人
调用Hub接口，针对ABC申请注册投资人，同时投资人信息（investor ID）会和钱包在Hub数据库绑定。

3. 注册热主地址
Hub系统会自动将钱包的热主地址注册为ABC的投资地址。如果交易失败，Hub系统不会重试，前置系统应该调用接口再次申请注册。

4. 设置投资人国家
设置投资人所在国家。不设置或设置为不符合转账ABC资格的国家，转账交易不能成功。

5. 设置投资人属性
属性定义请参考DS官方文档。

6. 生成&注册充值地址
当用户第一次申请充值时，调用Hub接口，生成充值地址。然后调用接口申请将充值地址注册为ABC投资地址。注册成功后才应该提供给用户。
 