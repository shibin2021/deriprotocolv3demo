import { Address, BigDecimal, BigInt, ByteArray, Bytes, ethereum } from "@graphprotocol/graph-ts"
import { DTokenAbi } from "../../generated/Pool/DTokenAbi"
import { Account, BToken, DToken, IdToName, Liquidity, LiquidityHistory, Margin, MarginHistory, NameToCId, OwnerTokenId, Pool, PoolAccount, Position, Symbol, SymbolManager, TradeHistory, Vault } from "../../generated/schema"
import { SymbolManagerAbi } from "../../generated/Pool/SymbolManagerAbi"
import { ZERO_ADDRESS } from "../utils/constants"
import { zeroAddress, zeroBD, zeroBI } from "../utils/converters"

export const getOrInitPool = (address:Bytes): Pool => {
  const id = address.toHexString()
  let pool = Pool.load(id)
  if (!pool) {
    pool= new Pool(id)
    pool.admin                = Bytes.fromHexString(ZERO_ADDRESS)
    pool.implementation       = Bytes.fromHexString(ZERO_ADDRESS)
    pool.pToken               = ZERO_ADDRESS
    pool.lToken               = ZERO_ADDRESS
    pool.symbolManager        = ZERO_ADDRESS
    pool.swapper              = Bytes.fromHexString(ZERO_ADDRESS)
    pool.tokenB0              = Bytes.fromHexString(ZERO_ADDRESS)
    pool.tokenWETH            = Bytes.fromHexString(ZERO_ADDRESS)
    pool.marketB0             = Bytes.fromHexString(ZERO_ADDRESS)
    pool.marketWETH           = Bytes.fromHexString(ZERO_ADDRESS)
    pool.vaultImplementation  = Bytes.fromHexString(ZERO_ADDRESS)
    pool.protocolFeeCollector = Bytes.fromHexString(ZERO_ADDRESS)
    pool.poolLiquidity = zeroBD()
    pool.reserveRatioB0 = zeroBD()
    pool.minRatioB0 = zeroBD()
    pool.poolInitialMarginMultiplier = zeroBD()
    pool.protocolFeeCollectRatio = zeroBD()
    pool.minLiquidationReward = zeroBD()
    pool.maxLiquidationReward = zeroBD()
    pool.liquidationRewardCutRatio = zeroBD()
    pool.lpsPnl = zeroBD()
    pool.cumulativePnlPerLiquidity = zeroBI()
    pool.protocolFeeAccrued = zeroBD()
    pool.initialMarginRequired = zeroBD()
    pool.bTokensString = ""
    pool.save()
  }
  return pool
}

export const getOrInitSymbolManager = (address:Bytes): SymbolManager => {
  const id = address.toHexString()
  let symbolManager = SymbolManager.load(id)
  if (!symbolManager) {
    symbolManager = new SymbolManager(id)
    const symbolManagerContract = SymbolManagerAbi.bind(Address.fromBytes(address))
    symbolManager.pool = symbolManagerContract.pool().toHexString()
    symbolManager.length = zeroBI()
    symbolManager.save()
  }
  return symbolManager
}

export const getOrInitDToken = (address:Bytes): DToken => {
  const id = address.toHexString()
  let dToken = DToken.load(id)
  if (!dToken) {
    dToken = new DToken(id)
    const dTokenContract = DTokenAbi.bind(Address.fromBytes(address))
    dToken.name = dTokenContract.name()
    dToken.save()
  }
  return dToken
}

export const getOrInitOwnerTokenId = (tokenId:String, symbolManager: Bytes): OwnerTokenId => {
  const id = `${tokenId}_${symbolManager.toHexString()}`
  let ownerTokenId = OwnerTokenId.load(id)
  if (!ownerTokenId) {
    ownerTokenId = new OwnerTokenId(id)
    ownerTokenId.vault = Bytes.fromHexString(ZERO_ADDRESS)
    ownerTokenId.amountB0 = zeroBD()
    ownerTokenId.liquidity = zeroBD()
    ownerTokenId.cumulativePnlPerLiquidity= zeroBD()
    ownerTokenId.vaultLiquidity = zeroBD()
  }
  return ownerTokenId
}

export const getOrInitLiquidity = (tokenId:BigInt, bTokenAddress: Bytes, event: ethereum.Event): Liquidity => {
  const id = `${tokenId.toString()}_${bTokenAddress.toHexString()}_${event.address.toHexString()}`
  let liquidity = Liquidity.load(id)
  if (!liquidity) {
    liquidity = new Liquidity(id)
    liquidity.liquidity = BigDecimal.fromString('0')
  }
  return liquidity
}

export const getOrInitLiquidityHistory = (tokenId: BigInt, bTokenAddress: Bytes, event: ethereum.Event): LiquidityHistory => {
  const id = `${tokenId.toString()}_${bTokenAddress.toHexString()}_${event.address.toHexString()}_${event.transaction.hash.toHexString()}`
  let liquidityHistory = LiquidityHistory.load(id)
  if (!liquidityHistory) {
    liquidityHistory = new LiquidityHistory(id)
  }
  return liquidityHistory
}

export const getOrInitMargin = (tokenId:BigInt, bTokenAddress: Bytes, poolAddress: Bytes): Margin => {
  const id = `${tokenId.toString()}_${bTokenAddress.toHexString()}_${poolAddress.toHexString()}`
  let margin = Margin.load(id)
  if (!margin) {
    margin = new Margin(id)
    margin.margin = BigDecimal.fromString('0')
  }
  return margin
}

export const getOrInitMarginHistory = (tokenId:BigInt, bTokenAddress: Bytes, event: ethereum.Event): MarginHistory => {
  const id = `${tokenId.toString()}_${bTokenAddress.toHexString()}_${event.address.toHexString()}_${event.transaction.hash.toHexString()}`
  let marginHistory = MarginHistory.load(id)
  if (!marginHistory) {
    marginHistory = new MarginHistory(id)
  }
  return marginHistory
}

export const getOrInitTradeHistory = (tokenId:BigInt, symbolId: Bytes, event: ethereum.Event): TradeHistory => {
  const id = `${tokenId.toString()}_${symbolId.toHexString()}_${event.address.toHexString()}_${event.transaction.hash.toHexString()}`
  let tradeHistory = TradeHistory.load(id)
  if (!tradeHistory) {
    tradeHistory = new TradeHistory(id)
  }
  return tradeHistory
}

export const getOrInitPosition = (tokenId:BigInt, symbolId: Bytes, event: ethereum.Event): Position => {
  const id = `${tokenId.toString()}_${symbolId.toHexString()}_${event.address.toHexString()}`
  let position = Position.load(id)
  if (!position) {
    position = new Position(id)
    position.volume = BigDecimal.fromString('0')
  }
  return position
}


export const getOrInitAccount = (id:Bytes): Account => {
  let account = Account.load(id.toHexString())
  if (!account) {
    account = new Account(id.toHexString())
    account.save()
  }
  return account
}

export const getOrInitPoolAccount = (account:Bytes, pool: Bytes): PoolAccount => {
  const id = `${account.toHexString()}_${pool.toHexString()}`
  let poolAccount = PoolAccount.load(id)
  if (!poolAccount) {
    poolAccount = new PoolAccount(id)
    poolAccount.account = getOrInitAccount(account).id
    poolAccount.pool = getOrInitPool(pool).id
    poolAccount.pTokenId = BigInt.fromI32(0)
    poolAccount.lTokenId = BigInt.fromI32(0)
    poolAccount.save()
  }
  return poolAccount
}

export const getOrInitBToken = (id:Bytes): BToken => {
  let bToken = BToken.load(id.toHexString())
  if (!bToken) {
    bToken = new BToken(id.toHexString())
    bToken.bToken= zeroAddress()
    bToken.bTokenSymbol = ''
    bToken.bTokenDecimals = 0
    bToken.market = zeroAddress()
    bToken.marketSymbol = ''
    bToken.marketDecimals = 0
    bToken.collateralFactor = zeroBD()
    bToken.bTokenPrice = zeroBD()
    bToken.pool = zeroAddress().toHexString()
    // bToken.save()
  }
  return bToken
}

export const getOrInitSymbol = (id:Bytes): Symbol => {
  let symbol = Symbol.load(id.toHexString())
  if (!symbol) {
    symbol = new Symbol(id.toHexString())
    symbol.category = ''
    symbol.symbol = ''
    symbol.symbolAddress = zeroAddress()
    symbol.manager = zeroAddress()
    symbol.oracleManager = zeroAddress()
    symbol.symbolId = Bytes.fromI32(0)
    symbol.feeRatio = zeroBD()
    symbol.alpha = zeroBD()
    symbol.fundingPeriod = zeroBI()
    symbol.minTradeVolume = zeroBD()
    symbol.minInitialMarginRatio = zeroBD()
    symbol.initialMarginRatio = zeroBD()
    symbol.maintenanceMarginRatio = zeroBD()
    symbol.pricePercentThreshold = zeroBD()
    symbol.timeThreshold = zeroBI()
    symbol.isCloseOnly = false
    symbol.priceId = Bytes.fromI32(0)
    symbol.volatilityId = Bytes.fromI32(0)
    symbol.feeRatioITM = zeroBD()
    symbol.feeRatioOTM = zeroBD()
    symbol.strikePrice = zeroBD()
    symbol.isCall = false

    symbol.netVolume = zeroBD()
    symbol.netCost = zeroBD()
    symbol.indexPrice =zeroBD()
    symbol.fundingTimestamp = zeroBI()
    symbol.cumulativeFundingPerVolume = zeroBI()
    symbol.tradersPnl = zeroBD()
    symbol.initialMarginRequired = zeroBD()
    symbol.nPositionHolders = zeroBI()
    symbol.power = zeroBI()

    symbol.pool = zeroAddress().toHexString()
    symbol.save()
  }
  return symbol
}

export const getOrInitVault = (id:Bytes): Vault => {
  let vault = Vault.load(id.toHexString())
  if (!vault) {
    vault = new Vault(id.toHexString())
    vault.aavePool = zeroAddress()
    vault.aaveOracle = zeroAddress()
    vault.save()
  }
  return vault
}

export const getOrInitIdToName = (id: Bytes): IdToName => {
  let idToName = IdToName.load(id.toHexString())
  if (!idToName) {
    idToName = new IdToName(id.toHexString())
    idToName.Name = ""
    idToName.save()
  }
  return idToName
}

export const getOrInitNameToCId = (id: String): NameToCId => {
  let nameToCId = NameToCId.load(id)
  if (!nameToCId) {
    nameToCId = new NameToCId(id)
    nameToCId.CId = Bytes.fromI32(0)
    nameToCId.save()
  }
  return nameToCId
}
