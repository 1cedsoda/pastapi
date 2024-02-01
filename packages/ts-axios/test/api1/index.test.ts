import { expect } from "chai";
import { before, describe, it } from "mocha";
import { generate } from "../generate";

describe("api1", () => {
  before(async () => {
    await generate("test/api1");
  });
  it("should generate", () => {
    expect(true).to.equal(true);
  });
});
