import { BigDecimal, Bytes } from "@graphprotocol/graph-ts"
import { AddSymbol, RemoveSymbol } from "../../generated/Pool/SymbolManagerAbi"
import { Trade } from "../../generated/SymbolManager/SymbolManagerAbi"
import { getOrInitIdToName, getOrInitMargin, getOrInitPool, getOrInitPoolAccount, getOrInitPosition, getOrInitSymbolManager, getOrInitTradeHistory } from "../helpers/initializers"
import { formatDecimal } from "../utils/converters"
import { initSymbols, updatePoolOnTrade, updateSymbolsOnTrade } from "./helper"

// pTokenId, symbolId, indexPrice,tradeVolume,tradeCost,tradeFee
export function handlePoolTrade(event: Trade): void {
  const symbolManager = getOrInitSymbolManager(event.address)
  const pool = getOrInitPool(Bytes.fromHexString(symbolManager.pool))
  const account = event.transaction.from
  const poolAccount = getOrInitPoolAccount(account, Bytes.fromHexString(symbolManager.pool))

  const pTokenId = event.params.pTokenId
  const symbolId = event.params.symbolId
  let tradeHistory = getOrInitTradeHistory(pTokenId, symbolId, event)
  tradeHistory.symbolId = symbolId
  tradeHistory.symbol = getOrInitIdToName(symbolId).Name
  tradeHistory.pTokenId = pTokenId
  tradeHistory.indexPrice = formatDecimal(event.params.indexPrice)
  tradeHistory.tradeVolume = formatDecimal(event.params.tradeVolume)
  tradeHistory.tradeCost = formatDecimal(event.params.tradeCost)
  tradeHistory.tradeFee = formatDecimal(event.params.tradeFee)
  tradeHistory.timestamp = event.block.timestamp.toI32()
  tradeHistory.pool = symbolManager.pool
  tradeHistory.account = event.transaction.from
  tradeHistory.action = tradeHistory.tradeFee.lt(BigDecimal.fromString('0'))
    ? "liquidation"
    : tradeHistory.tradeVolume.gt(BigDecimal.fromString('0'))
    ? "long"
    : "short"
  tradeHistory.txHash = event.transaction.hash
  tradeHistory.save()

  let position = getOrInitPosition(pTokenId, symbolId, event)
  position.symbolId = symbolId
  position.symbol = getOrInitIdToName(symbolId).Name
  position.pTokenId = pTokenId
  position.volume = position.volume.plus(formatDecimal(event.params.tradeVolume))
  position.timestamp = event.block.timestamp.toI32()
  position.pool = symbolManager.pool
  position.poolAccount = poolAccount.id
  position.account = event.transaction.from
  position.save()

  // update pool
  updatePoolOnTrade(pool)
  // update symbol
  updateSymbolsOnTrade(pool)
  // zero margin if liquidation
  if (tradeHistory.tradeFee.lt(BigDecimal.fromString("0"))) {
    const bTokens = pool.bTokensArray
    for (let i = 0; i < bTokens.length; i++) {
      const bToken = bTokens[i]
      const margin = getOrInitMargin(pTokenId, Bytes.fromHexString(bToken), Bytes.fromHexString(symbolManager.pool))
      if (margin.margin != BigDecimal.fromString("0")) {
        margin.margin = BigDecimal.fromString("0")
        margin.save()
      }
    }
  }
}

export function handleAddSymbol(event: AddSymbol): void {
  const symbolManager = getOrInitSymbolManager(event.address)
  const pool = getOrInitPool(Bytes.fromHexString(symbolManager.pool))
  initSymbols(pool)
}
export function handleRemoveSymbol(event: RemoveSymbol): void {
  const symbolManager = getOrInitSymbolManager(event.address)
  const pool = getOrInitPool(Bytes.fromHexString(symbolManager.pool))
  initSymbols(pool)
}
