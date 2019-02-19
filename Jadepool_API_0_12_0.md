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
|valid |boolean |validation result, true or false|

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
|sequence |Y  |number |unique index|
|type |Y  |string |coin type|
|value |Y  |string |withdrawal value|
|to |Y  |string |address to receive the withdrawal|
|memo |N  |string |transaction memo (EOS or CYB)|
|extraData |N  |string |extra data|

**REQUEST EXAMPLE**
``` 
  {
    "data":{  
      "sequence":73873891,
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

code,category,zh-cn,en,ja
401,general-error,401 用户认证失败或已过期,401 authentication failed or expired,401 認証が期限切れ
403,general-error,403 权限不足拒绝访问,403 invalid authorization,403 権限不足
404,general-error,404 该API不存在,API not found,このAPIは存在しない
405,general-error,405 该方法不可用,405 Method Not Allowed,405 Method Not Allowed
500,general-error,500 请求失败({code}),500 request failed({code}),500 リクエスト失敗({code})
10001,general-error,系统错误,system error,システムエラー
10002,general-error,非法参数,invalid parameter,不正パラメータ
10003,general-error,请求内容需为参数data,request data should be in 'data' field,依頼内容をパラメータ必要'data'
10004,general-error,无法删除已关联的对象,cannot delete associated object,関連する対象を削除できません
10099,general-error,系统已完成了初始化流程,system is already initialized,システムは初期化の流れを完了した
20000,invalid-parameter,不支持该币种类型,unsupported coin type,貨幣種のタイプを支持しない
20001,invalid-parameter,地址错误-首字母不对,address wrong - first charactor,アドレスエラー-頭文字が間違っていません
20002,invalid-parameter,地址错误-长度不对,address wrong - length,アドレスエラー-長さが違います
20003,invalid-parameter,地址与类型不匹配,The address is miss-match with requested type,アドレスとタイプが一致しない
20004,invalid-parameter,提币金额高于高水位,The withdrawal amount is higher then high water level,貨幣の金額は高い水位より高い
20005,invalid-parameter,提币MEMO长度非法,length of the withdrawal memo is invalid,引き下げメモの長さが無効です
20006,invalid-parameter,提现序号已使用,The withdrawal sequence was used,番号が使用済み
20010,invalid-parameter,必选参数不能为空,Necessary parameters cannot be empty,必選パラメータは空けてはならない
20011,invalid-parameter,该币种类型目前无法提现,The type of currency cannot be withdrawn.,この貨幣の種類のタイプは現在現われることができない
20021,invalid-parameter,扫描地址需为内部地址,Scanning address should be internal address,スキャンアドレスは内部アドレス
20022,invalid-parameter,提现地址不可为系统地址,The withdrawal address is not a systematic address.,現金引き出しアドレスと係統のアドレス
20029,invalid-parameter,未找到符合时间戳的区块号,No block number matching the timestamp was found,時間のスタンプに合ったブロック番号が見つかりません
20030,invalid-parameter,起始时间需小于结束时间,Start time should be less than end time,開始時間は終了時間より小さい
20031,invalid-parameter,审计参数(timestamp/blocknumber)需大于历史审计,Audit parameters (timestamp/blocknumber) need to be larger than historical audits,監査パラメータ（timestamp／blocknamber）は、歴史監査より大きい
20032,invalid-parameter,不支持地址重扫功能,Rescan by Address is not supported,アドレスをサポートしていない
20033,invalid-parameter,不支持区块重扫功能,Rescan by Block is not supported,カット機能をサポートしていない
20034,invalid-parameter,应用AppID必须为字母,AppID must be alphabetic,応用AppIDなければならない文字
20035,invalid-parameter,传入的公钥不符合指定的编码方式,The incoming public key does not match the specified encoding,伝えられた公鍵は指定されたコード方式に合致しない
20036,invalid-parameter,应用AppID不存在,AppID does not exist,応用AppIDは存在しない
20037,invalid-parameter,应用AppID已存在,AppID already exists,応用AppIDすでに存在する
20101,chain-general-error,热钱包余额不足,Insufficient hot wallet balance,熱い財布の残額が足りない
20102,chain-general-error,连接区块链节点失败,Failed to connection blockchain node,ブロックのチェーンノードを接続して失敗します
20104,chain-general-error,目前系统不支持该区块链网络,The current system does not support this block chain network,現在システムはこのエリアのチェーンネットワークをサポートしていません
20105,chain-general-error,目前该区块链网络已被禁用,The block chain network is currently disabled,現在この区画チェーンネットワークはすでに使用禁止されている
20106,chain-general-error,该区块链网络目前正在运行中,The block chain network is currently in operation.,同チェーンブロックインターネットは現在進行中
20107,chain-general-error,该类型已存在激活中的运行进程，若需开启更多同类进程需JP_MULTI_WORKERS特性支持,"This type of running process already exists in activation, and JP_MULTI_WORKERS feature support is required to open more similar processes.",このタイプは存在の活性化のプロセスを実行、もし必要多く同類のプロセスJP_MULTI_WORKERS支持必要特性
20200,missing-method,无法找到list方法,Failed to find 'list' method,「list」方法を見つけることができない
20201,missing-method,无法找到fetch方法,Failed to find 'fetch' method,「fetch」方法を見つけることができない
20202,missing-method,无法找到create方法,Failed to find 'create' method,「create」方法を見つけることができない
20203,missing-method,无法找到patch方法,Failed to find 'patch' method,「patch」方法を見つけることができない
20204,missing-method,无法找到delete方法,Failed to find 'delete' method,「delete」方法を見つけることができない
20205,missing-method,该方法未实现,This method is not implemented,この方法は実現していない
20301,chain-bitcoin,非法参数,invalid parameter,不正パラメータ
20302,chain-bitcoin,发送Bitcoin交易失败,failed to send bitcoin transaction,Bitcoin取引に失敗しました
20304,chain-bitcoin,UTXO不足,utxo not enough,UTXO不足
20305,chain-bitcoin,交易拼接后UTXO不足,utxo not enough after tx compose,トランザクションの後にUTXOが不足しています
20322,chain-cybex,发送Cybex交易失败,failed to send cybex transaction,Cybex取引失敗送信
20323,chain-cybex,Cybex钱包余额不足,cybex wallet without enough balance,Cybex財布の残高不足
20324,chain-cybex,Cybex未找到合适的Keys,missing cybex keys,Cybexに適切なKeysが見つかりませんでした
20325,chain-cybex,扫描区块尚未处于LIB以下,Scanning block should be below LIB,走査ブロックまだは「LIB」以下
20326,chain-cybex,未找到指定Cybex区块,cybex block not found,見つからないで指定Cybexブロック
20327,chain-cybex,未找到指定Cybex账号,cybex account not found,見つからないで指定Cybexアカウント
20331,chain-neo,Neo地址被冻结,Neo address is frozen,Neoのアドレスが凍結された
20332,chain-neo,Neo交易发送失败,Failed to send Neo transaction,Neo取引に失敗しました
20340,chain-vechain,VeChain交易发送失败,Failed to send VeChain transaction,VeChain取引に失敗しました
21000,rpc-failed,该服务未找到相关信息,The service did not find relevant information.,このサービスに関する情報は見つかりません
21001,rpc-failed,该服务尚未连接或名字空间错误,The service has not been connected or has a namespace error,このサービスはまだ接続されていません。
21002,rpc-failed,该服务未找到合适的工作进程,The service did not find the right work process,このサービスは適切な仕事のプロセスを見つけることができません
21003,rpc-failed,该操作未找到目标进行执行,The operation did not find the target for execution.,この操作は目標を発見していない
21004,rpc-failed,JSONRPC服务未找到,JSONRPC service not found,JSONRPCサービスは見つかりません
21005,rpc-failed,请求超时,Request timeout,超過を請求する
21006,rpc-failed,返回类型错误,Return type error,戻るタイプのエラー
29001,warning,热钱包余额低于低水位,Hot wallet balance below low water level,熱財布の残高が低い水位を下回る
29002,warning,订单执行失败,Failure of order execution,注文に失敗した
29003,warning,智能合约发生故障,Failure of Intelligent Contract,インテリジェント契約の故障
40100,authorization-failed,用户认证失败,User authentication failed,ユーザ認証失敗
40101,authorization-failed,缺少验证参数sig,Lack of validation parameter sig,検証パラメータsig不足
40102,authorization-failed,缺少验证参数timestamp,Lack of validation parameter timestamp,検証パラメータtimes tamp不足
40103,authorization-failed,缺少验证参数crypto,Lack of validation parameter crypto,検証パラメータcrypto不足
40104,authorization-failed,未找到验证所需的公钥,Failed to find required public key for validation,検証に必要な公鍵が見つからない
40110,authorization-failed,该API仅限内部调用,The API is internal only,このAPIは内部の呼び出しだけで
40300,permission-failed,无访问权限,No access rights,アクセス権限
40301,permission-failed,未完成认证,Uncompleted certification,未完成の認証
40302,permission-failed,该操作被锁定,The operation is locked,この操作ロックされて
40400,resouce-not-found,未找到指定订单号,Failed to find the specified order id,見つからない指定の注文番号
40401,resouce-not-found,未找到指定审计信息,Failed to find the specified audit information,見つからない指定の監査情報
40410,resouce-not-found,未找到指定对象,Failed to find the specified object,見つからない指定のオブジェクト
40411,resouce-not-found,未找到指定地址,Failed to find the specified address,見つからない指定のアドレス
