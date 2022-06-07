import { Address, BigInt, Bytes, ethereum } from "@graphprotocol/graph-ts"
import { DTokenAbi } from "../../generated/PoolImplementation/DTokenAbi"
import { Account, BToken, DToken, Liquidity, LiquidityHistory, Margin, MarginHistory, OwnerTokenId, Pool, PoolAccount, Position, SymbolManager, TradeHistory, Vault } from "../../generated/schema"
import { SymbolManagerImplementationAbi } from "../../generated/PoolImplementation/SymbolManagerImplementationAbi"
import { ZERO_ADDRESS } from "../utils/constants"
import { zeroAddress, zeroBD, zeroBI } from "../utils/converters"

export const getOrInitPool = (address:Bytes): Pool => {
  const id = address.toHexString()
  let pool = Pool.load(id)
  if (!pool) {
    pool= new Pool(id)
    pool.admin                = Bytes.fromHexString(ZERO_ADDRESS)
    pool.implementation       = Bytes.fromHexString(ZERO_ADDRESS)
    pool.pToken               = ZERO_ADDRESS
    pool.lToken               = ZERO_ADDRESS
    pool.symbolManager        = ZERO_ADDRESS
    pool.swapper              = Bytes.fromHexString(ZERO_ADDRESS)
    pool.tokenB0              = Bytes.fromHexString(ZERO_ADDRESS)
    pool.tokenWETH            = Bytes.fromHexString(ZERO_ADDRESS)
    pool.marketB0             = Bytes.fromHexString(ZERO_ADDRESS)
    pool.marketWETH           = Bytes.fromHexString(ZERO_ADDRESS)
    pool.vaultImplementation  = Bytes.fromHexString(ZERO_ADDRESS)
    pool.protocolFeeCollector = Bytes.fromHexString(ZERO_ADDRESS)
    pool.poolLiquidity = zeroBD()
    pool.save()
  }
  return pool
}

export const getOrInitSymbolManager = (address:Bytes): SymbolManager => {
  const id = address.toHexString()
  let symbolManager = SymbolManager.load(id)
  if (!symbolManager) {
    symbolManager = new SymbolManager(id)
    const symbolManagerContract = SymbolManagerImplementationAbi.bind(Address.fromBytes(address))
    symbolManager.pool = symbolManagerContract.pool().toHexString()
    symbolManager.save()
  }
  return symbolManager
}

export const getOrInitDToken = (address:Bytes): DToken => {
  const id = address.toHexString()
  let dToken = DToken.load(id)
  if (!dToken) {
    dToken = new DToken(id)
    const dTokenContract = DTokenAbi.bind(Address.fromBytes(address))
    dToken.name = dTokenContract.name()
    dToken.save()
  }
  return dToken
}

export const getOrInitOwnerTokenId = (tokenId:String, event: ethereum.Event): OwnerTokenId => {
  const id = `${tokenId}_${event.address.toHexString()}`
  let ownerTokenId = OwnerTokenId.load(id)
  if (!ownerTokenId) {
    ownerTokenId = new OwnerTokenId(id)
  }
  return ownerTokenId
}

export const getOrInitLiquidity = (tokenId:BigInt, bTokenAddress: Bytes, event: ethereum.Event): Liquidity => {
  const id = `${tokenId.toString()}_${bTokenAddress.toHexString()}_${event.address.toHexString()}`
  let liquidity = Liquidity.load(id)
  if (!liquidity) {
    liquidity = new Liquidity(id)
    liquidity.liquidity = BigInt.fromI32(0)
  }
  return liquidity
}

export const getOrInitLiquidityHistory = (tokenId: BigInt, bTokenAddress: Bytes, event: ethereum.Event): LiquidityHistory => {
  const id = `${tokenId.toString()}_${bTokenAddress.toHexString()}_${event.address.toHexString()}`
  let liquidityHistory = LiquidityHistory.load(id)
  if (!liquidityHistory) {
    liquidityHistory = new LiquidityHistory(id)
    liquidityHistory.amount = BigInt.fromI32(0)
  }
  return liquidityHistory
}

export const getOrInitMargin = (tokenId:BigInt, bTokenAddress: Bytes, event: ethereum.Event): Margin => {
  const id = `${tokenId.toString()}_${bTokenAddress.toHexString()}_${event.address.toHexString()}`
  let margin = Margin.load(id)
  if (!margin) {
    margin = new Margin(id)
    margin.margin = BigInt.fromI32(0)
  }
  return margin
}

export const getOrInitMarginHistory = (tokenId:BigInt, bTokenAddress: Bytes, event: ethereum.Event): MarginHistory => {
  const id = `${tokenId.toString()}_${bTokenAddress.toHexString()}_${event.address.toHexString()}`
  let marginHistory = MarginHistory.load(id)
  if (!marginHistory) {
    marginHistory = new MarginHistory(id)
    marginHistory.amount = BigInt.fromI32(0)
  }
  return marginHistory
}

export const getOrInitTradeHistory = (tokenId:BigInt, symbolId: Bytes, event: ethereum.Event): TradeHistory => {
  const id = `${tokenId.toString()}_${symbolId.toHexString()}_${event.address.toHexString()}`
  let tradeHistory = TradeHistory.load(id)
  if (!tradeHistory) {
    tradeHistory = new TradeHistory(id)
  }
  return tradeHistory
}

export const getOrInitPosition = (tokenId:BigInt, symbolId: Bytes, event: ethereum.Event): Position => {
  const id = `${tokenId.toString()}_${symbolId.toHexString()}_${event.address.toHexString()}`
  let position = Position.load(id)
  if (!position) {
    position = new Position(id)
    position.volume = BigInt.fromI32(0)
  }
  return position
}


export const getOrInitAccount = (id:Bytes): Account => {
  let account = Account.load(id.toHexString())
  if (!account) {
    account = new Account(id.toHexString())
    account.save()
  }
  return account
}

export const getOrInitPoolAccount = (account:Bytes, pool: Bytes): PoolAccount => {
  const id = `${account.toHexString()}_${pool.toHexString()}`
  let poolAccount = PoolAccount.load(id)
  if (!poolAccount) {
    poolAccount = new PoolAccount(id)
    poolAccount.account = getOrInitAccount(account).id
    poolAccount.pool = getOrInitPool(pool).id
    poolAccount.pTokenId = BigInt.fromI32(0)
    poolAccount.lTokenId = BigInt.fromI32(0)
    poolAccount.save()
  }
  return poolAccount
}

export const getOrInitBToken = (id:Bytes): BToken => {
  let bToken = BToken.load(id.toHexString())
  if (!bToken) {
    bToken = new BToken(id.toHexString())
    bToken.bToken= zeroAddress()
    bToken.bTokenSymbol = ''
    bToken.market = zeroAddress()
    bToken.marketSymbol = ''
    bToken.bTokenPrice = zeroBI()
    bToken.collateralFactor = zeroBD()
    bToken.pool = zeroAddress().toHexString()
    bToken.save()
  }
  return bToken
}

export const getOrInitVault = (id:Bytes): Vault => {
  let vault = Vault.load(id.toHexString())
  if (!vault) {
    vault = new Vault(id.toHexString())
    vault.aavePool = zeroAddress()
    vault.aaveOracle = zeroAddress()
    vault.save()
  }
  return vault
}
