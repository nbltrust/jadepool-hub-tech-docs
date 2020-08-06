### 通用检测规则

- 需根据不同区块链的共识机制和判定条件来判定交易是否确认安全上链。
- 在确认交易完成上链的情况下，检测条件中出现任意失败，均认为该交易（及其相关订单）失败。
- 在未确认交易是否上链的情况下，需判定交易是否真的未发上链，若过期或明确确认未上链，则可认为该交易（及其相关订单）失败。
- 在确认交易完成上链的情况下，检测条件全部通过，即可认为该交易（及其相关订单）成功。

### Ethereum
- 安全上链确认要求：达到安全确认数30+
- 充值检测
	- ETH标准充值
		- 目标地址to为热钱包内部地址
		- 检测交易Reciept状态(status)必须是成功的
	- ERC20代币标准充值
		- 目标地址to必须为代币的合约地址
		- 检测交易Reciept状态(status)必须是成功的
		- 必须存在Receipt log，即合约执行成功产生了某些Event
		- 解析Reciept log，确认转账信息
			- 必须找到Transfer Event所代表的event name
			- Transfer Event信息体内，to所在的数据必须为内部地址
	- 基于合约的ETH充值
		- 为安全起见，不直接支持通过合约进行的ETH充值（因区块链机制，该类交易缺乏通用的检测机制）
		- 若发生该状况，通过第三方查询确认无误后通过在Admin上的多人审批机制添加特殊订单
	- 基于合约的ERC20充值
		- 为安全起见，不直接支持通过合约进行的ERC20充值（因智能合约机制，非ERC20标准的方法一样可以进行值转移操作）
		- 若发生该状况，通过第三方查询确认无误后通过在Admin上的多人审批机制添加特殊订单

### Bitcoin
- 安全上链确认要求：达到安全确认数6个
- 充值检测
	- BTC充值
		- 分析交易中的全部outputs，提取出属于热钱包内部地址的output
		- 创建充值订单时需注意保存n index，以定位该UTXO
	- USDT（Omni）充值
		- 从USDT Omni节点获取交易信息（1对1）
		- 目标地址to为热钱包内部地址
		- 检测交易valid状态必须是成功的

### Eosio
- 安全上链确认要求：当交易所属区块处于“最后不可逆区块”(last irreversible block)之下时，即交易确认
- 充值检测
	- EOS是账户形式，瑶池系统根据Memo的不同来定位用户
	- 交易体检测
		- status必须为executed
		- account必须为合约主体账号（EOS即为eosio.token）
		- to必须为热钱包账号
		- action必须为transfer，附带对quantity进行检测
			- 单位，必须为代币对应的name
			- 精度，必须符合该代币对应的decimal
		- memo对应为系统的热钱包内部地址（基于Memo的查询）
	- 可优化运维方案：为Eos热钱包账号设置一个智能合约，若转账不填入Memo将转账失败
	- EOSio上的代币通常是Fork了eosio.token模版，我们的实现逻辑和EOS主币一致。