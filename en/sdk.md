### Node.js SDK

Node js SDK Github: https://github.com/nbltrust/jadepool-sdk-nodejs

#### Step 1 

Makes sure that Jadpeool Hub is deployed and running.

#### Step 2

Refer to [ECC signing & verify](ecc.html)。

#### Step 3
Go to "Wallet Settings" on Admin, create new App ID if no one exists. Configure the ECC public key to the App ID. Calling API will be rejected if the public key mismatches.

#### Step 4
If you have a server to receive notifications from Jadepool Hub, configure the server URL to the App ID as well. Then go to Step 5.

If you don't have the notification server ready, set the URL to "http://127.0.0.1:9008".

Go to the directory of jadepool-sdk-nodejs in terminal, run command:

```bash
	$ cd example
	$ npm i
```

Start the mock notification server by running command:

```bash
	$ node app.js
```

The terminal will show "Jadepool callback example listen at 9008" if it is started successfully.

#### Step 5

Run command under your js project:

```bash
	$ npm install @jadepool/sdk
```

js example code:

```js
	const sdk = require('@jadepool/sdk')
    const config = {
      eccKey: 'NgM/SLWlOi30GnMcr/QINpXUfFj/vXgb+TH35PEtOY8=', // ECC private key generated in Step 2
      eccKeyEncoder: 'base64', // encoding of the private key, hex or base64
      httpEndpoint: 'http://jadepool.com:7001', // notification server URL
      appId: 'test' // the App ID name created in Step 3
    }
```

#### Step 6

Call Jadepool Hub's API. js example code:

```js
	const api = new sdk.Api(config)

	// generate new deposit address
    let address = await api.newAddress('BTC')

    // verify if the address is valid
    let valid = await api.verifyAddress('BTC', address)

    // request withdrawal
    let withdrawOrder = await api.withdraw({
      coinId: 'BTC',
      to: 'mg2bfYdfii2GG13HK94jXBYPPCSWRmSiAS',
      value: '0.1',
      sequence: 0
    })

    // get order status
    let order = await api.getOrder(withdrawOrder.id)

    // get balance of token
    let balance = await api.getBalance('BTC')
```

#### Step 7

If withdrawal API was called successfully in Step 6, Jadepool Hub will send the notification server callback in the format shown below:

```json
{  
   "id":"205", // order ID
   "state":"online", // order state
   "bizType":"WITHDRAW", // order type
   "coinType":"USDT", // token type
   "to":"n3ssE4cjHB4ygJ65WCTXJxhHgkoR4982RH", // withdrawal destination
   "value":"0.01", // withdrawal value
   "confirmations":0, // transaction confirmation number
   "create_at":1542796362376, // order creation time
   "update_at":1542796364037, // order update time
   "from":"n4jVcTDWK4tpeZS6aosYo7M8incK3cdKRQ", // withdrawal origin
   "fee":"0.00015067", // transaction fee
   "data":{ // real-time data from blockchain 
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
   "hash":"fda1922974fb6875ad3b73be76cb2ded0b1828cf85d04308679da9ed5286bf4f", // transaction hash
   "extraData":"",
   "sendAgain":false
}
```

#### Step 8

Go to "Jadepool" page on Admin, copy and use Jadepool Hub's ECC public key to verify the callback's signature. js code example:

```js
  const express = require('express')
  const morgan = require('morgan')
  const cors = require('cors')
  const bodyParser = require('body-parser')

  const app = express()
  app.use(morgan('dev'))
  app.use(bodyParser.json())
  app.use(cors())

  // use SDK middleware
  const sdk = require('../src')
  app.use(sdk.middleware({
    verifyKey: 'BKurum9EkO0jvTYTRJH6sLOOrpctCKIItmcCjy1hBGPNBz4pql3mWjb8JyZ/A99qUUByXX5vcWb292Q5NLFFJt0=', // Jadepool Hub's ECC public key
    verifyKeyEncoder: 'base64' // Jadepool Hub's ECC public key's encoding, hex or base64
  }))

  app.post('/callback', (req, res, next) => {
    console.log('Jadepool Message:', JSON.stringify(req.body))
    console.log('Is message valid?', req.msgValid)
    res.status(200).send('')
  })

```

### Java SDK

Java SDK Github：https://github.com/nbltrust/jadepool-sdk-java

TO DO

