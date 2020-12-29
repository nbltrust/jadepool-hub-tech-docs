1. Paste command and enter the correct password:

```bash
./seed --path=./workpath/  --password
```

2. Enter the new password and confirm。
3. The program will rename the "seed.json" file to "seed.json.last" and ".seed.json.md5" to "seed.json.md5.last". Then it will generate new "seed.json" and ".seed.json.md5" file.

```bash
	$ ./seed --password
	data path: "./", port: "8899".
	Please input passowrd.
	->
	Password is correct.
	config.json md5[99914b932bd37a50b983c5e7c90ae93b] pass check
	data.json md5[99914b932bd37a50b983c5e7c90ae93b] pass check
	seed.json md5[35611479413344b796daa152e2d2e965] pass check
	lock file successfully
	You are change the password now.
	Input new password first time.
	->
	Input new password again.
	->
	seed.json move to seed.json.last
	data.json move to data.json.last
	config.json move to config.json.last
	.seed.json.md5 move to seed.json.md5.last
	.data.json.md5 move to data.json.md5.last
	.config.json.md5 move to config.json.md5.last
	Change password succeeded, Please start the server again.
```