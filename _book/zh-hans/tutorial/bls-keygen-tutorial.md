## 环境要求
1. nodejs = v12.x
2. pm2 = 4.4.0
3. golang = 1.13.4

## 初始化
BLS Keygen是在Seed Vault程序基础上，扩展了衍生BLS公私钥对、生成向ETH2.0验证者抵押的数据的软件程序。初次使用需要设置密码，之后的签名操作都需要输入密码进行。建议设置足够复杂的密码并将其备份。

输入命令初始化：./signer，如下所示：
```bash
$ ./signer
data path: "./".
lock file successfully
The signer has not been initialized, please type "yes" to continue.
-> yes
Input password first time.
->
Input password again.
->
Initialization finished. Please start the server again.
```

## 启动js-signer进程
```bash
NETWORK=testnet pm2 start js-signer/json-rpc-svr.js
```

**注意：**若使用mainnet，将启动环境变量设置为NETWORK=mainnet。testnet只对应ETH2.0的[Medalla测试链](https://github.com/goerli/medalla/blob/master/medalla/README.md)。


## 启动signer
输入命令：./signer，如下所示：
```bash
$ ./signer 
data path: "./".
Please input passowrd.
->
Password is correct.
config.json md5[99914b932bd37a50b983c5e7c90ae93b] pass check
data.json md5[99914b932bd37a50b983c5e7c90ae93b] pass check
seed.json md5[c7d05d18171108a85523fd0917df6c4b] pass check
lock file successfully
Successfully recover the seed, now starting the seed server :)
Authorized client is: [127.0.0.1].

   ____    __
  / __/___/ /  ___
 / _// __/ _ \/ _ \
/___/\__/_//_/\___/ v3.3.10-dev
High performance, minimalist Go web framework
https://echo.labstack.com
____________________________________O/_______
                                    O\
⇨ http server started on [::]:8901
```

## 使用API
**注意：**BLS Keygen的端口是8901

### 衍生keypair
https://nbltrust.github.io/jadepool-hub-api-docs/#derive-bls-key-pair

### 生成deposit data
https://nbltrust.github.io/jadepool-hub-api-docs/#generate-deposit-data
