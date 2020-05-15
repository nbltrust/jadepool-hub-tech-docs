# 常规升级流程

## 测试环境升级步骤：

1. 在admin配置备份中把目前的瑶池配置备份

2. 确认订单都完成后，关停瑶池（先在admin上关闭链进程，然后再关闭所有进程）

3. 程序和数据库备份

4. 替换程序版本（包括master和agent）

5. 在master服务器上恢复之前jadepool-hub/config下面的local配置（主要是数据库配置，如果数据库配在seed里，忽略此步骤）

6. 在master服务器上恢复之前jadepool-hub/lib和jadepool-hub/lib/seed-loader下的配置（go-node-ffi.so/server.data) 

7. 开启Cybex的用户注意，如果seed配置是本地钱包模式，需要在cybex进程开启的机器上恢复之前的jadepool-hub/secret/cybex-hot.bin文件

8. 启动瑶池




## 生产环境升级步骤：

1. 在admin配置备份中把目前的瑶池配置备份
2. 确认订单都完成后，关停瑶池（先在admin上关闭链进程，然后再关闭所有进程）

3. 程序和数据库备份

4. 替换程序版本（包括master和agent）

5. 在master服务器上恢复之前jadepool-hub/config下面的local配置（主要是数据库配置，如果数据库配在seed里，忽略此步骤）

6. 在master服务器上恢复之前jadepool-hub/lib和jadepool-hub/lib/seed-loader下的配置（go-node-ffi.so/server.data) 

7. 开启Cybex的用户注意，如果seed配置是本地钱包模式，需要在cybex进程开启的机器上恢复之前的jadepool-hub/secret/cybex-hot.bin文件

8. 启动瑶池

