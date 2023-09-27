/*  ╔══════════════════════════════╗
/   ║ 🍝  Generated by Pastapi  🍝 ║
/   ║        Do not modify.        ║
/   ╚══════════════════════════════╝
*/

import { Request, Response, Router } from "express";
import { z } from "zod";

export namespace GetUser {
  export const bodySchemas = {};
  export type ParsedBody = {};
  export type ParsedContentType = keyof ParsedBody;
  export const parameterSchemas = {
    age: z.number().int(),
    name: z.string(),
    limit: z.number().int(),
    offset: z.number().int(),
  };
  export type ParsedParameters = {
    age: z.infer<(typeof parameterSchemas)["age"]> | undefined;
    name: z.infer<(typeof parameterSchemas)["name"]> | undefined;
    limit: z.infer<(typeof parameterSchemas)["limit"]> | undefined;
    offset: z.infer<(typeof parameterSchemas)["offset"]> | undefined;
  };
  export type Parsed = {
    bodyContentType: ParsedContentType | undefined;
    body: ParsedBody;
    parameters: ParsedParameters;
  };
  export type Handler = (
    req: Request,
    res: Response,
    parsed: Parsed,
  ) => Promise<void>;

  export const parse = (req: Request): Parsed => {
    const parsed: Parsed = {
      bodyContentType: undefined,
      body: {},
      parameters: {
        age: undefined,
        name: undefined,
        limit: undefined,
        offset: undefined,
      },
    };

    return parsed;
  };
}

export namespace PostUser {
  export const bodySchemas = {
    "application/json": z.object({
      id: z.number().int().optional(),
      name: z.string().optional(),
    }),
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
    bodyContentType: ParsedContentType | undefined;
    body: ParsedBody;
    parameters: ParsedParameters;
  };
  export type Handler = (
    req: Request,
    res: Response,
    parsed: Parsed,
  ) => Promise<void>;

  export const parse = (req: Request): Parsed => {
    const parsed: Parsed = {
      bodyContentType: undefined,
      body: {
        "application/json": undefined,
      },
      parameters: {},
    };

    // parse body
    const contentType = req.headers["content-type"];
    if (contentType && contentType in Object.keys(parsed.body)) {
      const parsedContentType = contentType as ParsedContentType;
      parsed.bodyContentType = parsedContentType;
      parsed.body[parsedContentType] = bodySchemas[parsedContentType]?.parse(
        req.body,
      );
    }

    return parsed;
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
    id: z.infer<(typeof parameterSchemas)["id"]> | undefined;
  };
  export type Parsed = {
    bodyContentType: ParsedContentType | undefined;
    body: ParsedBody;
    parameters: ParsedParameters;
  };
  export type Handler = (
    req: Request,
    res: Response,
    parsed: Parsed,
  ) => Promise<void>;

  export const parse = (req: Request): Parsed => {
    const parsed: Parsed = {
      bodyContentType: undefined,
      body: {},
      parameters: {
        id: undefined,
      },
    };

    // parse id
    const idParam = req.params["id"];
    if (idParam === undefined) throw new Error("missing id");
    parsed.parameters["id"] = parameterSchemas["id"]?.parse(idParam);

    return parsed;
  };
}

export type PastapiHandlers = {
  getUser?: GetUser.Handler | undefined;
  postUser?: PostUser.Handler | undefined;
  getUserId?: GetUserId.Handler | undefined;
};

export function createRouter(
  handlers: PastapiHandlers,
  logging?: boolean | undefined,
): Router {
  const router = Router();
  router.use((req, res, next) => {
    if (logging) {
      console.log(`${req.method} ${req.path}`);
    }
    next();
  });

  const getUserRouter = Router();
  getUserRouter.get("*", async (req: Request, res: Response) => {
    const parsed = GetUser.parse(req);
    handlers.getUser?.call({}, req, res, parsed);
  });
  getUserRouter.use("*", async (req, res, next) => {
    if (
      res.statusCode == 200 &&
      res.getHeader("content-type") === "application/json"
    ) {
      // TODO validate application/json 200 response
    } else {
      // response not handled
    }

    next();
  });
  router.use("/user", getUserRouter);

  const postUserRouter = Router();
  postUserRouter.post("*", async (req: Request, res: Response) => {
    const parsed = PostUser.parse(req);
    handlers.postUser?.call({}, req, res, parsed);
  });
  postUserRouter.use("*", async (req, res, next) => {
    if (
      res.statusCode == 200 &&
      res.getHeader("content-type") === "text/plain"
    ) {
      // TODO validate text/plain 200 response
    } else {
      // response not handled
    }

    next();
  });
  router.use("/user", postUserRouter);

  const getUserIdRouter = Router();
  getUserIdRouter.get("*", async (req: Request, res: Response) => {
    const parsed = GetUserId.parse(req);
    handlers.getUserId?.call({}, req, res, parsed);
  });
  getUserIdRouter.use("*", async (req, res, next) => {
    if (
      res.statusCode == 200 &&
      res.getHeader("content-type") === "application/json"
    ) {
      // TODO validate application/json 200 response
    } else {
      // response not handled
    }

    next();
  });
  router.use("/user/:id", getUserIdRouter);

  return router;
}