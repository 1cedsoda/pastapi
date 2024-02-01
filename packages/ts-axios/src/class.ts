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

  ${ast.map(operationMethod).join("\n")}
}
`;

const operationMethod = (o: Operation) => {
  return `
  public async ${o.operationId}(variables: ${fuck(o.operationId)}.Variables, config?: AxiosRequestConfig<${
    o.requestBodies.length > 0 ? `Pick<${fuck(o.operationId)}.RequestBody, "body">` : `undefined`
  }>) {
    return ${fuck(o.operationId)}.request(this.axiosInstance, variables, config)
    }
  `;
};
