### Under what circumstance will the order fail?
1. Jadepool determines the transaction status according to the node. If Jadepool fails to get the transaction status on node, the order status will show as “success” on chain but “failed” in Jadepool. 
2. Transaction failed to be mined: transactions sent by Jadepool may be expired or just abandoned by the node.
3. Blockchain traffic: very common on Ethereum.
4. Smart contract execution failed: very common on Ethereum. This happens when the transaction was successful but the internal smart contract execution failed, that is, the transfer of the tokens failed.
5. Blockchain fork: This case is for incoming transactions. Jadepool configures the "soft fork ignore gap" for each chain to avoid detecting invalid incoming transactions due to soft fork. However, it does not completely eliminate the possibility. If an incoming transaction is detected on the forked chain and failed to be mined into the main chain after the fork ends, the transaction will be invalid and the order will then fail.

### Under what circumstances will there be an order of type RECHARGE_UNEXPECTED created?
For EOS-like chains, an unexpected order will be created if the transfer comes from an account other than a cold wallet or the transaction memo is not provided by Jadepool. For other chains, all transfers to the main hot wallet address except from the cold wallet address and deposit address would be recognized as unexpected transfer.

### Under what circumstances will the order stay at the “online” state? 
1. When the blockchain is congested and the mining fee for the transaction is relatively low, the transaction will be cached in the blockchain memory pool waiting for the miner to pack into the block.
2. After the transaction is sent, there is no new block produced and the transaction is waiting to be packed into the next new block.

### Under what circumstances will the order stay at the “holding” state?
When Jadepool sends a transaction to node but gets error, order will stay at holding state. However, getting error from node does not mean sending transaction definitely failed. So “holding” orders need manual intervention to confirm on blockchain if the transaction is successfully sent or not.

### What is the basis for setting "high water level", "low water level" and "target water level"?
These three settings should be considered based on the client platform's situation, such as active uses, risk control and the value of each tokens against fiats.

The higher "high water level" is, the lower the probability of hot-to-cold transfer be triggered, thus facing larger risks for storing too much assets in the hot wallet. And if the "high water level" is too low, the hot-to-cold transfer will be triggered very frequently and cause too much fee consumption.

If "target water level" is too low, the balance in Jadepool will be too low after the hot-to-cold transfer and there wouldn't be enough money for withdrawal requests. But if "target water level" is too close to the high water level, it will cause frequent transfers from hot wallet to cold wallet, leading to huge cost of mining fee.

"Low water level" should be set at a sufficient amount level for withdrawal, and leave plenty of time to replenish the hot wallet.

### How does Jadepool determine that order is “done”?
The standard for an order to be done is that the transaction becomes irreversible on the blockchain. Taking BTC as an example, a BTC transaction requires at least 6 block confirmations to be considered as irreversible. The first confirmation is achieved after the transaction is packed into a block, and chain producing five more blocks to be five confirmations on the transaction. After making sure a total of six block confirmations reached, the transaction is irreversible and the order is set to done.

### Does Jadepool know how much assets each user has?
No. Jadepool does not have any information about the user. User's asset and the relation between users and their deposit addresses should be stored in client's database.

### Who pays for the mining fee for withdrawals?
It is technically paid by users. For example, if a user deposits 1 BTC at client's platform (Jadepool), the maximum amount the user can withdraw is only 0.9BTC since client deducts 0.1BTC for withdrawal fee. In this particular withdrawal, client's profit is 0.1BTC deducting the withdrawal's transaction mining fee. Therefore, client should establish a reasonable fee standard for withdrawals.

### Does order failing cause any loss to the user?
Jadepool does not store user's information. Jadepool will notify client if order is failed. There won’t be any loss to the user as long as client processes callbacks correctly.

### Are all Jadepool orders trackable on blockchain?
All orders can be tracked on blockchain.

### In what order does Jadepool process withdrawal requests?
All requests are processed in the order in which they are received. However, if the balance is insufficient to process the front withdrawal, system will skip it and process the withdrawal with smaller amount first.

### How does Jadepool detect deposit (incoming transfers)?
Each blockchain enabled in Jadepool needs to be configured with node URL. As nodes continue to synchronize with the blockchain, Jadepool will scan all transaction in each block and then identify the transfer type according to different cases.

### What happens when the withdrawal amount exceeds the "high water level"?
It will be rejected by Jadepool (API error).

### What happens when balance is lower than the "low water level"?
When Jadepool detects that the balance of a certain token is lower than the "low water level", it will send an warning email to all Jadepool Admin users who has the warning permission. Hot wallet should be replenished immediately after receiving the alert email.

### What happens when balance is insufficient?
Jadepool will still accept withdrawal requests. If the balance is insufficient to process the withdrawal, order will remain at the “init” state until the balance is sufficient.

### Can users set their own mining fee?
No.

### What to do if user's deposit transaction can be tracked on blockchain but not in Jadepool?
First thing is to confirm that if Jadepool has synced to the block which the transaction is packed into. If it has, go to admin "Rescan Order" page to try rescan the block.

### Why can't I use admin with IE?
Admin does not support IE browser, please use Chrome or Firefox.

### Why can't I see XX option in Aadmin?
Admin system is based on permission. Each option is only visible to users with permission.

### How come "unavailable balance" shown on Admin is very high?
Because most of the tokens are scattered in the deposit addresses instead of gathered to the main hot wallet address. You can lower the value of the "SweepToHotCap" configuration. When the balance in the deposit addresses is higher than this configuration, all tokens will be gathered to the main hot wallet address.

### Why are my deposits shown in the unavailable balance, how can I make it available?
Same as the previous question.

### What to do if I forgot my admin account password?
Any admin accounts with “user” permission can modify the passwords of other accounts.

### How come the number of confirmations is higher than the configured "minimum confirmation number" when order reaches "done"?
The configuration is the "minimum" confirmation number which means that the transaction is irreversible as long as its number of confirmations is greater than or equal to this value. Jadepool uses scheduled task to check transaction's status. Thus, considering multiple blocks might be produced between the tasks, the number of transaction confirmations is not necessarily equal to the " minimum confirmation number" but only to be larger than or equal to this configuration.

### How to add a token?
Go to admin “Token Management” page, select the blockchain of the token you want to add, and click “Add” in the sidebar (if there is no “Add” button, it means you cannot add token to this blockchain). Fill in the basic information of the token, and then click Enable on the page of this token.

### How to audit?
You can audit by calling the audit API, or enter "Jadepool Service" page on the admin, enable "Daily Audit" function" and set the daily audit time. Audit reports can be downloaded on "Daily Audit" page.

### Would “holding” order change its status automatically?
No. The “holding” orders must be manually processed. If the order stays at "holding" state over one hour, the admin "Holding Orders" will show that the order is available to be manually processed.

### How to manually process holding orders?
Processing a holding order requires two admin users with permission of order management. Both admin users need to confirm the actual status of the transaction on blockchain. Then one user proposes a solution, and the other user approves the solution or disapprove. There are three solutions for holding orders: 
1. transaction failed and needs to be sent again: the status of the order will return to "init" and the order will be retried.
2. transaction failed and should order should be failed: the status of the order will be set to "failed".
3. transaction sent successfully: the status of the order will be set to "online" and reach final state once Jadepool system confirms the transaction on node.

### I have manually processed the holding order, why is the order still at holding state?
It is possible that the order returned to init state after being processed, but sending transaction to node got an error again so leaving the order at holding state again.

### Can Jadepool resend the withdrawal transaction if it fails?
No. Jadepool won't initiate any transaction on its own unless requested by client. In this case, client needs to submit a new withdrawal request of the same amount and receipt address to Jadepool again.

### What does "disable deposit & withdrawal" mean?
This means that Jadepool will reject the withdrawal request and will not create any deposit order even if the deposit address receives transfer.

### Why can't I receive the alert email?
First, please check if your account has the permission to receive warnings. If it does, please check if you have set email address in your account profile. If you have, then check if the email sender configuration is correctly configured.

### Why is there no alert when the balance of the main hot wallet address is lower than the "low water level"?
The water level setting is not for a particular address, but for the total available balance in Jadepool, as long as the available balance is higher than the low water level, no alert will be triggered.

### Jadepool's balance has been recharged to be above the "low water level". How come I still receive alert emails?
The alert email shows all the history records of Jadepool detecting insufficient balance since the last alert email. If the frequency for receiving alert email is set to be a long time, you might receive emails containing previous alerts.

### I set the "target water level" at 0 but balances are not transferred to the cold wallet completely?
If you want to transfer all the assets to the cold wallet by setting the water level, the "target water level" should be higher than the mining fee of the transfer transaction. For assets like BTC and ETH, Jadepool will collect the recommended mining fee from node, which means that the the mining fee is not a fixed value but calculated accordingly. Technically, assets cannot be completely transferred out for certain blockchains.

### What happens when user fills in the wrong memo when depositing EOS/CYB to Jadepool?
An order of RECHARGE_UNEXPECTED type will be created.

### The user has deposited assets to Jadepool, the transaction is confirmed on blockchain and the balance of Jadepool is increased as well. There is no order created. What happened?
Please check if the Jadepool is synchronized to the block in which the deposit transaction is packed. If synchronized, please check if an order of RECHARGE_UNEXPECTED type has been created.
