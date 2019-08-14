All data requires by Jadepool to enable a blockchain must be set in SEED program. Data is stored as encrypted in the data.json file under the SEED program's working directory, and a hidden .data.json.md5 file will also be generated. The program will fail to start if any contents in the json or md5 file are jeopardized.

Setting data steps are as below:
1. Paste command and enter the correct password:

```bash
./seed --path=./workpath/  --data
```

2. Enter the data key and value. Refer to [Data Format](SEED_FORMAT.html).
3. Restart the program.

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