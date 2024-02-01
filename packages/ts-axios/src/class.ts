import { Operation } from "pastapi-core";
import { fuck } from "./helpers";

export const apiClass = (ast: Operation[]) => `
export class Api {
  public staticConfig: AxiosRequestConfig
  public dynamicConfig: (AxiosRequestConfig) => Promise<AxiosRequestConfig>
  constructor (
    staticConfig?: AxiosRequestConfig,
    dynamicConfig?: (AxiosRequestConfig) => Promise<AxiosRequestConfig>
  ) {
    this.staticConfig = staticConfig ?? {};
    this.dynamicConfig = dynamicConfig ?? (async (x: AxiosRequestConfig) => x);
  }

  private async applyStaticAndDynamicConfig(individualConfig?: AxiosRequestConfig) {
    return this.dynamicConfig({
      ...this.staticConfig,
      ...individualConfig
    })
  }
  ${ast.map(operationMethod).join("\n")}
}
`;

const operationMethod = (o: Operation) => {
  return `
  public async ${o.operationId}(variables: ${fuck(o.operationId)}.FetchVariables, config?: AxiosRequestConfig) {
    return ${fuck(o.operationId)}.fetch(variables, await this.applyStaticAndDynamicConfig(config))
    }
  `;
};
