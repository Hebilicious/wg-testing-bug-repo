import { afterAll, beforeAll, describe, expect, test } from "vitest"
import fetch from "node-fetch"
import { createTestServer } from "../../api-wundergraph/src/generated/testing"

// rome-ignore lint/suspicious/noExplicitAny: <explanation>
const wg = createTestServer({ fetch: fetch as any, debug: true })
console.log("WG", wg)
beforeAll(() => wg.start())
afterAll(() => wg.stop())

describe("Test Dragons API", () => {
  test("dragons", async () => {
    const result = await wg.client().query({
      operationName: "Dragons"
    })
    expect(result.error).toBeFalsy()
    expect(result.data?.spacex_dragons?.length).toBe(2)
  })
})
