export interface CollectedPaths {
  routePaths: string[];
  schemaPaths: string[];
}

export interface CollectorResult {
  schemas: Record<string, Schema>;
  routes: Record<string, Route>;
}

export type Route = any;

export type Schema = any;
