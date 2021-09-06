下列详述Node.js 和Java生成ECC公私钥对步骤。

### Node.js生成ECC公私钥对

#### step 1

在terminal执行命令：

```bash
	$ git clone https://github.com/nbltrust/jadepool-hub-sdk-nodejs.git
```

#### step 2

进入项目文件夹路径，安装依赖包：

```bash
	$ cd jadepool-hub-sdk-nodejs
	$ npm i
```

#### step 3

执行命令：

```bash
	$ bin/cli.js keypairs
```

得出如下结果：

```json
	{  
   	"priKey":"NgM/SLWlOi30GnMcr/QINpXUfFj/vXgb+TH35PEtOY8=", // 压缩私钥
   	"pubKey":"Ap6d7b4L3gF8vg2/MNUBNtwK2XyBEaRpePrFWCXad4MT", // 压缩公钥
   	"pubKeyUnCompressed":"BJ6d7b4L3gF8vg2/MNUBNtwK2XyBEaRpePrFWCXad4MTxWpOvPhJ7JLdDbgdN1d08SU/19IxwnFiTS94gIJ9oeI=" //未压缩公钥
	}	
```

### Java生成ECC公私钥对

#### step 1

前往[jadepool-ecc-java](https://github.com/nbltrust/jadepool-ecc-java/releases)下载jar包。并将jar包作为项目的依赖包。

#### step 2

运行以下代码：

```java
	import com.jadepool.ecc.EccUtils;

	public class Main {

    	public static void main(String[] args) throws Exception {

			String privateKey = EccUtils.generatePrivateKey();
        	String publicKey = EccUtils.privateToPublic(privateKey);

        	System.out.println("private key: " + privateKey);
        	System.out.println("public key: " + publicKey);
    	}
	}
```

得出如下结果：

```
	private key: FkJrsvVRVHRAvLlSe33AU2SGz0ZTOvsRVV4fmsu48lg=
	public key: Sm+YO8ynGSW+CditZT6agochsjU36ssjcWYM8UGGkc4e1dPVegIp+2FUa6VH6jEOtoRZFLJrAwWgwVd0LVXftg==
```

