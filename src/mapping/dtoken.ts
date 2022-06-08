import { getOrInitOwnerTokenId } from "../helpers/initializers"
import { Transfer } from "../../generated/Pool/DTokenAbi"

export function handleDTokenTransder(event: Transfer): void {
  let ownerTokenId = getOrInitOwnerTokenId(event.params.tokenId.toString(), event)
  ownerTokenId.token = event.address.toHexString()
  ownerTokenId.tokenId = event.params.tokenId.toString()
  ownerTokenId.owner = event.params.to
  ownerTokenId.timestamp = event.block.timestamp.toI32()
  ownerTokenId.save()
}
