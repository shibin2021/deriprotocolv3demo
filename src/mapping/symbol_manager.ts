import { BigDecimal, ByteArray, Bytes } from "@graphprotocol/graph-ts"
import { Trade } from "../../generated/SymbolManager/SymbolManagerAbi"
import { getOrInitIdToName, getOrInitPool, getOrInitPoolAccount, getOrInitPosition, getOrInitSymbolManager, getOrInitTradeHistory } from "../helpers/initializers"
import { formatDecimal } from "../utils/converters"
import { updatePoolOnTrade, updateSymbolsOnTrade } from "./helper"

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
}
