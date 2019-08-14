可以对SEED程序的data进行批量导入，在在SEED程序所在目录下放置txt文件，文件中包含冒号分割的数据，每行是一组data数据。如下所示：

```txt
	ETH:0x577fc8ccd2f4a31321874841c3251eaf2c2f84f9
	LTC:mhc8TGrKD5daMcjngCurh8pMfywEJZ2sL4
```
<br>

导入前data如下所示：

```bash
	$ ./seed --list
	data path: "./", port: "8899".
	Please input passowrd.
	->
	Password is correct.
	config.json md5[4dcae159c2454b9de818c36dbf225c0c] pass check
	data.json md5[d622ca5a11473f9f6f997e6d6d93c328] pass check
	seed.json md5[35611479413344b796daa152e2d2e965] pass check
	The data list is:
	BTC: "n4he3WuSAKJdY58ReeXtC8cMse6ip6GL1S"
	The config list is:
	client: "127.0.0.1,47.75.154.248"
```
<br>

在SEED程序所在目录下，输入命令：./seed --path=./workpath/  --import test.txt，这里的test.txt是上述的包含导入数据的txt文件名，文件名任意。输入密码，必须和被备份的SEED程序设置的初始化密码完全相同。如果文件解析正确，会打出一共要导入的数据条数和覆盖的数据条数，输入yes确认导入，导入成功。

```bash
	$ ./seed --import test.txt
	data path: "./", port: "8899".
	Please input passowrd.
	->
	Password is correct.
	config.json md5[4dcae159c2454b9de818c36dbf225c0c] pass check
	data.json md5[d622ca5a11473f9f6f997e6d6d93c328] pass check
	seed.json md5[35611479413344b796daa152e2d2e965] pass check
	You will import 2 datas,overwrite 0 datas,confirm by type 'yes'
	-> yes
	import data finished. Please start the server again.
```
<br>

导入后data如下所示：

```bash
	$ ./seed --list
	data path: "./", port: "8899".
	Please input passowrd.
	->
	Password is correct.
	config.json md5[4dcae159c2454b9de818c36dbf225c0c] pass check
	data.json md5[67b41358c70a46645e028b4ea6f774ba] pass check
	seed.json md5[35611479413344b796daa152e2d2e965] pass check
	The data list is:
	BTC: "n4he3WuSAKJdY58ReeXtC8cMse6ip6GL1S"
	ETH: "0x577fc8ccd2f4a31321874841c3251eaf2c2f84f9"
	LTC: "mhc8TGrKD5daMcjngCurh8pMfywEJZ2sL4"
	The config list is:
	client: "127.0.0.1,47.75.154.248"
```