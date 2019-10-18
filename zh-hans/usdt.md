# usdt

## Getting Started

## Requirements

- 2 Core CPU or above
- 8G Memory or above
- 600G Storage or above
- 10Mbit/s bandwidth or above
- NTP service on

## Setup Guide

### setup bitcoin-live.conf 
server=1
rpcuser=user
rpcpassword=password
rpcbind=0.0.0.0
rpcallowip=0.0.0.0/0
rpcport=8336
port=8337
rpctimeout=60
rpcclienttimeout=60
txindex=1
datacarriersize=80
logtimestamps=1
omnidebug=tally
omnidebug=packets
omnidebug=pending
datadir=<datapath>

### install and start 

```sh
wget https://bintray.com/artifact/download/omni/OmniBinaries/omnicore-<version>-x86_64-linux-gnu.tar.gz
tar -xvf omnicore-<version>-x86_64-linux-gnu.tar.gz
cd omnicore-<version>
bin/omnicored -conf=/data/omnicore-<version>/bitcoin-live.conf -daemon
```