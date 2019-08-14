1. 在SEED程序所在目录下，输入命令：./seed --path=./workpath/  --password，会被要求输入一次密码，必须和被备份的SEED程序设置的初始化密码完全相同。
2. 输入两次新密码。
3. 程序会将旧seed.json备份到seed.json.last，.seed.json.md5备份到seed.json.md5.last，并生成新的seed.json和.seed.json.md5，data和conifg同理，此时密码修改完毕。

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