export interface SchemaInheritance {
  parent: string;
  include: InheritedField[];
  exclude?: InheritedField[];
}

export interface Schema {
  name: string;
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
