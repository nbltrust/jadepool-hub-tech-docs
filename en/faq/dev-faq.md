### Does Jadepool provide SDK?
[Java](https://github.com/nbltrust/jadepool-sdk-java) and [Node js](https://github.com/nbltrust/jadepool-sdk-nodejs). SDKs don't support V2 API. Still can be used for code reference.

### How to determine if Jadepool API calling is successful?
Under API V1 version, the returning status code 200 means a successful call and 500 means a Jadepool known error is triggered. Under V2 version, the returning status codes for both cases mentioned above are 200. Client needs to determine if the calling is successful based on the error code in the response body.

### Can "validate address" API validate any address?
This API can be used to verify any address of Jadepool's enabled tokens(chains). It is highly recommended to call the API to validate user's withdrawal address before submitting a withdrawal request.

### How to resend callback?
Click "Resend" button on the order details page. Then the last callback of the order will be resent.

### What is “data” in the callback?
Data is for reference. It is the latest real-time information of the transaction Jadepool obtained from the blockchain everytime before sending the callback to client. 

### How does Jadepool make sure that client will receive callbacks?
When Jadepool sends a callback to the client's notification service, if the HTTP status is greater than or equal to 400, it will be considered as failed. If the failed-sent callback is to notify client the order's final state (done or failed), Jadepool will automatically retry sending the callback until it succeeds. Jadepool won't retry if the failed-sent callback is to notify client the order's other states (init, online, pending).

### Why does it take a long time to receive the first callback for the deposit? Can it be accelerated?
No. The time interval is for avoiding mistakenly recording invalid transactions on the forked chain when a fork occurs.

### How to use the "warning" function?
Go to "Jadepool service" on Admin to enable the "warning function" and set the frequency to receive warnings. Then go to "System Configuration" tab and edit "Mailbox Configuration" to set the sender of the warning email. Superadmin should ensure that users who need to receive warning emails have set their email addresses and have the permission.

### How to receive warning emails if Jadepool is deployed within Intranet?
Jadepool will support warning notification in the future. Client will be able to choose to use either the email mode or the notification mode.

### Why do I still receive the transfer after I filled the wrong memo while requesting withdrawal?
Memo is a string only used for recognizing deposits. If you are to withdraw to other exchanges, you should first obtain memo on that exchange and fill that memo correctly in Jadepool’s withdrawal request. If not, the other exchange will not identify your deposit. In the same way, whether you are transferring from your own account or from other exchanges to Jadepool, the memo provided by Jadepool should be correctly filled in the transaction, so that Jadepool can accurately identify your deposit. Memo has nothing to do with the execution of the withdrawal transaction. There is nothing right or wrong about the memo on blockchain.

### Why is it so slow to scan EOS deposit orders?
To ensure security, Jadepool only scans transactions that are packed in the block that is lower than the "last irreversible block". On mainnet, it takes approximately 330 blocks (the EOS block rate is 0.5 seconds, so it takes about 3 minutes) for a transaction to be irreversible after being packed.

### I transferred some locked CYB to Jadepool. Why is it not recognized?
Locked CYB cannot be used. Jadepool does not recognize locked CYB.

### Why is there no order created for depositing VET? Why isn’t it gathered automatically?
Any transaction of Vechain consumes VTHO. A certain amount of VTHO (about 70) is required to complete the initialization when Jadepool enables VET for the first time. VET can not work without VTHO. Each deposit address requires approximately 37 VTHO to authorize too. Each transfer of VET costs approximately 21 VTHOs.

### What does the internal order with 0 VTHO mean?
It is transaction of authorization. It is a smart contract execution.

### How come the from address of my withdrawal transaction is not my deposit address?
Jadepool is just a wallet with no user information and does not know who transfers to the deposit address. Balance in user's deposit address is not equal to user's balance on the client's platform. The from address(es) of outgoing transfer may be one or multiple, may include the deposit address or not, depending on how Jadepool builds the transaction. 

### How come the withdrawal order is shown as "done" on admin but I haven’t received the transfer in my wallet?
Please check if your wallet has synced to the block in which the withdrawal transaction is mined.

### How is the mining fee calculated?
Generally, Jadepool obtains the recommended fee value from node and then calculates the mining fee. For BTC, Jadepool uses the real-time fee/kilobyte (cost per kb) value obtained from node. The value of fee/kilobyte can be adjusted with a selector configuration. The value of the selector can be any integer from 2 to 25, with 2 costing the highest and 25 the lowest. For ETH, Jadepool obtains the real-time gas price from node.

### Why are there multiple ‘from’ addresses in one BTC transaction?
Because there can be multiple input addresses in a Bitcoin transaction.

### How many confirmations does utxo need to be usable for Jadepool?
Using testnet (in dev and staging modes) does not limit the number of utxo confirmations, which means any utxo can be spent even without block confirmations. Using mainnet (in production mode) requires at least 1 confirmation for utxo, that is, the output of the transaction is not usable until the transaction is packed into a block.

### Why doesn't EOS-like chain support internal transfers?
There is only one deposit account of EOS-like chain. Plus, Jadepool will provide a unique memo to each "create new address" request. Memo will be used to distinguish deposits. The deposit account cannot transfer to itself.

### How many confirmations are needed for EOS-like chain transactions to be irreversible?
There is no fixed number. EOS uses the "last irreversible block" mechanism, so as long as the block of the transaction is higher than the irreversible block, it is theoretically reversible.

### Does Jadepool have API to acquire VTHO rewards generated from VET?
No. The official API of Vechain is: https://vechain.github.io/thorify/#/?id=get-account-energyvtho-balance 

### How come audit result does not include the order I am looking for?
Audit only calculate orders that have reached the final state (done or failed). Please check if the order has reached the final state at the time of auditting. If it has, check whether the block number of the order transaction is lower than the auditting timestamp.
