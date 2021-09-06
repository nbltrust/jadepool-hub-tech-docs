1. Paste command and enter the correct password:

```bash
./seed --path=./workpath/  --password
```

2. Enter the new password and confirm。
3. The program will rename the "seed.json" file to "seed.json.last" and ".seed.json.sha256" to "seed.json.sha256.last". Then it will generate new "seed.json" and ".seed.json.sha256" file.

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