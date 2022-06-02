import { ByteArray, Bytes } from "@graphprotocol/graph-ts"
import { Trade } from "../../generated/SymbolManagerImplementation/SymbolManagerImplementationAbi"
import { getOrInitPoolAccount, getOrInitPosition, getOrInitSymbolManager, getOrInitTradeHistory } from "../helpers/initializers"

// pTokenId, symbolId, indexPrice,tradeVolume,tradeCost,tradeFee
export function handlePoolTrade(event: Trade): void {
  const pTokenId = event.params.pTokenId
  const symbolId = event.params.symbolId
  let tradeHistory = getOrInitTradeHistory(pTokenId, symbolId, event)
  tradeHistory.symbolId = symbolId
  tradeHistory.symbol = ""
  tradeHistory.pTokenId = pTokenId
  tradeHistory.indexPrice = event.params.indexPrice
  tradeHistory.tradeVolume = event.params.tradeVolume
  tradeHistory.tradeCost = event.params.tradeCost
  tradeHistory.tradeFee = event.params.tradeFee
  tradeHistory.timestamp = event.block.timestamp.toI32()
  const symbolManager = getOrInitSymbolManager(event.address)
  tradeHistory.pool = symbolManager.pool
  tradeHistory.save()

  let position = getOrInitPosition(pTokenId, symbolId, event)
  position.symbolId = symbolId
  position.symbol = ""
  position.pTokenId = pTokenId
  position.volume = position.volume.plus(event.params.tradeVolume)
  position.timestamp = event.block.timestamp.toI32()
  position.pool = symbolManager.pool
  const account = event.transaction.from
  const poolAccount = getOrInitPoolAccount(account, Bytes.fromHexString(symbolManager.pool))
  position.poolAccount = poolAccount.id
  position.save()
}
