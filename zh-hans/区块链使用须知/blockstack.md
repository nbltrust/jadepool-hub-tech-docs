## Blockstack
1. Blockstack链是一条基于Bitcoin链的的区块链,它通过解析Bitcoin的区块,查找属于blockstack链的交易,在一笔交易达到7个或更多区块确认之后,记录在自己的区块中.
2. Blockstack链发送一笔STX转账的原理 是类似于USDT的. 其会发送一笔拥有特殊OP_RETURN指令的交易到BTC链上,Blockstack链会后续进行解析处理.
3. Blockstack发送交易产生的手续费是BTC

## Blockstack在Jadepool Hub的实现
1. Blockstack链作为单独的一条链存在于 Jadepool Hub中
2. Blockstack链需与BTC链配合使用. 
3. Blockstack下有两个子币种. 主币种:STX,  子币种:STXBTC (用来计Fee)
4. STXBTC子币种唯一的作用是 STX交易消耗Fee的计量单位 (实际记录的是使用BTC的数量),不实现其他任何功能.
5. Blockstack链与Bitcoin链是会共用热主地址的. 在此前提下,它就可以使用BTC热主地址上的utxo来发送STX的交易, 最终Blockstack链会将交易产生的fee变相的以STXBTC为单位记录在自己的订单中
6. 此实现背景下, 'BTC链中实际余额' 是会比 'BTC链统计后理论余额' 少的. (被STX交易消耗了)
7. 统计须知: BTC链中实际余额 = BTC链统计后理论余额 - STX币种统计中STXBTC fee的总额

## 使用注意事项 
1. BTC链热主地址需保证有足够的余额,用来支持STX发送交易
2. Blockstack链中需要同时配置Bitcoin节点和Blockstack节点.
3. STXBTC子币种禁止关闭.  

   >STXBTC在 Jadepool Hub 默认为开启的, 为了STX币种能够正常运行,禁止将STXBTC币种关闭

4. Blockstack与BTC链需要同时启用.

   >如果BTC链不启用,将导致无法正常生成找零订单 以及无法扫描到DUST入账订单,最终导致BTC的统计账单无法平账.(这里的找零订单,DUST入账订单都是Blockstack链运行时产生的)

5. 充值汇总到热主地址的阈值需要被合理设置

   > 由于STX转账使用的是BTC作为手续费,其转账代价比较大,需根据实际情况设置阈值

6. 交易确认机制问题.

   > 由于Blockstack链延迟7个或更多区块确认之后,才将Bitcoin链上交易解析到其自身区块信息中, Jadepool Hub中的订单发出后,会存在Bitcoin浏览器中可以找到此交易,但是Blockstack 浏览器无法找到此交易的情况. 所以如果想要确认一笔订单真的上链失败了,需要确认在Bitcoin浏览器中无法查找到此交易.

7. BTC与STX并发大量提现订单时,存在小概率订单holding.

   > 由于共用热地址,造成utxo同时被重复使用,导致上链失败,订单则holding

## BTC地址与STX地址转换方法

1. 根据 <https://github.com/blockstack/cli-blockstack> Readme中指引安装cli工具

   #### Requirements

   - [Node.js](https://nodejs.org/en/download/) v8 or higher (v10 recommended).
   - [`nvm`](https://github.com/nvm-sh/nvm) is recommended for MacOS & Linux users to avoid `sudo` or [permissions problems](https://docs.npmjs.com/resolving-eacces-permissions-errors-when-installing-packages-globally).

   #### Install the CLI

   ```
   $ npm install -g https://github.com/blockstack/cli-blockstack
   ```

2. 到这里,我们可以在命令行中在BTC与STX地址中做转换

   > 具体为`blockstack-cli -t convert_address ADDRESS`  其中 -t 代表测试网地址, ADDRESS既可以为BTC地址,又可以为STX地址.

3. 生成地址的命令

   >  'blockstack-cli -t make_keychain'  可以生成一套地址

## 节点安装部署
### Requirements

- ubuntu16.04+
- nodejs v8
- 2 Core CPU or above
- 4G Memory or above
- 30G Storage or above
- NTP service on
- nodejs v8+

### install

#### install btc regtest and jion blockstack regtest

```sh
useradd -m -r bitcore
su - bitcore
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash
nvm install v8
npm install bitcore -g
bitcore create <path>
cd <path>
bitcore install insight-api insight-ui
```
#### Setup Bitcore config 
<details>
<summary>Example bitcore-node.json</summary>
<br>
```json
{
  "network": "regtest",
  "port": 3001,
  "services": [
    "bitcoind",
    "insight-api",
    "insight-ui",
    "web"
  ],
  "servicesConfig": {
    "insight-api": {
      "disableRateLimiter": true
    },
    "bitcoind": {
      "spawn": {
        "datadir": "./data",
        "exec": "/home/bitcore/.nvm/versions/node/<version>/lib/node_modules/bitcore/node_modules/bitcore-node/bin/bitcoind"
      }
    }
  }
}
```
</details>

<details>
<summary>Example bitcore-node.json</summary>
<br>
```
$ cat << EOF > ~/<path>/data/bitcoind.conf
regtest=1
server=1
rpcbind=[0.0.0.0:18332](http://0.0.0.0:18332/)
rpcuser=blockstack
rpcpassword=blockstacksystem
txindex=1
listen=1
rpcserialversion=0
EOF
```
</details>

#### Start Bitcore
```sh
nohup bitcored  > bitcored.log 2>&1 &
```

#### blockstack regtest explorer
https://testnet.blockstack.org/


### blockstack live
#### install btc live and  blockstack live



