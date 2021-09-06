## 审计功能
审计功能的⽬的是热钱包和区块链之间的对账。审计功能每天⾃动运⾏⼀次。目前审计只支持Bitcoin和Ethereum。审计所有记录都可在Admin后台管理系统中查阅和处理异常。

## 审计方式
审计分两个层⾯。

第⼀是在区块链上（针对热钱包内未被审计过的且已经是最终状态的订单）查询订单哈希，然后⽐对在数据库记录的订单和区块链上数据是否匹配，包括交易状态、⾦额、代币、发送/接收地址、⼿续费、区块。这样审计是为了及时发现订单记录错误，从⽽判断是否是热钱包代码有bug。

第⼆是扫描指定天内在区块链上产⽣的所有已经不可逆的区块和交易，判断热钱包是否少记录或错记录订单。这样主要是为了及时发现热钱包有漏掉的⼊账记录。

## 审计异常处理
当有订单审计遇到异常时，页面上会提示异常信息，运营可介入调查。对于异常情况处理目前有两种方式：重新审计、手动标记为成功。

## 注意事项/待优化事项
1. 审计的内容为订单数量、金额、订单状态、区块号、手续费、发送地址、接收地址
2. 如果交易只有发送地址或接收地址其中一个是外部地址，审计程序在数据库中寻找一个订单。如果两个地址都是内部地址，需要找到两个订单。
3. 如果需要切换冷钱包，等审计完冷钱包所有交易后再切换，否则会造成审计失败。
4. 未完成任务中可能会出现100%，其中一个原因是审计过程中有错误区块出现了，进度的计算没有算上错误区块。（即将优化）
5. 如果任务结束后出现“审计中”的记录，一个原因是订单可能是重扫出来的，审计区块链方向的区块范围不包括该笔订单的区块号，就会出现这种情况，系统也不会自动重审审计中的数据，需要运营手动去重审一次。第二个原因是审计的时候这笔订单并没有达到最终状态，状态也会是审计中，等订单达到终态后，重审一下就可以。
6. 订单没有hash或者hash在链上找不到时，会看到订单里有hash，但审计页面哈希那一列没有显示。（即将优化）
7. 审计瑶池订单时，如果节点有问题，就可能无法查到链上数据，会创建一条审计记录，等审计区块链方向时，又创建了一条记录，这两条记录应该都是审计中，找到其中一条重审，如果能审计结束，系统会自动把其中一条置为不可见状态。
8. 运维需要保证节点性能，审计瑶池方向没有重试机制，如果这个方向节点出现问题，加上这个方向审计速度比较快，就可能造成大量的审计失败。（即将优化）
9. 出现unknownERC20的失败，是因为审计监控的地址上发生了瑶池不知道的ERC20交易，这种失败记录暂时不能重审。（即将优化）
10. 审计任务可能会卡住，如果发现卡住重启就可以。（即将优化）