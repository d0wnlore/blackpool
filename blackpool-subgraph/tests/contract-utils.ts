import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import { SiteAdded, TipReceived } from "../generated/Contract/Contract"

export function createSiteAddedEvent(url: string, owner: Address): SiteAdded {
  let siteAddedEvent = changetype<SiteAdded>(newMockEvent())

  siteAddedEvent.parameters = new Array()

  siteAddedEvent.parameters.push(
    new ethereum.EventParam("url", ethereum.Value.fromString(url))
  )
  siteAddedEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )

  return siteAddedEvent
}

export function createTipReceivedEvent(
  siteIndex: BigInt,
  amount: BigInt
): TipReceived {
  let tipReceivedEvent = changetype<TipReceived>(newMockEvent())

  tipReceivedEvent.parameters = new Array()

  tipReceivedEvent.parameters.push(
    new ethereum.EventParam(
      "siteIndex",
      ethereum.Value.fromUnsignedBigInt(siteIndex)
    )
  )
  tipReceivedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return tipReceivedEvent
}
