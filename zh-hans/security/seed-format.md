## 钱包配置

路径 | key | 说明
--------- | ------- | ------------------
data | BTC | 冷钱包地址<br/> mqVkRyxSy5raNpbPKZ24tQMyPFH5PbLPBT
data | USDT | 如果不配置USDT默认用BTC的冷钱包地址<br/> mudEpJQTfFagB3d4Qs4bpFXcCdKceRMiR2
data | ETH | 冷钱包地址<br/> 0x04e98d7a5ca93d3ddcf88dbb0f9dde1e2910061f
data | EOS | 热钱包账户/热钱包账户私钥/冷钱包账户<br/> hotwallet/5KBefyZPfqRH6pJiaGFgua7dupA4sQeVomzq9QssyBWX14udekE/coldwallet
data | LTC | 冷钱包地址<br/> mxZFaM1iae8XWjufW78rdn6bjSTDKGfCis
data | XRP | 冷钱包地址<br/> rGXYu6amLHGfUQP31koxWA5wZeTv6k7bJ
data | XLM | 冷钱包地址<br/> GAWAZGFOSRXTAUZILRSX4NYVXRMU5AMELDTHI2YUETJE64KP2UORJMBV
data | NEO | 冷钱包地址<br/> AH4bzRixpQConLGK3ueiHB1tZHs99DoEBg
data | VET | 冷钱包地址<br/> 0x66e0e906381e44ed68daba3e1abaa1dac03b28db
data | QTUM | 冷钱包地址<br/> qfxFVjUj8LZsmzKuTMrK9RV3fp5bbZ7nbW
data | Cosmos | 冷钱包地址<br/> cosmos1txsexx3hakuwhtfsmxrz6g0eynszt4dpngvlg9
data | Irisnet | 冷钱包地址<br/> faa1temysg90fdz2mj5vzx0y9qxw8j6au823kvv4hf
data | BCH | 冷钱包地址<br/> p85r347sp862e9syytxcyx2sc8jwpxysugle0k6xk
data | Tezos | 冷钱包地址<br/> KT1HwJrKvxDQn1QyboJhn8JccqBWgyevrP4g
data | Chainx | 冷钱包地址<br/> 5UuAo4RoDpQ2pdYCgYAAJqNEqM9Rp893XJnERnVm5qjhANtD
data | Qlink | 冷钱包地址<br/> qlc_3hktwjea4nkjrcp8dptambw4zz8iins6pxn5hio4axnnhg9917y8x8tdpjwi
data | Tomo | 冷钱包地址<br/> 0xf34b756B04497685D99b15907d288a0AE98aD073
data | Kusama | 冷钱包地址<br/> H1e87cXz6R4fyUddKXA4eFRk4RsuSXgsXHdV8DrLqqu2bbZ
data | Polkadot | 冷钱包地址<br/> 16kZJGPJ37uYxjs7adswyEHbPYeHS9jQHSaSUJhkfvWPcoeF
data | Tron | 冷钱包地址<br/> TDFdXkSvoHwxy8tMcZbXc7146HYKLpANm7
data | Blockstack | 冷钱包地址<br/> ST1V3Z6NW4C4N0E9DH7NBQCRE8ARGA6RMM2XRPF6W
data | ATP | 冷钱包地址<br/> atx16f4vcpp8yfh5fvs6cwl50nh5p6k6g5gejr443c
data | Crab | 冷钱包地址<br/> 5F7KBizNa1Sjvb4QtR3XnTGcUematy5AyqZzNam4MAmJGeSp
data | Filecoin | 冷钱包地址<br/> f15u36ywofl56v3vjcv5g4muuk4vh6eees2hsesha
data | Binance | 冷钱包地址<br/> tbnb10qsjqnkgkngctmerc33xu86vd948qvu0782d82
data | BNBS | 冷钱包地址<br/> 0x3aaCBDa920eE8F2785A7fC1f08d1fC48B792e717
data | Filecash | 冷钱包地址<br/> t15u36ywofl56v3vjcv5g4muuk4vh6eees2hsesha
data | Conflux | 冷钱包地址<br/> 0x1A3519f3F445722496902764C1894fc4B8cFAbD9


## 数据库配置

路径 | key | 说明 | 示例 
--------- | ------- | --------- | -----------
data | MONGO_CFG | 必须配置并和示例一致 | default/config/admin
data | MONGO_CFG:default | 瑶池主数据 | mongodb://localhost:27017/jadepool-BN-dev
data | MONGO_CFG:config | 瑶池配置数据	 | mongodb://localhost:27017/jadepool-cfg-dev
data | MONGO_CFG:admin | 瑶池用户数据 | mongodb://localhost:27017/jadepool-BN-dev

## 其他配置

路径 | key | 说明 | 示例 
--------- | ------- | --------- | -----------
config | client | SeedVault访问方的IP白名单，可配置多个 | 127.0.0.1,127.0.0.2,127.0.0.3

---

<!-- ## 特殊说明

设置CYB数据则根据不同钱包类型有以下三种模式： 
1. 云钱包模式：将热钱包账户，热钱包账户密码和冷钱包账户一起设置在数据里，最后加上模式类型password或者不加（password拼写必须相同并小写），用/分隔开，格式为：热钱包账户/热钱包账户密码/冷钱包账户/password，或热钱包账户/热钱包账户密码/冷钱包账户（例如：apdae0/apdae1APDAE2eadpa3/apdae1/password或apdae0/apdae1APDAE2eadpa3/apdae1）。
2. 钱包模式+私钥：将热钱包账户，热钱包账户私钥（账户配置-高级设定-权限-私钥查看器）和冷钱包账户一起设置在数据里，最后加上模式类型prikey（prikey拼写必须相同并小写），用/分隔开，格式为：热钱包账户/热钱包账户私钥/冷钱包账户/prikey（例如：apdae0/5JM5t8kkisBfiLKtRaAh2cioJ4AAiFSbp77WGAdStEGmSSkkHcT/apdae1/prikey）。
3. 钱包模式+备份bin：将热钱包账户，热钱包账户密码和冷钱包账户一起设置在数据里，最后加上模式类型bin（bin拼写必须相同并小写），用/分隔开，格式为：热钱包账户/热钱包账户密码/冷钱包账户/bin（例如：apdae0/apdae1APDAE2eadpa3/apdae1/bin）。另外，热钱包账户的备份bin文件需被放置在瑶池主程序目录下，并在瑶池的config配置中配置该文件路径（默认路径：secret/cybex-hot.bin）。
data | CYB | 热钱包账户/热钱包账户密码/冷钱包账户/password<br/> apdae0/apdae1APDAE2eadpa3/apdae1/password
data | CYB | 热钱包账户/热钱包账户私钥/冷钱包账户/prikey<br/> apdae0/5JM5t8kkisBfiLKtRaAh2cioJ4AAiFSbp77WGAdStEGmSSkkHcT/apdae1/prikey
data | CYB | 热钱包账户/热钱包账户密码/冷钱包账户/bin<br/> apdae0/apdae1APDAE2eadpa3/apdae1/bin 
data | ZEC | 冷钱包地址<br/> tmPcjAbHL7ALjXX9VwSYfroKxcrSJufShss
data | Algorand | 冷钱包地址<br/> Y2ESBDOLRMAZUSTFM63LZRHRYW4TX3ZAN7S34OCWAIYKVS2DPUA74QO36U
data | Harmony | 冷钱包地址<br/> one1njlc4tfsudhxfwnx4uj3v694wflrjp5qmunz33
data | EVT | 冷钱包地址<br/> EVT5qqsNBxsYuAWGbEycCkpTa8h9V37dGK1jkm4m6yWsZ3kJmTB32-->