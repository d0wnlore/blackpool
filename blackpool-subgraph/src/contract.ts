import {
  SiteAdded as SiteAddedEvent,
  TipReceived as TipReceivedEvent
} from "../generated/Contract/Contract"
import { SiteAdded, TipReceived } from "../generated/schema"

export function handleSiteAdded(event: SiteAddedEvent): void {
  let entity = new SiteAdded(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.url = event.params.url
  entity.owner = event.params.owner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleTipReceived(event: TipReceivedEvent): void {
  let entity = new TipReceived(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.siteIndex = event.params.siteIndex
  entity.amount = event.params.amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
