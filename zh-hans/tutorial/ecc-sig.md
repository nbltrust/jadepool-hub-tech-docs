下列详述Node.js 和Java ECC签名和验签步骤。

### Node.js

在需要实现ECC签名&验签的项目下执行命令：

```bash
  $ npm install @jadepool/crypto
```

#### ECC签名

js代码示例如下：

```js
	const crypto = require('@jadepool/crypto')

    // 向Jadepool发送的请求数据
	const request = { 'sequence': 1, 'to': 'mynameisshaw', 'type': 'EOS', 'value': '0.01' }

    // 应用方的ECC私钥
    const privateKey = Buffer.from('FaPcG2eai53rUQClSNUEV57QXNWcOlTUlNb1A+WNsjA=', 'base64')
    const result = crypto.ecc.sign(request, privateKey, {accept: 'object'})

    // result.signature签名和result.timestamp时间戳都需要放在请求body里，Jadepool用来验签
    console.log('signature: ', JSON.stringify(result.signature))
    console.log('timestamp: ', result.timestamp)
```

运行结果如下：

```
	signature:  {  
   		"r":"pA32VzWQ6xaIM1UrpGM3QbqGuU4eJcdd7BgHMHO5ymA=",
   		"s":"Rp5ALEkeV+dDqPj6YpLxvC4oxA4+1lHzgcr3b/w39xY=",
   		"v":28
	}
	timestamp:  1560252461780
```

#### ECC验签

js代码示例如下：

```js
  const crypto = require('@jadepool/crypto')

  // Jadepool ECC公钥
  const jadePubKey = Buffer.from('BKzjJTLJBlLhuukWJI5CenqxCu7qEGeUlmmj9NoQll75DXKX9TjyMAajH5T9z67Z6N04yFun4oX3J0MDMpJa7+U=', 'base64')

  // 来自Jadepool的需要被验签的response或callback
  const response = {
    code: 0,
    status: 0,
    message: 'OK',
    crypto: 'ecc',
    timestamp: 1558076348165,
    sig: {
      r: 'KiEhjv3GO2CPloOHHDQLj9ETMGta5duP5ZL0Wd5oxWA=',
      s: 'em9opR2TQCcCjvHRL4yFpZ1fiZs1HBeEudUwI6b+76g=',
      v: 27
    },
    result: {
      balance: '0',
      balanceAvailable: '0',
      balanceUnavailable: '0',
      update_at: 1558076348163,
      addressesWithBalance: 1,
      namespace: 'Eosio',
      sid: 'FHvzET7r64eyXYgtAAAD'
    }
  }

  const obj = response.result
  let sigResult = {}
  sigResult.signature = response.sig
  sigResult.timestamp = response.timestamp

  const isValid = crypto.ecc.verify(obj, sigResult, jadePubKey)
  console.log(isValid)
```

### Java

前往jadepool-ecc-java下载jar包。并将jar包作为项目的依赖包。

#### ECC签名

js代码示例如下：

```java
  import com.jadepool.ecc.*;
  import java.sql.Timestamp;

  public class Main {

    public static void main(String[] args) throws Exception {
      // 应用方的ECC私钥
      String privateKey = "feDhgnJGkNMWSmPlbMtC+4DmUruJAtdCu4j3Vxu2CWM=";
      Ecc ecc = new Ecc(privateKey);
      // 向Jadepool发送的请求数据
      String requestData = "{\"sequence\":0,\"to\":\"awesome3\",\"type\":\"EOS\",\"value\":\"0.01\"}";
      // 签名时间戳
      Long timestamp = (new Timestamp(System.currentTimeMillis())).getTime();
      String sig = ecc.sign(requestData, timestamp);

      JSONParser parser = new JSONParser();
      JSONObject sigObject = (JSONObject)parser.parse(sig);
      String r = (String)sigObject.get("r");
      String s = (String)sigObject.get("s");
      Long v = (Long)sigObject.get("v");

      System.out.println("r: " + r);
      System.out.println("s: " + s);
      System.out.println("v: " + v);
    }
  }
```

运行结果如下：

```
  r: u7nKOHNYgS1NyaM9TS3+MyGjGiAI3PpSfPA3iWgl1eQ=
  s: USvy2L2jelmSp1cbxk1INGlsRnsabhKpaSihMCJ9fu0=
  v: 28
```

#### ECC验签

js代码示例如下：

```java
  import com.jadepool.ecc.*;

  public class Main {

    public static void main(String[] args) throws Exception {
      // Jadepool ECC公钥
      String jadePubKey = "BKzjJTLJBlLhuukWJI5CenqxCu7qEGeUlmmj9NoQll75DXKX9TjyMAajH5T9z67Z6N04yFun4oX3J0MDMpJa7+U=";
      Ecc ecc = new Ecc();
      ecc.setJadePubKey(jadePubKey);
      // 来自Jadepool的需要被验签的response或callback
      String response = "{\n" +
                "    \"code\": 0,\n" +
                "    \"status\": 0,\n" +
                "    \"message\": \"OK\",\n" +
                "    \"crypto\": \"ecc\",\n" +
                "    \"timestamp\": 1558076348165,\n" +
                "    \"sig\": {\n" +
                "        \"r\": \"KiEhjv3GO2CPloOHHDQLj9ETMGta5duP5ZL0Wd5oxWA=\",\n" +
                "        \"s\": \"em9opR2TQCcCjvHRL4yFpZ1fiZs1HBeEudUwI6b+76g=\",\n" +
                "        \"v\": 27\n" +
                "    },\n" +
                "    \"result\": {\n" +
                "        \"balance\": \"0\",\n" +
                "        \"balanceAvailable\": \"0\",\n" +
                "        \"balanceUnavailable\": \"0\",\n" +
                "        \"update_at\": 1558076348163,\n" +
                "        \"addressesWithBalance\": 1,\n" +
                "        \"namespace\": \"Eosio\",\n" +
                "        \"sid\": \"FHvzET7r64eyXYgtAAAD\"\n" +
                "    }\n" +
                "}";
      boolean isValid = ecc.verify(response);

      System.out.println(isValid);
    }
  }
```