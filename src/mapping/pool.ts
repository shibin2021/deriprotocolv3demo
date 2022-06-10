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
import { getOrInitBToken, getOrInitDToken, getOrInitPool, getOrInitSymbolManager, getOrInitVault } from "../helpers/initializers"
import { ZERO_ADDRESS } from "../utils/constants"
import { handleLiquidityAction, handleMarginAction, initSymbols } from "./helper"
import { formatDecimal } from "../utils/converters"

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
  pool.reserveRatioB0 = formatDecimal(contract.reserveRatioB0())
  pool.minRatioB0 = formatDecimal(contract.minRatioB0())
  pool.poolInitialMarginMultiplier = formatDecimal(contract.poolInitialMarginMultiplier())
  pool.protocolFeeCollectRatio = formatDecimal(contract.protocolFeeCollectRatio())
  pool.minLiquidationReward = formatDecimal(contract.minLiquidationReward())
  pool.maxLiquidationReward = formatDecimal(contract.maxLiquidationReward())
  pool.liquidationRewardCutRatio = formatDecimal(contract.liquidationRewardCutRatio())
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
  handleLiquidityAction<AddLiquidity>(event, 'addLiquidity')
}

export function handlePoolRemoveLiquidity(event: RemoveLiquidity): void {
  handleLiquidityAction<RemoveLiquidity>(event, 'removeLiquidity')
}

export function handlePoolAddMargin(event: AddMargin): void {
  handleMarginAction<AddMargin>(event, 'addMargin')
}

export function handlePoolRemoveMargin(event: RemoveMargin): void {
  handleMarginAction<RemoveMargin>(event, 'removeMargin')
}

