Jadepool Hub是针对企业级客户的用于自动化处理多种加密数字资产的区块链业务的自托管系统，主要负责处理区块链相关事宜，包括签名、发交易、实时监控区块链、管理所有加密资产等等。Jadepool Hub是Jadepool Custody产品体系中的重要一环，主要业务涵盖：充值、提现、冷存储等。

Jadepool Hub的目标客户范围广泛，例如：交易所、钱包、矿池、投资平台、项⽬⽅等等。Jadepool Hub可以和Jadepool SaaS配合使用，功能更全面。

Jadepool Hub支持多种加密数字资产的存管，现已支持20+公链，可应客户需求增加对更多区块链的支持。Jadepool Hub已支持的区块链和拓展币如下：

状态 | 区块链 
--------- | ------- 
已支持 | Bitcoin(Omni USDT), Ethereum(ERC20), EOS, Litecoin, Ripple, Stellar, Neo, VeChain, Qtum, Cosmos, IRISnet, Bitcoin Cash, Tezos, ChainX, QLink, TomoChain, Kusama, Polkadot, Tron(TRC20), Blockstack, PlatOn Alaya, Darwinia, Filecoin, Binance, Binance Smart Chain, Filecash, Conflux
可自定义添加token | Ethereum, EOS, Cosmos, Neo, Tron

<br>

### 冷热分离
Jadepool Hub是热钱包服务，使用每条区块链都必须配备冷钱包。客户可根据需求调整存放在Jadepool Hub和冷钱包中的资产比例。冷钱包用以保障存放在Jadepool Hub大部分资产的安全，其余则是用于应对用户提取存款的流动资产。冷钱包可以根据客户的业务场景自定义，可以是硬件钱包、矿机等。 

### 私钥安全
Jadepool Hub不会将私钥存储在任何地方。热钱包服务需连接SeedVault服务，详情请见[私钥安全章节](security/intro.html)。

### 高性能
在微服务架构的基础上，Jadepool Hub支持分布式多机部署，也就是一台机器可以只处理对于一条区块链的监测和充值提现请求。这样不仅分散安全风险，更大幅提高处理请求效率。

### Web管理系统
Web管理系统Admin是专为Jadepool Hub系统开发的一款后台管理系统，可以协助使用者全方位掌控Jadepool Hub运行状态。不同角色和账户可在被超级管理员限制权限的基础上对Jadepool Hub进行读写操作，例如管理钱包、查看资产余额、修改配置、管理用户、查看运营和审计情况等等。 

### 审计
为确保客户资产安全和双方系统数据一致，Jadepool Hub提供订单统计和自审功能。客户可以在admin上开启统计功能并且设置每日统计时间，系统自动统计完成后会通知客户系统，客户也可以在admin上随时查看统计结果和下载统计报表。自审功能是Jadepool Hub订单和节点交易之间的状态核对。
