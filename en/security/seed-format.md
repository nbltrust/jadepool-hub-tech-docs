## Wallet Configuration

path | key | description
--------- | ------- | ------------------
data | BTC | cold wallet address<br/> mqVkRyxSy5raNpbPKZ24tQMyPFH5PbLPBT
data | USDT | Use BTC's cold wallet address if not configured<br/> mudEpJQTfFagB3d4Qs4bpFXcCdKceRMiR2
data | CYB | hot wallet account /hot wallet account's password/cold wallet account/password<br/> apdae0/apdae1APDAE2eadpa3/apdae1/password
data | CYB | hot wallet account/hot wallet account's private key/cold wallet account/prikey<br/> apdae0/5JM5t8kkisBfiLKtRaAh2cioJ4AAiFSbp77WGAdStEGmSSkkHcT/apdae1/prikey
data | CYB | hot wallet account/hot wallet account's password/cold wallet account/bin<br/> apdae0/apdae1APDAE2eadpa3/apdae1/bin
data | EOS | hot wallet account/hot wallet account's private key/cold wallet account<br/> hotwallet/5KBefyZPfqRH6pJiaGFgua7dupA4sQeVomzq9QssyBWX14udekE/coldwallet
data | ETH | cold wallet address<br/> 0x04e98d7a5ca93d3ddcf88dbb0f9dde1e2910061f
data | LTC | cold wallet address<br/> mxZFaM1iae8XWjufW78rdn6bjSTDKGfCis
data | NEO | cold wallet address<br/> AH4bzRixpQConLGK3ueiHB1tZHs99DoEBg
data | VET | cold wallet address<br/> 0x66e0e906381e44ed68daba3e1abaa1dac03b28db
data | QTUM | cold wallet address<br/> qfxFVjUj8LZsmzKuTMrK9RV3fp5bbZ7nbW
data | XLM | cold wallet address<br/> GAWAZGFOSRXTAUZILRSX4NYVXRMU5AMELDTHI2YUETJE64KP2UORJMBV
data | XRP | cold wallet address<br/> rGXYu6amLHGfUQP31koxWA5wZeTv6k7bJ
data | COSMOS | cold wallet address<br/> cosmos1txsexx3hakuwhtfsmxrz6g0eynszt4dpngvlg9
data | Irisnet | cold wallet address<br/> faa1temysg90fdz2mj5vzx0y9qxw8j6au823kvv4hf

## Database Configuration

path | key | description | example 
--------- | ------- | --------- | -----------
data | MONGO_CFG | required and must be the same as the example | default/config/admin
data | MONGO_CFG:default | Jadepool's main data | mongodb://localhost:27017/jadepool-BN-dev
data | MONGO_CFG:config | Jadepool's configuration data | mongodb://localhost:27017/jadepool-cfg-dev
data | MONGO_CFG:admin | Jadepool's admin user data | mongodb://localhost:27017/jadepool-BN-dev

## Other Configuration

path | key | description | example
--------- | ------- | --------- | -----------
config | client | IP whitelist | 127.0.0.1,127.0.0.2,127.0.0.3

---

## More

There are 3 modes to set CYB data depending on your Cybex wallet type:
1. Cloud Wallet: Set your Cybex cloud wallet account as hot wallet, hot wallet password and another Cybex account as cold wallet together in the data, and then add the mode type “password” or not (the spelling of “password” must be exactly same and must be in lowercase). The data format should be: Hot wallet cloud account / hot wallet password / cold wallet account / password, or hot wallet account / hot wallet account password / cold wallet account (for example: apdae0 / apdae1APDAE2eadpa3 / apdae1/password, or apdae0 / apdae1APDAE2eadpa3 / apdae1).

2. Local Wallet + Private Key: Set your Cybex local wallet account as hot wallet, hot wallet private key and another Cybex account as cold wallet together in the data, and then add the mode type "prikey" (the spelling of "prikey" must be exactly same and must be in lowercase). The data format should be: hot wallet local account/hot wallet private key/cold wallet account/prikey (for example: apdae0/5JM5t8kkisBfiLKtRaAh2cioJ4AAiFSbp77WGAdStEGmSSkkHcT/apdae1/prikey).

3. Local Wallet + wallet backup file: Set your Cybex local wallet account as hot wallet, hot wallet password and another Cybex account as cold wallet together in the data, and then add the mode type "bin" (the spelling of "bin" must be exactly same and must be in lowercase). The data format should be: hot wallet account/hot wallet password/cold wallet account/bin（例如：apdae0/apdae1APDAE2eadpa3/apdae1/bin. In addition, the backup wallet bin file of the hot wallet account needs to be placed under the directory of Jadepool-BN, and set the file path in the config (default path is: secret/cybex-hot.bin).