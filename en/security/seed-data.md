All data requires by Jadepool to enable a blockchain must be set in SeedVault program. Data is stored as encrypted in the data.json file under the SeedVault program's working directory, and a hidden .data.json.sha256 file will also be generated. The program will fail to start if any contents in the json or sha256 file are jeopardized.

Setting data steps are as below:
1. Paste command and enter the correct password:

```bash
./seed --path=./workpath/  --data
```

2. Enter the data key and value. Refer to [Data Format](seed-format.html).
3. Restart the program.

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