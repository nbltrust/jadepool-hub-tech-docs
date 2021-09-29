## 设置自定义数据

<!-- 瑶池启动区块链的数据必须全部设置，缺一不可，被设置的数据统一以密文形式被存储在seed工作目录下的data.json文件中，同时也会生成.data.json.md5的隐藏文件，当有人手工修改任何json或者md5文件中的内容，都会导致服务无法启动。 -->

设置方法如下：
1. 在SeedVault程序所在目录下，输入命令：./seed --path=./workpath/  --data，会被要求输入一次密码，必须和被备份的SeedVault程序设置的初始化密码完全相同。
2. 输入数据名，在此处输入key（配置键值）和数据，配置具体格式和说明请参照[配置格式](seed-format.html)。
3. 数据设置完毕，输入命令：./seed  --path=./workpath/  --port=8899，重新启动SeedVault程序。

```bash
	$ ./seed --data
	data path: "./", port: "8899".
	Please input passowrd.
	->
	Password is correct.
	config.json sha256[dd1aaf26c557685cc37f93f53a2b6befb2c2e679f5ace6ec7a26d12086f358be] pass check
	data.json sha256[55ac168c0dc8a0a45d3c83d8e80396b99cb688722f39d4f24d96b5ef6729754f] pass check
	seed.json sha256[6f45eb53d10aac0aa4d2fab9d2bb541629d33bf70a904f7978096e18d5d36404] pass check
	You are set the data now.
	Please input the name first.
	-> BTC
	Please input the data.
	-> n4he3WuSAKJdY58ReeXtC8cMse6ip6GL1S
	BTC:n4he3WuSAKJdY58ReeXtC8cMse6ip6GL1S
	Setting data finished. Please start the server again.
```

## 查询已设置自定义数据
1. 按照C所示步骤设置完成每个币种相关数据。
2. 在SeedVault程序所在目录下，输入命令：./seed --path=./workpath/  --list，会被要求输入一次密码，必须和被备份的SeedVault程序设置的初始化密码完全相同。
3. 输入密码正确后，会看到已设置的所有数据明细，如下所示：

```bash
	$ ./seed --list
	data path: "./", port: "8899".
	Please input passowrd.
	->
	Password is correct.
	config.json sha256[dd1aaf26c557685cc37f93f53a2b6befb2c2e679f5ace6ec7a26d12086f358be] pass check
	data.json sha256[55ac168c0dc8a0a45d3c83d8e80396b99cb688722f39d4f24d96b5ef6729754f] pass check
	seed.json sha256[6f45eb53d10aac0aa4d2fab9d2bb541629d33bf70a904f7978096e18d5d36404] pass check
	The data list is:
	BTC: "n4he3WuSAKJdY58ReeXtC8cMse6ip6GL1S"
	The config list is:
```