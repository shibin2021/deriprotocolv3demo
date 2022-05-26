import { Address, Bytes, ethereum } from "@graphprotocol/graph-ts"
import { DTokenAbi } from "../../generated/PoolImplementation/DTokenAbi"
import { AddMargin, PoolImplementationAbi } from "../../generated/PoolImplementation/PoolImplementationAbi"
import { DToken, OwnerTokenId, Pool } from "../../generated/schema"
import { POOL_ADDRESS } from "../mapping/helper"
import { ZERO_ADDRESS } from "../utils/constants"

export const getOrInitPool = (address:Bytes): Pool => {
  const id = address.toHexString()
  let pool = Pool.load(id)
  if (!pool) {
    pool= new Pool(id)
    pool.admin                = Bytes.fromHexString(ZERO_ADDRESS)
    pool.implementation       = Bytes.fromHexString(ZERO_ADDRESS)
    pool.pToken               = ZERO_ADDRESS
    pool.lToken               = ZERO_ADDRESS
    pool.symbolManager        = Bytes.fromHexString(ZERO_ADDRESS)
    pool.swapper              = Bytes.fromHexString(ZERO_ADDRESS)
    pool.tokenB0              = Bytes.fromHexString(ZERO_ADDRESS)
    pool.tokenWETH            = Bytes.fromHexString(ZERO_ADDRESS)
    pool.vaultImplementation  = Bytes.fromHexString(ZERO_ADDRESS)
    pool.protocolFeeCollector = Bytes.fromHexString(ZERO_ADDRESS)
    pool.save()
  }
  return pool
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

export const getOrInitOwnerTokenId = (tokenId:String, event: ethereum.Event): OwnerTokenId=> {
  const id = `${tokenId}_${event.address.toHexString()}`
  let ownerTokenId = OwnerTokenId.load(id)
  if (!ownerTokenId) {
    ownerTokenId = new OwnerTokenId(id)
  }
  return ownerTokenId
}
