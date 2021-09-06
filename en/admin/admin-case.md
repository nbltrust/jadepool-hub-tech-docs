### How to deal with frozon orders (orders that stay at "holding" state)?
Go to "Unusual Activities" page, filter to "holding orders". Find the order that you want to deal with and click "process". If you are sure that the transaction is actually successful on blockchain, select "valid" and enter the transaction's hash and the block number it was mined into. If the transaction fails to be mined, select "invalid" and then select "init" if you want Jadepool Hub to retry broadcasting the transaction or select "failed" if you want it to stay at "failed" state. This whole process may require multiple people's approval. So the proposal will take effect
only after the total weights are met.

### How to enable/disable a blockchain?
enable blockchain:
1. Go to "Blockchain Management", select the blockchain and click "enable".
2. Go to "Process Management", select a server and add a process for the blockchain you want to enable.
3. Select the wallet and go to "Wallet Settings", select and enable the blockchain.

disable blockchain:
<br>
Go to "Blockchain Management", select the blockchain and click "disable". It will be disabled after all related processes are safely stopped.

### How to resend callback?
Select the wallet and go to "Orders" page, click the order and click "resend callback" button. It will only resend the latest callback.

### How to see the balance of token xxx?
Select the wallet and go to "Assets" page, you can see the balance of all assets enabled in this wallet.

### How to customize the water level of token xxx?
Select the wallet and go to "Assets" page, select the token and go to "Real-time config" tab, you can see all configurations and are able to edit if you have the permission.

### How to add an App ID?
Select the wallet and go to "App Management" page, click "Add" button and filled in required information.

### How to see and replace Jadepool Hub's ECC public key?
Go to “Jadepool” page and click to view the public key, you can copy, replace or view the compressed version of the public key.

### How to enable Audit?
Go to “Jadepool” page and enable the Audit function, you are able to schedule the audit time.

### How to reset the ruler height for blockchain?
Go to "Blockchain Management", select the blockchain and click "More", click "reset ruler" button. It will replace the ruler height with new height.

### How to rescan a missed deposit?
Go to "Rescan", select the blockchain and filled the block or the address then start rescan.

### If user made a deposit but filled in wrong memo, what to do?
Jadepool Hub will generate an order of "recharge unexpected" type. Select the correct wallet and go the "Orders" page, click the order and start a proposal of either refund or recognizing the order as a deposit. Then the proposal will appear in the "Unusual Activities" page. This whole process may require multiple people's approval. The proposal will take effect
only after the total weights are met.

### Can I refund tokens to user?
Only orders of "recharge unexpected" type can be refunded for now. Please refer to the answer in previous question.

### How to re-check an order's state?
Select the correct wallet and go the "Orders" page, click the order and click "Check this order".