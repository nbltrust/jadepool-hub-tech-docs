Data can be imported in a batch instead of setting one by one. Create a "txt" file which contains data under the directory where the SEED program is located. The data format should be as below:

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
	config.json md5[4dcae159c2454b9de818c36dbf225c0c] pass check
	data.json md5[d622ca5a11473f9f6f997e6d6d93c328] pass check
	seed.json md5[35611479413344b796daa152e2d2e965] pass check
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
	config.json md5[4dcae159c2454b9de818c36dbf225c0c] pass check
	data.json md5[d622ca5a11473f9f6f997e6d6d93c328] pass check
	seed.json md5[35611479413344b796daa152e2d2e965] pass check
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