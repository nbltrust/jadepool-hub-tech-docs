1. 在SeedVault程序所在目录下，输入命令：./seed --path=./workpath/  --password，会被要求输入一次密码，必须和被备份的SeedVault程序设置的初始化密码完全相同。
2. 输入两次新密码。
3. 程序会将旧seed.json备份到last.seed.json，.seed.json.sha256备份到seed.json.sha256.last，并生成新的seed.json和.seed.json.sha256，data和conifg同理，此时密码修改完毕。

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

<!-- 如果修改了管理员密码，旧密码时⽣成的⽂件将被改为“last .seed.json”，程序会⽤新的密码对种⼦进⾏加密并存储在"seed.json"⽂件。有两种操作可以选择：
1. 销毁修改密码前备份的⽂件，将修改密码后⽣成的'seed.json'和'.seed.json.md5'⽂件按照
上述备份步骤重新备份。
2. ⽤旧密码时备份的'seed.json'和'.seed.json.md5'⽂件，在同⼀⽬录下使⽤Seed Vault程序
修改密码，需要和第⼀次修改的密码⼀致。

⽆论采⽤上述哪个操作，都应该按照备份步骤对原⽂件和备份后的⽂件进⾏备份验证。 -->