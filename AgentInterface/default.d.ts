import { BigNumber } from "bignumber.js";

/** 地址对象返回 */
interface Address {
  type: string,
  subType?: string,
  address: string,
  state: string
}
/** 钱包状态 */
interface WalletStatus {
  balance: string,
  balanceAvailable: string,
  balanceUnavailable: string,
  balanceFrozen?: string,
  balanceUnfreezing?: string
}
/** TxData 对象 */
interface TxData {
  type: string,
  hash: string,
  blockHash: string,
  fee: string,
  blockNumber: number,
  confirmations: number,
  from: Array<{address: string, value: string, txid?: string, n?: number, asset?: string}>,
  to: Array<{address: string, value: string, txid?: string, n?: number, asset?: string}>
}
/** 订单对象 */
interface Order {
  id: number
  to: string
  value: string
  auth: string
}
interface ScanTask {
  id: number
}
/**
 * 充值对象
 */
interface IncomingRecord {
  txid: string
  meta: string
  bn: number
  coreType: string
  coinName: string
  fromAddress: string
  toAddress: string
  value: string
  n: number
  // state判定
  isUnexpected: boolean
  isSpecial: boolean
  isInternal: boolean
}
/** 状态结果 */
interface StateResult {
  state: string,
  /** 是否跳过保存订单 */
  continue: boolean,
  /** 是否订单需要再次发送 */
  sendAgain: boolean
}
/** 交易结果 */
interface TxResult {
  txid: string
  meta?: string
}
interface OrderInfo extends TxResult {
  coinName: string
  n: number
  from: string
  to: string
  value: string
  block?: number
}
interface OrderState {
  found: boolean
  block?: number
  fee?: string
  state?: string
  actionResults?: string[]
  message?: string
}
interface BlockResult {
  hash: string,
  timestamp: number,
  txns: TxResult[]
}
/** 提现结果 */
interface OrdersUpdateResult extends TxResult {
  rollback?: boolean
  orderIds: number[]
  actionResults?: string[]
}
/** 热转冷结果 */
interface OrderCreateResult extends TxResult {
  to?: string
  value?: string
}

// _____   _____   _____       ___   _   _   _       _____  
// |  _  \ | ____| |  ___|     /   | | | | | | |     |_   _| 
// | | | | | |__   | |__      / /| | | | | | | |       | |   
// | | | | |  __|  |  __|    / / | | | | | | | |       | |   
// | |_| | | |___  | |      / /  | | | |_| | | |___    | |   
// |_____/ |_____| |_|     /_/   |_| \_____/ |_____|   |_|   
/**
 * 该interface涵盖已实现的Default内容
 */
declare class LedgerClientDefault extends LedgerHandler {
  /**
   * chainKey
   */
  public CHAIN_KEY: string
  public opts: object
  /**
   * 构造LedgerClient
   * @param chainKey
   * @param opts 初始化参数
   */
  constructor(chainKey: string, opts?: object)
  // -------- Default实现 - 不建议覆盖 --------
  /**
   * 返回全部暴露给do模式运行的方法
   */
  exportMethods (): { [key: string]: Function }
  /**
   * 补丁函数，目前默认ethereum为true,其他皆为false
   */
  isSimpleModeForCoreType (): boolean
  /**
   * 该币种的初始化函数，在初始化过程中调用
   */
  initFromSeed (): Promise<void>
  /**
   * 创建充值地址对象
   * @param callback 回调地址
   * @param coinName 币种类型
   * @param appid 启动
   * @param acceptMode 接受充值的模式
   */
  createAddress (callback: string, coinName: string, appid: string, acceptMode: 'token' | 'chain' ): Promise<Address>
  /**
   * 标准化地址结构
   * @param address 
   */
  normalizeAddress (address: string, coinName?: string, addressType?: number): Promise<string>
  /**
   * 根据衍生路径生成地址
   * @param path 衍生路径
   * @param index 地址index序号, 当index为undefined时即认为是热主地址
   * @param coinName 币种简称
   * @parma addressType 地址类型
   */
  genAddress (path: string, index?: number|undefined, coinName?: string, addressType?: number): Promise<string>
  /**
   * 获取存储于密码机或seed中的系统数据
   * @param coinName 币种简称
   */
  getSystemData (coinName: string): Promise<string>
  /**
   * 获取系统地址, 封装有缓存
   * @param coinName 币种简称
   * @parma addressType 地址类型
   */
  getSystemAddress (coinName: string, addressType: number): Promise<string>
  /**
   * 获取系统地址，直接获取地址的逻辑，可重载
   * @param coinName 
   * @param addressType 
   */
  doGetSystemAddress (coinName: string, addressType: number): Promise<string>
  /**
   * 判断是否为热钱包主地址
   * @param address 地址
   * @param coinName 币种类型
   */
  isHotAddress (address: string, coinName?: string): Promise<boolean>
  /**
   * 判断是否为冷钱包地址
   * @param address 地址
   * @param coinName 币种类型
   */
  isColdAddress (address: string, coinName?: string): Promise<boolean>
  /**
   * 钱包状态
   * @param coinName 币种类型
   */
  getWalletStatus (coinName?: string): Promise<WalletStatus>
  // -------- Order相关 - 酌情处理 --------
  /**
   * 在默认notiStateHook中调用，返回是否需要发送重发请求
   * @param info 
   */
  updateFailedState (order: Order, currState: StateResult): Promise<StateResult>
  /**
   * 订单通知处理 确定state
   * @param order 订单对象
   * @param bn 当前区块号
   * @param delta 订单确认数
   */
  notiStateHook (order: Order, bn: number, delta: number): Promise<StateResult>
  /**
   * 订单通知处理 prehook
   * @param order 订单对象
   * @param bn 当前区块号
   */
  notiPreHook (order: Order, bn?: number): Promise<void>
  /**
   * 订单通知处理 afterhook
   * @param order 订单对象
   */
  notiAfterHook (order: Order): Promise<any>
  /**
   * 获取订单相关的TxData
   * 通用Default的方法内该方法将调用 getTransactionState
   * @param order 订单对象
   * @param bn 当前区块号
   */
  getTxDataByOrder (order: Order, bn: number): Promise<TxData>
  /**
   * 通用doScan中实现，扫描交易列表，查找有效交易
   * 通用Default的方法中将调用 filterTransactions
   * @param txns 从区块链获取的交易信息
   * @param bn 可选参数，这些txns所在的区块号
   * @param hasScanTask 可选参数，是否为扫描任务
   */
  scanTxs (txns: TxResult[] | string[], bn?: number, hasScanTask?: boolean): Promise<Order[]>
  /**
   * 是否具备多个LedgerHandler进行处理
   */
  hasMultiHandlers (): boolean
  /**
   * 获取和该该币种大类有关的LedgerHandler
   * @param coinType 币种大类
   */
  getHandler (coinType: string): LedgerHandler
  /**
   * 获取可用于进行相关操作的Staker
   */
  getStakeHandler (): StakeHandler
  // -------- Hook函数 - 可选覆盖 --------
  /**
   * 初始化后处理
   */
  initializePostHook (): Promise<void>
  /**
   * 地址创建后处理
   * @param coinName 币种类型
   * @param address 地址
   */
  createAddressPostHook (coinName: string, address: string): Promise<void>
  /**
   * txAndSweep预处理
   * @param taskRound 执行回合数
   */
  txAndSweepPreHook (taskRound: number): Promise<void>
  /**
   * txAndSweep后处理
   * @param taskRound 执行回合数
   */
  txAndSweepPostHook (taskRound: number): Promise<void>
  /**
   * closer预处理
   * @param rulerData 标尺数据
   * @param taskRound 执行回合数
   */
  closerPreHook (rulerData: object, taskRound: number): Promise<void>
  /**
   * closer后处理
   * @param rulerData 标尺数据
   * @param taskRound 执行回合数
   * @returns 返回改动后的ruler data
   */
  closerPostHook (rulerData: object, taskRound: number): Promise<object>
}

/**
 * 该interface涵盖在通用类中LedgerClient被使用的函数以及一些重要函数
 * 通常每个区块链仅有一个进程会使用以下的函数
 */
declare class LedgerClient extends LedgerClientDefault {
  /**
   * ledger实现对象
   */
  public implement: object
  /**
   * 构造LedgerClient
   * @param chainKey 
   * @param ledgerImplement 
   * @param opts 初始化参数
   */
  constructor(chainKey: string, ledgerImplement: object, opts?: object)
  // ---------------------- LedgerScanner相关函数 ----------------------
  // _____   _____       ___   __   _   __   _   _____   _____   
  // /  ___/ /  ___|     /   | |  \ | | |  \ | | | ____| |  _  \  
  // | |___  | |        / /| | |   \| | |   \| | | |__   | |_| |  
  // \___  \ | |       / / | | | |\   | | |\   | |  __|  |  _  /  
  //  ___| | | |___   / /  | | | | \  | | | \  | | |___  | | \ \  
  // /_____/ \_____| /_/   |_| |_|  \_| |_|  \_| |_____| |_|  \_\ 
  /**
   * 根据ECC私钥生成地址
   * @param privKey 私钥
   * @param index 衍生序号
   * @param coinName 币种简称
   * @param addressType 地址类型
   */
  genAddressByPrivKey (privKey: string | Buffer, index: number, coinName: string, addressType: number): Promise<string>
  
  /**
   * 检测地址是否有效
   * @param address 被检测地址
   * @returns true is 1, false is 0, others are error(error default: 20003)
   */
  validateAddress (address: string): Promise<boolean|number>
  /**
   * 获取最新区块高度
   */
  getBlockNumber (): Promise<number>
  /**
   * 获取区块信息
   * @param indexOrHash 区块高度
   */
  getBlock (indexOrHash: number | string): Promise<any>
  /**
   * 通用doScan中实现，获取区块中交易信息等，用于保存到系统Block
   * @param indexOrHash 高度或哈希
   */
  getBlockResult (indexOrHash: number | string): Promise<BlockResult>
  /**
   * 通用doScan中实现，获取地址的交易历史
   * @param address
   */
  getTransactionHistory (address: string): Promise<TxResult[]>
  /**
   * 特殊余额查询方法：获取账号中，所指定币种的余额
   * @param address 地址
   * @param coinNames 获取balance的名称
   */
  getAccountBalances (address: string, coinNames?: string[]): Promise<any>
}

// _       _____   _____   _____   _____   _____         _   _       ___   __   _   _____   _       _____   _____   
// | |     | ____| |  _  \ /  ___| | ____| |  _  \       | | | |     /   | |  \ | | |  _  \ | |     | ____| |  _  \  
// | |     | |__   | | | | | |     | |__   | |_| |       | |_| |    / /| | |   \| | | | | | | |     | |__   | |_| |  
// | |     |  __|  | | | | | |  _  |  __|  |  _  /       |  _  |   / / | | | |\   | | | | | | |     |  __|  |  _  /  
// | |___  | |___  | |_| | | |_| | | |___  | | \ \       | | | |  / /  | | | | \  | | |_| | | |___  | |___  | | \ \  
// |_____| |_____| |_____/ \_____/ |_____| |_|  \_\      |_| |_| /_/   |_| |_|  \_| |_____/ |_____| |_____| |_|  \_\ 
/**
 * 需要实现的区块链业务逻辑必备函数
 * 通常每个区块链有多个进程会使用以下的函数
 */
declare class LedgerHandler {
  /**
   * 判断是否与节点链接成功
   */
  ensureConnected (): Promise<boolean>
  /**
   * 获取热钱包可用余额，此处是除以Decimals Rate的显示值
   * 该函数已默认实现，即为getBalance(hotAddress, ...)
   * @param coinName 币种类型
   * @param extraSource 额外信息，由getAccountBalances的值来获取余额
   * @param walletToCalc 待计算的WalletStatus，可在该函数中对其进行修改
   */
  getWalletBalance (coinName: string, extraSource?: any, walletToCalc?: WalletStatus): Promise<string>
  /**
   * 获取地址余额, 此处是除以Decimals Rate的显示值
   * @param address 地址
   * @param coinName 币种类型
   * @param extraSource 额外信息，由getAccountBalances的值来获取余额
   * @param walletToCalc 待计算的WalletStatus，可在该函数中对其进行修改
   */
  getBalance (address: string, coinName: string, extraSource?: any, walletToCalc?: WalletStatus): Promise<string | BigNumber>
  /**
   * 可选函数，获取地址余额，必定为整数形式
   * @param address 地址
   * @param coinName 币种类型
   */
  getBalanceNoDecimal (address: string, coinName?: string): Promise<string>
  /**
   * 获取交易状态信息
   * @param info 订单情况
   * @param bn 当前区块号
   */
  getOrderState (info: OrderInfo, bn?: number): Promise<OrderState|undefined>
  /**
   * 获取Transaction具体信息
   * @param info 订单情况
   * @param bn 当前区块号
   */
  getTransactionState (info: OrderInfo, bn?: number): Promise<TxData|undefined>
  /**
   * 筛选出系统所需的订单
   * @param txns 从区块链获取的交易信息
   * @param bn 可选参数，这些txns所在的区块号
   * @param hasScanTask 可选参数，是否为扫描任务
   */
  filterTransactions (txns: TxResult[] | string[], bn?: number, hasScanTask?: boolean): Promise<IncomingRecord[]>
  /**
   * 提现
   * @param coinName
   * @param outputs
   */
  withdraw (coinName: string, outputs: Order[]): Promise<OrdersUpdateResult[]>
  /**
   * 汇总
   * @param coinName
   * @param fromAddress
   * @param cap 真实金额
   */
  sweepToHot (coinName: string, fromAddress: string, cap: string): Promise<OrderCreateResult>
  /**
   * 热转冷
   * @param coinName
   * @param cap 真实金额
   */
  sweepToCold (coinName: string, cap: string): Promise<OrderCreateResult>
}

// ███████╗████████╗ █████╗ ██╗  ██╗███████╗
// ██╔════╝╚══██╔══╝██╔══██╗██║ ██╔╝██╔════╝
// ███████╗   ██║   ███████║█████╔╝ █████╗ 
// ╚════██║   ██║   ██╔══██║██╔═██╗ ██╔══╝ 
// ███████║   ██║   ██║  ██║██║  ██╗███████╗
// ╚══════╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝
interface ValidatorInfo {
  /** 基本信息 */
  name: string
  address: string
  pubkey: string
  /** 是否被惩罚 */
  jailed: boolean
  /** 当前状态 Unstaked: 0, Unstaking: 1, Staked: 2 */
  status: number
  /** 当前节点抵押的全部shares */
  shares: string
  /** 当前节点抵押的全部token amount */
  delegationAmount: string
  /** 当前节点自身至少抵押了多少token amount */
  minSelfDelegation?: string
  /** 佣金设置 */
  commission?: {
    rate: number
    maxRate: number
    maxChangeRate: number
    updateAt: Date
  }
}
interface DelegationInfo {
  /** 基本信息 */
  delegator: string
  validator: string
  /** 真实显示的数量 */
  amount: string
  /** 在区块链中的数量 */
  nativeAmount: string
}
interface DelegationReward {
  /** 基本信息 */
  delegator?: string
  validator?: string
  /** 在区块链中的名称 */
  nativeName: string
  /** 在区块链中的数量 */
  nativeAmount: string
  /** 在瑶池中的名称 */
  coinName: string
  /** 真实显示的数量 */
  amount: string
}
interface UnstakingDelegationEntry {
  /** 发起区块号 */
  creationHeight: number
  /** Token释放时间，毫秒timestamp */
  completionTime: number
  /** 发起时的回收数量 */
  initialNativeAmount: string
  /** 当前的回收数量 */
  nativeAmount: string
  /** 发起时的真实数量 */
  initialAmount: string
  /** 当前的真实数量 */
  amount: string
}
interface UnstakingDelegationInfo {
  /** 基本信息 */
  delegator: string
  validator: string
  /** Unbonding处理队列 */
  entries: UnstakingDelegationEntry[]
}

/**
 * 当区块链有StakeHolder相关功能时，该类将被调用
 */
declare class StakeHandler {
  // ---------- POST 发起请求 ----------
  /**
   * 发起投代理请求
   * @param delegatorAddress 代理人地址
   * @param validatorAddress 被代理的见证人地址
   * @param shareAmount 代理量
   * @param outputs 相关订单
   */
  submitDelegation (delegatorAddress: string, validatorAddress: string, shareAmount: string, outputs: Order[]): Promise<OrdersUpdateResult>
  /**
   * 发起取消代理请求
   * @param delegatorAddress 代理人地址
   * @param validatorAddress 被代理的见证人地址
   * @param shareAmount 取消的代理量
   * @param outputs 相关订单
   */
  submitUnDelegation (delegatorAddress: string, validatorAddress: string, shareAmount: string, outputs: Order[]): Promise<OrdersUpdateResult>
  /**
   * 发起转移代理目标请求
   * @param delegatorAddress 代理人地址
   * @param srcValidatorAddress 转出：被代理的见证人地址
   * @param dstValidatorAddress 转入：被代理的见证人地址
   * @param shareAmount 转移的代理量
   */
  submitReDelegation (delegatorAddress: string, srcValidatorAddress: string, dstValidatorAddress: string, shareAmount: string): Promise<OrdersUpdateResult>
  /**
   * 领取代理收益
   * @param delegatorAddress 代理人地址
   * @param validatorAddress 可选，被代理的见证人地址
   */
  claimReward (delegatorAddress: string, validatorAddress?: string): Promise<OrdersUpdateResult>
  /**
   * 设置收益地址
   * @param delegatorAddress 代理人地址
   * @param rewardAddress 领取收益的地址
   */
  setRewardAddress (delegatorAddress: string, rewardAddress: string): Promise<OrdersUpdateResult>
  // ---------- GET 状态查询 ----------
  /**
   * 查询Validators信息
   * @param delegatorAddress 可选，是否指定为特定delegator已代理的目标Validators
   */
  getValidators (delegatorAddress?: string): Promise<ValidatorInfo[]>
  /**
   * 查询Validator信息
   * @param validatorAddress 查询指定Validator的地址
   */
  getValidator (validatorAddress: string): Promise<ValidatorInfo>
  /**
   * 查询某个Validators的未结余收益
   * @param validatorAddress 查询指定Validator的地址
   */
  getValidatorOutstandingRewards (validatorAddress: string): Promise<DelegationReward[]>
  /**
   * 查询指定Delegator的代理情况
   * @param delegatorAddress 指定的delegator地址
   * @param validatorAddress 可选，是否查询指定Validator的信息
   */
  getDelegations (delegatorAddress: string, validatorAddress?: string): Promise<DelegationInfo[]>
  /**
   * 查询正在处理中的UnDelegations情况
   * @param delegatorAddress 指定的delegator地址
   * @param validatorAddress 可选，是否查询指定Validator的信息
   */
  getUnstakingDelegations (delegatorAddress: string, validatorAddress?: string): Promise<UnstakingDelegationInfo[]>
  /**
   * 查询领取收益的地址
   * @param delegatorAddress 代理人地址
   */
  getRewardAddress (delegatorAddress: string): Promise<string>
  /**
   * 查询Delegator的收益
   * @param delegatorAddress 指定的delegator地址
   * @param validatorAddress 可选，是否查询指定Validator的信息
   */
  getDelegationRewards (delegatorAddress: string, validatorAddress?: string): Promise<DelegationReward[]>
}

export default LedgerClient
