import { Address, BigDecimal, BigInt, ByteArray, Bytes } from "@graphprotocol/graph-ts"
import {
  PoolImplementationAbi,
  NewAdmin,
  NewImplementation,
  AddLiquidity,
  RemoveLiquidity,
  AddMargin,
  RemoveMargin,
} from "../../generated/PoolImplementation/PoolImplementationAbi"
import {
  VaultImplementationAbi
} from "../../generated/PoolImplementation/VaultImplementationAbi"
import {
  AavePoolAbi
} from "../../generated/PoolImplementation/AavePoolAbi"
import {
  AaveOracleAbi
} from "../../generated/PoolImplementation/AaveOracleAbi"
import {
  ERC20Abi
} from "../../generated/PoolImplementation/ERC20Abi"
import { Pool, Liquidity, DToken } from "../../generated/schema"
import { getOrInitBToken, getOrInitDToken, getOrInitLiquidity, getOrInitLiquidityHistory, getOrInitMargin, getOrInitMarginHistory, getOrInitPool, getOrInitPoolAccount, getOrInitPosition, getOrInitSymbolManager, getOrInitTradeHistory, getOrInitVault } from "../helpers/initializers"
import { formatDecimal } from "../utils/converters"
import { ZERO_ADDRESS } from "../utils/constants"

export function handlePoolNewAdmin(event: NewAdmin): void {
    let pool = getOrInitPool(event.address)
    pool.admin = event.params.newAdmin
    pool.save()
}

export function handlePoolNewImplementation(event: NewImplementation): void {
  let pool = getOrInitPool(event.address)
  const contract = PoolImplementationAbi.bind(event.address)
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

  const vaultImplementationContract = VaultImplementationAbi.bind(Address.fromBytes(pool.vaultImplementation))
  const vault = getOrInitVault(pool.vaultImplementation)
  vault.aavePool = vaultImplementationContract.aavePool()
  vault.aaveOracle = vaultImplementationContract.aaveOracle()
  vault.save()

  const aavePoolContract = AavePoolAbi.bind(Address.fromBytes(vault.aavePool))
  const aaveOracleContract = AaveOracleAbi.bind(Address.fromBytes(vault.aaveOracle))
  const allAssets = aavePoolContract.getReservesList()
  for (let i = 0; i < allAssets.length; i++) {
    const asset = allAssets[i]
    const bToken = getOrInitBToken(asset)
    const configData = aavePoolContract.getConfiguration(asset).toHexString()
    const market = (asset == pool.tokenB0) ? pool.marketB0 : (asset == pool.tokenWETH) ? pool.marketWETH : contract.markets(asset)

    // ignore not support market
    if (market == Bytes.fromHexString(ZERO_ADDRESS)) {
      continue
    } else {
      const bTokenContract = ERC20Abi.bind(Address.fromBytes(asset))
      const marketContract = ERC20Abi.bind(Address.fromBytes(market))
      bToken.bToken = asset
      bToken.bTokenSymbol = bTokenContract.symbol()
      bToken.market = market
      bToken.marketSymbol = marketContract.symbol()
      bToken.bTokenPrice = aaveOracleContract.getAssetPrice(asset).div(aaveOracleContract.BASE_CURRENCY_UNIT())
      bToken.collateralFactor = BigInt.fromByteArray(ByteArray.fromHexString(`${configData.slice(configData.length - 4)}`)).toBigDecimal().div(BigDecimal.fromString("10000"))
      bToken.pool = pool.id
      bToken.save()
    }
  }
}

export function handlePoolAddLiquidity(event: AddLiquidity): void {
  const lTokenId = event.params.lTokenId
  const bTokenAddress = event.params.underlying
  let liquidity = getOrInitLiquidity(lTokenId, bTokenAddress, event)
  liquidity.bTokenAddress = bTokenAddress
  liquidity.bToken = ""
  liquidity.lTokenId = lTokenId
  liquidity.liquidity = liquidity.liquidity.plus(event.params.amount)
  liquidity.timestamp = event.block.timestamp.toI32()
  liquidity.pool = event.address.toHexString()
  const account = event.transaction.from
  const poolAccount = getOrInitPoolAccount(account, event.address)
  liquidity.poolAccount = poolAccount.id
  liquidity.save()

  let liquidityHistory = getOrInitLiquidityHistory(lTokenId, bTokenAddress, event)
  liquidityHistory.bTokenAddress = bTokenAddress
  liquidityHistory.bToken = ""
  liquidityHistory.lTokenId = lTokenId
  liquidityHistory.amount = liquidityHistory.amount.plus(event.params.amount)
  liquidityHistory.timestamp = event.block.timestamp.toI32()
  liquidityHistory.pool = event.address.toHexString()
  liquidityHistory.account = event.transaction.from
  liquidityHistory.newLiquidity = event.params.newLiquidity
  liquidityHistory.save()
  
  // update poolLiquidity
  const poolContract = PoolImplementationAbi.bind(Address.fromBytes(event.address))
  const pool = getOrInitPool(event.address)
  pool.poolLiquidity = formatDecimal(poolContract.liquidity())
  pool.save()
}

export function handlePoolRemoveLiquidity(event: RemoveLiquidity): void {
  const lTokenId = event.params.lTokenId
  const bTokenAddress = event.params.underlying
  let liquidity = getOrInitLiquidity(lTokenId, bTokenAddress, event)
  liquidity.bTokenAddress = bTokenAddress
  liquidity.bToken = ""
  liquidity.lTokenId = lTokenId
  liquidity.liquidity = liquidity.liquidity.plus(event.params.amount)
  liquidity.timestamp = event.block.timestamp.toI32()
  liquidity.pool = event.address.toHexString()
  const account = event.transaction.from
  const poolAccount = getOrInitPoolAccount(account, event.address)
  liquidity.poolAccount = poolAccount.id
  liquidity.save()

  let liquidityHistory = getOrInitLiquidityHistory(lTokenId, bTokenAddress, event)
  liquidityHistory.bTokenAddress = bTokenAddress
  liquidityHistory.bToken = ""
  liquidityHistory.lTokenId = lTokenId
  liquidityHistory.amount = liquidityHistory.amount.plus(event.params.amount)
  liquidityHistory.timestamp = event.block.timestamp.toI32()
  liquidityHistory.pool = event.address.toHexString()
  liquidityHistory.account = event.transaction.from
  liquidityHistory.newLiquidity = event.params.newLiquidity
  liquidityHistory.save()

  const poolContract = PoolImplementationAbi.bind(Address.fromBytes(event.address))
  const pool = getOrInitPool(event.address)
  pool.poolLiquidity = formatDecimal(poolContract.liquidity())
  pool.save()
}

export function handlePoolAddMargin(event: AddMargin): void {
  const pTokenId = event.params.pTokenId
  const bTokenAddress = event.params.underlying
  let margin = getOrInitMargin(pTokenId, bTokenAddress, event)
  margin.bTokenAddress = bTokenAddress
  margin.bToken = ""
  margin.pTokenId = pTokenId
  margin.margin = margin.margin.plus(event.params.amount)
  margin.timestamp = event.block.timestamp.toI32()
  margin.pool = event.address.toHexString()
  const account = event.transaction.from
  const poolAccount = getOrInitPoolAccount(account, event.address)
  margin.poolAccount = poolAccount.id
  margin.save()

  let marginHistory = getOrInitMarginHistory(pTokenId, bTokenAddress, event)
  marginHistory.bTokenAddress = bTokenAddress
  marginHistory.bToken = ""
  marginHistory.pTokenId = pTokenId
  marginHistory.amount = marginHistory.amount.plus(event.params.amount)
  marginHistory.timestamp = event.block.timestamp.toI32()
  marginHistory.pool = event.address.toHexString()
  marginHistory.account = event.transaction.from
  marginHistory.newMargin = event.params.newMargin
  marginHistory.save()
}

export function handlePoolRemoveMargin(event: RemoveMargin): void {
  const pTokenId = event.params.pTokenId
  const bTokenAddress = event.params.underlying
  let margin = getOrInitMargin(pTokenId, bTokenAddress, event)
  margin.bTokenAddress = bTokenAddress
  margin.bToken = ""
  margin.pTokenId = pTokenId
  margin.margin = margin.margin.plus(event.params.amount)
  margin.timestamp = event.block.timestamp.toI32()
  margin.pool = event.address.toHexString()
  const account = event.transaction.from
  const poolAccount = getOrInitPoolAccount(account, event.address)
  margin.poolAccount = poolAccount.id
  margin.save()

  let marginHistory = getOrInitMarginHistory(pTokenId, bTokenAddress, event)
  marginHistory.bTokenAddress = bTokenAddress
  marginHistory.bToken = ""
  marginHistory.pTokenId = pTokenId
  marginHistory.amount = marginHistory.amount.plus(event.params.amount)
  marginHistory.timestamp = event.block.timestamp.toI32()
  marginHistory.pool = event.address.toHexString()
  marginHistory.account = event.transaction.from
  marginHistory.newMargin = event.params.newMargin
  marginHistory.save()
}

