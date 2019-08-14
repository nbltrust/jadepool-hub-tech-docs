### How does Jadepool withdrawal replay (attacks)?
The withdrawal API requires "sequence" in V2 version. Each withdrawal must be requested with a unique sequence number, otherwise it will be rejected.

### How does Jadepool store private key and keep them safe?
Private keys of all addresses in Jadepool are not stored anywhere. Jadepool supports both SEED and HSM modes since version 0.12. All previous version only supports SEED mode. Under SEED mode, Jadepool needs seed and the derivative path to generate and recover the private key. The seed is encrypted and stored locally on the server where the SEED software is deployed. The derivative path of deposit addresses are stored in Jadepool database. Under HSM mode, the seed and derivative path roots are stored in the HSM hardware. HSM needs the unique index derived by Jadepool to generate and recover the private key.

### How does Jadepool deal with chain fork?
Considering the high possibility of blockchain fork, Jadepool configures "soft fork ignore gap" parameter for each chain to prevent mistakenly recording invalid transactions on forked chain. It means, Jadepool only scans the blocks lower than the current synced block deducting the configured value of "soft fork ignore gap".



