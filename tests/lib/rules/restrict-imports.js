const rule = require('../../../lib/rules/restrict-imports');
const RuleTester = require('eslint').RuleTester;

const ruleTester = new RuleTester();

ruleTester.run('restrict-imports', rule, {
    valid: [
        {
            code: 'import { x } from "./xyz"',
            parserOptions: { ecmaVersion: 6, sourceType: 'module' }
        }
    ],
    invalid: [
        {
            code: 'import { x } from "/xyz"',
            parserOptions: { ecmaVersion: 6, sourceType: 'module' },
            errors: [
                {
                    message: "Importing from '^/(.*)' is banned in '(.*)'"
                }
            ]
        }
    ]
});
