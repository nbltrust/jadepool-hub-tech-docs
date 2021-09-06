### How does Jadepool withdrawal replay (attacks)?
The withdrawal API requires "sequence" in V2 version. Each withdrawal must be requested with a unique sequence number, otherwise it will be rejected.

### How does Jadepool store private key and keep them safe?
Private keys of all addresses in Jadepool are not stored anywhere. Private keys are derived from the seed generated by SeedVault initialization. The seed is stored in encryption form.

### How does Jadepool deal with chain fork?
Considering the high possibility of blockchain fork, Jadepool configures "soft fork ignore gap" parameter for each chain to prevent mistakenly recording invalid transactions on forked chain. It means, Jadepool only scans the blocks lower than the current synced block deducting the configured value of "soft fork ignore gap".


