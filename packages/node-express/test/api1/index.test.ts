import { expect } from "chai";
import { before, describe, it } from "mocha";
import { generate } from "../generate";
import { createRouter, tryAutoCastString, single } from "./gen/api";
import express, { Express } from "express";
import { get, post } from "../http";
import { z } from "zod";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

describe("api1", () => {
  before(async () => {
    await generate("test/api1");
  });

  describe("generated code", () => {
    it("createRouter should be a function", async () => {
      expect(createRouter).to.be.a("function");
      expect(typeof createRouter).to.equal("function");
    });

    describe("tryAutoCastString", () => {
      it("should cast a int", async () => {
        const schema = z.number().int();
        const casted = tryAutoCastString(schema, "123");
        expect(casted).to.be.a("number");
      });
      it("should cast a float", async () => {
        const schema = z.number();
        const casted = tryAutoCastString(schema, "123.456");
        expect(casted).to.be.a("number");
      });
      it("should cast a float without decimal", async () => {
        const schema = z.number();
        const casted = tryAutoCastString(schema, "123");
        expect(casted).to.be.a("number");
      });
      it("should cast a boolean", async () => {
        const schema = z.boolean();
        const casted = tryAutoCastString(schema, "true");
        expect(casted).to.be.a("boolean");
      });
      it("should not cast a string", async () => {
        const schema = z.string();
        const casted = tryAutoCastString(schema, "123");
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

    describe("getUser", () => {
      beforeEach(async () => {
        app = express();
        app.use(bodyParser.json());
        app.use(cookieParser());
        server = app.listen(9999);
      });
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
      afterEach(() => {
        server.close();
      });
    });

    describe("postUser", () => {
      beforeEach(async () => {
        app = express();
        app.use(bodyParser.json());
        app.use(cookieParser());
        server = app.listen(9999);
      });
      it("should return 200", async () => {
        app.use(
          createRouter({
            postUser: async (req, res, parsed) => {
              res.status(200).send("ok");
            },
          })
        );
        const res = await post(
          "http://localhost:9999/user",
          {
            name: "test",
            id: 123,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      });
      it("should return 422 when giving no Content-Type", async () => {
        app.use(
          createRouter({
            postUser: async (req, res, parsed) => {
              res.status(200).send("ok");
            },
          })
        );
        const res = await post(
          "http://localhost:9999/user",
          {
            name: "test",
            id: 123,
          },
          {
            headers: {
              "Content-Type": undefined,
            },
          }
        );
        expect(res.status).to.equal(422);
      });
      afterEach(() => {
        server.close();
      });
    });

    describe("getUserId", () => {
      beforeEach(async () => {
        app = express();
        app.use(bodyParser.json());
        app.use(cookieParser());
        server = app.listen(9999);
      });
      it("should return 200", async () => {
        app.use(
          createRouter({
            getUserId: async (req, res, parsed) => {
              const { id } = parsed.params;
              expect(id).to.equal(123);
              res.status(200).send("ok");
            },
          })
        );
        const res = await get("http://localhost:9999/user/123");
        expect(res.status).to.equal(200);
      });
      afterEach(() => {
        server.close();
      });
    });

    describe("getCookie", () => {
      beforeEach(async () => {
        app = express();
        app.use(cookieParser());
        server = app.listen(9999);
      });
      it("should return 200 when giving all cookies", async () => {
        app.use(
          createRouter({
            getCookie: async (req, res, parsed) => {
              const { myRequiredCookie, myOptionalCookie } = parsed.params;
              expect(myRequiredCookie).to.equal(1);
              expect(myOptionalCookie).to.equal("value2");
              res.status(200).send("ok");
            },
          })
        );
        const res = await get("http://localhost:9999/cookie", {
          headers: {
            Cookie: "MyRequiredCookie=1; MyOptionalCookie=value2",
          },
        });
        expect(res.status).to.equal(200);
      });

      it("should return 200 when giving only required cookie", async () => {
        app.use(
          createRouter({
            getCookie: async (req, res, parsed) => {
              const { myRequiredCookie, myOptionalCookie } = parsed.params;
              expect(myRequiredCookie).to.equal(1);
              expect(myOptionalCookie).to.equal(undefined);
              res.status(200).send("ok");
            },
          })
        );
        const res = await get("http://localhost:9999/cookie", {
          headers: {
            Cookie: "MyRequiredCookie=1",
          },
        });
        expect(res.status).to.equal(200);
      });

      it("should return 422 when no required cookies are given", async () => {
        app.use(
          createRouter({
            getCookie: async (req, res, parsed) => {
              res.status(200).send("ok");
            },
          })
        );
        const res = await get("http://localhost:9999/cookie", {});
        expect(res.status).to.equal(422);
      });

      afterEach(() => {
        server.close();
      });
    });

    describe("getHeader", () => {
      beforeEach(async () => {
        app = express();
        server = app.listen(9999);
      });
      it("should return 200 when giving all headers", async () => {
        app.use(
          createRouter({
            getHeader: async (req, res, parsed) => {
              const { xMyRequiredHeader, xMyOptionalHeader } = parsed.params;
              expect(xMyRequiredHeader).to.equal(1);
              expect(xMyOptionalHeader).to.equal("value2");
              res.status(200).send("ok");
            },
          })
        );
        const res = await get("http://localhost:9999/header", {
          headers: {
            "x-my-required-header": "1",
            "x-my-optional-header": "value2",
          },
        });
        expect(res.status).to.equal(200);
      });

      it("should return 200 when giving only required header", async () => {
        app.use(
          createRouter({
            getHeader: async (req, res, parsed) => {
              const { xMyRequiredHeader, xMyOptionalHeader } = parsed.params;
              expect(xMyRequiredHeader).to.equal(1);
              expect(xMyOptionalHeader).to.equal(undefined);
              res.status(200).send("ok");
            },
          })
        );
        const res = await get("http://localhost:9999/header", {
          headers: {
            "x-my-required-header": "1",
          },
        });
        expect(res.status).to.equal(200);
      });

      it("should return 422 when no required headers are given", async () => {
        app.use(
          createRouter({
            getHeader: async (req, res, parsed) => {
              res.status(200).send("ok");
            },
          })
        );
        const res = await get("http://localhost:9999/header", {});
        expect(res.status).to.equal(422);
      });

      afterEach(() => {
        server.close();
      });
    });

    describe("getQuery", () => {
      beforeEach(async () => {
        app = express();
        server = app.listen(9999);
      });
      it("should return 200 when giving all query params", async () => {
        app.use(
          createRouter({
            getQuery: async (req, res, parsed) => {
              const { a, b } = parsed.params;
              expect(a).to.equal(1);
              expect(b).to.equal("value2");
              res.status(200).send("ok");
            },
          })
        );
        const res = await get("http://localhost:9999/query?a=1&b=value2");
        expect(res.status).to.equal(200);
      });

      it("should return 200 when giving only required query params", async () => {
        app.use(
          createRouter({
            getQuery: async (req, res, parsed) => {
              const { a, b } = parsed.params;
              expect(a).to.equal(1);
              expect(b).to.equal(undefined);
              res.status(200).send("ok");
            },
          })
        );
        const res = await get("http://localhost:9999/query?a=1");
        expect(res.status).to.equal(200);
      });

      it("should return 422 when no required query params are given", async () => {
        app.use(
          createRouter({
            getQuery: async (req, res, parsed) => {
              res.status(200).send("ok");
            },
          })
        );
        const res = await get("http://localhost:9999/query", {});
        expect(res.status).to.equal(422);
      });

      afterEach(() => {
        server.close();
      });
    });
  });
});
