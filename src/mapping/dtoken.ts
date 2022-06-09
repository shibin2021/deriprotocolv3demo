import { getOrInitOwnerTokenId } from "../helpers/initializers"
import { Transfer } from "../../generated/Pool/DTokenAbi"
import { ZERO_ADDRESS } from "../utils/constants"
import { Bytes } from "@graphprotocol/graph-ts"
import { zeroBD } from "../utils/converters"

export function handleDTokenTransder(event: Transfer): void {
  let ownerTokenId = getOrInitOwnerTokenId(event.params.tokenId.toString(), event.address)
  ownerTokenId.token = event.address.toHexString()
  ownerTokenId.tokenId = event.params.tokenId.toString()
  ownerTokenId.owner = event.params.to
  ownerTokenId.timestamp = event.block.timestamp.toI32()
  ownerTokenId.save()
}
