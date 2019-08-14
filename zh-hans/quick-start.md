如果已经在本地成功部署了Jadepool Hub，可按照下列步骤快速体验基本功能。

### 获取充值地址
充值是瑶池的重要业务之一。用户需要在瑶池获取一个该币种的地址，然后用自己的钱包向该地址转账。

[获取充值地址API V1](https://nbltrust.github.io/jadepool-api-docs/#create-single-address)
<br>
[获取充值地址API V2](https://nbltrust.github.io/jadepool-api-docs/#create-single-address-2)

### 充值
通过上述步骤得到一个充值地址后，用自己的钱包软件向该地址转账。

### 查询余额
完成上述转账充值后，如果交易成功被广播，此时瑶池的资产余额应显示增加。
“balance”字段为总余额，“balanceAvailable”是可以用来作为出账交易的金额（例如提现、热转冷等）。

[查询余额API V1](https://nbltrust.github.io/jadepool-api-docs/#fetch-wallet-status)
<br>
[查询余额API V2](https://nbltrust.github.io/jadepool-api-docs/#fetch-wallet-status-2)

### 验证地址有效性
经上述操作瑶池现已有余额，可以处理提现。但在提现之前，应先验证到账地址有效性，防止提现因为提现地址不合法而失败。

[验证地址有效性 V1](https://nbltrust.github.io/jadepool-api-docs/#validate-address)
<br>
[验证地址有效性 V2](https://nbltrust.github.io/jadepool-api-docs/#validate-address-2)

### 发起提现
如果到账地址有效，可以发起提现并获得提现订单ID，以下示意图显示得到订单ID 6413。
<br>
[发起提现 V1](https://nbltrust.github.io/jadepool-api-docs/#request-withdrawal)
<br>
[发起提现 V2](https://nbltrust.github.io/jadepool-api-docs/#request-withdrawal-2)

### 查询订单
通过订单ID查询可以获得包括交易哈希、交易使用矿工费和订单当前状态等信息。
<br>
[查询订单 V1](https://nbltrust.github.io/jadepool-api-docs/#fetch-order)
<br>
[查询订单 V2](https://nbltrust.github.io/jadepool-api-docs/#fetch-order-2)
