### Node.js

#### step 1

run command in terminal：

```bash
	$ git clone https://github.com/nbltrust/jadepool-sdk-nodejs.git
```

#### step 2
Go to directory of jadepool-sdk-nodejs, run command:

```bash
	$ bin/cli.js keypairs
```

Keys will be generated as in the format shown below:

```json
	{  
   	"priKey":"NgM/SLWlOi30GnMcr/QINpXUfFj/vXgb+TH35PEtOY8=", // compressed private key
   	"pubKey":"Ap6d7b4L3gF8vg2/MNUBNtwK2XyBEaRpePrFWCXad4MT", // compressed public key
   	"pubKeyUnCompressed":"BJ6d7b4L3gF8vg2/MNUBNtwK2XyBEaRpePrFWCXad4MTxWpOvPhJ7JLdDbgdN1d08SU/19IxwnFiTS94gIJ9oeI=" //uncompressed public key
	}	
```

### Java

#### step 1

Go to[jadepool-ecc-java](https://github.com/nbltrust/jadepool-ecc-java/releases) and download the jar. Use the jar package as dependency in your project.

#### step 2

run code:

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

Keys will be generated as in the format shown below:

```
	private key: FkJrsvVRVHRAvLlSe33AU2SGz0ZTOvsRVV4fmsu48lg=
	public key: Sm+YO8ynGSW+CditZT6agochsjU36ssjcWYM8UGGkc4e1dPVegIp+2FUa6VH6jEOtoRZFLJrAwWgwVd0LVXftg==
```

