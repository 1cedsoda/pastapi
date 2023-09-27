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
  getUser: GetUser.Handler | undefined;
  postUser: PostUser.Handler | undefined;
  getUserId: GetUserId.Handler | undefined;
};

export function createRouter(handlers: PastapiHandlers): Router {
  const router = Router();

  if (handlers?.getUser) {
    router.get("/user", async (req: Request, res: Response) => {
      const parsed = GetUser.parse(req);
      handlers.getUser!(req, res, parsed);
    });
  }

  if (handlers?.postUser) {
    router.post("/user", async (req: Request, res: Response) => {
      const parsed = PostUser.parse(req);
      handlers.postUser!(req, res, parsed);
    });
  }

  if (handlers?.getUserId) {
    router.get("/user/{id}", async (req: Request, res: Response) => {
      const parsed = GetUserId.parse(req);
      handlers.getUserId!(req, res, parsed);
    });
  }

  return router;
}
