Jadepool Hub is a crypto asset self-custody software solution that automates blockchain-related services of multiple blockchains and thousands of tokens. It is mainly responsible for signing & broadcasting transactions, monitoring blockchain and managing all crypto assets etc.. Jadepool Hub is a very crucial component in the Jadepool Custody system. The main services it provides include deposit, withdrawal, cold storage, staking, airdrop etc.. 

Jadepool Hub is self-custody software solution designed for institutions and it is not open source for now. Release packages would be provided to clients for onsite deployment and upgrade. Jadepool Hub can connect with a wide range of clients, such as exchanges, wallets, Tokenfunds, crypto asset management platforms, mining pool and so on. Jadepool Hub can be used with Jadepool SaaS to build a more complete custody system.

The list of supported blockchains by Jadepool Hub is as below. More blockchains can be supported as per clients' requests.

Status | Chains&Tokens 
--------- | ------- 
Supported | Bitcoin、Ethereum、ERC20、Omni(USDT)、EOS、Litecoin、Ripple、Stellar、Neo、VeChain、Qtum、Cybex、Cosmos、IRISnet、Bitcoin Cash、Zcash、Tezos、ChainX、QLink、Algorand、TomoChain、Kusama、Tron、Polkadot、Harmony、EveriToken（Genaro、Ontology、V Systems、Factom、CyberMiles
Coming | BlockStack、Dfinity

<br>

### Separate Cold Storage
As hot wallet, Jadepool Hub must be equipped with another wallet which can be cold wallet, hardware wallet or mining machine depending on clients' business needs. Therefore certain percentage of the total assets will be transferred out of the hot wallet and safely stored in another trusted wallet.

### Secure Private Key Storage
Jadepool Hub's private keys are definitely not stored on server. For the security of private key usage, Jadepool Hub provides clients with two solutions: Seed Vault and HSM. For details please see [Private Key Security](private-key.html)。

### High Performance
Modularization and micro-service enables Jadepool Hub to support distributed deployment, that means one server can be fully used for monitoring and processing requests for only one chain. This lowers the risk as much as improves the software efficiency.

### Third-party Implementation
Jadepool Hub’s business partners are able to develop their own code to support new blockchains based on Hub's micro-service structure. The implementation can be shared within the Jadepool Hub eco-system.   

### Admin Management
Admin, a management web designed for Jadepool Hub, is provided to client for
monitoring Jadepool Hub running status. Based on different levels of role permission, clients are able to create hot wallet, view orders, check balance, audit, customize
configuration, manage roles and users etc.. It is a very convenient tool to manage the system within institution.

### Audit
For the safety of client's assets and data consistency, Jadepool Hub provides order tally and audit functions. Client is able to turn on and schedule the tally function on Admin, reports can be downloaded once tally is finished. Audit is the function that rechecks order's status with blockchain node.
