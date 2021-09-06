### Initialize Software

``
./csa init
``

### Setup Connection With HSM

``
./csa hsm --setup --user={username}
``


{username} is for the user who initiates this operation. Password is required.

### Test Connection To HSM

``
./csa hsm --test --user={username}
``


{username} is for the user who initiates this operation. Password is required.

### Query Supported Blockchains
``
./csa blockchains --list
``

### Create New Address

``
./csa blockchains --keygen --chain={blockchain} --keyname={unique name} --user={username}
``


1. {blockchain} is for the new address' blockchain. Subject to software's supported blockchain list.
2. {unique name} is for the new address' unique lable.
3. {username} is for the user who initiates this operation. Password is required.

### View All Addresses

``
./csa blockchains --address --user={username}
``


{username} is for the user who initiates this operation. Password is required.

### Export All Addresses

``
./csa blockchains --address --export --user={username}
``


{username} is for the user who initiates this operation. Password is required.

### Sign Transaction

``
./csa blockchains --sign --data={filename} --user={username}
``


1. {filename} is for the file awaits signature.
2. {username} is for the user who initiates this operation. Password is required.

### View User Info

``
./csa users --user={username}
``


{username} is for the user who initiates this operation. Password is required.

### Verify Data Integrity

``
./csa verify --user={username}
``


{username} is for the user who initiates this operation. Password is required.

### View Public Key

``
./csa info --user={username}
``


{username} is for the user who initiates this operation. Password is required.

### Edit HCS Public Key

``
./csa config --hcs --user={username}
``


{username} is for the user who initiates this operation. Password is required.

### View Software Version

``
./csa --version
``

