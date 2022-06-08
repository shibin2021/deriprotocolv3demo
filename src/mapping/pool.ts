import { Address, BigDecimal, BigInt, ByteArray, Bytes } from "@graphprotocol/graph-ts"
import {
  PoolAbi,
  NewAdmin,
  NewImplementation,
  AddLiquidity,
  RemoveLiquidity,
  AddMargin,
  RemoveMargin,
} from "../../generated/Pool/PoolAbi"
import {
  VaultAbi
} from "../../generated/Pool/VaultAbi"
import {
  AavePoolAbi
} from "../../generated/Pool/AavePoolAbi"
import {
  AaveOracleAbi
} from "../../generated/Pool/AaveOracleAbi"
import {
  ERC20Abi
} from "../../generated/Pool/ERC20Abi"
import { getOrInitBToken, getOrInitDToken, getOrInitLiquidity, getOrInitLiquidityHistory, getOrInitMargin, getOrInitMarginHistory, getOrInitPool, getOrInitPoolAccount, getOrInitSymbolManager, getOrInitVault } from "../helpers/initializers"
import { formatDecimal } from "../utils/converters"
import { ZERO_ADDRESS } from "../utils/constants"
import { initSymbols } from "./helper"

export function handlePoolNewAdmin(event: NewAdmin): void {
  let pool = getOrInitPool(event.address)
  pool.admin = event.params.newAdmin
  pool.save()
}

export function handlePoolNewImplementation(event: NewImplementation): void {
  let pool = getOrInitPool(event.address)
  const contract = PoolAbi.bind(event.address)
  const pToken = getOrInitDToken(contract.pToken())
  pool.pToken = pToken.id
  const lToken = getOrInitDToken(contract.lToken())
  pool.lToken = lToken.id
  const symbolManager = getOrInitSymbolManager(contract.symbolManager())
  pool.symbolManager = symbolManager.id
  pool.swapper = contract.swapper()
  pool.tokenB0 = contract.tokenB0()
  pool.tokenWETH = contract.tokenWETH()
  pool.marketB0 = contract.marketB0()
  pool.marketWETH = contract.marketWETH()
  pool.vaultImplementation = contract.vaultImplementation()
  pool.protocolFeeCollector = contract.protocolFeeCollector()
  pool.implementation = event.params.newImplementation
  pool.save()

  // bToken init
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
  }
  // symbol init
  initSymbols(pool)
}

export function handlePoolAddLiquidity(event: AddLiquidity): void {
  const lTokenId = event.params.lTokenId
  const bToken = event.params.underlying
  const bTokenSymbol = getOrInitBToken(bToken).bTokenSymbol
  const bTokenDecimals = getOrInitBToken(bToken).bTokenDecimals
  let liquidity = getOrInitLiquidity(lTokenId, bToken, event)
  liquidity.bToken = bToken
  liquidity.bTokenSymbol = bTokenSymbol
  liquidity.lTokenId = lTokenId
  liquidity.liquidity = liquidity.liquidity
  liquidity.timestamp = event.block.timestamp.toI32()
  liquidity.pool = event.address.toHexString()
  const account = event.transaction.from
  const poolAccount = getOrInitPoolAccount(account, event.address)
  liquidity.poolAccount = poolAccount.id
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
  liquidityHistory.action = 'addLiquidity'
  liquidityHistory.save()
  
  // update poolLiquidity
  const poolContract = PoolAbi.bind(Address.fromBytes(event.address))
  const pool = getOrInitPool(event.address)
  pool.poolLiquidity = formatDecimal(poolContract.liquidity())
  pool.save()
}

export function handlePoolRemoveLiquidity(event: RemoveLiquidity): void {
  const lTokenId = event.params.lTokenId
  const bToken = event.params.underlying
  const bTokenSymbol = getOrInitBToken(bToken).bTokenSymbol
  const bTokenDecimals = getOrInitBToken(bToken).bTokenDecimals
  let liquidity = getOrInitLiquidity(lTokenId, bToken, event)
  liquidity.bToken = bToken
  liquidity.bTokenSymbol = bTokenSymbol
  liquidity.lTokenId = lTokenId
  liquidity.liquidity = liquidity.liquidity
  liquidity.timestamp = event.block.timestamp.toI32()
  liquidity.pool = event.address.toHexString()
  const account = event.transaction.from
  const poolAccount = getOrInitPoolAccount(account, event.address)
  liquidity.poolAccount = poolAccount.id
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
  liquidityHistory.action = 'removeLiquidity'
  liquidityHistory.save()

  const poolContract = PoolAbi.bind(Address.fromBytes(event.address))
  const pool = getOrInitPool(event.address)
  pool.poolLiquidity = formatDecimal(poolContract.liquidity())
  pool.save()
}

export function handlePoolAddMargin(event: AddMargin): void {
  const pTokenId = event.params.pTokenId
  const bToken = event.params.underlying
  const bTokenSymbol = getOrInitBToken(bToken).bTokenSymbol
  const bTokenDecimals = getOrInitBToken(bToken).bTokenDecimals
  let margin = getOrInitMargin(pTokenId, bToken, event)
  margin.bToken = bToken
  margin.bTokenSymbol = bTokenSymbol
  margin.pTokenId = pTokenId
  margin.margin = margin.margin
  margin.timestamp = event.block.timestamp.toI32()
  margin.pool = event.address.toHexString()
  const account = event.transaction.from
  const poolAccount = getOrInitPoolAccount(account, event.address)
  margin.poolAccount = poolAccount.id
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
  marginHistory.action = 'addMargin'
  marginHistory.save()
}

export function handlePoolRemoveMargin(event: RemoveMargin): void {
  const pTokenId = event.params.pTokenId
  const bToken = event.params.underlying
  const bTokenSymbol = getOrInitBToken(bToken).bTokenSymbol
  const bTokenDecimals = getOrInitBToken(bToken).bTokenDecimals
  let margin = getOrInitMargin(pTokenId, bToken, event)
  margin.bToken = bToken
  margin.bTokenSymbol = bTokenSymbol
  margin.pTokenId = pTokenId
  margin.margin = margin.margin
  margin.timestamp = event.block.timestamp.toI32()
  margin.pool = event.address.toHexString()
  const account = event.transaction.from
  const poolAccount = getOrInitPoolAccount(account, event.address)
  margin.poolAccount = poolAccount.id
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
  marginHistory.action = 'removeMargin'
  marginHistory.save()
}

