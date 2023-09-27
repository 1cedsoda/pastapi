import { expect } from "chai";
import { before, describe, it } from "mocha";
import { generate } from "../generate";
import { createRouter } from "./gen/api";

describe("api1", () => {
  before(async () => {
    await generate("test/api1");
  });

  describe("generated code", () => {
    it("createRouter should be a function", async () => {
      expect(createRouter).to.be.a("function");
      expect(typeof createRouter).to.equal("function");
    });
  });
});
