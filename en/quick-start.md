We can provide client with free trial of 1 month. [Contact us](contact.html). 

If you have the Jadepool system all setup and ready to use, follow the steps below to get started.

### Obtain Deposit Address

End user needs to obtain a deposit address through the client system and transfers asset from his / her own wallet to the address. 

[V1](https://nbltrust.github.io/jadepool-api-docs/#create-single-address)
<br>
[V2](https://nbltrust.github.io/jadepool-api-docs/#create-single-address-2)

### Make a Deposit
Once obtained a deposit address from the step above, make a transfer to the address from your own wallet. 

### Fetch Wallet Status
After making transfer to the deposit address, it should be shown in the balance if the transaction is broadcasted successfully.

[V1](https://nbltrust.github.io/jadepool-api-docs/#fetch-wallet-status)
<br>
[V2](https://nbltrust.github.io/jadepool-api-docs/#fetch-wallet-status-2)

### Validate Address
Now Jadepool has balance so it can process withdrawals. Before request a withdrawal, make sure to validate the receiver address first so the withdrawal won’t fail on this reason.

[V1](https://nbltrust.github.io/jadepool-api-docs/#validate-address)
<br>
[V2](https://nbltrust.github.io/jadepool-api-docs/#validate-address-2)

### Request Withdrawal
After the receiver address is validated, request a withdrawal and obtain the withdrawal order ID. 

[V1](https://nbltrust.github.io/jadepool-api-docs/#request-withdrawal)
<br>
[V2](https://nbltrust.github.io/jadepool-api-docs/#request-withdrawal-2)

### Fetch Order Details
Key information can be obtained from querying the order with the order ID from the step above, including the transaction hash, fee and the current status. 

[V1](https://nbltrust.github.io/jadepool-api-docs/#fetch-order)
<br>
[V2](https://nbltrust.github.io/jadepool-api-docs/#fetch-order-2)
