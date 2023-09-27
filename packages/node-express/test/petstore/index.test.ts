import { expect } from "chai";
import { generate } from "../generate";

describe("petstore", () => {
  before(async () => {
    await generate("test/petstore");
  });
  it("should generate", () => {
    expect(true).to.equal(true);
  });
});
