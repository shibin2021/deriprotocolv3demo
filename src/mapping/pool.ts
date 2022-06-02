import { BigInt, ByteArray } from "@graphprotocol/graph-ts"
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
  Trade
} from "../../generated/SymbolManagerImplementation/SymbolManagerImplementationAbi"
import { Pool, Liquidity, DToken } from "../../generated/schema"
import { getOrInitDToken, getOrInitLiquidity, getOrInitLiquidityHistory, getOrInitMargin, getOrInitMarginHistory, getOrInitPool, getOrInitPoolAccount, getOrInitPosition, getOrInitSymbolManager, getOrInitTradeHistory } from "../helpers/initializers"

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
  pool.vaultImplementation = contract.vaultImplementation()
  pool.protocolFeeCollector = contract.protocolFeeCollector()
  pool.implementation = event.params.newImplementation
  pool.save()
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
  liquidityHistory.save()
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
  liquidityHistory.save()
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
  marginHistory.save()
}

