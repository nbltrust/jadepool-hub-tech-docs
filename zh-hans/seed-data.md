瑶池启动区块链的数据必须全部设置，缺一不可，被设置的数据统一以密文形式被存储在seed工作目录下的data.json文件中，同时也会生成.data.json.md5的隐藏文件，当有人手工修改任何json或者md5文件中的内容，都会导致服务无法启动。

设置方法如下：
1. 在SEED程序所在目录下，输入命令：./seed --path=./workpath/  --data，会被要求输入一次密码，必须和被备份的SEED程序设置的初始化密码完全相同。
2. 输入数据名，在此处输入key（配置键值）和数据，配置具体格式和说明请参照[配置格式](SEED_FORMAT.html)。
3. 数据设置完毕，输入命令：./seed  --path=./workpath/  --port=8899，重新启动SEED程序。

```bash
	$ ./seed --data
	data path: "./", port: "8899".
	Please input passowrd.
	->
	Password is correct.
	config.json md5[99914b932bd37a50b983c5e7c90ae93b] pass check
	data.json md5[c41f487bca630d91258ab412e3417c86] pass check
	seed.json md5[4e6040c5325b54aec1558bd4997eb392] pass check
	Seed:  d14f7f3f3ad991824e6159efe8ef479ef08992f028185983cbd1357c95141a82
	You are set the data now.
	Please input the name first.
	-> BTC
	Please input the data.
	-> n4he3WuSAKJdY58ReeXtC8cMse6ip6GL1S
	BTC:n4he3WuSAKJdY58ReeXtC8cMse6ip6GL1S
	Setting data finished. Please start the server again.
```