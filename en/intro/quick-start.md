If you have the Jadepool system all setup and ready to use, follow the steps below to get started.

### Obtain Deposit Address

End user needs to obtain a deposit address through the front-end system and transfers asset from his / her own wallet to the address. 
<br>
https://nbltrust.github.io/jadepool-hub-api-docs/#create-single-address

### Make a Deposit
Once obtained a deposit address from the step above, make a transfer to the address from your own wallet. 

### Fetch Wallet Status
After making transfer to the deposit address, it should be shown in the balance if the transaction is broadcasted successfully.
<br>
https://nbltrust.github.io/jadepool-hub-api-docs/#fetch-wallet-status

### Validate Address
Now Jadepool has balance so it can process withdrawals. Before request a withdrawal, make sure to validate the receiver address first so the withdrawal won’t be rejected.
<br>
https://nbltrust.github.io/jadepool-hub-api-docs/#validate-address

### Request Withdrawal
After the receiver address is validated, request a withdrawal and obtain the withdrawal order ID. 
<br>
https://nbltrust.github.io/jadepool-hub-api-docs/#request-withdrawal

### Fetch Order Details
Key information can be obtained from querying the order with the order ID from the step above, including the transaction hash, fee and the current status. 
<br>
https://nbltrust.github.io/jadepool-hub-api-docs/#fetch-order
