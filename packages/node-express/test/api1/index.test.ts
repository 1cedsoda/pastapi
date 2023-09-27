import { expect } from "chai";
import { before, describe, it } from "mocha";
import { generate } from "../generate";
import { createRouter } from "./gen/api";
import express, { Express } from "express";
import { get, post } from "../http";
import exp from "constants";

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
        let called = false;
        app.use(
          createRouter(
            {
              getUser: async (req, res, parsed) => {
                called = true;
                res.status(200).send("ok");
              },
            },
            true
          )
        );
        const res = await get("http://localhost:9999/user");
        expect(called).to.equal(true);
        expect(res.status).to.equal(200);
      });
    });

    describe("postUser", () => {
      it("should return 200", async () => {
        let called = false;
        app.use(
          createRouter(
            {
              postUser: async (req, res, parsed) => {
                called = true;
                res.status(200).send("ok");
              },
            },
            true
          )
        );
        const res = await post("http://localhost:9999/user");
        expect(called).to.equal(true);
        expect(res.status).to.equal(200);
      });
    });

    describe("getUserId", () => {
      it("should return 200", async () => {
        let called = false;
        app.use(
          createRouter(
            {
              getUserId: async (req, res, parsed) => {
                called = true;
                res.status(200).send("ok");
              },
            },
            true
          )
        );
        const res = await get("http://localhost:9999/user/123");
        expect(called).to.equal(true);
        expect(res.status).to.equal(200);
      });
    });

    afterEach(() => {
      server.close();
    });
  });
});
