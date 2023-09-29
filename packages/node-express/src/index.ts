import { Operation } from "pastapi-core";
import { operationNamespaces } from "./namespace";
import { router } from "./router";
import { handlerType } from "./handers";
import { boilerplate } from "./boilerplate";

export const generate = (ops: Operation[]): string => `
${buildHeader()}

import { Request, Response, Router } from "express";
import { z } from "zod";
${operationNamespaces(ops)}
${handlerType(ops)}
${router(ops)}
${boilerplate()}
`;

const buildHeader = () => `
/*  ╔══════════════════════════════╗
/   ║ 🍝  Generated by Pastapi  🍝 ║
/   ║        Do not modify.        ║
/   ╚══════════════════════════════╝
/   
/   External Middleware Dependencies:
/   - body-parser to validate bodies
/   - cookie-parser to validate cookies
*/`;
