export interface Route {
  name: string;
  route: string;
  get: Method;
  post: Method;
  put: Method;
  delete: Method;
}

export interface Method {
  params: string;
  body: string;
  query: string;
  headers: string;
}
