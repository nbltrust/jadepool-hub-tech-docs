### Order
Order is the basic unit for Jadepool Hub to process and record transactions. It is the fundamental of all services in Jadepool Hub.

### Order Type
Type | Definition
--------- | ------- 
DEPOSIT | Transfers made to deposit addresses.
WITHDRAW | Requested by client to withdraw assets to a target address.
SWEEP | Automatically triggered when balance is higher than the configured value.
RECHARGE | Transfers made from the cold wallet to the main address.
RECHARGE_UNEXPECTED | Transfers made directly to the main address from other than the cold wallet or transfers made to deposit addresses with mismatched memo.
AIRDROP | Transfers made from the configured airdrop addresses.
SWEEP_INTERNAL | Transfers made to internal addresses.
RECHARGE_INTERNAL | The order type that corresponds to “SWEEP INTERNAL” type.
RECHARGE_SPECIAL | Currently only used by NEO for claiming gas.
SYSTEM_CALL | The order type for certain blockchain behaviors. Types are listed below.
PRINCIPAL_FUND | The order type for receiving delegation principal.
INTEREST_FUND | The order type for receiving delegation reward.
DELEGATE | The order type for requesting delegation.
UNDELEGATE | The order type for requesting undelegation.
REVERT | The order type for reverting order of wrong type and generating correct order. For now this is only used for orders of RECHARGE_UNEXPECTED due to users putting wrong memo in deposit transaction.

<br>

SYSTEM_CALL | Definition
--------- | ------- 
UTXO_SCATTER | Transfers made among internal addresses for creating more utxo.
APPROVE | Deposit address authorizes the main address for using its tokens.
REDELEGATE | Switch vote/delegation to another validator.
CLAIM_REWARD | Request claiming delegation reward.
SET_REWARD_ADDRESS | Set address for receiving delegation reward.

<br>

### Incoming & Outgoing Transfer
**Incoming**：The order types for transfers that increase Jadepool Hub's asset balance, such as: DEPOSIT, RECHARGE, RECHARGE_UNEXPECTED, RECHARGE_INTERNAL, AIRDROP, RECHARGE_SPECIAL, PRINCIPAL_FUND, INTEREST_FUND, UNDELEGATE
<br>
**Outgoing**：The order types for transfers that decrease Jadepool Hub's asset balance, such as: WITHDRAW, SWEEP, SWEEP_INTERNAL, DELEGATE

<br>

### Order State

As for how each order state flows to another, see [Order State Machine](state-machine.html)。

State | Definition
--------- | ------- 
init | Jadepool Hub receives the client's request or automatically triggers an order but has not yet started processing. This state is for outgoing transfers only.
holding | The state before sending raw tx to node. Orders staying at 'holding' state for too long will be considered unusual and require manual processing. This state is for outgoing transfers only.
online | Raw transaction sent to node successfully. This state is for outgoing transfers only.
pending | Transaction mined in block and need more blocks produced for comfirmation.
done | Final state. Transaction has enough confirmations and is irreversible.
failed | Final state. Transaction failed to be mined.

<br>

### High Water Level/Target Water Level/Low Water Level
**High Water Level**：The maximum token amount that can be stored in Jadepool Hub. If balance exceeds this level, it will collocate with the target water level to control the amount to be transferred to the cold wallet. That is, an order of SWEEP type will be automatically generated.
<br>
**Target Water Level**：When token balance in Jadepool Hub exceeds the high water level, some will be transferred to cold wallet, and the remaining will be at the "target water level". For example, if the high water level is 0.4 BTC and the target water level is 0.2 BTC, and there are 0.5 BTC stored in Jadepool Hub, then 0.3 BTC will be transferred to the cold wallet, and 0.2 BTC will remain in Jadepool Hub.
<br>
**Low Water Level**：If the balance is lower than low water level, a warning email will be sent.

### Main Address
The main address is not a deposit address(except EOS-like chains and tokens). This address is generally used for gathering and destination of changes.

### Gathering
Gathering is an internal behavior. It means transfers made from deposit addresses to the main address. Taking ETH as an example, each ETH address has a nonce (an incremental serial number for each transaction sent out) and there can only be one input in a transaction. In order to facilitate management of addresses and transactions, Jadepool Hub set the main address as the only source for outgoing transfers. Thus, only balance of the main address is the usable balance, the balance in deposit addresses will be usable only after being gathered to the main address.

### Total Balance/Available Balance/Unavailable Balance/Frozen Balance/Unfreezing Balance
**Total Balance**: The sum of the available balance and the unavailable balance.
<br>
**Available Balance**: The amount of token that can be used for outgoing transfers.
<br>
**Unavailable Balance**: The amount of token that cannot be used for outgoing transfers. It is the sum of the tokens scattered at all deposit addresses under "address mode". The unavailable balance is always 0 when under "memo mode".
<br>
**Frozen Amount**: The amount of tokens that have been delegated/staked. It is not included in the total balance.
<br>
**Unfreezing Amount**: The amount of tokens being undelegated/unstaked. Each chain has different period for undelegation. It could take three days or as long as twenty-one days. During this time, tokens are in the state of unfreezing. The unfreezing amount is not included in the total balance.

### Callback
The callback is the way Jadepool Hub notifies client of the order status and audit results. For each service (appid), client can set notification URL for each order type on Admin.

### Audit
Auditting is to find the nearest block in database based on the auditting timestamp given by client by calling the audit API. Then find all orders that have not been audited before the creation of the block. 

### ECC
ECC is an encryption algorithm used by Jadepool Hub for securing communication between internal services and with client. The service to send data should have a private key to sign, and the service to receive data needs to have the pair public key of the message sender to verify the signature. Take the communication between Jadepool Hub and the client as an example, both services need to send and receive data. Jadepool Hub and the client should exchange their own public key. This can be done on admin.

### Hot Wallet
To facilitate the sharing of Jadepool Hub among products/services, client is able to create multiple hot wallet in Jadepool Hub. Each hot wallet has different account in derivative path, 
which not only improves security, but also achieves asset isolation of each wallet.

### APP ID
Multiple APPs can be created under each hot wallet. On Admin, client can set callback address of each order type for each APP ID.
