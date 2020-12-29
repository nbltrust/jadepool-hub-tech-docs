### memo
memo是Jadepool Hub为区别充值向用户提供的字符串。对于memo充值模式区块链来说，获取充值地址就是获取Jadepool Hub的热主帐户（地址）加一个充值memo。无论用户从自己的账户转账还是从交易所提现到Jadepool Hub，都应该在交易中正确填写Jadepool Hub提供的充值memo，这样才能正确识别用户充值，否则会被当作异常入账。memo是普通字符串，没有通用规则，在Jadepool Hub数据库唯一。memo字符范围包含除去数字0、大写字母O、大写字母I和小写字母l以外的所有数字和字母，大小写敏感。 

### dust
dust是utxo类区块链的交易无效金额，也就是一个交易的任何output金额必须高于这个值，否则有可能上链失败。dust是Jadepool Hub的一个不可修改的配置。

<!-- ### seed + derivative path(衍生路径)
seed是64位的字符串，是Jadepool Hub所有地址的种子。

BIP32是HD钱包的核心提案，通过种子来生成主私钥，然后派生海量的子私钥和地址。BIP43对BIP32树结构增加了子索引标识purpose的扩展 m/purpose'/ *。BIP44是在BIP43和BIP32的基础上增加多币种，通过HD钱包派生多个地址。BIP44对HD钱包提出5层路径建议：
```
m / purpose' / coin_type' / account' / change / address_index
```
所以，Jadepool Hub只需要保存一个种子，就能控制所有币种，所有账户的钱包。种子一旦更换，私钥和地址都将完全不一样。

Jadepool Hub的Seed可以由Seed Vault生成和保存：由用户输入的软件密码、时间戳和随机数组合生成，加密后存在服务器本地，没有密码无法解密。

以下是Jadepool Hub衍生地址路径示意图。根据下图，以热钱包1的比特币热主地址举例，衍生路径为m/44'/0'/0'/1/0。
![](image/derive-addr.png) -->