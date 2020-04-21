## 紧急更新SDK

1. 登陆到开启Kusama的机器上（master or agent）

2. cd jadepool-hub/blockchains/Kusama

3. 修改 package.json

   ```bash
   {
     "name": "jadepool-chain-kusama",
     "private": true,
     "dependencies": {
       "@polkadot/api": "~1.11.0-beta.32",
       "@polkadot/keyring": "~2.8.1",
       "@polkadot/util": "~2.8.1",
       "@polkadot/util-crypto": "~2.8.1",
       "bignumber.js": "^9.0.0"
     }
   }
   ```

4. 在目前的路径下（jadepool-hub/blockchains/Kusama）执行 npm install

5. 重启Kusama相关进程

6. 如果Kusama需要换机器开启，需要对相应的机器进行上述更新操作

