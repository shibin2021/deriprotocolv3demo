import { BigInt, ByteArray } from "@graphprotocol/graph-ts"
import {
  PoolImplementationAbi,
  NewAdmin,
  NewImplementation,
  AddLiquidity,
  RemoveLiquidity,
} from "../../generated/PoolImplementation/PoolImplementationAbi"
import {
  DTokenAbi,
} from "../../generated/PoolImplementation/DTokenAbi"
import { Pool, Liquidity, DToken } from "../../generated/schema"
import { getOrInitDToken, getOrInitPool } from "../helpers/initializers"

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
  pool.symbolManager = contract.symbolManager()
  pool.swapper = contract.swapper()
  pool.tokenB0 = contract.tokenB0()
  pool.tokenWETH = contract.tokenWETH()
  pool.vaultImplementation = contract.vaultImplementation()
  pool.protocolFeeCollector = contract.protocolFeeCollector()
  pool.implementation = event.params.newImplementation
  pool.save()
}

export function handlePoolAddLiquidity(event: AddLiquidity): void {
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


export function handlePoolRemoveLiquidity(event: RemoveLiquidity): void {
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

