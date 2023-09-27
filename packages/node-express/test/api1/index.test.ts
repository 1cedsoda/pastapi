import { expect } from "chai";
import { before, describe, it } from "mocha";
import { generate } from "../generate";
import { createRouter } from "./gen/api";
import express, { Express } from "express";
import { get, post } from "../http";

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

  describe("request", () => {
    let app: Express;
    let server: ReturnType<Express["listen"]>;

    beforeEach(async () => {
      app = express();
      server = app.listen(9999);
    });

    describe("getUser", () => {
      it("should return 200", async () => {
        app.use(
          createRouter({
            getUser: async (req, res, parsed) => {
              res.status(200).send("ok");
            },
          })
        );
        const res = await get("http://localhost:9999/user");
        expect(res.status).to.equal(200);
      });
    });

    describe("postUser", () => {
      it("should return 200", async () => {
        app.use(
          createRouter({
            postUser: async (req, res, parsed) => {
              res.status(200).send("ok");
            },
          })
        );
        const res = await post("http://localhost:9999/user");
        expect(res.status).to.equal(200);
      });
    });

    afterEach(() => {
      server.close();
    });
  });
});
