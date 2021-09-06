## Token Configuration

### token type(Type)
Generally the blockchain's native token and its extended tokens belong to two types. For example: for Ethereum there are "ETH" and "ERC20". Required.

### decimal(Rate)
Token's decimal digits，BTC is 8，ETH is 18. Required.

### withdrawal threshold(MinThreshold)
The lowest value that can be withdrawn. The value should be in token's decimal. For example, BTC's decimal is 8, so its withdrawal threshold should be its dust which is 546 satoshi (0.00000546 BTC)
The default value is 1 if not configured. Required.

### fixed fee(FeeForWithdraw)
This is for blockchains that uses fixed transaction fee. For example, every CYB transfer charges 0.02 CYB.

### activating balance(ActivateBalance)
This is for blockchains that their addresses require a certain amount of balance to activate and be usable. For example, Ripple address requires at least 20 XRP.

### gas limit(GasLimit)
Each Ethereum transaction burns gas. For transfers sent by Jadepool Hub, they will fail due to out of gas if the gas limit is too low. ETH transfers generally burn gas not above 23000. The gas that ERC20 transfers burn depends on their smart contract implementation.

### Gas price(GasPrice)
The gas price that transaction burns. Only used by Irisnet for now. Data type is number.

### Gas prices(GasPrices) 
The gas price that transaction burns. Only used by Cosmos for now. Data type is string.

### Gas coefficient(GasCoefficient)
Only used by Cosmos and Irisnet for now.

### transaction expiration time(Expiration)
The time buffer for Jadepool Hub to make sure the transaction is definitely failed. For example, if "Expiration" is set to 600 which equals to 10 minutes, the order fails if the transaction cannot be found within 10 minutes since sent. The unit is second.

### transaction expiration block(ExpirationBlock)
Similar to "Expiration". The order fails if the transaction cannot be found within certain amount of blocks since sent.

### fee selector(FeeSelector)
A fee level that ranges from 2 to 25. 2 means the highest fee and 25 means the lowest. Jadepool Hub uses fee selector to get the estimated fee for the transaction from node.

### dust(Dust)
The smallest utxo that can be used. 

### property ID(PropertyId)
Only used by USDT for now.

### token name(TokenName)
The real name of the token on blockchain. Only used by Cosmos for now.

### smart contract(Contract)
The smart contract address or account for extended tokens.

## Operation Configuration

### HighWaterLevel
The maximum token amount that can be stored in Jadepool Hub. If balance exceeds this level, it will collocate with the target water level to control the amount to be transferred to the cold wallet. That is, an order of SWEEP type will be automatically generated. Required.

### SweepTo
When token balance in Jadepool Hub exceeds the high water level, some will be transferred to cold wallet, and the remaining will be at the "target water level". For example, if the high water level is 0.4 BTC and the target water level is 0.2 BTC, and there are 0.5 BTC stored in Jadepool Hub, then 0.3 BTC will be transferred to the cold wallet, and 0.2 BTC will remain in Jadepool Hub. Required.

### LowWaterLevel
If the balance is lower than low water level, a warning email will be sent. Required.				

### MergedBalance
True means all addresses can be the origin of the out transfer. False means tokens in deposit addresses needed to be gathered to the main address first and the main address is the only origin in out transfers.

### AvailableUtxoCap
For utxo-like blockchains only. Only utxos that have tokens higher than this configuration can be selected for out transfers.

### BatchCount
The upper limit of the number of orders at "init" state for Jadepool Hub to process each time. 50 recommended. Required.

### MaxOrdersInOneTx
The upper limit of the number of orders that Jadepool Hub includes in one transaction. 50 recommended. 

### 单笔交易使用UTXO上限(MaxInputsInOneTx)
For utxo-like blockchains only. The upper limit of the number of utxos that Jadepool Hub uses in one transaction. 50 recommended.

### SendAgainCap
Jadepool Hub does not recommend the client's system to resend this out transfer request automatically if the failed order's value exceeds this configuration.

### Airdrop.enabled
True means airdrop function is enabled and false means disabled.

### Airdrop.Address
The origin addresses that give airdrops.
