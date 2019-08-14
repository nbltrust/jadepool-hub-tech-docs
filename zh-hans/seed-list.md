1. 按照C所示步骤设置完成每个币种相关数据。
2. 在SEED程序所在目录下，输入命令：./seed --path=./workpath/  --list，会被要求输入一次密码，必须和被备份的SEED程序设置的初始化密码完全相同。
3. 输入密码正确后，会看到已设置的所有数据明细，如下所示：

```bash
	$ ./seed --list
	data path: "./", port: "8899".
	Please input passowrd.
	->
	Password is correct.
	config.json md5[99914b932bd37a50b983c5e7c90ae93b] pass check
	data.json md5[ad697bd7523f16e8476e85eda517b8c9] pass check
	seed.json md5[4e6040c5325b54aec1558bd4997eb392] pass check
	Seed:  d14f7f3f3ad991824e6159efe8ef479ef08992f028185983cbd1357c95141a82
	The data list is:
	BTC: "n4he3WuSAKJdY58ReeXtC8cMse6ip6GL1S"
	The config list is:
```