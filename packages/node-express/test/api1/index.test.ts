import { expect } from "chai";
import { describe, it } from "mocha";
import { generate } from "../generate";
import * as api from "./gen/api";

describe("api1", async () => {
  await generate("test/api1");

  it("test test", () => {
    expect(1).to.equal(1);
  });

  // describe("generated code", () => {
  //   it("createPastapiRouter should be a function", () => {
  //     expect(api.createPastapiRouter).to.be.a("function");
  //   });
  // });
});
