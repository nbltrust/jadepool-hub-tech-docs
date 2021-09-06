Data can be imported in a batch instead of setting one by one. Create a "txt" file which contains data under the directory where the SeedVault program is located. The data format should be as below:

```txt
	ETH:0x577fc8ccd2f4a31321874841c3251eaf2c2f84f9
	LTC:mhc8TGrKD5daMcjngCurh8pMfywEJZ2sL4
```
<br>

Before importing, viewing data returns as below:

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
<br>

Paste command and enter the correct password:

```bash
./seed --path=./workpath/  --import your-txt-file-name.txt
```

Then the terminal will show messages as below:

```bash
	$ ./seed --import test.txt
	data path: "./", port: "8899".
	Please input passowrd.
	->
	Password is correct.
	config.json sha256[dd1aaf26c557685cc37f93f53a2b6befb2c2e679f5ace6ec7a26d12086f358be] pass check
	data.json sha256[55ac168c0dc8a0a45d3c83d8e80396b99cb688722f39d4f24d96b5ef6729754f] pass check
	seed.json sha256[6f45eb53d10aac0aa4d2fab9d2bb541629d33bf70a904f7978096e18d5d36404] pass check
	You will import 2 datas,overwrite 0 datas,confirm by type 'yes'
	-> yes
	import data finished. Please start the server again.
```
<br>

After importing, viewing data returns as below:

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
	ETH: "0x577fc8ccd2f4a31321874841c3251eaf2c2f84f9"
	LTC: "mhc8TGrKD5daMcjngCurh8pMfywEJZ2sL4"
	The config list is:
	client: "127.0.0.1,47.75.154.248"
```