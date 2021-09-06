## 1.Normal
After the amount of assets in the deposit address exceeds a certain threshold, it will be automatically aggregated to the main address (not on utxo blockchains). 

ETH Illustration
![](image/eth-normal.png)

BTC Illustration
![](image/btc-normal.png)

## 2.Safe & AML
On the basis of the Normal mode, this mode adds the AML control on the deposit addresses. When deposit address receiving a deposit, the front-end system conducts an AML review of it and call the API to request assets aggregation to the main address only if it passes. 

Safe & AML Overview
![](image/aml-overview.png)

ETH Illustration
![](image/eth-aml.png)

BTC Illustration
![](image/btc-aml.png)