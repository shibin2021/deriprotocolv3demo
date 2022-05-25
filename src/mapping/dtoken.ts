import {
  DToken,
  Transfer,
} from "../../generated/DToken/DToken"
import { Pool } from "../../generated/schema"
import { POOL_ADDRESS } from "./helper"

export function handleDTokenTransder(event: Transfer): void {
  const emitter = event.transaction.from.toHexString()
  const from = event.params.from.toHexString()
  const to = event.params.to.toHexString()
  const id = event.params.tokenId.toHexString()
  let entity = DToken.load(id)
  let pool = Pool.load(POOL_ADDRESS)
  if(!entity) {
    entity = new DToken(id)
  }
  entity.type = pool.PTokenAddress === emiter ? 'PToken' : 'LToken'
  entity.account = to
  entity.timestamp = event.block.timestamp.toI32()
  entity.save()
}
