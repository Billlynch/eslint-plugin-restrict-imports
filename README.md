# eslint-plugin-restrict-imports
[![CircleCI](https://circleci.com/gh/Billlynch/eslint-plugin-restrict-imports.svg?style=svg)](https://circleci.com/gh/Billlynch/eslint-plugin-restrict-imports)

Eslint plugin to ban specified imports in specified directories

This is useful to ban not using a barrelled import in multi-package repositories.

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-restrict-imports`:

```
$ npm install eslint-plugin-restrict-imports --save-dev
```

## Usage

Add `restrict-imports` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": ["restrict-imports"]
}
```

Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "restrict-imports/restrict-imports": [
            "error",
            {
                "../../clientA(.*)": {
                    "locations": ["(.*)/clientB(.*)"],
                    "message": "Do not import client A in client B"
                },
                "(.*)/common/(.*)": {
                    "locations": ["(.*)/client(.*)"],
                    "message": "Use barrelled import '@common'"
                }
            }
        ]
    }
}
```

Rule configuration:

```json
[
    "error",
    {
        "../../clientA(.*)": {                              // regex for the import path to ban
            "locations": ["(.*)/clientB(.*)"],              // regex for the absoulte file names to enforce in
            "message": "Do not import client A in client B" // optional - customised error message
        }
    }
]
```

Default Rule configuration:

```json
[
    "error",
    {
        "/(.*)": {                // Ban absoulte imports
            "locations": ["(.*)"] // in all files
        }
    }
]
```

## Supported Rules

-   restrict-imports - Ban imports from a location in any directory.
