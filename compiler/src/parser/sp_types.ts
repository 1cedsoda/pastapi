export interface SchemaInheritance {
  parent: string;
  include: InheritedField[];
  exclude?: InheritedField[];
}

export interface Schema {
  inherit: SchemaInheritance | undefined;
  fields: Field[];
}

export interface InheritedField {
  key: string;
}

export interface Field {
  key: string;
  type: string;
  rules: string[];
}

export interface SchemaParserResult {
  schemas: Schema[];
}
