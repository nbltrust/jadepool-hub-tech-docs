初次运⾏SeedVault程序，会要求使⽤者设置管理员密码。所有在SeedVault程序进⾏操作都需要输⼊正确的密码。所以管理员密码⾄关重要，建议多⼈设置以增加复杂度，并设置密码⾜够复杂，最后使⽤者需要妥善保管密码。

<!-- 管理员密码是⽣成种⼦的因⼦，⽤于对种⼦加密， -->

<!-- 种⼦的产⽣不需要联⽹。 -->

<!-- 种⼦是⼈⼯输⼊密码后程序进⾏的⼀系列哈希和加密操作后得出的结果。 -->

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