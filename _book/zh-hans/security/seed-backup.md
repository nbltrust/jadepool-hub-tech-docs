<!-- 当SEED程序初始化完成后，指定工作目录下会生成一个seed.json文件，该文件中包含SEED程序初始化设置密码生成的哈希值，此哈希值用来验证密码是否正确以确保SEED程序被密码保护。此外seed.json还包含一个seed密文，此seed密文用来和密码一起解密出seed明文，seed明文用来验证备份是否成功。另外还会生成.seed.json.md5的隐藏文件，当有人手工修改任何json或者md5文件中的内容，都会导致服务无法启动。这两个⽂件都⾄关重要并需要备份，因为⼀旦丢失意味着种⼦衍⽣出的所有地址中的资产全部丢失。seed.json文件示意图如下:

```json
{  
   "hash":"IpIkgRObSSRMn6LoQ+Goq7FILViVlXJJZXMo4DiZbgbjt2L0QfAhcc2Eu3228P1Wb9XNqgA7wH5NY7JaREHjx+mqdhtPVtiCzNPrFQI1YfM=",
   "seed":"I8fM8r2++rN7r0cGZayrBpJ2CADAMCLkC83S+h2p7i3RvhhIuYM7VcH4Wf/fVdfy9WKxM1wGqx0VWxJARgcx3lp8NpzPX4f3vm0fYUOYwnE="
}
```
<br> -->

具体备份方法如下：
1. 按照A所示步骤完成SeedVault程序初始化。
2. 在SeedVault程序所在目录下输入命令：./seed --path=./workpath/  --verify，会被要求输入一次密码，必须和初始化密码完全相同。输⼊正确后会显示种⼦被sha256后的字符串，成为originalSha256。
3. 将SeedVault程序工作目录下的seed.json文件和.seed.json.sha256备份。
4. 将备份的seed.json和.seed.json.sha256文件拷贝到备份电脑中SeedVault程序（未被初始化的，如果已被初始化应先删除其工作目录下的seed.json文件）的工作目录下。
5. 在备份电脑中的terminal里进入到SeedVault程序所在目录下，输入命令：./seed --path=./workpath/  --verify，会被要求输入密码，必须和被备份的SeedVault程序设置的初始化密码完全相同。输⼊正确后会显示种⼦被sha256后的字符串，成为newSha256。
6. 对⽐originalSha256和newSha256，若两个字符串完全⼀致，则说明备份成功。

```bash
	$ ./seed --verify
	data path: "./", port: "8899".
	Please input passowrd.
	->
	Password is correct.
	config.json sha256[dd1aaf26c557685cc37f93f53a2b6befb2c2e679f5ace6ec7a26d12086f358be] pass check
	data.json sha256[55ac168c0dc8a0a45d3c83d8e80396b99cb688722f39d4f24d96b5ef6729754f] pass check
	seed.json sha256[6f45eb53d10aac0aa4d2fab9d2bb541629d33bf70a904f7978096e18d5d36404] pass check
	You are verifying the seed now.
	Seed:     d14f7f3f................95141a82
	Seed sha256: dd1aaf26c557685cc37f93f53a2b6befb2c2e679f5ace6ec7a26d12086f358be
	Verification finished. Please start the server again.
```