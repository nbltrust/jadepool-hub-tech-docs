如果订单处于“冻结”状态，前往订单“查看原始数据”，并查看“reason”字段，以下是常见订单冻结情况解释。

## Ethereum
### 1."invalid JSON RPC"
常见于以太坊链。说明Jadepool Hub向节点发送交易但返回的值不是正确的Json格式，有以下四种原因：
1. 节点本身有问题。
2. Jadepool Hub和节点之间网络连接差（强烈建议放在同一个局域网）。
3. 启动该订单对应区块链的进程的服务器配置过低（尤其是Ethereum），建议选用CPU优先的服务器
4. 请求太多，节点压力过大。建议起多个节点做负载均衡。

## EOS
### 1. "expired transaction":
即问题反馈文件中截图所展示报错信息。因为瑶池发送EOS交易默认的过期时间是两分钟，所以“expired transaction”说明在节点收到瑶池请求发交易时，已经过去了两分钟以上。有以下可能原因造成：
网络问题或机器性能问题。因为节点版本低、性能差或机器配置低，节点机器CPU消耗过大，节点被压爆，Nginx无法及时处理请求。
瑶池代码语言Node自身性能限制，但已通过多进程处理区块链业务版本解决，请尽快升级到0.13.9+版本。

### 2. "invalid json response body…, unexpected token < in JSON at position 0":
向EOS节点发送交易时，合法返回应该是JSON格式。此报错说明节点并没有向瑶池返回合法JSON，返回的是首字符为<的HTML格式，该报错是被瑶池使用的EOS官方库抓取并抛出。此报错原因同样是因为EOS节点性能低且压力大，无法正常处理发交易请求。

### 3. "Could not find block…":
此报错少见。是由于EOS交易需要包含reference区块但EOS链却存在“跳块”现象，也就是说发上节点的交易所refer的区块在链上并不存在。瑶池在使用的最新稳定EOS官方库版本v20.0.0也不能规避该问题，因为构造交易时只能传入behind参数，由官方库来根据实时最新区块和behind参数相减计算出reference区块。

### 4. "billed CPU time (- us) is greater than the maximum billable CPU time for the transaction (- us)":
此报错是由于Jadepool Hub所使用的EOS账户拥有的CPU不足够发送交易。需要人工向账户抵押EOS获取更多的CPU后再重试。

### 5. "eos account is already exisited":
此报错出现在提现到一个智能合约帐户，智能合约会创建一个帐户，但该账户已经在链上存在，所以交易被节点拒绝。