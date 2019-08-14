当SEED程序初始化完成后，指定工作目录下会生成一个seed.json文件，该文件中包含SEED程序初始化设置密码生成的哈希值，此哈希值用来验证密码是否正确以确保SEED程序被密码保护。此外seed.json还包含一个seed密文，此seed密文用来和密码一起解密出seed明文，seed明文用来验证备份是否成功。另外还会生成.seed.json.md5的隐藏文件，当有人手工修改任何json或者md5文件中的内容，都会导致服务无法启动。seed.json文件示意图如下:

```json
{  
   "hash":"IpIkgRObSSRMn6LoQ+Goq7FILViVlXJJZXMo4DiZbgbjt2L0QfAhcc2Eu3228P1Wb9XNqgA7wH5NY7JaREHjx+mqdhtPVtiCzNPrFQI1YfM=",
   "seed":"I8fM8r2++rN7r0cGZayrBpJ2CADAMCLkC83S+h2p7i3RvhhIuYM7VcH4Wf/fVdfy9WKxM1wGqx0VWxJARgcx3lp8NpzPX4f3vm0fYUOYwnE="
}
```
<br>

具体备份方法如下：
1. 按照A所示步骤完成seed程序初始化。
2. 在SEED程序所在目录下输入命令：./seed --path=./workpath/  --verify，会被要求输入一次密码，必须和初始化密码完全相同。
3. 将示意图中所示的seed（seed明文）和seed MD5备份。
4. 将SEED程序工作目录下的seed.json文件和.seed.json.md5备份。
5. 将备份的seed.json和.seed.json.md5文件拷贝到备份电脑中SEED程序（未被初始化的，如果已被初始化应先删除其工作目录下的seed.json文件）的工作目录下。
6. 在备份电脑中的terminal里进入到SEED程序所在目录下，输入命令：./seed --path=./workpath/  --verify，会被要求输入密码，必须和被备份的SEED程序设置的初始化密码完全相同。
7. 将verify出现的seed和seed MD5，与被备份的seed和seed MD5做对比。若结果完全相同，说明备份成功。

```bash
	$ ./seed --verify
	data path: "./", port: "8899".
	Please input passowrd.
	->
	Password is correct.
	config.json md5[99914b932bd37a50b983c5e7c90ae93b] pass check
	data.json md5[ad697bd7523f16e8476e85eda517b8c9] pass check
	seed.json md5[4e6040c5325b54aec1558bd4997eb392] pass check
	Seed:  d14f7f3f3ad991824e6159efe8ef479ef08992f028185983cbd1357c95141a82
	You are verifying the seed now.
	Seed:     d14f7f3f................95141a82
	Seed MD5: 832368cdebd44d8c075c413ecf578b42
	Verification finished. Please start the server again.
```