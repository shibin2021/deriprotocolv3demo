import {
  Transfer,
} from "../../generated/DToken/DToken"
import { DToken, Pool } from "../../generated/schema"
import { POOL_ADDRESS } from "./helper"

export function handleDTokenTransder(event: Transfer): void {
  const emitter = event.transaction.from
  const from = event.params.from.toHexString()
  const to = event.params.to
  const id = event.params.tokenId.toString()
  let entity = DToken.load(id)
  let pool = Pool.load(POOL_ADDRESS)
  if(!entity) {
    entity = new DToken(id)
  }
  entity.type = pool.PTokenAddress === emitter ? 'PToken' : 'LToken'
  entity.account = to
  entity.timestamp = event.block.timestamp.toI32()
  entity.save()
}
