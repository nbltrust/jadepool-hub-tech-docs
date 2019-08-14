## 钱包配置

路径 | key | 说明
--------- | ------- | ------------------
data | BTC | 冷钱包地址<br/> mqVkRyxSy5raNpbPKZ24tQMyPFH5PbLPBT
data | USDT | 如果不配置USDT默认用BTC的冷钱包地址<br/> mudEpJQTfFagB3d4Qs4bpFXcCdKceRMiR2
data | CYB | 热钱包账户/热钱包账户密码/冷钱包账户/password<br/> apdae0/apdae1APDAE2eadpa3/apdae1/password
data | CYB | 热钱包账户/热钱包账户私钥/冷钱包账户/prikey<br/> apdae0/5JM5t8kkisBfiLKtRaAh2cioJ4AAiFSbp77WGAdStEGmSSkkHcT/apdae1/prikey
data | CYB | 热钱包账户/热钱包账户密码/冷钱包账户/bin<br/> apdae0/apdae1APDAE2eadpa3/apdae1/bin
data | EOS | 热钱包账户/热钱包账户私钥/冷钱包账户<br/> hotwallet/5KBefyZPfqRH6pJiaGFgua7dupA4sQeVomzq9QssyBWX14udekE/coldwallet
data | ETH | 冷钱包地址<br/> 0x04e98d7a5ca93d3ddcf88dbb0f9dde1e2910061f
data | LTC | 冷钱包地址<br/> mxZFaM1iae8XWjufW78rdn6bjSTDKGfCis
data | NEO | 冷钱包地址<br/> AH4bzRixpQConLGK3ueiHB1tZHs99DoEBg
data | VET | 冷钱包地址<br/> 0x66e0e906381e44ed68daba3e1abaa1dac03b28db
data | QTUM | 冷钱包地址<br/> qfxFVjUj8LZsmzKuTMrK9RV3fp5bbZ7nbW
data | XLM | 冷钱包地址<br/> GAWAZGFOSRXTAUZILRSX4NYVXRMU5AMELDTHI2YUETJE64KP2UORJMBV
data | XRP | 冷钱包地址<br/> rGXYu6amLHGfUQP31koxWA5wZeTv6k7bJ
data | Cosmos | 冷钱包地址<br/> cosmos1txsexx3hakuwhtfsmxrz6g0eynszt4dpngvlg9
data | Irisnet | 冷钱包地址<br/> faa1temysg90fdz2mj5vzx0y9qxw8j6au823kvv4hf
data | ZEC | 冷钱包地址<br/> tmPcjAbHL7ALjXX9VwSYfroKxcrSJufShss
data | Chainx | 冷钱包地址<br/> 5UuAo4RoDpQ2pdYCgYAAJqNEqM9Rp893XJnERnVm5qjhANtD
data | BCH | 冷钱包地址<br/> p85r347sp862e9syytxcyx2sc8jwpxysugle0k6xk

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
config | client | seed访问方的IP白名单，可配置多个 | 127.0.0.1,127.0.0.2,127.0.0.3

---

## 特殊说明

设置CYB数据则根据不同钱包类型有以下三种模式： 
1. 云钱包模式：将热钱包账户，热钱包账户密码和冷钱包账户一起设置在数据里，最后加上模式类型password或者不加（password拼写必须相同并小写），用/分隔开，格式为：热钱包账户/热钱包账户密码/冷钱包账户/password，或热钱包账户/热钱包账户密码/冷钱包账户（例如：apdae0/apdae1APDAE2eadpa3/apdae1/password或apdae0/apdae1APDAE2eadpa3/apdae1）。
2. 钱包模式+私钥：将热钱包账户，热钱包账户私钥（账户配置-高级设定-权限-私钥查看器）和冷钱包账户一起设置在数据里，最后加上模式类型prikey（prikey拼写必须相同并小写），用/分隔开，格式为：热钱包账户/热钱包账户私钥/冷钱包账户/prikey（例如：apdae0/5JM5t8kkisBfiLKtRaAh2cioJ4AAiFSbp77WGAdStEGmSSkkHcT/apdae1/prikey）。
3. 钱包模式+备份bin：将热钱包账户，热钱包账户密码和冷钱包账户一起设置在数据里，最后加上模式类型bin（bin拼写必须相同并小写），用/分隔开，格式为：热钱包账户/热钱包账户密码/冷钱包账户/bin（例如：apdae0/apdae1APDAE2eadpa3/apdae1/bin）。另外，热钱包账户的备份bin文件需被放置在瑶池主程序目录下，并在瑶池的config配置中配置该文件路径（默认路径：secret/cybex-hot.bin）。