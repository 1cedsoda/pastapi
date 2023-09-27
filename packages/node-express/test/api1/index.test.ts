import { expect } from "chai";
import { before, describe, it } from "mocha";
import { generate } from "../generate";
import { createRouter, castStringForZod, single } from "./gen/api";
import express, { Express } from "express";
import { get, post } from "../http";
import { z } from "zod";
import bodyParser from "body-parser";

describe("api1", () => {
  before(async () => {
    await generate("test/api1");
  });

  describe("generated code", () => {
    it("createRouter should be a function", async () => {
      expect(createRouter).to.be.a("function");
      expect(typeof createRouter).to.equal("function");
    });

    describe("castStringForZod", () => {
      it("should cast a int", async () => {
        const schema = z.number().int();
        const casted = castStringForZod(schema, "123");
        expect(casted).to.be.a("number");
      });
      it("should cast a float", async () => {
        const schema = z.number();
        const casted = castStringForZod(schema, "123.456");
        expect(casted).to.be.a("number");
      });
      it("should cast a float without decimal", async () => {
        const schema = z.number();
        const casted = castStringForZod(schema, "123");
        expect(casted).to.be.a("number");
      });
      it("should cast a boolean", async () => {
        const schema = z.boolean();
        const casted = castStringForZod(schema, "true");
        expect(casted).to.be.a("boolean");
      });
      it("should not cast a string", async () => {
        const schema = z.string();
        const casted = castStringForZod(schema, "123");
        expect(casted).to.be.undefined;
      });
    });

    describe("single", () => {
      it("should give the first", async () => {
        const maybeMultiple: string[] | string = ["a", "b", "c"];
        const result = single(maybeMultiple);
        expect(result).to.equal("a");
      });
    });
  });

  describe("request", () => {
    let app: Express;
    let server: ReturnType<Express["listen"]>;

    beforeEach(async () => {
      app = express();
      app.use(bodyParser.json());
      server = app.listen(9999);
    });

    describe("getUser", () => {
      it("should return 200", async () => {
        let called = false;
        app.use(
          createRouter({
            getUser: async (req, res, parsed) => {
              called = true;
              res.status(200).send("ok");
            },
          })
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
          createRouter({
            postUser: async (req, res, parsed) => {
              called = true;
              res.status(200).send("ok");
            },
          })
        );
        const res = await post("http://localhost:9999/user", {
          headers: {
            "Content-Type": "application/json",
          },
          data: {
            name: "test",
            id: 123,
          },
        });
        expect(called).to.equal(true);
      });
    });

    describe("getUserId", () => {
      it("should return 200", async () => {
        let called = false;
        app.use(
          createRouter({
            getUserId: async (req, res, parsed) => {
              called = true;
              const { id } = parsed.parameters;
              expect(id).to.equal(123);
              res.status(200).send("ok");
            },
          })
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
