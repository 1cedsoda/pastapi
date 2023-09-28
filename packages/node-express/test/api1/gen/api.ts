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
  export const parameterSchemas = {};
  export type ParsedParameters = {};
  export type Parsed = {
    contentType: ParsedContentType | undefined;
    body: ParsedBody;
    parameters: ParsedParameters;
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
      parameters: {},
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
        if (e instanceof z.ZodError) {
          res.status(422).send(e.issues);
        } else {
          res.status(500).send(e);
        }
        return next();
      }
      if (handler !== undefined) {
        handler(req, res, parsed);
      } else {
        res.status(501).send("Not Implemented");
      }
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
  export const parameterSchemas = {};
  export type ParsedParameters = {};
  export type Parsed = {
    contentType: ParsedContentType | undefined;
    body: ParsedBody;
    parameters: ParsedParameters;
  };
  export type Handler = (
    req: Request,
    res: Response,
    parsed: Parsed,
  ) => Promise<void>;

  export const parse = (req: Request): Parsed => {
    // parse body
    const _contentType = single(req.headers["Content-Type"]);
    const contentType =
      _contentType !== undefined && keysInclude(bodySchemas, _contentType)
        ? (_contentType as ParsedContentType)
        : undefined;

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
      parameters: {},
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
        if (e instanceof z.ZodError) {
          res.status(422).send(e.issues);
        } else {
          res.status(500).send(e);
        }
        return next();
      }
      if (handler !== undefined) {
        handler(req, res, parsed);
      } else {
        res.status(501).send("Not Implemented");
      }
      next();
    });
    return router;
  };
}

export namespace GetUserId {
  export const bodySchemas = {};
  export type ParsedBody = {};
  export type ParsedContentType = keyof ParsedBody;
  export const parameterSchemas = {
    id: z.number().int(),
  };
  export type ParsedParameters = {
    id: z.infer<(typeof parameterSchemas)["id"]>;
  };
  export type Parsed = {
    contentType: ParsedContentType | undefined;
    body: ParsedBody;
    parameters: ParsedParameters;
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
      parameters: {
        id: parameterSchemas.id?.parse(
          castStringForZod(parameterSchemas.id, req.params["id"]),
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
        if (e instanceof z.ZodError) {
          res.status(422).send(e.issues);
        } else {
          res.status(500).send(e);
        }
        return next();
      }
      if (handler !== undefined) {
        handler(req, res, parsed);
      } else {
        res.status(501).send("Not Implemented");
      }
      next();
    });
    return router;
  };
}

export namespace GetCookie {
  export const bodySchemas = {};
  export type ParsedBody = {};
  export type ParsedContentType = keyof ParsedBody;
  export const parameterSchemas = {
    myRequiredCookie: z.number(),
    myOptionalCookie: z.string().optional(),
  };
  export type ParsedParameters = {
    myRequiredCookie: z.infer<(typeof parameterSchemas)["myRequiredCookie"]>;
    myOptionalCookie: z.infer<(typeof parameterSchemas)["myOptionalCookie"]>;
  };
  export type Parsed = {
    contentType: ParsedContentType | undefined;
    body: ParsedBody;
    parameters: ParsedParameters;
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
      parameters: {
        myRequiredCookie: parameterSchemas.myRequiredCookie?.parse(
          castStringForZod(
            parameterSchemas.myRequiredCookie,
            req.cookies["MyRequiredCookie"],
          ),
          { path: ["cookie", "MyRequiredCookie"] },
        ),
        myOptionalCookie: parameterSchemas.myOptionalCookie?.parse(
          castStringForZod(
            parameterSchemas.myOptionalCookie,
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
        if (e instanceof z.ZodError) {
          res.status(422).send(e.issues);
        } else {
          res.status(500).send(e);
        }
        return next();
      }
      if (handler !== undefined) {
        handler(req, res, parsed);
      } else {
        res.status(501).send("Not Implemented");
      }
      next();
    });
    return router;
  };
}

export namespace GetHeader {
  export const bodySchemas = {};
  export type ParsedBody = {};
  export type ParsedContentType = keyof ParsedBody;
  export const parameterSchemas = {
    xMyRequiredHeader: z.number(),
    xMyOptionalHeader: z.string().optional(),
  };
  export type ParsedParameters = {
    xMyRequiredHeader: z.infer<(typeof parameterSchemas)["xMyRequiredHeader"]>;
    xMyOptionalHeader: z.infer<(typeof parameterSchemas)["xMyOptionalHeader"]>;
  };
  export type Parsed = {
    contentType: ParsedContentType | undefined;
    body: ParsedBody;
    parameters: ParsedParameters;
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
      parameters: {
        xMyRequiredHeader: parameterSchemas.xMyRequiredHeader?.parse(
          castStringForZod(
            parameterSchemas.xMyRequiredHeader,
            single(req.headers["x-my-required-header"]),
          ),
          { path: ["header", "x-my-required-header"] },
        ),
        xMyOptionalHeader: parameterSchemas.xMyOptionalHeader?.parse(
          castStringForZod(
            parameterSchemas.xMyOptionalHeader,
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
        if (e instanceof z.ZodError) {
          res.status(422).send(e.issues);
        } else {
          res.status(500).send(e);
        }
        return next();
      }
      if (handler !== undefined) {
        handler(req, res, parsed);
      } else {
        res.status(501).send("Not Implemented");
      }
      next();
    });
    return router;
  };
}

export namespace GetQuery {
  export const bodySchemas = {};
  export type ParsedBody = {};
  export type ParsedContentType = keyof ParsedBody;
  export const parameterSchemas = {
    a: z.number(),
    b: z.string().optional(),
  };
  export type ParsedParameters = {
    a: z.infer<(typeof parameterSchemas)["a"]>;
    b: z.infer<(typeof parameterSchemas)["b"]>;
  };
  export type Parsed = {
    contentType: ParsedContentType | undefined;
    body: ParsedBody;
    parameters: ParsedParameters;
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
      parameters: {
        a: parameterSchemas.a?.parse(
          castParsedQueryStringForZod(parameterSchemas.a, req.query["a"]),
          { path: ["query", "a"] },
        ),
        b: parameterSchemas.b?.parse(
          castParsedQueryStringForZod(parameterSchemas.b, req.query["b"]),
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
        if (e instanceof z.ZodError) {
          res.status(422).send(e.issues);
        } else {
          res.status(500).send(e);
        }
        return next();
      }
      if (handler !== undefined) {
        handler(req, res, parsed);
      } else {
        res.status(501).send("Not Implemented");
      }
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

export function tryCastStringForZod(
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

export function castStringForZod(
  schema: z.ZodTypeAny,
  value: string | undefined,
): any {
  return tryCastStringForZod(schema, value) ?? value;
}

export function castParsedQueryStringForZod(
  schema: z.ZodTypeAny,
  value: any,
): any {
  if (typeof value === "string") {
    return castStringForZod(schema, value);
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
