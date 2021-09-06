下列详述Node.js SDK使用步骤和Java SDK使用步骤。

### Node.js SDK使用步骤

查看Node js SDK Github代码：https://github.com/nbltrust/jadepool-sdk-nodejs

#### Step 1 

使用SDK前请先搭建好并启动Jadepool系统，包括jadepool-bn, jadepool-api和jadepool-admin。

#### Step 2

参考[生成ECC公私钥对](ecc.html)。

#### Step 3

前往admin应用配置页面，创建新应用(app ID)，然后将在Step 2生成的ecc公钥配置在应用中。配置完成后，当该app ID调用API时，Jadepool会根据其配置的公钥对API请求进行验签，如果验证不通过API请求会被拒绝。

**提示** 

#### Step 4

如果已经搭建接收Jadepool回调通知服务，将回调通知服务地址设置在Step 3新建的应用中。然后直接开始执行Step 5。

如果没有，则将回调通知地址设置为“http://127.0.0.1:9008”

在terminal进入jadepool-sdk-nodejs目录，执行命令：

```bash
	$ cd example
	$ npm i
```

安装完依赖包后，启动模仿回调接受服务，执行命令：

```bash
	$ node app.js
```

启动成功会显示“Jadepool callback example listen at 9008”。

#### Step 5

在对接Jadepool SDK的项目下执行命令：

```bash
	$ npm install @jadepool/sdk
```

初始化对接Jadepool的配置对象，对接SDK的js代码示例如下：

```js
	const sdk = require('@jadepool/sdk')
    const config = {
      eccKey: 'NgM/SLWlOi30GnMcr/QINpXUfFj/vXgb+TH35PEtOY8=', // Step 2步骤生成的ecc私钥
      eccKeyEncoder: 'base64', // 私钥编码格式，只接受hex或base64
      httpEndpoint: 'http://jadepool.com:7001', // 搭建Jadepool服务的URL
      appId: 'test' // 在Step 3步骤中在admin创建的应用(app ID)的名称
    }
```

#### Step 6

创建SDK对象，将Step 5创建的config配置传入，并调用API，js代码示例如下：

```js
	const api = new sdk.Api(config)

	// 生成新充值地址
    let address = await api.newAddress('BTC')

    // 验证地址有效性
    let valid = await api.verifyAddress('BTC', address)

    // 申请提现
    let withdrawOrder = await api.withdraw({
      coinId: 'BTC',
      to: 'mg2bfYdfii2GG13HK94jXBYPPCSWRmSiAS',
      value: '0.1',
      sequence: 0
    })

    // 查询订单状态
    let order = await api.getOrder(withdrawOrder.id)

    // 查询代币余额状况
    let balance = await api.getBalance('BTC')
```

#### Step 7

如果Step 6申请提现API调用成功，提现的订单状态会以回调的形式向在Step 4设置的回调通知地址推送，例如：

```json
{  
   "id":"205", // 订单ID
   "state":"online", // 订单状态
   "bizType":"WITHDRAW", // 订单类型
   "coinType":"USDT", // 代币
   "to":"n3ssE4cjHB4ygJ65WCTXJxhHgkoR4982RH", // 提现目标地址
   "value":"0.01", // 提现金额
   "confirmations":0, // 交易确认数
   "create_at":1542796362376, // 订单创建时间
   "update_at":1542796364037, // 订单更新时间
   "from":"n4jVcTDWK4tpeZS6aosYo7M8incK3cdKRQ", // 提现出账地址
   "fee":"0.00015067", // 交易耗费矿工费
   "data":{ // 区块链实时数据 
      "timestampHandle":1542796363610,
      "burnt":"0.00000546",
      "timestampFinish":0,
      "timestampBegin":1542796364036,
      "type":"Bitcoin",
      "hash":"fda1922974fb6875ad3b73be76cb2ded0b1828cf85d04308679da9ed5286bf4f",
      "fee":0.00015067,
      "blockNumber":-1,
      "blockHash":"",
      "confirmations":0,
      "from":[  
         {  
            "address":"n4jVcTDWK4tpeZS6aosYo7M8incK3cdKRQ",
            "value":"0.00712057",
            "txid":"df6e2396fb30a0b8d51f51c1030a642ef29364f4f63b5e49a46cef43b847175d",
            "n":1
         }
      ],
      "to":[  
         {  
            "address":"n3ssE4cjHB4ygJ65WCTXJxhHgkoR4982RH",
            "value":"0.00000546",
            "txid":"",
            "n":0
         },
         {  
            "address":"n4jVcTDWK4tpeZS6aosYo7M8incK3cdKRQ",
            "value":"0.00696444",
            "txid":"",
            "n":1
         }
      ]
   },
   "hash":"fda1922974fb6875ad3b73be76cb2ded0b1828cf85d04308679da9ed5286bf4f", // 交易哈希
   "extraData":"",
   "sendAgain":false
}
```

#### Step 8

对回调进行验签，前往admin Jadepool服务页面，复制Jadepool的ecc公钥。

使用以下示例代码：

```js
  const express = require('express')
  const morgan = require('morgan')
  const cors = require('cors')
  const bodyParser = require('body-parser')

  const app = express()
  app.use(morgan('dev'))
  app.use(bodyParser.json())
  app.use(cors())

  // 使用SDK middleware
  const sdk = require('../src')
  app.use(sdk.middleware({
    verifyKey: 'BKurum9EkO0jvTYTRJH6sLOOrpctCKIItmcCjy1hBGPNBz4pql3mWjb8JyZ/A99qUUByXX5vcWb292Q5NLFFJt0=', // Jadepool的ecc公钥
    verifyKeyEncoder: 'base64' // Jadepool的ecc公钥的编码格式，hex或base64
  }))

  app.post('/callback', (req, res, next) => {
    console.log('Jadepool Message:', JSON.stringify(req.body))
    console.log('Is message valid?', req.msgValid)
    res.status(200).send('')
  })

```

### Java SDK使用步骤

查看Java SDK Github代码：https://github.com/nbltrust/jadepool-sdk-java

待添加

