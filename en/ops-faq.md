### What starting modes does Jadepool have? What are their differences?
There are three modes: dev, staging, and production. Both dev and staging modes use testnet. Dev is the test environment, in which the ECC is not on, while the staging is the pre-production environment, in which the ECC is turned on and the default configuration is the same as that for the production environment. Production mode is for production environment, where ECC is on and applies the mainnet.

### if Jadepool starts with the production mode, can I configured it with testnet node?
No. Dev and staging modes use testnet and production mode must be configured with mainnet node.

### How to set callback?
Each appid can be configured with notification URLs corresponding to each order type. Go to "App ID" on Admin and set your app with the notification URL of which the order you desired to receive callback.

### What to do if my notification service does not receive callback?
First, check if your service is working well. If it is, check whether the notification URL of the order is correct. If it is not correct, go to "App ID" page to correct it and resend the callback. If everything is good, go to "Process Management" page to check whether the "general process" is up.

### Can I set more than one notification URL for one order type?
No. Only one notification URL can be configured for one order type under an appid.

### What should I do to enable/disable a blockchain?
To enable: Go to “Blockchain Management”, click “More” of the blockchain you want to enable and fill in the node URL, then click "Enable". Then go to "Process Management" page, select the machine you want to initiate the blockchain on and click "Add Process", select the blockchain in the pop-up window and confirm it is added. 

To disable: Go to “Blockchain Management”, select the blockchain and click "Disable". If there are still processes running, the disable button will kill all processes and after it is done, you can click "disable" again to fully disbale the blockchain. 

### What is the ruler height and the synced block?
As the node keeps synchronizing with the blockchain, Jadepool will filter each transaction in the block and then determine the order type depending on different cases and store the transaction information in database. The ruler height is the height of the block that has been scanned by Jadepool. The synced block is the block height that Jadepool's node has synced to.

### The ruler height/synced block has remained the same for a long time, what should I do?
First, check if the node is running properly. If it is, go to "Process Management" to restart the blockchain's process.

### What is the impact if the ruler height is lower than the synced block height?
Scanning would be much behind, that means, the newly incoming transactions won't be recognized until the blocks they were mined into are scanned by the Jadepool.

### Why is the ruler height always lower than the synced block?
Considering the high possibility of the blockchain fork, for each chain Jadepool has configured a "soft fork ignore gap" to prevent mistakenly recording invalid transactions on the forked chain. In other words, Jadepool only scans the block lower than the synced block deducting "soft fork ignore gap". Thus, the height difference between the ruler height of the synced block height is the value of "soft fork ignore gap" configured.

### There is a large height difference between ruler height and the synced block height. How long will it take for ruler height to catch up with the synced block? Can it be accelerated?
This depends on the block producing speed and the interval of the scheduled task to scan blocks. You can lower the interval configuration or increase the block number to scan in one scheduled task. If only for testing, you can click "reset ruler" on "Blockchain Management" page.