import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, BigInt } from "@graphprotocol/graph-ts"
import { SiteAdded } from "../generated/schema"
import { SiteAdded as SiteAddedEvent } from "../generated/Contract/Contract"
import { handleSiteAdded } from "../src/contract"
import { createSiteAddedEvent } from "./contract-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let url = "Example string value"
    let owner = Address.fromString("0x0000000000000000000000000000000000000001")
    let newSiteAddedEvent = createSiteAddedEvent(url, owner)
    handleSiteAdded(newSiteAddedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("SiteAdded created and stored", () => {
    assert.entityCount("SiteAdded", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "SiteAdded",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "url",
      "Example string value"
    )
    assert.fieldEquals(
      "SiteAdded",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "owner",
      "0x0000000000000000000000000000000000000001"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
