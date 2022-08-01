![pastapi](assets/card.png)
# pastapi

# API Definition Guide

## File Structure
- .yml files are together in a folder and not nested in directories
- .yml files starting with `schema` contain schemas
- .yml files starting with `route` contain routes
- schema files contain multiple schema declarations on the top level
- route files contain multiple route declarations on the top level

## Schema
- Schemas can have a name, defined by their key in the yml

Structure + Variables:
- `fields` can be undefined or **Field[]** (default: empty list)
- `inherit` can be undefined or **Inherit** (default: undefined)

### Field
Fields can be declared in different structures.

Structure:
- if this is a string "\*"
  -  `key` is "*"
  -  `type` is "*"
- if this is a string
  - `key` is this
- if this is an objects with one key
  - `key` is key
  - `type` is value
- if this is an object with multiple keys
  - `key` is value of key
  - `type` is value of type
  - `rules` is value of rules (list)
  
Variables:
- `key` is the name of the fields, can be "\*" for more arbitrary fields on the schema
- `type` is the type of the field, can be undefined, can be "\*" for arbitrary types (default: string)
- `rules` is a list of ruleKeys (default: empty)

Type modifiers:

When declaring the type it can include some special charactes to become different meanings
- if the `type` begins with `+`, the rule `required` is added
- if the `type` contains a `?[]` it's a list with nullable entries
- if the `type` contains a `[]` it's a list with non-nullable entries
- if the `type` ends with a `?` it's nullable

### Inherit
Structure:
 - if this is a string
   - `parent` is this
 - if this is an object
   - `parent` is value of parent
   - `include` is value of include 
   - `exclude` is value of exclude
 
Variables:
- `parent` is another schema name
- `include` is undefined or list of field keys of parent (default: ["*"]) (including "\*" inherits every field)
- `exclude` is undefined or list of field keys of parent (default: [])

## Route
- Routed can have a name, defined by their key in the yml

Variables:
- `path` is the relative url (elements starting with ":" will be interpreted as path params)
- `post` is undefined or *Method*
- `get` is undefined or *Method*
- `put` is undefined or *Method*
- `delete` is undefined or *Method*
  
### Method
a method declares the schemas used for each part of the request and response

Variables:
"\*" allows every content
if content does not match content type an exception is thrown

  - `params` is undefined or a schema name or "*" (undefined blocks every content)
  - `query` is undefined or a schema name or "*" (undefined blocks every content)
  - `body` is undefined or a schema name or filetype or nativetype, or "*" (undefined blocks every content)
  - `headers` is undefined or a schma name or "\*" (undefined blocks every content, default is "\*")
  - `res-body` is undefined or a schema name or filetype or nativetype, or "\*" (undefined blocks every content)
  - `res-headers` is undefined or a schma name or "\*" (undefined blocks every content, default is "\*")
