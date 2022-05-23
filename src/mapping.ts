import { BigInt, ByteArray } from "@graphprotocol/graph-ts"
import {
  PoolImplementation,
  NewAdmin,
  NewImplementation,
  AddLiquidity,
  RemoveLiquidity,
} from "../generated/PoolImplementation/PoolImplementation"
import { Pool, Liquidity } from "../generated/schema"

export function handleNewAdmin(event: NewAdmin): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
    const id = event.address.toHexString()
    let entity = Pool.load(id)
    if (!entity) {
      entity = new Pool(id)
      const contract = PoolImplementation.bind(event.address)
      // entity.markets = contract.markets().map((m) => m.toHex())
    }
    entity.admin = event.params.newAdmin
    entity.save()

  // Note: If a handler doesn't require existing field values, it is faster
  // _not_ to load the entity from the store. Instead, create it fresh with
  // `new Entity(...)`, set the fields that should be updated and save the
  // entity back to the store. Fields that were not set or unset remain
  // unchanged, allowing for partial updates to be applied.

  // It is also possible to access smart contracts from mappings. For
  // example, the contract that has emitted the event can be connected to
  // with:
  //
  // let contract = Contract.bind(event.address)
  //
  // The following functions can then be called on this contract to access
  // state variables and other data:
  //
  // - contract.admin(...)
  // - contract.cumulativePnlPerLiquidity(...)
  // - contract.implementation(...)
  // - contract.liquidity(...)
  // - contract.lpInfos(...)
  // - contract.lpsPnl(...)
  // - contract.markets(...)
  // - contract.protocolFeeAccrued(...)
  // - contract.protocolFeeCollector(...)
  // - contract.tdInfos(...)
}

export function handleNewImplementation(event: NewImplementation): void {
  const id = event.address.toHexString()
  let entity = Pool.load(id)
  if (!entity) {
    entity = new Pool(id)
    const contract = PoolImplementation.bind(event.address)
    // entity.markets = contract.markets().map((m) => m.toHex())
  }
  entity.implementation = event.params.newImplementation
  entity.save()

}


//export function handleAddMarket(event: AddMarket): void {
  //const id = event.address.toHexString()
  //let entity = Pool.load(id)
  //if(!entity) {
    //entity = new Pool(id)
    //const contract = PoolImplementation.bind(event.address)
    //entity.markets = contract.markets().map((m) => m.toHex())
  //}
  //entity.markets.push(event.params.market.toHex())
  //entity.save()
//}

export function handleAddLiquidity(event: AddLiquidity): void {
  const account = event.transaction.from
  const lTokenId = event.params.lTokenId
  const bTokenId = event.params.underlying
  const id=`${lTokenId.toString()}_${bTokenId.toHexString()}`
  let entity = Liquidity.load(id)
  if(!entity) {
    entity = new Liquidity(id)
    entity.bTokenId=bTokenId
    entity.lTokenId=lTokenId
    entity.account = account
    entity.amount = BigInt.fromI32(0)
  }
  entity.amount = entity.amount.plus(event.params.amount)
  entity.newLiquidity = event.params.newLiquidity
  entity.timestamp = event.block.timestamp.toI32()
  entity.save()
}


export function handleRemoveLiquidity(event: RemoveLiquidity): void {
  const account = event.transaction.from
  const lTokenId = event.params.lTokenId
  const bTokenId = event.params.underlying
  const id=`${lTokenId.toString()}_${bTokenId.toHexString()}`
  let entity = Liquidity.load(id)
  if(!entity) {
    entity = new Liquidity(id)
    entity.bTokenId=bTokenId
    entity.lTokenId=lTokenId
    entity.account = account
    entity.amount = BigInt.fromI32(0)
  }
  entity.amount = entity.amount.minus(event.params.amount)
  entity.newLiquidity = event.params.newLiquidity
  entity.timestamp = event.block.timestamp.toI32()
  entity.save()
}
