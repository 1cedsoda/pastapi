/*  ╔══════════════════════════════╗
/   ║ 🍝  Generated by Pastapi  🍝 ║
/   ║        Do not modify.        ║
/   ╚══════════════════════════════╝
/   
/   External Middleware Dependencies:
/   - body-parser to validate bodies
/   - cookie-parser to validate cookies
*/
import { Request, Response, Router } from "express";
import { z } from "zod";

export namespace GetUser {
  export const bodySchemas = {};
  export type ParsedBody = {};
  export type ParsedContentType = keyof ParsedBody;
  export const paramSchemas = {};
  export type ParamsParsed = {};
  export type Parsed = {
    contentType: undefined;
    body: ParsedBody;
    params: ParamsParsed;
  };
  export type Handler = (
    req: Request,
    res: Response,
    parsed: Parsed,
  ) => Promise<void>;

  export const parse = (req: Request): Parsed => {
    const contentType = undefined;

    const parsed: Parsed = {
      contentType,
      body: {},
      params: {},
    };

    return parsed;
  };

  export const createRouter = (handler: Handler | undefined): Router => {
    const router = Router({ mergeParams: true });
    router.use(async (req, res, next) => {
      let parsed: Parsed;
      try {
        parsed = parse(req);
      } catch (e) {
        if (e instanceof z.ZodError) res.status(422).send(e.issues);
        else res.status(500).send(e);
        return next();
      }
      if (handler !== undefined) handler(req, res, parsed);
      next();
    });
    return router;
  };
}

export namespace PostUser {
  export const bodySchemas = {
    "application/json": z.object({ id: z.number().int(), name: z.string() }),
  };
  export type ParsedBody = {
    "application/json":
      | z.infer<(typeof bodySchemas)["application/json"]>
      | undefined;
  };
  export type ParsedContentType = keyof ParsedBody;
  export const paramSchemas = {};
  export type ParamsParsed = {};
  export type Parsed = {
    contentType: ParsedContentType;
    body: ParsedBody;
    params: ParamsParsed;
  };
  export type Handler = (
    req: Request,
    res: Response,
    parsed: Parsed,
  ) => Promise<void>;

  export const parse = (req: Request): Parsed => {
    z.string().parse(req.headers["Content-Type"], {
      path: ["header", "Content-Type"],
    });
    const contentType = single(
      req.headers["Content-Type"],
    ) as ParsedContentType;

    const parsed: Parsed = {
      contentType,
      body: {
        "application/json":
          contentType === "application/json"
            ? bodySchemas["application/json"]?.parse(req.body.data, {
                path: ["body"],
              })
            : undefined,
      },
      params: {},
    };

    return parsed;
  };

  export const createRouter = (handler: Handler | undefined): Router => {
    const router = Router({ mergeParams: true });
    router.use(async (req, res, next) => {
      let parsed: Parsed;
      try {
        parsed = parse(req);
      } catch (e) {
        if (e instanceof z.ZodError) res.status(422).send(e.issues);
        else res.status(500).send(e);
        return next();
      }
      if (handler !== undefined) handler(req, res, parsed);
      next();
    });
    return router;
  };
}

export namespace GetUserId {
  export const bodySchemas = {};
  export type ParsedBody = {};
  export type ParsedContentType = keyof ParsedBody;
  export const paramSchemas = {
    id: z.number().int(),
  };
  export type ParamsParsed = {
    id: z.infer<(typeof paramSchemas)["id"]>;
  };
  export type Parsed = {
    contentType: undefined;
    body: ParsedBody;
    params: ParamsParsed;
  };
  export type Handler = (
    req: Request,
    res: Response,
    parsed: Parsed,
  ) => Promise<void>;

  export const parse = (req: Request): Parsed => {
    const contentType = undefined;

    const parsed: Parsed = {
      contentType,
      body: {},
      params: {
        id: paramSchemas.id?.parse(
          autoCastString(paramSchemas.id, req.params["id"]),
          { path: ["path", "id"] },
        ),
      },
    };

    return parsed;
  };

  export const createRouter = (handler: Handler | undefined): Router => {
    const router = Router({ mergeParams: true });
    router.use(async (req, res, next) => {
      let parsed: Parsed;
      try {
        parsed = parse(req);
      } catch (e) {
        if (e instanceof z.ZodError) res.status(422).send(e.issues);
        else res.status(500).send(e);
        return next();
      }
      if (handler !== undefined) handler(req, res, parsed);
      next();
    });
    return router;
  };
}

export namespace GetCookie {
  export const bodySchemas = {};
  export type ParsedBody = {};
  export type ParsedContentType = keyof ParsedBody;
  export const paramSchemas = {
    myRequiredCookie: z.number(),
    myOptionalCookie: z.string().optional(),
  };
  export type ParamsParsed = {
    myRequiredCookie: z.infer<(typeof paramSchemas)["myRequiredCookie"]>;
    myOptionalCookie: z.infer<(typeof paramSchemas)["myOptionalCookie"]>;
  };
  export type Parsed = {
    contentType: undefined;
    body: ParsedBody;
    params: ParamsParsed;
  };
  export type Handler = (
    req: Request,
    res: Response,
    parsed: Parsed,
  ) => Promise<void>;

  export const parse = (req: Request): Parsed => {
    const contentType = undefined;

    const parsed: Parsed = {
      contentType,
      body: {},
      params: {
        myRequiredCookie: paramSchemas.myRequiredCookie?.parse(
          autoCastString(
            paramSchemas.myRequiredCookie,
            req.cookies["MyRequiredCookie"],
          ),
          { path: ["cookie", "MyRequiredCookie"] },
        ),
        myOptionalCookie: paramSchemas.myOptionalCookie?.parse(
          autoCastString(
            paramSchemas.myOptionalCookie,
            req.cookies["MyOptionalCookie"],
          ),
          { path: ["cookie", "MyOptionalCookie"] },
        ),
      },
    };

    return parsed;
  };

  export const createRouter = (handler: Handler | undefined): Router => {
    const router = Router({ mergeParams: true });
    router.use(async (req, res, next) => {
      let parsed: Parsed;
      try {
        parsed = parse(req);
      } catch (e) {
        if (e instanceof z.ZodError) res.status(422).send(e.issues);
        else res.status(500).send(e);
        return next();
      }
      if (handler !== undefined) handler(req, res, parsed);
      next();
    });
    return router;
  };
}

export namespace GetHeader {
  export const bodySchemas = {};
  export type ParsedBody = {};
  export type ParsedContentType = keyof ParsedBody;
  export const paramSchemas = {
    xMyRequiredHeader: z.number(),
    xMyOptionalHeader: z.string().optional(),
  };
  export type ParamsParsed = {
    xMyRequiredHeader: z.infer<(typeof paramSchemas)["xMyRequiredHeader"]>;
    xMyOptionalHeader: z.infer<(typeof paramSchemas)["xMyOptionalHeader"]>;
  };
  export type Parsed = {
    contentType: undefined;
    body: ParsedBody;
    params: ParamsParsed;
  };
  export type Handler = (
    req: Request,
    res: Response,
    parsed: Parsed,
  ) => Promise<void>;

  export const parse = (req: Request): Parsed => {
    const contentType = undefined;

    const parsed: Parsed = {
      contentType,
      body: {},
      params: {
        xMyRequiredHeader: paramSchemas.xMyRequiredHeader?.parse(
          autoCastString(
            paramSchemas.xMyRequiredHeader,
            single(req.headers["x-my-required-header"]),
          ),
          { path: ["header", "x-my-required-header"] },
        ),
        xMyOptionalHeader: paramSchemas.xMyOptionalHeader?.parse(
          autoCastString(
            paramSchemas.xMyOptionalHeader,
            single(req.headers["x-my-optional-header"]),
          ),
          { path: ["header", "x-my-optional-header"] },
        ),
      },
    };

    return parsed;
  };

  export const createRouter = (handler: Handler | undefined): Router => {
    const router = Router({ mergeParams: true });
    router.use(async (req, res, next) => {
      let parsed: Parsed;
      try {
        parsed = parse(req);
      } catch (e) {
        if (e instanceof z.ZodError) res.status(422).send(e.issues);
        else res.status(500).send(e);
        return next();
      }
      if (handler !== undefined) handler(req, res, parsed);
      next();
    });
    return router;
  };
}

export namespace GetQuery {
  export const bodySchemas = {};
  export type ParsedBody = {};
  export type ParsedContentType = keyof ParsedBody;
  export const paramSchemas = {
    a: z.number(),
    b: z.string().optional(),
  };
  export type ParamsParsed = {
    a: z.infer<(typeof paramSchemas)["a"]>;
    b: z.infer<(typeof paramSchemas)["b"]>;
  };
  export type Parsed = {
    contentType: undefined;
    body: ParsedBody;
    params: ParamsParsed;
  };
  export type Handler = (
    req: Request,
    res: Response,
    parsed: Parsed,
  ) => Promise<void>;

  export const parse = (req: Request): Parsed => {
    const contentType = undefined;

    const parsed: Parsed = {
      contentType,
      body: {},
      params: {
        a: paramSchemas.a?.parse(
          autoCastQuery(paramSchemas.a, req.query["a"]),
          { path: ["query", "a"] },
        ),
        b: paramSchemas.b?.parse(
          autoCastQuery(paramSchemas.b, req.query["b"]),
          { path: ["query", "b"] },
        ),
      },
    };

    return parsed;
  };

  export const createRouter = (handler: Handler | undefined): Router => {
    const router = Router({ mergeParams: true });
    router.use(async (req, res, next) => {
      let parsed: Parsed;
      try {
        parsed = parse(req);
      } catch (e) {
        if (e instanceof z.ZodError) res.status(422).send(e.issues);
        else res.status(500).send(e);
        return next();
      }
      if (handler !== undefined) handler(req, res, parsed);
      next();
    });
    return router;
  };
}

export type PastapiHandlers = {
  getUser?: GetUser.Handler | undefined;
  postUser?: PostUser.Handler | undefined;
  getUserId?: GetUserId.Handler | undefined;
  getCookie?: GetCookie.Handler | undefined;
  getHeader?: GetHeader.Handler | undefined;
  getQuery?: GetQuery.Handler | undefined;
};

export function createRouter(handlers: PastapiHandlers): Router {
  const router = Router();

  router.get("/user", GetUser.createRouter(handlers.getUser));

  router.post("/user", PostUser.createRouter(handlers.postUser));

  router.get("/user/:id", GetUserId.createRouter(handlers.getUserId));

  router.get("/cookie", GetCookie.createRouter(handlers.getCookie));

  router.get("/header", GetHeader.createRouter(handlers.getHeader));

  router.get("/query", GetQuery.createRouter(handlers.getQuery));

  return router;
}

export function tryAutoCastString(
  schema: z.ZodTypeAny,
  value: string | undefined,
): any | undefined {
  if (value === undefined) {
    return undefined;
  }
  if (schema instanceof z.ZodNumber) {
    if (schema._def.checks.map((c) => c.kind).includes("int")) {
      const casted = parseInt(value);
      return !isNaN(casted) ? casted : undefined;
    } else {
      const casted = parseFloat(value);
      return !isNaN(casted) ? casted : undefined;
    }
  } else if ((schema as any) instanceof z.ZodBoolean) {
    if (value === "true") {
      return true;
    } else if (value === "false") {
      return false;
    } else {
      return undefined;
    }
  }
}

export function autoCastString(
  schema: z.ZodTypeAny,
  value: string | undefined,
): any {
  return tryAutoCastString(schema, value) ?? value;
}

export function autoCastQuery(schema: z.ZodTypeAny, value: any): any {
  if (typeof value === "string") {
    return autoCastString(schema, value);
  }
  return value as any;
}

export function single<T>(input: T | T[]): T {
  return Array.isArray(input) ? input[0] : input;
}

export function keysInclude<T extends object>(
  obj: T,
  key: keyof any,
): key is keyof T {
  return Object.keys(obj).indexOf(key as string) !== -1;
}
