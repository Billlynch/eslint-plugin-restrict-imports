module.exports = {
    meta: {
        type: 'suggestion',
        docs: {},
        schema: [
            {
                bannedImport: {
                    locations: ['filePaths'],
                    message: 'string',
                    fixedLocation: 'string'
                }
            }
        ]
    },

    create: function (context) {
        const filePath = context.getFilename();
        const options = context.options[0] || {
            '^/(.*)': {
                locations: ['(.*)']
            }
        };

        return {
            ImportDeclaration: (node) => {
                Object.entries(options).forEach(([bannedImport, config]) => {
                    const importLocationRegex = new RegExp(bannedImport);

                    if (importLocationRegex.test(node.source.value)) {
                        config.locations.forEach((fp) => {
                            const bannedLocationRegex = new RegExp(fp);

                            if (bannedLocationRegex.test(filePath)) {
                                context.report({
                                    message:
                                        config.message ||
                                        `Importing from '${bannedImport}' is banned in '${fp}'`,
                                    node
                                });
                            }
                        });
                    }
                });
            }
        };
    }
};
