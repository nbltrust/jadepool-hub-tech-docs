## 紧急更新SDK

### Kusama

1. 登陆到开启Kusama的机器上（master or agent）

2. cd jadepool-hub/blockchains/Kusama

3. 修改 package.json

   ```bash
   {
    "name": "jadepool-chain-kusama",
    "private": true,
    "dependencies": {
      "@polkadot/api": "^3.4.2-3",
      "@polkadot/keyring": "^3.5.1",
      "@polkadot/util": "^3.5.1",
      "@polkadot/util-crypto": "^3.5.1",
      "bignumber.js": "^9.0.0"，
      "elliptic": "^6.5.3"
    }
   }
   ```

4. 在目前的路径下（jadepool-hub/blockchains/Kusama）执行 npm install

5. 重启Kusama相关进程

6. 如果Kusama需要换机器开启，需要对相应的机器进行上述更新操作



### Polkadot

1. 登陆到开启Polkadot的机器上（master or agent）

2. cd jadepool-hub/blockchains/Polkadot

3. 修改 package.json

   ```bash
   {
    "name": "jadepool-chain-polkadot",
    "private": true,
    "dependencies": {
      "@polkadot/api": "^3.4.2-3",
      "@polkadot/keyring": "^3.5.1",
      "@polkadot/util": "^3.5.1",
      "@polkadot/util-crypto": "^3.5.1",
      "bignumber.js": "^9.0.0"，
      "elliptic": "^6.5.3"
    }
   }
   ```

4. 在目前的路径下（jadepool-hub/blockchains/Polkadot）执行 npm install

5. 重启Polkadot相关进程

6. 如果Polkadot需要换机器开启，需要对相应的机器进行上述更新操作
