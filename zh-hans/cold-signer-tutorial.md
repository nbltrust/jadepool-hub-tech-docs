
**注意：离线签名程序Cold Signer只能在Mac电脑使用**

## 初始化
Cold Signer是在Seed Vault程序基础上，扩展了离线签名、导出根公钥功能的软件程序。初次使用需要设置密码，之后的签名操作都需要输入密码进行。建议设置足够复杂的密码并将其备份，备份方法请参考[文档](seed-backup.html)。

输入命令：./signer，如下所示：
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

## 签名
1. 启动js-signer进程：
```bash
pm2 start js-signer/json-rpc-svr.js
```

2. 运行以下命令（替换json文件名）进行签名：
```bash
./signer --sign batch_A1B2C3D4_20200620_unsigned.json
```
签名完成后，会自动在文件同目录下生成签名文件，例如batch_A1B2C3D4_20200620_signed.json

## 导出根公钥
输入命令：./signer --export，如下所示：
```bash
$ ./signer --export
data path: "./".
Please input passowrd.
->
Password is correct.
config.json md5[99914b932bd37a50b983c5e7c90ae93b] pass check
data.json md5[99914b932bd37a50b983c5e7c90ae93b] pass check
seed.json md5[2f4e598794148e30b0d092b38931919f] pass check
The extended root public key is: [xpub68ThEFvL4bv5rNsDXWyuEgypf33wbgTTazb4jrNLTArg9U1DA6CE2pUozSCauM4dWRhZUryuVsmfwwuBRtW9dzxtwQg3V39nw5cwZB9LUkW]
```