import { describe, it } from "mocha";
import { generate } from "../generate";
import * as api from "./gen/api";

describe("petstore", async () => {
  await generate("test/petstore");
});
