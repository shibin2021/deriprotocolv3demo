import { Address, BigDecimal, BigInt, bigInt, Bytes } from "@graphprotocol/graph-ts"
import { SymbolManagerAbi } from "../../generated/Pool/SymbolManagerAbi"
import { SymbolAbi } from "../../generated/Pool/SymbolAbi"
import { Pool } from "../../generated/schema"
import { getOrInitSymbol, getOrInitSymbolManager } from "../helpers/initializers"
import { formatDecimal } from "../utils/converters"

export const ADDRESS_ZERO = '0x0000000000000000000000000000000000000000'
export const POOL_ADDRESS = '0xDE3447Eb47EcDf9B5F90E7A6960a14663916CeE8'

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
    const symbol  = getOrInitSymbol(symbolAddress)
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
  }
}

export const updateSymbols = (pool: Pool): void => {

}
