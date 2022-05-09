import { BigInt } from "@graphprotocol/graph-ts"
import {
  PoolImplementation,
  NewAdmin,
  NewImplementation,
  AddMarket,
} from "../generated/PoolImplementation/PoolImplementation"
import { Pool } from "../generated/schema"

export function handleNewAdmin(event: NewAdmin): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let entity = Pool.load(event.transaction.to.toHex())

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (!entity) {
    entity = new Pool(event.transaction.from.toHex())
  }

  // Entity fields can be set based on event parameters
  entity.admin = event.params.newAdmin

  // Entities can be written to the store with `.save()`
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
  let entity = Pool.load(event.transaction.to.toHex())

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (!entity) {
    entity = new Pool(event.transaction.from.toHex())
  }

  // Entity fields can be set based on event parameters
  entity.implementation = event.params.newImplementation

  // Entities can be written to the store with `.save()`
  entity.save()
}

export function handleAddMarket(
  event: AddMarket
): void {
  let entity = Pool.load(event.transaction.to.toHex())

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (!entity) {
    entity = new Pool(event.transaction.from.toHex())
    entity.markets = []
  }

  // Entity fields can be set based on event parameters
  entity.markets.push(event.params.market)
  // Entities can be written to the store with `.save()`
  entity.save()
}

