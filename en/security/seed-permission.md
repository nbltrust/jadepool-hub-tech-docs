In order to ensure security and scalability, SeedVault program should be configured an IP address with permission to access data. If not, the default is the local IP. After the SeedVault program is initialized, a config.json file will be generated in the same directory.

Setting IP whitelist steps are as below:

1. Paste command and enter the correct password:

```bash
./seed --path=./workpath/  --config
```

2. Enter the data key: client.
3. Then enter all IP addresses that are allowed to access seed. They must be separated by comma.

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

4. Restart the program and you will see "Authorized client is: ". This can be used to verify if setting whitelist works.

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

5. Another method to verify is to paste the following command and you will see "The config list is: client: ": 

```bash
./seed --path=./workpath/  --list
```

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