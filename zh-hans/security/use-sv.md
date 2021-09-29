# SeedVault使用步骤
## 1.初始化

初次运⾏SeedVault程序，会要求使⽤者设置管理员密码。所有在SeedVault程序进⾏操作都需要输⼊正确的密码。所以管理员密码⾄关重要，建议多⼈设置以增加复杂度，并设置密码⾜够复杂，最后使⽤者需要妥善保管密码。

在terminal中进入到SeedVault程序所在目录下。在该目录下输入命令：./seed   --path=./workpath/  --port=8899，path参数用于指定SeedVault工作目录（--path=./workpath后面必须加/），未指定则默认为当前目录。port参数用于指定端口号，未指定则默认为8899（即可以直接输入./seed）。

首次启动SeedVault程序会被要求初始化，如下所示：

```bash
	$ ./seed
	data path: "./", port: "8899".
	lock file successfully
	The seed has not been initialized, please type "yes" to continue.
	->
```
<br>
输入yes后，会被要求设置密码，输入要为SeedVault程序设置的密码（最好足够复杂）。点击enter键，需要再输入一遍密码以确认，之后点击enter键，初始化完成，如下图所示。如下所示：

```bash
	The seed has not been initialized, please type "yes" to continue.
	-> yes
	Input password first time.
	->
	Input password again.
	->
	Initialization finished. Please start the server again.
```
<br>
输入命令：./seed   --path=./workpath/  --port=8899，重新启动程序。会被要求输入密码，必须和初始化时设置的密码相同。输入密码正确后，SeedVault程序启动，启动成功后如下所示：

```bash
	$ ./seed
	data path: "./", port: "8888".
	Please input passowrd.
	->
	Password is correct.
	config.json sha256[dd1aaf26c557685cc37f93f53a2b6befb2c2e679f5ace6ec7a26d12086f358be] pass check
	data.json sha256[55ac168c0dc8a0a45d3c83d8e80396b99cb688722f39d4f24d96b5ef6729754f] pass check
	seed.json sha256[6f45eb53d10aac0aa4d2fab9d2bb541629d33bf70a904f7978096e18d5d36404] pass check
	lock file successfully
	Successfully recover the seed, now starting the seed server :)
	Authorized client is: [127.0.0.1].

	   ____    __
	  / __/___/ /  ___
	 / _// __/ _ \/ _ \
	/___/\__/_//_/\___/ v3.2.6
	High performance, minimalist Go web framework
	https://echo.labstack.com
	____________________________________O/_______
	                                    O\
	⇨ http server started on [::]:8888
```

## 2.设置自定义数据
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

## 3.查询已设置自定义数据
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

## 4.访问白名单
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

## 5.修改密码
1. 在SeedVault程序所在目录下，输入命令：./seed --path=./workpath/  --password，会被要求输入一次密码，必须和被备份的SeedVault程序设置的初始化密码完全相同。
2. 输入两次新密码。
3. 程序会将旧seed.json备份到last.seed.json，.seed.json.sha256备份到seed.json.sha256.last，并生成新的seed.json和.seed.json.sha256，data和conifg同理，此时密码修改完毕。

```bash
	$ ./seed --password
	data path: "./", port: "8899".
	Please input passowrd.
	->
	Password is correct.
	config.json sha256[dd1aaf26c557685cc37f93f53a2b6befb2c2e679f5ace6ec7a26d12086f358be] pass check
	data.json sha256[55ac168c0dc8a0a45d3c83d8e80396b99cb688722f39d4f24d96b5ef6729754f] pass check
	seed.json sha256[6f45eb53d10aac0aa4d2fab9d2bb541629d33bf70a904f7978096e18d5d36404] pass check
	lock file successfully
	You are change the password now.
	Input new password first time.
	->
	Input new password again.
	->
	seed.json move to seed.json.last
	data.json move to data.json.last
	config.json move to config.json.last
	.seed.json.sha256 move to seed.json.sha256.last
	.data.json.sha256 move to data.json.sha256.last
	.config.json.sha256 move to config.json.sha256.last
	Change password succeeded, Please start the server again.
```

<!-- 如果修改了管理员密码，旧密码时⽣成的⽂件将被改为“last .seed.json”，程序会⽤新的密码对种⼦进⾏加密并存储在"seed.json"⽂件。有两种操作可以选择：
1. 销毁修改密码前备份的⽂件，将修改密码后⽣成的'seed.json'和'.seed.json.md5'⽂件按照
上述备份步骤重新备份。
2. ⽤旧密码时备份的'seed.json'和'.seed.json.md5'⽂件，在同⼀⽬录下使⽤Seed Vault程序
修改密码，需要和第⼀次修改的密码⼀致。

⽆论采⽤上述哪个操作，都应该按照备份步骤对原⽂件和备份后的⽂件进⾏备份验证。 -->

## 6.数据设置格式
### 数据库配置

路径 | key | 说明 | 示例 
--------- | ------- | --------- | -----------
data | MONGO_CFG | 必须配置并和示例一致 | default/config/admin
data | MONGO_CFG:default | 瑶池主数据 | mongodb://localhost:27017/jadepool-BN-dev
data | MONGO_CFG:config | 瑶池配置数据	 | mongodb://localhost:27017/jadepool-cfg-dev
data | MONGO_CFG:admin | 瑶池用户数据 | mongodb://localhost:27017/jadepool-BN-dev

### 其他配置

路径 | key | 说明 | 示例 
--------- | ------- | --------- | -----------
config | client | SeedVault访问方的IP白名单，可配置多个 | 127.0.0.1,127.0.0.2,127.0.0.3
