# JADEPOOL API DOCUMENTATION

## API

### OBTAIN DEPOSIT ADDRESS

**URL** 
- `/api/v1/addresses/new`

**HTTP Method** 
- POST

**REQUEST** 
|param|required|type|description|
|:----    |:---|:----- |-----   |
|type |Y  |string |address type|

**REQUEST EXAMPLE**
``` 
  {
    "data":{
      "type":"ETH"
    }
  }
```

**RESPONSE**
|param|type|description|
|:----|:----- |-----   |
|address |string |new address|
|type |string |address type|
|state |string |could be new/used/blocked, not used for now|

**RESPONSE EXAMPLE**
``` 
{
    "status": 0,
    "message": "OK",
    "crypto": "ecc",
    "timestamp": 1546424406460,
    "sig": {
        "r": "tP6LXOpdJYFBxfj8XdOpn7rlpfqqQF2GzPeaTb0L5BY=",
        "s": "PPPJ+LCIOPkd5fV0aw/cMScSwa2HgqHkbwW9OJdB+yU=",
        "v": 27
    },
    "result": {
        "address": "0x9c1b758e9c29027283345d095af404362cd0d2f6",
        "type": "ETH",
        "state": "used"
    }
}
```

### VALIDATE ADDRESS

**URL** 
- `/api/v1/addresses/{addr}/verify`

**HTTP Method** 
- POST

**REQUEST** 
|param|required|type|description|
|:----    |:---|:----- |-----   |
|type |Y  |string |address type|

**REQUEST EXAMPLE**
``` 
  {  
    "data":{  
      "type":"ETH"
    }
  }
```

**RESPONSE**
|param|type|description|
|:----|:----- |-----   |
|address |string |address to validate|
|valid |boolean |validation result|

**RESPONSE EXAMPLE**
``` 
{
    "status": 0,
    "message": "OK",
    "crypto": "ecc",
    "timestamp": 1546424464673,
    "sig": {
        "r": "aniPCQXV0vuSZo/3Dr0pVsHRC65jOoCFy3JnzNglkWU=",
        "s": "LZSXyBWHXCDSR/dBq4ayEWCWPaJNiPyD+6UBi9qr3D4=",
        "v": 27
    },
    "result": {
        "address": "0x9c1b758e9c29027283345d095af404362cd0d2f6",
        "valid": true
    }
}
```

### REQUEST WITHDRAWAL

**URL** 
- `/api/v1/transactions`

**HTTP Method** 
- POST

**REQUEST** 
|param|required|type|description|
|:----    |:---|:----- |-----   |
|type |Y  |string |coin type|
|value |Y  |string |withdrawal value|
|to |Y  |string |address to receive the withdrawal|
|extraData |N  |string |extra data|

**REQUEST EXAMPLE**
``` 
  {
    "data":{  
      "type":"ETH",
      "value":"1",
      "to":"0x577fc8ccd2f4a31321874841c3251eaf2c2f84f9",
      "extraData":""
    }
  }
```

**RESPONSE**
|param|type|description|
|:----|:----- |-----   |
|data |{} |data on blockchain|
|id |string |jadepool order id|
|state |string |order state, final state: 'done' or 'failed'|
|bizType |string |business type: 'deposit' or 'withdraw'|
|type |string |coin type|
|coinType |string |coin category|
|to |string |the address to receive withdrawal|
|value |string |withdrawal value|
|confirmations |number |block confirmations on blockchain|
|created_at |number |order creation timestamp|
|updated_at |number |order update timestamp|
|from |string |the address to send withdrawal|
|fee |string |order fee|
|hash |string |tx hash|
|extraData |string |extra data in request|
|memo |string |order memo(edit on admin)|
|sendAgain |string |suggestion of resending|

**RESPONSE EXAMPLE**
``` 
{
    "status": 0,
    "message": "OK",
    "crypto": "ecc",
    "timestamp": 1546424497749,
    "sig": {
        "r": "6P97vkIYgwT0FjeJmkuI5mJmVRXzmd7U6lXrIZVCC0E=",
        "s": "Ov2od8WoRbZIfqGT/4URK2sx72lLZwUIsT1zJmTqWFo=",
        "v": 27
    },
    "result": {
        "data": {},
        "id": "47",
        "state": "init",
        "bizType": "WITHDRAW",
        "type": "BTC",
        "coinType": "BTC",
        "to": "mg2bfYdfii2GG13HK94jXBYPPCSWRmSiAS",
        "value": "0.01",
        "confirmations": 0,
        "create_at": 1546424497738,
        "update_at": 1546424497742,
        "from": "n4jVcTDWK4tpeZS6aosYo7M8incK3cdKRQ",
        "fee": "0",
        "hash": "",
        "extraData": "",
        "memo": "",
        "sendAgain": false
    }
}
```

### ORDER SEARCH

**URL** 
- `/api/v1/transactions/{orderId}`

**HTTP Method** 
- GET

**RESPONSE EXAMPLE**
``` 
  {
    "status": 0,
    "message": "OK",
    "crypto": "ecc",
    "timestamp": 1546424943770,
    "sig": {
        "r": "jZBifIy3AkbLma4LsptCS8UvNDf+WunWgCzK9d0IAZM=",
        "s": "Y3ZqH2Vsf+Nz048+Ndvx8yhG2gIeO3bFBbAbHFqLbfw=",
        "v": 28
    },
    "result": {
        "id": "1",
        "state": "done",
        "bizType": "WITHDRAW",
        "coinType": "BTC",
        "to": "mg2GDbrf31EWrG3xL47KZ8ACM1Mc3NeuRo",
        "value": "0.01",
        "confirmations": 17,
        "create_at": 1519962048385,
        "update_at": 1519969037307,
        "fee": "0.00006965",
        "data": {
            "timestampFinish": 1519969037029,
            "timestampBegin": 1519962056813,
            "type": "Bitcoin",
            "hash": "dc357b5ca6eabc6e008920e6fbd77ba7f7d552b41be9d7d36fc77d43d15c4fc4",
            "fee": 0.00013929,
            "blockNumber": 1287087,
            "blockHash": "000000003569aac7369c70a940bab1e6d43f4772347e371a975f52ec8fd13e53",
            "confirmations": 17,
            "from": [
                {
                    "address": "miwveA93PC4V249BFGHEq7Pcw8yrz9GoiJ",
                    "value": "0.12",
                    "txid": "f57557a29696e4b57e2898e932270c937b4213ddcaab16ccb04311f6227ac591",
                    "n": 0
                }
            ],
            "to": [
                {
                    "address": "mg2GDbrf31EWrG3xL47KZ8ACM1Mc3NeuRo",
                    "value": "0.01000000",
                    "txid": "",
                    "n": 0
                },
                {
                    "address": "n4PYb2EHwoprkgrczi6UwpiWFusidiSRX5",
                    "value": "0.10986071",
                    "txid": "72944a828b4baf24ef0de744d34b9f0f5158d00dca716e4f070fccd6057c7e87",
                    "n": 1
                }
            ],
            "state": "done"
        },
        "hash": "dc357b5ca6eabc6e008920e6fbd77ba7f7d552b41be9d7d36fc77d43d15c4fc4",
        "extraData": ""
    }
  }
```

### AUDIT

**URL** 
- `/api/v1/audits`

**HTTP Method** 
- POST

**REQUEST** 
|param|required|type|description|
|:----    |:---|:----- |-----   |
|type |Y  |string |coin type|
|audittime |Y  |number |audit time|

**REQUEST EXAMPLE**
``` 
  {
    "data": {
      "type": "ETH",
      "audittime": 1523515712000
    }
  }
```

**RESPONSE**
|param|type|description|
|:----|:----- |-----   |
|type |string |coin type|
|current |{} |data of the current audit|
|last |{} |data of the last audit|
|id |string |audit order id|
|type |string |coin type|
|blocknumber |number |the block number that auditted to|
|timestamp |number |audit timestamp|

**RESPONSE EXAMPLE**
``` 
{
    "status": 0,
    "message": "OK",
    "crypto": "ecc",
    "timestamp": 1546425039907,
    "sig": {
        "r": "zsvcm+rncQiEFZKH8PV/1cpGhymhIyZqMP3Cpg7GtQ0=",
        "s": "HZvjfkC6yvZUM+K9kth9YqZH2MjvZduJpt+hJTuqjZE=",
        "v": 27
    },
    "result": {
        "type": "BTC",
        "current": {
            "id": "5c272864aebf5b75a0b034be",
            "type": "BTC",
            "blocknumber": 1449515,
            "timestamp": 1546070108000
        },
        "last": {
            "id": "5a98e75fc38c5333ed42c129",
            "type": "BTC",
            "blocknumber": 1287092,
            "timestamp": 1519970143117
        }
    }
}
```

### AUDIT SEARCH

**URL** 
- `/api/v1/audits/{id}`

**HTTP Method** 
- GET

**RESPONSE EXAMPLE**
``` 
{
    "status": 0,
    "message": "OK",
    "crypto": "ecc",
    "timestamp": 1546070108000,
    "sig": {
        "r": "PnHvKrFhq++9ZKeHVDKtIVT6/XH4cBCmVk4Nyazotic=",
        "s": "YSE/0o5S7khRJbE7IaDiUCJjApmBu9UEuAleqhuGF1w=",
        "v": 28
    },
    "result": {
        "calculated": true,
        "deposit_total": "0",
        "deposit_num": 0,
        "withdraw_total": "0.001",
        "withdraw_num": 1,
        "sweep_total": "0",
        "sweep_num": 0,
        "sweep_internal_total": "0.00596219",
        "sweep_internal_num": 1,
        "airdrop_total": "0",
        "airdrop_num": 0,
        "recharge_total": "0",
        "recharge_num": 0,
        "recharge_internal_total": "0.00596219",
        "recharge_internal_num": 1,
        "recharge_unknown_total": "0",
        "recharge_unknown_num": 0,
        "recharge_special_total": "0",
        "recharge_special_num": 0,
        "fee_type": "BTC",
        "fee_total": "0.00000225",
        "sweep_fee": "0",
        "sweep_internal_fee": "0",
        "internal_fee": "0",
        "internal_num": 1,
        "extend_fee_total": "0",
        "extend_sweep_fee_total": "0",
        "extend_sweep_internal_fee_total": "0",
        "extend_internal_fee_total": "0",
        "failed_fee_withdraw": "0",
        "failed_withdraw_num": 0,
        "failed_sweep_fee": "0",
        "failed_sweep_num": 0,
        "failed_sweep_internal_fee": "0",
        "failed_sweep_internal_num": 0,
        "failed_fee_internal": "0",
        "failed_internal_num": 0,
        "extend_failed_fee_withdraw": "0",
        "extend_failed_sweep_fee": "0",
        "extend_failed_sweep_internal_fee": "0",
        "extend_failed_fee_internal": "0",
        "type": "BTC",
        "callback": "http://127.0.0.1:9008/callback",
        "timestamp": 1546070108000,
        "blocknumber": 1449515,
        "create_at": "2018-12-29T07:55:16.694Z",
        "update_at": "2018-12-29T07:55:25.946Z",
        "__v": 0,
        "calc_order_num": 3,
        "id": "5c272864aebf5b75a0b034be"
    }
}
```

### QUERY WALLET BALANCE 

**URL** 
- `/api/v1/wallet/{type}/status`

**HTTP Method** 
- GET

**RESPONSE**
|param|type|description|
|:----|:----- |-----   |
|balance |string |total balance (balanceAvailable + balanceUnavailable)|
|balanceAvailable |string |balance that can be used for expense|
|balanceUnavailable |string |balance that can't be used for expense|
|update_at |number |query at|

**RESPONSE EXAMPLE**
``` 
{
    "status": 0,
    "message": "OK",
    "crypto": "ecc",
    "timestamp": 1546425211187,
    "sig": {
        "r": "17dzg/yRIqj1Sm8vdQXamileaWNG9F0m95uOt9BPmcA=",
        "s": "BlgP8sRmkmWV4uackm+zCLH6stBUPcDVX8al7eCnrl8=",
        "v": 27
    },
    "result": {
        "balance": "0.259979",
        "balanceAvailable": "0.249979",
        "balanceUnavailable": "0.01",
        "update_at": 1546425211185
    }
}
```

### FIND BLOCK (USING AUDIT TIME)

**URL** 
- `/api/v1/wallet/findblock`

**HTTP Method** 
- POST

**REQUEST** 
|param|required|type|description|
|:----    |:---|:----- |-----   |
|type |Y  |string |coin type|
|audittime |Y  |number |audit time|

**REQUEST EXAMPLE**
``` 
  {
    "data":{
      "type":"ETH",
      "audittime":1523515712000
    }
  }
```

**RESPONSE**
|param|type|description|
|:----|:----- |-----   |
|type |string |coin type|
|blocknumber |number |block number|

**RESPONSE EXAMPLE**
``` 
{
    "status": 0,
    "message": "OK",
    "crypto": "ecc",
    "timestamp": 1546423843565,
    "sig": {
        "r": "C0lLQnwTn3q/MevH5VNgY1uce+s9GOx1X+ZbY10onAY=",
        "s": "JtvtqulaSP9tWfjIl8q5Srqt8z0Q6f2CFr32l942S/A=",
        "v": 28
    },
    "result": {
        "type": "ETH",
        "blocknumber": 9891366
    }
}
```

## ADDITIONAL DETAILS

### ERROR CODE

**Overall**
* 404,API not found
* 10001,system error

**API**
* 10002, invalid parameter
* 10003, invalid parameter, request params should be included in data block
* 20000, invalid parameter, coin type not supported
* 20001, invalid parameter, invalid address, the first letter is wrong
* 20002, invalid parameter, invalid address length
* 20003, invalid parameter, withdrawal address doesn't match with coin type
* 20004, invalid parameter, withdrawal value higher than 'high water level'
* 20005, invalid parameter, invalid withdrawal memo length
* 20006, invalid parameter, sequence has been used
* 20010, invalid parameter, required parameter
* 20011, invalid parameter, withdrawal of this coin type is currently disabled
* 20021, invalid parameter, rescan address has to be Jadepool addresses
* 20022, invalid parameter, withdrawal address cannot be system addresses
* 20031, invalid parameter, audit timestamp has to be later than the last audit
* 20032, invalid parameter, this coin type does not support rescan address
* 20033, invalid parameter, this coin type does not support rescan block
* 40400, not found, order id not found
* 40401, not found, audit data does not exist
* 40402, not found, cannot find block number by the given timestamp

**ECC SIG Authorization**

* 401, authentication failed, sign tx
* 40100, authentication failed, this API is for admin only
* 40101, authentication failed, missing signature
* 40102, authentication failed, missing verification timestamp
* 40103, authentication failed, missing crypto
* 40104, authentication failed, missing pubkey

**Remote**

* 21001, the service is not connected or wrong namespace
* 21002, no available process found
* 21003, no target found for the operation
* 21004, JSONRPC service not found
* 21005, request timeout
* 21006, wrong type returned

**Warning**

* 29001, hot wallet balance lower than the 'low water level'
* 29002, order failed
* 29003, potential problem with token smart contract 

**General**

* 21001, low balance
* 20102, failed to connect to node
* 20104, this blockchain is not supported for now
* 20105, this blockchain was disabled
* 20106, this blockchain is running
* 20107, P_MULTI_WORKERS is not supported for now
* 40410, address does not exist

**Ethereum: prepare TX & create TX**

* 20201,threshold is bigger than users number,invalid parameter

**Bitcoin: prepare TX & create TX**

* 20301,invalid parameter
* 20302,account not found
* 20303,TX creator isn't authorized
* 20304,utxo not enough
* 20305,utxo not enough after tx compose

**Bitcoin: sign TX**

* 20311,invalid parameter
* 20312,tx not found
* 20313,tx was already finished,status abnormal
* 20314,account not found
* 20315,TX singer isn't authorized
* 20316,somebody has already signed the tx,status abnormal
* 20317,send tx error

**Cybex**

* 20401,cybex is unconnected
* 20402,failed to send cybex transaction
* 20403,wallet without enough balance
* 20404,missing keys
* 20405, rescan block is above the last irreversible block
* 20406,block not found
* 20407,account not found

**Neo**

* 20331, address frozen
* 20332, Neo tx broadcast failed

**VeChain**

* 20340, VeChainThor tx broadcast failed