import {
  PoolAbi,
  NewAdmin,
  NewImplementation,
  AddLiquidity,
  RemoveLiquidity,
  AddMargin,
  RemoveMargin,
  AddMarket,
} from "../../generated/Pool/PoolAbi"
import { getOrInitDToken, getOrInitPool, getOrInitSymbolManager } from "../helpers/initializers"
import { handleLiquidityAction, handleMarginAction, initBTokens, initSymbols } from "./helper"
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
  initBTokens(pool)
  // symbol init
  initSymbols(pool)
}
export function handleAddMarket(event: AddMarket): void {
  const pool = getOrInitPool(event.address)
  initBTokens(pool)
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

