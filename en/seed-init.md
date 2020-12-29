In terminal, paste command：

```bash
	$ ./seed --path=./workpath/ --port=8899
```

**Note**: The “path” parameter is used to specify the directory of where the SEED program is located. It uses the current directory as default if "path" is not specified. The “port” parameter is used to specify the port the SEED program will occupy while running. If not specified, the default port is 8899.

Starting SEED program requires initialization for the first time:

```bash
	$ ./seed
	data path: "./", port: "8899".
	lock file successfully
	The seed has not been initialized, please type "yes" to continue.
	->
```
<br>
It requires setting password and it better be complicated enough. Then confirms the password and complete the initialization.

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
Paste the following command to launch the SEED program. It will require giving correct password：

```bash
	$ ./seed --path=./workpath/ --port=8899
```
<br>
SEED program is launched successfully shown as below:

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