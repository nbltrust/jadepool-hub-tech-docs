在terminal中进入到SEED程序所在目录下。

在该目录下输入命令：./seed   --path=./workpath/  --port=8899，path参数用于指定seed工作目录（--path=./workpath后面必须加/），未指定则默认为当前目录。port参数用于指定端口号，未指定则默认为8899（即可以直接输入./seed）。

首次启动SEED程序会被要求初始化，如下所示：

```bash
	$ ./seed
	data path: "./", port: "8899".
	lock file successfully
	The seed has not been initialized, please type "yes" to continue.
	->
```
<br>
输入yes后，会被要求设置密码，输入要为SEED程序设置的密码（最好足够复杂）。点击enter键，需要再输入一遍密码以确认，之后点击enter键，初始化完成，如下图所示。如下所示：

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
输入命令：./seed   --path=./workpath/  --port=8899，重新启动程序。会被要求输入密码，必须和初始化时设置的密码相同。输入密码正确后，SEED程序启动，启动成功后如下所示：

```bash
	$ ./seed
	data path: "./", port: "8888".
	Please input passowrd.
	->
	Password is correct.
	config.json md5[99914b932bd37a50b983c5e7c90ae93b] pass check
	data.json md5[ad697bd7523f16e8476e85eda517b8c9] pass check
	seed.json md5[4e6040c5325b54aec1558bd4997eb392] pass check
	Seed:  d14f7f3f3ad991824e6159efe8ef479ef08992f028185983cbd1357c95141a82
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