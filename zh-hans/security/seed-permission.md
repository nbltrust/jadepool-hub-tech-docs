<!-- 为保证Seed Vault程序安全并有一定的拓展性，程序必须设置有权限访问的IP地址，但同时Seed Vault程序的管理员有权根据实际情况修改被允许访问SEED程序的IP地址。Seed Vault程序初始化后默认只有本机可以访问，如果管理员选择修改则原IP地址被新IP地址覆盖。Seed Vault程序被初始化后会在同目录下生成一个config.json文件，用下述方法设置的参数都会被存储在该文件中。 -->

具体修改访问权限方法如下：

1. 在SeedVault程序所在目录下，输入命令：./seed --path=./workpath/  --config，会被要求输入一次密码，必须和被备份的SeedVault程序设置的初始化密码完全相同。
2. 输入参数名，若此处是修改被允许访问SeedVault程序的IP地址则该处必须填client（小写字母）。
3. 输入新的被允许访问SeedVault程序的IP地址，多个IP地址用逗号分隔。被设置的数据统一以密文形式被存储在SeedVault工作目录下的config.json文件中，同时也会生成.config.json.sha256的隐藏文件，当有人手工修改任何json或者sha256文件中的内容，都会导致服务无法启动。


```bash
	$ ./seed --config
	data path: "./", port: "8899".
	Please input passowrd.
	->
	Password is correct.
	config.json sha256[dd1aaf26c557685cc37f93f53a2b6befb2c2e679f5ace6ec7a26d12086f358be] pass check
	data.json sha256[55ac168c0dc8a0a45d3c83d8e80396b99cb688722f39d4f24d96b5ef6729754f] pass check
	seed.json sha256[6f45eb53d10aac0aa4d2fab9d2bb541629d33bf70a904f7978096e18d5d36404] pass check
	You are set the config now.
	Please input the name first.
	-> client
	Please input the config.
	-> 127.0.0.1,47.75.154.248
	client:127.0.0.1,47.75.154.248
	Setting config finished. Please start the server again.
```
<br>

设置成功后，输入命令：./seed --path=./workpath/  --port=8899，重启SeedVault程序。会看到“Authorized client is:（新IP地址）”，此处可用来验证修改是否成功。

```bash
	$ ./seed
	data path: "./", port: "8899".
	Please input passowrd.
	->
	Password is correct.
	config.json sha256[dd1aaf26c557685cc37f93f53a2b6befb2c2e679f5ace6ec7a26d12086f358be] pass check
	data.json sha256[55ac168c0dc8a0a45d3c83d8e80396b99cb688722f39d4f24d96b5ef6729754f] pass check
	seed.json sha256[6f45eb53d10aac0aa4d2fab9d2bb541629d33bf70a904f7978096e18d5d36404] pass check
	lock file successfully
	Successfully recover the seed, now starting the seed server :)
	Authorized client is: [127.0.0.1 47.75.154.248].

	   ____    __
	  / __/___/ /  ___
	 / _// __/ _ \/ _ \
	/___/\__/_//_/\___/ v3.2.6
	High performance, minimalist Go web framework
	https://echo.labstack.com
	____________________________________O/_______
	                                    O\
	⇨ http server started on [::]:8899
```

<br>

另一方法也可以验证修改，在SeedVault程序所在目录下，输入命令：./seed --path=./workpath/  --list，会看到“The config list is: client: （新IP地址）”。

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
	client: "127.0.0.1,47.75.154.248"
```