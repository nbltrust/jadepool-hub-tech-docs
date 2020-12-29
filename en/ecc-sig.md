### Node.js

Run command under your nodejs project directory:

```bash
  $ npm install @jadepool/crypto
```

#### ECC sign

js code example：

```js
	const crypto = require('@jadepool/crypto')

    // the request data
	const request = { 'sequence': 1, 'to': 'mynameisshaw', 'type': 'EOS', 'value': '0.01' }

    // client's ECC private key
    const privateKey = Buffer.from('FaPcG2eai53rUQClSNUEV57QXNWcOlTUlNb1A+WNsjA=', 'base64')
    const result = crypto.ecc.sign(request, privateKey, {accept: 'object'})

    // signature and timestamp must be included in the request boby
    console.log('signature: ', JSON.stringify(result.signature))
    console.log('timestamp: ', result.timestamp)
```

Result:

```
	signature:  {  
   		"r":"pA32VzWQ6xaIM1UrpGM3QbqGuU4eJcdd7BgHMHO5ymA=",
   		"s":"Rp5ALEkeV+dDqPj6YpLxvC4oxA4+1lHzgcr3b/w39xY=",
   		"v":28
	}
	timestamp:  1560252461780
```

#### ECC verify signature

js code example：

```js
  const crypto = require('@jadepool/crypto')

  // Jadepool Hub's ECC public key
  const jadePubKey = Buffer.from('BKzjJTLJBlLhuukWJI5CenqxCu7qEGeUlmmj9NoQll75DXKX9TjyMAajH5T9z67Z6N04yFun4oX3J0MDMpJa7+U=', 'base64')

  // the response or the callback from Jadepool Hub
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

Go to[jadepool-ecc-java](https://github.com/nbltrust/jadepool-ecc-java/releases) and download the jar. Use the jar package as dependency in your project.

#### ECC sign

java code example：

```java
  import com.jadepool.ecc.*;
  import java.sql.Timestamp;

  public class Main {

    public static void main(String[] args) throws Exception {
      // client's ECC private key
      String privateKey = "feDhgnJGkNMWSmPlbMtC+4DmUruJAtdCu4j3Vxu2CWM=";
      Ecc ecc = new Ecc(privateKey);
      // the reuqest data
      String requestData = "{\"sequence\":0,\"to\":\"awesome3\",\"type\":\"EOS\",\"value\":\"0.01\"}";
      // timestamp
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

Result:

```
  r: u7nKOHNYgS1NyaM9TS3+MyGjGiAI3PpSfPA3iWgl1eQ=
  s: USvy2L2jelmSp1cbxk1INGlsRnsabhKpaSihMCJ9fu0=
  v: 28
```

#### ECC verify signature

java code example：

```java
  import com.jadepool.ecc.*;

  public class Main {

    public static void main(String[] args) throws Exception {
      // Jadepool Hub's ECC public key
      String jadePubKey = "BKzjJTLJBlLhuukWJI5CenqxCu7qEGeUlmmj9NoQll75DXKX9TjyMAajH5T9z67Z6N04yFun4oX3J0MDMpJa7+U=";
      Ecc ecc = new Ecc();
      ecc.setJadePubKey(jadePubKey);
      // the response or the callback from Jadepool Hub
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