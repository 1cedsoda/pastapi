import { Request, Response, Router } from "express";
import { z } from "zod";

export namespace UpdatePet {
  export const bodySchemas = {
    "application/json": z.object({
      id: z.number().int().optional(),
      name: z.string(),
      category: z
        .object({
          id: z.number().int().optional(),
          name: z.string().optional(),
        })
        .optional(),
      photoUrls: z.array(z.string()),
      tags: z
        .array(
          z.object({
            id: z.number().int().optional(),
            name: z.string().optional(),
          }),
        )
        .optional(),
      status: z.enum(["available", "pending", "sold"]).optional(),
    }),
    "application/x-www-form-urlencoded": z.object({
      id: z.number().int().optional(),
      name: z.string(),
      category: z
        .object({
          id: z.number().int().optional(),
          name: z.string().optional(),
        })
        .optional(),
      photoUrls: z.array(z.string()),
      tags: z
        .array(
          z.object({
            id: z.number().int().optional(),
            name: z.string().optional(),
          }),
        )
        .optional(),
      status: z.enum(["available", "pending", "sold"]).optional(),
    }),
  };
  export type ParsedBody = {
    "application/json":
      | z.infer<(typeof bodySchemas)["application/json"]>
      | undefined;
    "application/x-www-form-urlencoded":
      | z.infer<(typeof bodySchemas)["application/x-www-form-urlencoded"]>
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
        "application/x-www-form-urlencoded": undefined,
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

export namespace AddPet {
  export const bodySchemas = {
    "application/json": z.object({
      id: z.number().int().optional(),
      name: z.string(),
      category: z
        .object({
          id: z.number().int().optional(),
          name: z.string().optional(),
        })
        .optional(),
      photoUrls: z.array(z.string()),
      tags: z
        .array(
          z.object({
            id: z.number().int().optional(),
            name: z.string().optional(),
          }),
        )
        .optional(),
      status: z.enum(["available", "pending", "sold"]).optional(),
    }),
    "application/x-www-form-urlencoded": z.object({
      id: z.number().int().optional(),
      name: z.string(),
      category: z
        .object({
          id: z.number().int().optional(),
          name: z.string().optional(),
        })
        .optional(),
      photoUrls: z.array(z.string()),
      tags: z
        .array(
          z.object({
            id: z.number().int().optional(),
            name: z.string().optional(),
          }),
        )
        .optional(),
      status: z.enum(["available", "pending", "sold"]).optional(),
    }),
  };
  export type ParsedBody = {
    "application/json":
      | z.infer<(typeof bodySchemas)["application/json"]>
      | undefined;
    "application/x-www-form-urlencoded":
      | z.infer<(typeof bodySchemas)["application/x-www-form-urlencoded"]>
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
        "application/x-www-form-urlencoded": undefined,
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

export namespace FindPetsByStatus {
  export const bodySchemas = {};
  export type ParsedBody = {};
  export type ParsedContentType = keyof ParsedBody;
  export const parameterSchemas = {
    status: z.enum(["available", "pending", "sold"]).default("available"),
  };
  export type ParsedParameters = {
    status: z.infer<(typeof parameterSchemas)["status"]> | undefined;
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
        status: undefined,
      },
    };

    return parsed;
  };
}

export namespace FindPetsByTags {
  export const bodySchemas = {};
  export type ParsedBody = {};
  export type ParsedContentType = keyof ParsedBody;
  export const parameterSchemas = {
    tags: z.array(z.string()),
  };
  export type ParsedParameters = {
    tags: z.infer<(typeof parameterSchemas)["tags"]> | undefined;
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
        tags: undefined,
      },
    };

    return parsed;
  };
}

export namespace GetPetById {
  export const bodySchemas = {};
  export type ParsedBody = {};
  export type ParsedContentType = keyof ParsedBody;
  export const parameterSchemas = {
    petId: z.number().int(),
  };
  export type ParsedParameters = {
    petId: z.infer<(typeof parameterSchemas)["petId"]> | undefined;
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
        petId: undefined,
      },
    };

    // parse petId
    const petIdParam = req.params["petId"];
    if (petIdParam === undefined) throw new Error("missing petId");
    parsed.parameters["petId"] = parameterSchemas["petId"]?.parse(petIdParam);

    return parsed;
  };
}

export namespace UpdatePetWithForm {
  export const bodySchemas = {};
  export type ParsedBody = {};
  export type ParsedContentType = keyof ParsedBody;
  export const parameterSchemas = {
    petId: z.number().int(),
    name: z.string(),
    status: z.string(),
  };
  export type ParsedParameters = {
    petId: z.infer<(typeof parameterSchemas)["petId"]> | undefined;
    name: z.infer<(typeof parameterSchemas)["name"]> | undefined;
    status: z.infer<(typeof parameterSchemas)["status"]> | undefined;
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
        petId: undefined,
        name: undefined,
        status: undefined,
      },
    };

    // parse petId
    const petIdParam = req.params["petId"];
    if (petIdParam === undefined) throw new Error("missing petId");
    parsed.parameters["petId"] = parameterSchemas["petId"]?.parse(petIdParam);

    return parsed;
  };
}

export namespace DeletePet {
  export const bodySchemas = {};
  export type ParsedBody = {};
  export type ParsedContentType = keyof ParsedBody;
  export const parameterSchemas = {
    api_key: z.string(),
    petId: z.number().int(),
  };
  export type ParsedParameters = {
    api_key: z.infer<(typeof parameterSchemas)["api_key"]> | undefined;
    petId: z.infer<(typeof parameterSchemas)["petId"]> | undefined;
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
        api_key: undefined,
        petId: undefined,
      },
    };

    // parse petId
    const petIdParam = req.params["petId"];
    if (petIdParam === undefined) throw new Error("missing petId");
    parsed.parameters["petId"] = parameterSchemas["petId"]?.parse(petIdParam);

    return parsed;
  };
}

export namespace UploadFile {
  export const bodySchemas = {};
  export type ParsedBody = {};
  export type ParsedContentType = keyof ParsedBody;
  export const parameterSchemas = {
    petId: z.number().int(),
    additionalMetadata: z.string(),
  };
  export type ParsedParameters = {
    petId: z.infer<(typeof parameterSchemas)["petId"]> | undefined;
    additionalMetadata:
      | z.infer<(typeof parameterSchemas)["additionalMetadata"]>
      | undefined;
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
        petId: undefined,
        additionalMetadata: undefined,
      },
    };

    // parse petId
    const petIdParam = req.params["petId"];
    if (petIdParam === undefined) throw new Error("missing petId");
    parsed.parameters["petId"] = parameterSchemas["petId"]?.parse(petIdParam);

    return parsed;
  };
}

export namespace GetInventory {
  export const bodySchemas = {};
  export type ParsedBody = {};
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
      body: {},
      parameters: {},
    };

    return parsed;
  };
}

export namespace PlaceOrder {
  export const bodySchemas = {
    "application/json": z.object({
      id: z.number().int().optional(),
      petId: z.number().int().optional(),
      quantity: z.number().int().optional(),
      shipDate: z.string().datetime().optional(),
      status: z.enum(["placed", "approved", "delivered"]).optional(),
      complete: z.boolean().optional(),
    }),
    "application/x-www-form-urlencoded": z.object({
      id: z.number().int().optional(),
      petId: z.number().int().optional(),
      quantity: z.number().int().optional(),
      shipDate: z.string().datetime().optional(),
      status: z.enum(["placed", "approved", "delivered"]).optional(),
      complete: z.boolean().optional(),
    }),
  };
  export type ParsedBody = {
    "application/json":
      | z.infer<(typeof bodySchemas)["application/json"]>
      | undefined;
    "application/x-www-form-urlencoded":
      | z.infer<(typeof bodySchemas)["application/x-www-form-urlencoded"]>
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
        "application/x-www-form-urlencoded": undefined,
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

export namespace GetOrderById {
  export const bodySchemas = {};
  export type ParsedBody = {};
  export type ParsedContentType = keyof ParsedBody;
  export const parameterSchemas = {
    orderId: z.number().int(),
  };
  export type ParsedParameters = {
    orderId: z.infer<(typeof parameterSchemas)["orderId"]> | undefined;
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
        orderId: undefined,
      },
    };

    // parse orderId
    const orderIdParam = req.params["orderId"];
    if (orderIdParam === undefined) throw new Error("missing orderId");
    parsed.parameters["orderId"] =
      parameterSchemas["orderId"]?.parse(orderIdParam);

    return parsed;
  };
}

export namespace DeleteOrder {
  export const bodySchemas = {};
  export type ParsedBody = {};
  export type ParsedContentType = keyof ParsedBody;
  export const parameterSchemas = {
    orderId: z.number().int(),
  };
  export type ParsedParameters = {
    orderId: z.infer<(typeof parameterSchemas)["orderId"]> | undefined;
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
        orderId: undefined,
      },
    };

    // parse orderId
    const orderIdParam = req.params["orderId"];
    if (orderIdParam === undefined) throw new Error("missing orderId");
    parsed.parameters["orderId"] =
      parameterSchemas["orderId"]?.parse(orderIdParam);

    return parsed;
  };
}

export namespace CreateUser {
  export const bodySchemas = {
    "application/json": z.object({
      id: z.number().int().optional(),
      username: z.string().optional(),
      firstName: z.string().optional(),
      lastName: z.string().optional(),
      email: z.string().optional(),
      password: z.string().optional(),
      phone: z.string().optional(),
      userStatus: z.number().int().optional(),
    }),
    "application/x-www-form-urlencoded": z.object({
      id: z.number().int().optional(),
      username: z.string().optional(),
      firstName: z.string().optional(),
      lastName: z.string().optional(),
      email: z.string().optional(),
      password: z.string().optional(),
      phone: z.string().optional(),
      userStatus: z.number().int().optional(),
    }),
  };
  export type ParsedBody = {
    "application/json":
      | z.infer<(typeof bodySchemas)["application/json"]>
      | undefined;
    "application/x-www-form-urlencoded":
      | z.infer<(typeof bodySchemas)["application/x-www-form-urlencoded"]>
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
        "application/x-www-form-urlencoded": undefined,
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

export namespace CreateUsersWithListInput {
  export const bodySchemas = {
    "application/json": z.array(
      z.object({
        id: z.number().int().optional(),
        username: z.string().optional(),
        firstName: z.string().optional(),
        lastName: z.string().optional(),
        email: z.string().optional(),
        password: z.string().optional(),
        phone: z.string().optional(),
        userStatus: z.number().int().optional(),
      }),
    ),
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

export namespace LoginUser {
  export const bodySchemas = {};
  export type ParsedBody = {};
  export type ParsedContentType = keyof ParsedBody;
  export const parameterSchemas = {
    username: z.string(),
    password: z.string(),
  };
  export type ParsedParameters = {
    username: z.infer<(typeof parameterSchemas)["username"]> | undefined;
    password: z.infer<(typeof parameterSchemas)["password"]> | undefined;
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
        username: undefined,
        password: undefined,
      },
    };

    return parsed;
  };
}

export namespace LogoutUser {
  export const bodySchemas = {};
  export type ParsedBody = {};
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
      body: {},
      parameters: {},
    };

    return parsed;
  };
}

export namespace GetUserByName {
  export const bodySchemas = {};
  export type ParsedBody = {};
  export type ParsedContentType = keyof ParsedBody;
  export const parameterSchemas = {
    username: z.string(),
  };
  export type ParsedParameters = {
    username: z.infer<(typeof parameterSchemas)["username"]> | undefined;
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
        username: undefined,
      },
    };

    // parse username
    const usernameParam = req.params["username"];
    if (usernameParam === undefined) throw new Error("missing username");
    parsed.parameters["username"] =
      parameterSchemas["username"]?.parse(usernameParam);

    return parsed;
  };
}

export namespace UpdateUser {
  export const bodySchemas = {
    "application/json": z.object({
      id: z.number().int().optional(),
      username: z.string().optional(),
      firstName: z.string().optional(),
      lastName: z.string().optional(),
      email: z.string().optional(),
      password: z.string().optional(),
      phone: z.string().optional(),
      userStatus: z.number().int().optional(),
    }),
    "application/x-www-form-urlencoded": z.object({
      id: z.number().int().optional(),
      username: z.string().optional(),
      firstName: z.string().optional(),
      lastName: z.string().optional(),
      email: z.string().optional(),
      password: z.string().optional(),
      phone: z.string().optional(),
      userStatus: z.number().int().optional(),
    }),
  };
  export type ParsedBody = {
    "application/json":
      | z.infer<(typeof bodySchemas)["application/json"]>
      | undefined;
    "application/x-www-form-urlencoded":
      | z.infer<(typeof bodySchemas)["application/x-www-form-urlencoded"]>
      | undefined;
  };
  export type ParsedContentType = keyof ParsedBody;
  export const parameterSchemas = {
    username: z.string(),
  };
  export type ParsedParameters = {
    username: z.infer<(typeof parameterSchemas)["username"]> | undefined;
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
      body: {
        "application/json": undefined,
        "application/x-www-form-urlencoded": undefined,
      },
      parameters: {
        username: undefined,
      },
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

    // parse username
    const usernameParam = req.params["username"];
    if (usernameParam === undefined) throw new Error("missing username");
    parsed.parameters["username"] =
      parameterSchemas["username"]?.parse(usernameParam);

    return parsed;
  };
}

export namespace DeleteUser {
  export const bodySchemas = {};
  export type ParsedBody = {};
  export type ParsedContentType = keyof ParsedBody;
  export const parameterSchemas = {
    username: z.string(),
  };
  export type ParsedParameters = {
    username: z.infer<(typeof parameterSchemas)["username"]> | undefined;
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
        username: undefined,
      },
    };

    // parse username
    const usernameParam = req.params["username"];
    if (usernameParam === undefined) throw new Error("missing username");
    parsed.parameters["username"] =
      parameterSchemas["username"]?.parse(usernameParam);

    return parsed;
  };
}

export type PastapiHandlers = {
  updatePet: UpdatePet.Handler | undefined;
  addPet: AddPet.Handler | undefined;
  findPetsByStatus: FindPetsByStatus.Handler | undefined;
  findPetsByTags: FindPetsByTags.Handler | undefined;
  getPetById: GetPetById.Handler | undefined;
  updatePetWithForm: UpdatePetWithForm.Handler | undefined;
  deletePet: DeletePet.Handler | undefined;
  uploadFile: UploadFile.Handler | undefined;
  getInventory: GetInventory.Handler | undefined;
  placeOrder: PlaceOrder.Handler | undefined;
  getOrderById: GetOrderById.Handler | undefined;
  deleteOrder: DeleteOrder.Handler | undefined;
  createUser: CreateUser.Handler | undefined;
  createUsersWithListInput: CreateUsersWithListInput.Handler | undefined;
  loginUser: LoginUser.Handler | undefined;
  logoutUser: LogoutUser.Handler | undefined;
  getUserByName: GetUserByName.Handler | undefined;
  updateUser: UpdateUser.Handler | undefined;
  deleteUser: DeleteUser.Handler | undefined;
};

export function createRouter(handlers: PastapiHandlers): Router {
  const router = Router();

  if (handlers?.updatePet) {
    router.put("/pet", async (req: Request, res: Response) => {
      const parsed = UpdatePet.parse(req);
      handlers.updatePet!(req, res, parsed);
    });
  }

  if (handlers?.addPet) {
    router.post("/pet", async (req: Request, res: Response) => {
      const parsed = AddPet.parse(req);
      handlers.addPet!(req, res, parsed);
    });
  }

  if (handlers?.findPetsByStatus) {
    router.get("/pet/findByStatus", async (req: Request, res: Response) => {
      const parsed = FindPetsByStatus.parse(req);
      handlers.findPetsByStatus!(req, res, parsed);
    });
  }

  if (handlers?.findPetsByTags) {
    router.get("/pet/findByTags", async (req: Request, res: Response) => {
      const parsed = FindPetsByTags.parse(req);
      handlers.findPetsByTags!(req, res, parsed);
    });
  }

  if (handlers?.getPetById) {
    router.get("/pet/{petId}", async (req: Request, res: Response) => {
      const parsed = GetPetById.parse(req);
      handlers.getPetById!(req, res, parsed);
    });
  }

  if (handlers?.updatePetWithForm) {
    router.post("/pet/{petId}", async (req: Request, res: Response) => {
      const parsed = UpdatePetWithForm.parse(req);
      handlers.updatePetWithForm!(req, res, parsed);
    });
  }

  if (handlers?.deletePet) {
    router.delete("/pet/{petId}", async (req: Request, res: Response) => {
      const parsed = DeletePet.parse(req);
      handlers.deletePet!(req, res, parsed);
    });
  }

  if (handlers?.uploadFile) {
    router.post(
      "/pet/{petId}/uploadImage",
      async (req: Request, res: Response) => {
        const parsed = UploadFile.parse(req);
        handlers.uploadFile!(req, res, parsed);
      },
    );
  }

  if (handlers?.getInventory) {
    router.get("/store/inventory", async (req: Request, res: Response) => {
      const parsed = GetInventory.parse(req);
      handlers.getInventory!(req, res, parsed);
    });
  }

  if (handlers?.placeOrder) {
    router.post("/store/order", async (req: Request, res: Response) => {
      const parsed = PlaceOrder.parse(req);
      handlers.placeOrder!(req, res, parsed);
    });
  }

  if (handlers?.getOrderById) {
    router.get(
      "/store/order/{orderId}",
      async (req: Request, res: Response) => {
        const parsed = GetOrderById.parse(req);
        handlers.getOrderById!(req, res, parsed);
      },
    );
  }

  if (handlers?.deleteOrder) {
    router.delete(
      "/store/order/{orderId}",
      async (req: Request, res: Response) => {
        const parsed = DeleteOrder.parse(req);
        handlers.deleteOrder!(req, res, parsed);
      },
    );
  }

  if (handlers?.createUser) {
    router.post("/user", async (req: Request, res: Response) => {
      const parsed = CreateUser.parse(req);
      handlers.createUser!(req, res, parsed);
    });
  }

  if (handlers?.createUsersWithListInput) {
    router.post("/user/createWithList", async (req: Request, res: Response) => {
      const parsed = CreateUsersWithListInput.parse(req);
      handlers.createUsersWithListInput!(req, res, parsed);
    });
  }

  if (handlers?.loginUser) {
    router.get("/user/login", async (req: Request, res: Response) => {
      const parsed = LoginUser.parse(req);
      handlers.loginUser!(req, res, parsed);
    });
  }

  if (handlers?.logoutUser) {
    router.get("/user/logout", async (req: Request, res: Response) => {
      const parsed = LogoutUser.parse(req);
      handlers.logoutUser!(req, res, parsed);
    });
  }

  if (handlers?.getUserByName) {
    router.get("/user/{username}", async (req: Request, res: Response) => {
      const parsed = GetUserByName.parse(req);
      handlers.getUserByName!(req, res, parsed);
    });
  }

  if (handlers?.updateUser) {
    router.put("/user/{username}", async (req: Request, res: Response) => {
      const parsed = UpdateUser.parse(req);
      handlers.updateUser!(req, res, parsed);
    });
  }

  if (handlers?.deleteUser) {
    router.delete("/user/{username}", async (req: Request, res: Response) => {
      const parsed = DeleteUser.parse(req);
      handlers.deleteUser!(req, res, parsed);
    });
  }

  return router;
}
