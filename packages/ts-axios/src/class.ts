import { Operation } from "pastapi-core";
import { fuck } from "./helpers";

export const apiClass = (ast: Operation[]) => `
export class Client {
  public axiosInstance: AxiosInstance
  constructor (
    axiosInstance?: AxiosInstance,
  ) {
    this.axiosInstance = axiosInstance ?? axios.create()
  }

  ${ast.flatMap(operationMethods).join("\n")}
}
`;

const operationMethods = (o: Operation) => [operationMethod(o), operationMethodSafe(o)];

const operationMethod = (o: Operation) => {
  return `
  public async ${o.operationId}(vars: ${
    o.requestBodies.length == 1
      ? `Omit<${fuck(o.operationId)}.Variables, "contentType">`
      : `${fuck(o.operationId)}.Variables`
  }, config?: AxiosRequestConfig<${
    o.requestBodies.length > 0 ? `Pick<${fuck(o.operationId)}.RequestBody, "body">` : `undefined`
  }>) {
    return ${fuck(o.operationId)}.request(this.axiosInstance, ${
      o.requestBodies.length == 1 ? `{"contentType": "${o.requestBodies[0].applicationType}", ...vars}` : `vars`
    }, config)
    }
  `;
};

const operationMethodSafe = (o: Operation) => {
  return `
  public async ${o.operationId}Safe(vars: ${
    o.requestBodies.length == 1
      ? `Omit<${fuck(o.operationId)}.Variables, "contentType">`
      : `${fuck(o.operationId)}.Variables`
  }, config?: AxiosRequestConfig<${
    o.requestBodies.length > 0 ? `Pick<${fuck(o.operationId)}.RequestBody, "body">` : `undefined`
  }>) {
    return ${fuck(o.operationId)}.requestSafe(this.axiosInstance, ${
      o.requestBodies.length == 1 ? `{"contentType": "${o.requestBodies[0].applicationType}", ...vars}` : `vars`
    }, config)
    }
  `;
};
