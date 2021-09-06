### Deploy ERC20 smart contract on Kovan testnet

1. Install [MetaMask](https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn) on chrome，create new wallet if you don't have one and select to use Kovan.

2. Deploying smart contract burns ETH (testnet coin). Go to [Kovan faucet](https://faucet.kovan.network) to get some testnet ETH coins if you don't have any.

3. Go to etherscan and find the token's official page. Copy the contract source code.
![](image/ether-sc.jpg)

4. Go to [Remix](https://remix.ethereum.org/#optimize=false&evmVersion=null&version=soljson-v0.5.1+commit.c8a2cb62.js&appVersion=0.7.7) and paste the contract source code.

5. Select the Compiler Version to the version circled in red in the screenshot above.
![](image/compile.jpg)

6. Select the Contract Name to the contract name circled in red in the screenshot above. Then click "Deploy".
![](image/deploy.jpg)

7. MetaMask will pop up a window to ask you to confirm the transaction.

8. The transaction is sent and smart contract "0x1d8d3b05ca69108c92cc48ff63e201f97d38b14a" is created.
![](image/contract-created.jpg)