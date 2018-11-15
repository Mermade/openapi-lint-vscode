# openapi-lint README

This extension can be used to validate and [lint](https://en.wikipedia.org/wiki/Lint_(software)) OpenAPI 3.0.x documents, and convert between OpenAPI 2.0 and 3.0.0. It provides six Visual Studio Code commands:

* OpenAPI Validate - which fully validates your OpenAPI document against the [specification](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.1.md)
* OpenAPI Lint - which additionally applies a lightly-opinionated set of best-practices
* OpenAPI 2.0 to 3.0.0 (YAML) - which converts the current OpenAPI 2.0 document to 3.0.0 in YAML
* OpenAPI 2.0 to 3.0.0 (JSON) - which converts the current OpenAPI 2.0 document to 3.0.0 in JSON
* OpenAPI to JSON - which simply translates the current document to JSON
* OpenAPI to YAML - which simply translates the current document to YAML

The validator enforces restrictions which cannot be expressed by the JSON Schema which drives the intellisense features, so it will pick up on more errors.

The best documentation currently for the linter rules is that of [Speccy](http://speccy.io/rules/), which shares code with this project. The linter [rules format](https://mermade.github.io/oas-kit/linter-rules.html) is also documented.

## Features

* Validation using [oas-validator](https://github.com/Mermade/oas-kit/tree/master/packages/oas-validator) from [OAS-Kit](https://mermade.github.io/oas-kit/)
* Linting using [oas-linter](https://github.com/Mermade/oas-kit/tree/master/packages/oas-linter) also from OAS-Kit
* Conversion using [swagger2openapi](https://github.com/Mermade/oas-kit/tree/master/packages/swagger2openapi) also from OAS-Kit
* OAS v3 intellisense for files named `*openapi.json`, `*openapi.yaml`, `*openapi.yml`, `*oas3.json`, `*oas3.yaml`, `*oas3.yml`
* OAS v2 intellisense for files named `*swagger.json`, `*swagger.yaml`, `*swagger.yml`, `*oas2.json`, `*oas2.yaml`, `*oas2.yml`
* Conversion between JSON and YAML
* Snippets (minimal valid openapi/swagger JSON and YAML documents)

## Coming soon

* Validation, linting and conversion with external `$ref` resolution
* More snippets (minimal lintable JSON and YAML documents)
* Integration with [APIs.guru OpenAPI directory](https://github.com/apis-guru/openapi-directory)
* Extract default rules to new tab to allow saving as overrides

## Screenshots

![screenshot](./images/vscode-lint.png)

## Requirements

The extension should work as-is

## Extension Settings

No configuration is currently possible or needed.

## Known Issues

* Messages need better formatting
* Jump-to-error functionality not implemented yet
* No way to override/amend linter rules yet

## Credits

* Icon based upon [Icons8](http://icons8.com/)

## Release Notes

See also the CHANGELOG.md

### 0.x.x

Initial alpha releases of openapi-lint
