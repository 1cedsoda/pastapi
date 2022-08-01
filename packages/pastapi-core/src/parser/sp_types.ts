import { inflate } from "zlib";

export interface SchemaInheritance {
  type: string;
  include: InheritedField[];
  exclude?: InheritedField[];
  typeModifiers: TypeModifiers;
  rules: string[];
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
  typeModifiers: TypeModifiers;
}

export interface TypeModifiers {
  nullable: boolean;
  list: boolean;
  listElementNullable: boolean;
}
