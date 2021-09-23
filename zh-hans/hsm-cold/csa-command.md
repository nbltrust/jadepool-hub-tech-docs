### 初始化CSA软件 

``
./csa init
``

### 设置连接HSM

``
./csa hsm --setup --user={username}
``


{username}处填写操作该命令的用户的用户名。

### 测试连接HSM

``
./csa hsm --test --user={username}
``


{username}处填写操作该命令的用户的用户名。

### 查看CSA支持的区块链
``
./csa blockchains --list
``

### 生成地址

``
./csa blockchains --keygen --chain={blockchain} --keyname={unique name} --user={username}
``


1. {blockchain}处填写需要生成地址的区块链，必须符合运行“查看CSA支持的区块链”的结果。
2. {unique name}处填写给地址起的任意别名，需要唯一。
3. {username}处填写操作该命令的用户的用户名。

### 列出所有已生成地址

``
./csa blockchains --address --user={username}
``


{username}处填写操作该命令的用户的用户名。

### 导出所有已生成地址

``
./csa blockchains --address --export --user={username}
``


{username}处填写操作该命令的用户的用户名。

### 发起交易签名和审批

``
./csa blockchains --sign --data={filename} --user={username}
``


1. {filename}处填写未签名交易文件的文件名。（需要把文件放在CSA程序同目录下，否则需指定路径）
2. {username}处填写操作该命令的用户的用户名。

### 查看所有用户信息

``
./csa users --user={username}
``


{username}处填写操作该命令的用户的用户名。

### 验证所有文件是否有被篡改

``
./csa verify --user={username}
``


{username}处填写操作该命令的用户的用户名。

### 查看CSA公钥和配置的HCS公钥

``
./csa info --user={username}
``


{username}处填写操作该命令的用户的用户名。

### 修改HCS公钥配置

``
./csa config --hcs --user={username}
``


{username}处填写操作该命令的用户的用户名。

### 查看CSA程序的版本号

``
./csa --version
``

