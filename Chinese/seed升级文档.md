# seed升级文档

from  **R1.2.1.190121** to  **v2.3.1**

1. 关停瑶池和seed
3. 备份原seed程序及相关数据文件，包括.data.json.md5等隐藏文件

2. 把upgradeMD5-SHA256放到原seed的执行目录下，执行upgradeMD5-SHA256升级seed数据

   ```bash
   ./upgradeMD5-SHA256
   
   # 如果原seed运行时有指定工作路径的，执行
   # ./upgradeMD5-SHA256 --path=./workdir/
   ```
   
3. 等待界面出现 Change md5 to sha256 succeeded, Please start the server again. 后，用新版本seed替换掉原seed，升级完成
4. 用新版本的so文件替换掉jadepool-hub/lib下的原so文件，即可启动瑶池
  
   
  
   

