In order to ensure security and scalability, SEED program should be configured an IP address with permission to access data. If not, the default is the local IP. After the SEED program is initialized, a config.json file will be generated in the same directory.

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
	config.json md5[99914b932bd37a50b983c5e7c90ae93b] pass check
	data.json md5[ad697bd7523f16e8476e85eda517b8c9] pass check
	seed.json md5[4e6040c5325b54aec1558bd4997eb392] pass check
	Seed:  d14f7f3f3ad991824e6159efe8ef479ef08992f028185983cbd1357c95141a82
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
	config.json md5[4dcae159c2454b9de818c36dbf225c0c] pass check
	data.json md5[ad697bd7523f16e8476e85eda517b8c9] pass check
	seed.json md5[4e6040c5325b54aec1558bd4997eb392] pass check
	Seed:  d14f7f3f3ad991824e6159efe8ef479ef08992f028185983cbd1357c95141a82
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
	config.json md5[4dcae159c2454b9de818c36dbf225c0c] pass check
	data.json md5[ad697bd7523f16e8476e85eda517b8c9] pass check
	seed.json md5[4e6040c5325b54aec1558bd4997eb392] pass check
	Seed:  d14f7f3f3ad991824e6159efe8ef479ef08992f028185983cbd1357c95141a82
	The data list is:
	BTC: "n4he3WuSAKJdY58ReeXtC8cMse6ip6GL1S"
	The config list is:
	client: "127.0.0.1,47.75.154.248"
```