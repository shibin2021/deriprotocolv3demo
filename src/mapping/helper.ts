import { Address, BigDecimal, BigInt, Bytes } from "@graphprotocol/graph-ts"
import { SymbolManagerAbi } from "../../generated/Pool/SymbolManagerAbi"
import { SymbolAbi } from "../../generated/Pool/SymbolAbi"
import { Pool } from "../../generated/schema"
import { getOrInitBToken, getOrInitIdToName, getOrInitLiquidity, getOrInitLiquidityHistory, getOrInitMargin, getOrInitMarginHistory, getOrInitNameToCId, getOrInitOwnerTokenId, getOrInitPool, getOrInitPoolAccount, getOrInitSymbol, getOrInitSymbolManager, getOrInitVault } from "../helpers/initializers"
import { formatDecimal } from "../utils/converters"
import { PoolAbi } from "../../generated/Pool/PoolAbi"
import { ZERO_ADDRESS } from "../utils/constants"
import { VaultAbi } from "../../generated/Pool/VaultAbi"
import { ERC20Abi } from "../../generated/Pool/ERC20Abi"
import { AavePoolAbi } from "../../generated/Pool/AavePoolAbi"
import { AaveOracleAbi } from "../../generated/Pool/AaveOracleAbi"

export const ADDRESS_ZERO = '0x0000000000000000000000000000000000000000'
export const POOL_ADDRESS = '0xDE3447Eb47EcDf9B5F90E7A6960a14663916CeE8'

// pool
export const updatePoolOnLiquidity = (pool: Pool): void => {
  const poolContract = PoolAbi.bind(Address.fromBytes(Bytes.fromHexString(pool.id)))
  pool.poolLiquidity = formatDecimal(poolContract.liquidity())
  pool.lpsPnl = formatDecimal(poolContract.lpsPnl())
  pool.cumulativePnlPerLiquidity = poolContract.cumulativePnlPerLiquidity()
  pool.protocolFeeAccrued = formatDecimal(poolContract.protocolFeeAccrued())
  pool.save()
}

export const updatePoolOnTrade = (pool: Pool): void => {
  const symbolManagerContract = SymbolManagerAbi.bind(Address.fromBytes(Bytes.fromHexString(pool.symbolManager)))
  pool.initialMarginRequired = formatDecimal(symbolManagerContract.initialMarginRequired())
  pool.save()
}

// bToken
export const initBTokens = (pool: Pool) : void => {
  const contract = PoolAbi.bind(Address.fromBytes(Bytes.fromHexString(pool.id)))
  const vaultContract = VaultAbi.bind(Address.fromBytes(pool.vaultImplementation))
  const vault = getOrInitVault(pool.vaultImplementation)
  vault.aavePool = vaultContract.aavePool()
  vault.aaveOracle = vaultContract.aaveOracle()
  vault.save()

  const aavePoolContract = AavePoolAbi.bind(Address.fromBytes(vault.aavePool))
  const aaveOracleContract = AaveOracleAbi.bind(Address.fromBytes(vault.aaveOracle))
  const allAssets = aavePoolContract.getReservesList()
  for (let i = 0; i < allAssets.length; i++) {
    const asset = allAssets[i]
    const configData = aavePoolContract.getConfiguration(asset).toHexString()
    const market = (asset == pool.tokenB0) ? pool.marketB0 : (asset == pool.tokenWETH) ? pool.marketWETH : contract.markets(asset)

    // ignore not support market
    if (market == Bytes.fromHexString(ZERO_ADDRESS)) {
      continue
    }
    const bToken = getOrInitBToken(asset)
    const bTokenContract = ERC20Abi.bind(Address.fromBytes(asset))
    const marketContract = ERC20Abi.bind(Address.fromBytes(market))
    bToken.bToken = asset
    bToken.bTokenSymbol = bTokenContract.symbol()
    bToken.bTokenDecimals = bTokenContract.decimals()
    bToken.market = market
    bToken.marketSymbol = marketContract.symbol()
    bToken.marketDecimals = marketContract.decimals()
    bToken.bTokenPrice = aaveOracleContract.getAssetPrice(asset).toBigDecimal()
      .div(aaveOracleContract.BASE_CURRENCY_UNIT().toBigDecimal())
    bToken.collateralFactor = BigInt.fromI32(I32.parseInt(configData.slice(configData.length - 4), 16)).toBigDecimal().div(BigDecimal.fromString("10000"))
    bToken.pool = pool.id
    bToken.save()
    if (!pool.bTokensArray.includes(asset.toHexString())) {
      pool.bTokensArray.push(asset.toHexString())
    }
  }
}

export const updateBTokenOnLiquidity = (pool: Pool): void => {
}

// symbols
export const initSymbols = (pool: Pool):void => {
  const symbolManagerContract = SymbolManagerAbi.bind(Address.fromBytes(Bytes.fromHexString(pool.symbolManager)))
  const length = symbolManagerContract.getSymbolsLength()
  const symbolManager = getOrInitSymbolManager(Bytes.fromHexString(pool.symbolManager))
  if (length != symbolManager.length) {
    symbolManager.length = length
    symbolManager.save()
  }
  for (let i = 0; i < length.toI32(); i++) {
    const symbolAddress = symbolManagerContract.indexedSymbols(BigInt.fromI32(i))
    const symbolContract = SymbolAbi.bind(symbolAddress)
    const symbol = getOrInitSymbol(symbolAddress)
    symbol.symbol = symbolContract.symbol()
    symbol.symbolAddress = symbolAddress
    symbol.manager = symbolContract.manager()
    symbol.oracleManager = symbolContract.oracleManager()
    symbol.symbolId = symbolContract.symbolId()
    symbol.alpha = formatDecimal(symbolContract.alpha())
    symbol.fundingPeriod = symbolContract.fundingPeriod()
    symbol.minTradeVolume = formatDecimal(symbolContract.minTradeVolume())
    symbol.initialMarginRatio = formatDecimal(symbolContract.initialMarginRatio())
    symbol.maintenanceMarginRatio = formatDecimal(symbolContract.maintenanceMarginRatio())
    symbol.pricePercentThreshold = formatDecimal(symbolContract.pricePercentThreshold())
    symbol.timeThreshold = symbolContract.timeThreshold()
    symbol.isCloseOnly = symbolContract.isCloseOnly()
    symbol.pool = pool.id
    symbol.save()

    const nameToCId = getOrInitNameToCId(symbol.symbol)
    nameToCId.CId = symbol.symbolId
    nameToCId.save()

    const idToName = getOrInitIdToName(symbol.symbolId)
    idToName.Name = symbol.symbol
    idToName.save()
  }
}

export const updateSymbolsOnTrade = (pool: Pool): void => {
  const symbolManagerContract = SymbolManagerAbi.bind(Address.fromBytes(Bytes.fromHexString(pool.symbolManager)))
  const length = symbolManagerContract.getSymbolsLength()
  const symbolManager = getOrInitSymbolManager(Bytes.fromHexString(pool.symbolManager))
  if (length != symbolManager.length) {
    symbolManager.length = length
    symbolManager.save()
  }
  for (let i = 0; i < length.toI32(); i++) {
    const symbolAddress = symbolManagerContract.indexedSymbols(BigInt.fromI32(i))
    const symbolContract = SymbolAbi.bind(symbolAddress)
    const symbol = getOrInitSymbol(symbolAddress)
    symbol.netVolume = formatDecimal(symbolContract.netVolume())
    symbol.netCost = formatDecimal(symbolContract.netCost())
    symbol.indexPrice = formatDecimal(symbolContract.indexPrice())
    symbol.fundingTimestamp = symbolContract.fundingTimestamp()
    symbol.cumulativeFundingPerVolume = symbolContract.cumulativeFundingPerVolume()
    symbol.tradersPnl = formatDecimal(symbolContract.tradersPnl())
    symbol.initialMarginRequired = formatDecimal(symbolContract.initialMarginRequired())
    symbol.nPositionHolders = symbolContract.nPositionHolders()
    if (symbolContract.nameId() == Bytes.fromHexString("0xf58241dde699c443c3d05d9d6532ba65d57f4359fc3c5082c471e97ff871dd49")) {
      symbol.category = "futures"
      symbol.feeRatio = formatDecimal(symbolContract.feeRatio())
    } else if (symbolContract.nameId() == Bytes.fromHexString("0x1f219b8266ed7dbbc4c24f75118696412465e1a613fac24f3e4e971783073c9e")) {
      symbol.category = "option"
      symbol.minInitialMarginRatio = formatDecimal(symbolContract.minInitialMarginRatio())
      symbol.priceId = symbolContract.priceId()
      symbol.volatilityId = symbolContract.volatilityId()
      symbol.feeRatioITM = formatDecimal(symbolContract.feeRatioITM())
      symbol.feeRatioOTM = formatDecimal(symbolContract.feeRatioOTM())
      symbol.strikePrice = formatDecimal(symbolContract.strikePrice())
      symbol.isCall = symbolContract.isCall()
    } else if (symbolContract.nameId() == Bytes.fromHexString("0x7afbb512b214ad413e0089411df9aa6d70ad194d6be89e9526a2e910251a5225")) {
      symbol.category = "power"
      symbol.power = symbolContract.power()
      symbol.priceId = symbolContract.priceId()
      symbol.volatilityId = symbolContract.volatilityId()
      symbol.feeRatio = formatDecimal(symbolContract.feeRatio())
    }
    symbol.save()
  }
}

export function handleLiquidityAction<T> (event: T, action: string):void {
  const account = event.transaction.from
  const poolAccount = getOrInitPoolAccount(account, event.address)
  const lTokenId = event.params.lTokenId
  const pool = getOrInitPool(event.address)
  let bToken = event.params.underlying
  if (bToken == Bytes.fromHexString(ZERO_ADDRESS)) {
    bToken = Address.fromBytes(pool.tokenWETH)
  }
  const poolContract = PoolAbi.bind(Address.fromBytes(event.address))
  const market = bToken == pool.tokenB0 ? pool.marketB0 : bToken == pool.tokenWETH ? pool.marketWETH : poolContract.markets(bToken)
  const marketContract = ERC20Abi.bind(Address.fromBytes(market))
  // update poolLiquidity
  updatePoolOnLiquidity(pool)
  const lpInfos = poolContract.lpInfos(lTokenId)
  let ownerTokenId = getOrInitOwnerTokenId(lTokenId.toString(), Bytes.fromHexString(pool.lToken))
  if (ownerTokenId.vault == Bytes.fromHexString(ZERO_ADDRESS)) {
    ownerTokenId.vault = lpInfos.value0
  }
  const vaultContract = VaultAbi.bind(Address.fromBytes(ownerTokenId.vault))
  // update amountB0
  ownerTokenId.amountB0 = formatDecimal(lpInfos.value1)
  ownerTokenId.liquidity = formatDecimal(lpInfos.value2)
  ownerTokenId.cumulativePnlPerLiquidity = formatDecimal(lpInfos.value3)
  ownerTokenId.vaultLiquidity = formatDecimal(vaultContract.getVaultLiquidity())
  ownerTokenId.save()

  const bTokenState = getOrInitBToken(bToken) 
  const bTokenSymbol = bTokenState.bTokenSymbol
  const bTokenDecimals = bTokenState.bTokenDecimals
  const assetBalance = formatDecimal(vaultContract.getAssetBalance(Address.fromBytes(market)), marketContract.decimals())
  let liquidity = getOrInitLiquidity(lTokenId, bToken, event)
  liquidity.bToken = bToken
  liquidity.bTokenSymbol = bTokenSymbol
  liquidity.lTokenId = lTokenId
  liquidity.liquidity = bToken == pool.tokenB0 ? assetBalance.plus(ownerTokenId.amountB0) : assetBalance
  liquidity.timestamp = event.block.timestamp.toI32()
  liquidity.pool = event.address.toHexString()
  liquidity.poolAccount = poolAccount.id
  liquidity.account = account
  liquidity.save()

  let liquidityHistory = getOrInitLiquidityHistory(lTokenId, bToken, event)
  liquidityHistory.bToken = bToken
  liquidityHistory.bTokenSymbol = bTokenSymbol
  liquidityHistory.lTokenId = lTokenId
  liquidityHistory.amount = formatDecimal(event.params.amount, bTokenDecimals)
  liquidityHistory.timestamp = event.block.timestamp.toI32()
  liquidityHistory.pool = event.address.toHexString()
  liquidityHistory.account = event.transaction.from
  liquidityHistory.newLiquidity = formatDecimal(event.params.newLiquidity)
  liquidityHistory.action = action
  liquidityHistory.txHash = event.transaction.hash
  liquidityHistory.account = account
  liquidityHistory.save()
}

export function handleMarginAction<T> (event: T, action: string) :void {
  const account = event.transaction.from
  const pool = getOrInitPool(event.address)
  const poolAccount = getOrInitPoolAccount(account, event.address)
  const pTokenId = event.params.pTokenId
  let bToken = event.params.underlying
  if (bToken == Bytes.fromHexString(ZERO_ADDRESS)) {
    bToken = Address.fromBytes(pool.tokenWETH)
  }
  const poolContract = PoolAbi.bind(Address.fromBytes(event.address))
  const market = bToken == pool.tokenB0 ? pool.marketB0 : bToken == pool.tokenWETH ? pool.marketWETH : poolContract.markets(bToken)
  const marketContract = ERC20Abi.bind(Address.fromBytes(market))

  const tdInfos = poolContract.tdInfos(pTokenId)
  let ownerTokenId = getOrInitOwnerTokenId(pTokenId.toString(), Bytes.fromHexString(pool.pToken))
  if (ownerTokenId.vault == Bytes.fromHexString(ZERO_ADDRESS)) {
    ownerTokenId.vault = tdInfos.value0
  }
  const vaultContract = VaultAbi.bind(Address.fromBytes(ownerTokenId.vault))
  // update amountB0
  ownerTokenId.amountB0 = formatDecimal(tdInfos.value1)
  ownerTokenId.vaultLiquidity = formatDecimal(vaultContract.getVaultLiquidity())
  ownerTokenId.save()

  const bTokenState = getOrInitBToken(bToken)
  const bTokenSymbol = bTokenState.bTokenSymbol
  const bTokenDecimals = bTokenState.bTokenDecimals
  const assetBalance = formatDecimal(vaultContract.getAssetBalance(Address.fromBytes(market)), marketContract.decimals())
  let margin = getOrInitMargin(pTokenId, bToken, event.address)
  margin.bToken = bToken
  margin.bTokenSymbol = bTokenSymbol
  margin.pTokenId = pTokenId
  margin.margin = bToken == pool.tokenB0 ? assetBalance.plus(ownerTokenId.amountB0) : assetBalance
  margin.timestamp = event.block.timestamp.toI32()
  margin.pool = event.address.toHexString()
  margin.poolAccount = poolAccount.id
  margin.account = account
  margin.save()

  let marginHistory = getOrInitMarginHistory(pTokenId, bToken, event)
  marginHistory.bToken = bToken
  marginHistory.bTokenSymbol = bTokenSymbol
  marginHistory.pTokenId = pTokenId
  marginHistory.amount = formatDecimal(event.params.amount, bTokenDecimals)
  marginHistory.timestamp = event.block.timestamp.toI32()
  marginHistory.pool = event.address.toHexString()
  marginHistory.account = event.transaction.from
  marginHistory.newMargin = formatDecimal(event.params.newMargin)
  marginHistory.action = action
  marginHistory.txHash = event.transaction.hash
  marginHistory.account = account
  marginHistory.save()
}
