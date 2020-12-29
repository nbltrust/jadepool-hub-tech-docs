Jadepool Hub does not store private keys on server! It provides two solutions shown as below:

### HSM

#### Amazon CloudHSM
Amazon CloudHSM has been certified for FIPS-140-2 Level 3. Jadepool Hub supporting Amazon CloudHSM is still in development. The release can be expected before Dec. 2019.

#### Securosys
Securosys is a well-known Swiss technology company dedicated to securing data and communications. Securosys develops technically superior, security-wise most trusted, and financially competitive hardware and software for crypto assets and blockchain technologies. Their main product, Hardware Security Module, has been certified with CC EAL 4+, CE, FCC and UL and is being certified for FIPS-140-2 Level 3 and are located in data centers complying to ISO 27001. Securosys’ products are currently used by 10 out of 10 top banks in Switzerland and already protect the Swiss Banking System by securing € 100 Billion in daily transactions.

### Seed Vault

Seed Vault is the alternative solution for HSM. Seed Vault can generate
"seed" which can be combined with the derivative path created by Jadepool to derive and recover private keys. SEED will be stored locally as encrypted, and the software guarantees its security by providing client the ability to set password and whitelist. Seed Vault is also a data safe. It has to store plenty of critical data that are needed by Jadepool, such as cold wallet address. Those data are stored locally as encrypted as well. In comparison, HSM is much more secure than Seed Vault. However, HSM firmware upgrade takes longer time. Client can choose between HSM and Seed Vault
or even switch between them.
