# openapi-lint README

![Visual Studio Marketplace Downloads](https://img.shields.io/visual-studio-marketplace/d/mermade.openapi-lint) ![Visual Studio Marketplace Stars](https://img.shields.io/visual-studio-marketplace/stars/mermade.openapi-lint)

This extension can be used to validate and [lint](https://en.wikipedia.org/wiki/Lint_(software)) OpenAPI 3.0.x documents, and convert between OpenAPI 2.0 and 3.0.0. It provides 11 Visual Studio Code commands:

* OpenAPI Validate - which fully validates your OpenAPI document against the [specification](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.2.md)
* OpenAPI Lint - which additionally applies a lightly-opinionated set of best-practices
* OpenAPI Resolve and Validate - which pulls in external `$ref`s before validating
* OpenAPI Resolve and Lint - which pulls in external `$ref`s before linting
* OpenAPI Resolve (Bundle) - which resolves external `$ref`s to a new window
* OpenAPI 2.0 to 3.0.0 (YAML) - which converts the current OpenAPI 2.0 document to 3.0.0 in YAML
* OpenAPI 2.0 to 3.0.0 (JSON) - which converts the current OpenAPI 2.0 document to 3.0.0 in JSON
* OpenAPI 2.0 to 3.0.0 (YAML/Resolved) - like the above but resolving external `$ref`s
* OpenAPI 2.0 to 3.0.0 (JSON/Resolved) - like the above but resolving external `$ref`s
* OpenAPI to JSON - which simply translates the current document to JSON
* OpenAPI to YAML - which simply translates the current document to YAML

The validator enforces semantic restrictions which cannot be expressed by the JSON Schema which drives the intellisense features, so it will pick up on many more errors.

The linter applies a lightly opinionated set of 'best practices' to your API document, making it complete and comprehensive, as opposed to merely minimally valid.

The default linter rules are documented [here](https://mermade.github.io/oas-kit/default-rules.html). The linter [DSL rules format](https://mermade.github.io/oas-kit/linter-rules.html) is also documented.

## Features

* Validation using [oas-validator](https://github.com/Mermade/oas-kit/tree/master/packages/oas-validator) from [OAS-Kit](https://mermade.github.io/oas-kit/)
* Linting using [oas-linter](https://github.com/Mermade/oas-kit/tree/master/packages/oas-linter) also from OAS-Kit
* Resolution using [oas-resolver](https://github.com/Mermade/oas-kit/tree/master/packages/oas-resolver) also from OAS-Kit
* Conversion using [swagger2openapi](https://github.com/Mermade/oas-kit/tree/master/packages/swagger2openapi) also from OAS-Kit
* OAS v3 intellisense for files named `*openapi.json`, `*openapi.yaml`, `*openapi.yml`, `*oas3.json`, `*oas3.yaml`, `*oas3.yml`
* OAS v2 intellisense for files named `*swagger.json`, `*swagger.yaml`, `*swagger.yml`, `*oas2.json`, `*oas2.yaml`, `*oas2.yml`
* Conversion between JSON and YAML
* Snippets (minimal valid openapi/swagger JSON and YAML documents)
* AsyncAPI v1.2.0 intellisense for files named `*asyncapi.json`, `*asyncapi.yaml`, `*asyncapi.yml`

## Coming soon

* More snippets
* Integration with [APIs.guru OpenAPI directory](https://github.com/apis-guru/openapi-directory)
* Integration with [APIs.guru AsyncAPI directory](https://github.com/apis-guru/asyncapi-directory)
* Extract default linter rules to new tab to allow saving as overrides

## Screenshots

![screenshot](./images/vscode-lint.png)

## Requirements

The extension should work as-is

## Extension Settings

No configuration is currently possible or needed.

## Known Issues

* Jump-to-error functionality not implemented yet (all show as line 1)
* No way to override/amend linter rules yet

## Credits

* Icon based upon [Icons8](http://icons8.com/)

## Release Notes

See the [CHANGELOG](./CHANGELOG.md)
