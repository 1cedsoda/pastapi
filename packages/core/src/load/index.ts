import YAML from "yaml";
import OASNormalize from "oas-normalize";
import { OpenAPI } from "openapi-types";

export async function loadJson(content: string) {
  return normalize(JSON.parse(content));
}

export async function loadYaml(content: string) {
  return normalize(YAML.parse(content));
}

async function normalize(json: object): Promise<OpenAPI.Document<{}>> {
  const oas = new OASNormalize(json);
  return oas.deref();
}
