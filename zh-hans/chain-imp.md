第三方接链是指，Jadepool在提供应用方自动处理业务逻辑的架构上开放接口，应用方可以自由对接任何自己想接入的区块链。

第三方接链实现使用基于WebSocket的JSONRPC2.0协议规范，具体细节请查看[官方文档](https://www.jsonrpc.org/specification)，此处不做赘述。

### 第三方接链步骤

#### step 1
因为第三方接链是基于WebSocket的JSONRPC2.0协议规范，所以Jadepool对第三方接入不限制语言。第三方只要实现对接Jadepool必须实现的method，method具体解释见下文。

#### step 2
第三方接链和Jadepool主体(master进程)通过ws连接时需要互相进行认证。首先生成ECC公私钥对，参考[生成ECC公私钥对页面](ecc-keypair.html)。然后前往admin应用配置页面，创建(本服务将使用的)新应用(app ID)，将生成的ecc公钥配置在应用中。最后，前往admin Jadepool服务页面，得到Jadepool的ecc公钥，用来验证来自Jadepool的信息。ECC签名和验签请参照[ECC签名和验签](ecc-sig.html)。

#### step 3
在Jadepool主项目(jadepool-bn)中手动添加区块链配置目录。未来admin将提供“添加区块链”功能。

#### step 4
启动Jadepool并启动第三方接链项目服务。

### 接链代码实现

**注意:**

- 下列method除标明“可选”以外所有都是必须实现的method。
- json中method是第三方实现的method名称，method名称拼写必须一致。
- params是method的传入参数，所有传入参数的拼写和类型必须一致。
- return是method的返回值，所有返回字段的拼写和类型必须一致。

#### 生成充值地址(genAddressByPrivKey或genAddressByPubKey 二选一)

```json
   {
    "method": "genAddressByPrivKey",
    "params": [
      {
        "name": "privKey",
        "type": "string"
      },
      {
        "name": "index",
        "type": "number"
      },
      {
        "name": "coinName",
        "type": "string"
      },
      {
        "name": "addressType", // 见本篇最后附录
        "type": "number"
      },
      {
        "name": "bizMode",
        "type": "string"
      }
    ],
    "return": {
      "type": "string"
    }
  }
```

```json
   {
    "method": "genAddressByPubKey",
    "params": [
      {
        "name": "pubKey",
        "type": "string"
      },
      {
        "name": "index",
        "type": "number"
      },
      {
        "name": "coinName",
        "type": "string"
      },
      {
        "name": "addressType",
        "type": "number"
      },
      {
        "name": "bizMode",
        "type": "string"
      }
    ],
    "return": {
      "type": "string"
    }
  }
```

#### 验证地址 - validateAddress

用来验证传入地址对于接入区块链是否是一个合法的地址。

```json
   {
    "method": "validateAddress",
    "params": [
      {
        "name": "address",
        "type": "string"
      }
    ],
    "return": {
      "type": "boolean"
    }
  }
```

#### 获取最新区块号

在节点获取最高的可以扫描的区块号。

```json
   {
    "method": "getBlockNumber",
    "params": [],
    "return": {
      "type": "number"
    }
  }
```

#### 获取地址/帐号余额 - getBalance

在区块链查询一个地址/账号的特定币种的余额。

```json
   {
    "method": "getBalance",
    "params": [
      {
        "name": "address",
        "type": "string"
      },
      {
        "name": "coinName",
        "type": "string"
      }
    ],
    "return": {
      "type": "string"
    }
  }
```

#### 获取区块信息

```json
   {
    "method": "getBlockResult",
    "params": [
      {
        "name": "indexOrHash", // 区块号或者区块哈希
        "type": "number|string"
      }
    ],
    "return": {
      "type": "object",
      "fields": [
        {
          "name": "hash", // 区块哈希
          "type": "string"
        },
        {
          "name": "timestamp", // 区块产生的时间戳，单位是毫秒
          "type": "number"
        },
        {
          "name": "txns", // 区块里打包的所有交易
          "type": "array",
          "element": {
            "type": "object", // 每一笔交易
            "fields": [
              {
                "name": "txid", // 交易哈希
                "type": "string"
              },
              {
                "name": "meta", // 额外信息
                "type": "string",
                "required": false
              }
            ]
          }
        }
      ]
    }
```

#### 获取地址内的全部txns

```json
   {
    "method": "getTransactionHistory",
    "params": [
      {
        "name": "address",
        "type": "string"
      }
    ],
    "return": {
      "type": "array",
      "element": {
        "type": "object",
        "fields": [
          {
            "name": "txid",
            "type": "string"
          },
          {
            "name": "meta",
            "type": "string",
            "required": false
          }
        ]
      }
    }
  }
```
#### 根据交易返回筛选结果

```json
   {
    "method": "filterTransactions",
    "params": [
      {
        "name": "txns",
        "type": "array",
        "element": {
          "type": "string|object",
          "fields": [
            {
              "name": "txid",
              "type": "string"
            },
            {
              "name": "meta",
              "type": "string",
              "required": false
            }
          ]
        }
      },
      {
        "name": "bn",
        "type": "number",
        "required": false
      },
      {
        "name": "timestamp",
        "type": "number",
        "required": false
      },
      {
        "name": "hasScanTask",
        "type": "boolean",
        "required": false
      }
    ],
    "return": {
      "type": "array",
      "element": {
        "type": "object",
        "fields": [
          {
            "name": "txid",
            "type": "string"
          },
          {
            "name": "meta",
            "type": "string",
            "required": false
          },
          {
            "name": "bn",
            "type": "number"
          },
          {
            "name": "coreType",
            "type": "string"
          },
          {
            "name": "coinName",
            "type": "string"
          },
          {
            "name": "fromAddress",
            "type": "string"
          },
          {
            "name": "toAddress",
            "type": "string"
          },
          {
            "name": "value",
            "type": "string"
          },
          {
            "name": "n",
            "type": "number",
            "required": false
          },
          {
            "name": "action",
            "type": "string",
            "required": false
          },
          {
            "name": "actionMemo",
            "type": "string",
            "required": false
          },
          {
            "name": "actionResults",
            "type": "array",
            "element": {
              "type": "string"
            },
            "required": false
          },
          {
            "name": "isUnexpected",
            "type": "boolean",
            "required": false
          },
          {
            "name": "isSpecial",
            "type": "boolean",
            "required": false
          },
          {
            "name": "isInternal",
            "type": "boolean",
            "required": false
          }
        ]
      }
    }
  }
```

#### 发起提现请求

```json
   {
    "method": "withdraw",
    "params": [
      {
        "name": "coinName",
        "type": "string"
      },
      {
        "name": "outputs",
        "type": "array",
        "element": {
          "type": "object",
          "fields": [
            {
              "name": "id",
              "type": "number"
            },
            {
              "name": "from",
              "type": "string"
            },
            {
              "name": "to",
              "type": "string"
            },
            {
              "name": "value",
              "type": "string"
            },
            {
              "name": "action",
              "type": "string"
            },
            {
              "name": "actionArgs",
              "type": "array",
              "element": {
                "type": "string"
              },
              "required": false
            }
          ]
        }
      }
    ],
    "return": {
      "type": "array",
      "element": {
        "type": "object",
        "fields": [
          {
            "name": "txid",
            "type": "string"
          },
          {
            "name": "meta",
            "type": "string",
            "required": false
          },
          {
            "name": "orderIds",
            "type": "array",
            "element": {
              "type": "number"
            }
          },
          {
            "name": "rollback",
            "type": "boolean",
            "required": false
          },
          {
            "name": "actionMemo",
            "type": "string",
            "required": false
          }
        ]
      }
    }
  }
```
#### 发起热转冷请求

```json
   {
    "method": "sweepToCold",
    "params": [
      {
        "name": "coinName",
        "type": "string"
      },
      {
        "name": "cap",
        "type": "string"
      },
      {
        "name": "order",
        "type": "object"
      }
    ],
    "return": {
      "type": "object",
      "fields": [
        {
          "name": "txid",
          "type": "string"
        },
        {
          "name": "meta",
          "type": "string",
          "required": false
        },
        {
          "name": "to",
          "type": "string",
          "required": false
        },
        {
          "name": "value",
          "type": "string",
          "required": false
        },
        {
          "name": "rollback",
          "type": "boolean",
          "required": false
        },
        {
          "name": "actionMemo",
          "type": "string",
          "required": false
        }
      ]
    }
  }
```

#### 查询并修改订单状态

```json
   {
    "method": "getOrderState",
    "params": [
      {
        "name": "info",
        "type": "object",
        "fields": [
          {
            "name": "id",
            "type": "string"
          },
          {
            "name": "txid",
            "type": "string"
          },
          {
            "name": "coinName",
            "type": "string"
          },
          {
            "name": "n",
            "type": "number"
          },
          {
            "name": "from",
            "type": "string"
          },
          {
            "name": "to",
            "type": "string"
          },
          {
            "name": "value",
            "type": "string"
          },
          {
            "name": "state",
            "type": "string"
          },
          {
            "name": "bizType",
            "type": "string"
          },
          {
            "name": "type",
            "type": "string"
          },
          {
            "name": "sequence",
            "type": "number",
            "required": false
          },
          {
            "name": "meta",
            "type": "string",
            "required": false
          },
          {
            "name": "block",
            "type": "number",
            "required": false
          },
          {
            "name": "action",
            "type": "string",
            "required": false
          },
          {
            "name": "actionArgs",
            "type": "array",
            "element": {
              "type": "string"
            },
            "required": false
          },
          {
            "name": "actionResults",
            "type": "array",
            "element": {
              "type": "string"
            },
            "required": false
          }
        ]
      },
      {
        "name": "bn",
        "type": "number",
        "required": false
      }
    ],
    "return": {
      "type": "object",
      "fields": [
        {
          "name": "found",
          "type": "boolean"
        },
        {
          "name": "expired",
          "type": "boolean",
          "required": false
        },
        {
          "name": "block",
          "type": "number",
          "required": false
        },
        {
          "name": "fee",
          "type": "string",
          "required": false
        },
        {
          "name": "state",
          "type": "string",
          "required": false
        },
        {
          "name": "message",
          "type": "string",
          "required": false
        }
      ]
    }
  }
```

#### 查询指定txid的交易信息
```json
   {
    "method": "getTransactionState",
    "params": [
      {
        "name": "info",
        "type": "object",
        "fields": [
          {
            "name": "txid",
            "type": "string"
          },
          {
            "name": "coinName",
            "type": "string"
          },
          {
            "name": "meta",
            "type": "string",
            "required": false
          },
          {
            "name": "block",
            "type": "number",
            "required": false
          }
        ]
      },
      {
        "name": "bn",
        "type": "number",
        "required": false
      }
    ],
    "return": {
      "type": "object",
      "fields": [
        {
          "name": "type",
          "type": "string"
        },
        {
          "name": "hash",
          "type": "string",
          "required": false
        },
        {
          "name": "blockHash",
          "type": "string",
          "required": false
        },
        {
          "name": "blockNumber",
          "type": "number",
          "required": false
        },
        {
          "name": "fee",
          "type": "string",
          "required": false
        },
        {
          "name": "confirmations",
          "type": "number",
          "required": false
        },
        {
          "name": "from",
          "type": "array",
          "element": {
            "type": "object",
            "fields": [
              {
                "name": "address",
                "type": "string"
              },
              {
                "name": "value",
                "type": "string"
              },
              {
                "name": "txid",
                "type": "string",
                "required": false
              },
              {
                "name": "n",
                "type": "number",
                "required": false
              },
              {
                "name": "asset",
                "type": "string",
                "required": false
              }
            ]
          }
        },
        {
          "name": "to",
          "type": "array",
          "element": {
            "type": "object",
            "fields": [
              {
                "name": "address",
                "type": "string"
              },
              {
                "name": "value",
                "type": "string"
              },
              {
                "name": "txid",
                "type": "string",
                "required": false
              },
              {
                "name": "n",
                "type": "number",
                "required": false
              },
              {
                "name": "asset",
                "type": "string",
                "required": false
              }
            ]
          }
        }
      ]
    }
  }
```

#### 检查节点是否连接(可选)

```json
   {
    "method": "ensureConnected",
    "params": [],
    "return": {
      "type": "boolean"
    }
  }
```

#### 发起汇总请求(可选)

```json
   {
    "method": "sweepToHot",
    "params": [
      {
        "name": "coinName",
        "type": "string"
      },
      {
        "name": "fromAddress",
        "type": "string"
      },
      {
        "name": "cap",
        "type": "string"
      },
      {
        "name": "order",
        "type": "object"
      }
    ],
    "return": {
      "type": "object",
      "fields": [
        {
          "name": "txid",
          "type": "string"
        },
        {
          "name": "meta",
          "type": "string",
          "required": false
        },
        {
          "name": "to",
          "type": "string",
          "required": false
        },
        {
          "name": "value",
          "type": "string",
          "required": false
        },
        {
          "name": "rollback",
          "type": "boolean",
          "required": false
        },
        {
          "name": "actionMemo",
          "type": "string",
          "required": false
        }
      ]
    }
  }
```

#### 系统初始化完成后被调用(可选)

```json
   {
    "method": "initializePostHook",
    "params": [
      {
        "name": "coinName",
        "type": "string"
      }
    ],
    "return": {
      "type": "void"
    }
  }
```

#### 出金逻辑（提现等）定时任务启动前(可选)

```json
   {
    "method": "txAndSweepPreHook",
    "params": [
      {
        "name": "taskRound",
        "type": "number"
      }
    ],
    "return": {
      "type": "void"
    }
  }
```

#### 出金逻辑（提现等）定时任务启动后(可选)

```json
   {
    "method": "txAndSweepPostHook",
    "params": [
      {
        "name": "taskRound",
        "type": "number"
      }
    ],
    "return": {
      "type": "void"
    }
  }
```

### 附录

```js
  export declare const ADDRESS_TYPE: {
  /** 热主 */
  HOT_WALLET: 0,
  /** 冷钱包 */
  COLD_WALLET: 1,
  /** 充值地址 */
  DEPOSIT: 2,
  /** 外部地址 */
  EXTERNAL: 3
}
```