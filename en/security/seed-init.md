In terminal, paste command：

```bash
	$ ./seed --path=./workpath/ --port=8899
```

**Note**: The “path” parameter is used to specify the directory of where the SeedVault program is located. It uses the current directory as default if "path" is not specified. The “port” parameter is used to specify the port the SeedVault program will occupy while running. If not specified, the default port is 8899.

Starting SeedVault program requires initialization for the first time:

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