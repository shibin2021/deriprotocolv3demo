import { getOrInitOwnerTokenId } from "../helpers/initializers"
import { Transfer } from "../../generated/PoolImplementation/DTokenAbi"

export function handleDTokenTransder(event: Transfer): void {
  let ownerTokenId = getOrInitOwnerTokenId(event.params.tokenId.toString(), event)
  ownerTokenId.token = event.address.toHexString()
  ownerTokenId.tokenId = event.params.tokenId.toString()
  ownerTokenId.owner = event.params.to
  ownerTokenId.save()
}
