"use strict";
module.exports = {
    meta: {
        type: "suggestion",
        docs: {
            description: "Changes lodash _map function used with array to native Array.prototype.map",
            category: "ECMAScript 6",
            recommended: false,
            url: "https://github.com/GumerShag/eslint-plugin-lodash-to-native"
        },

        schema: {},
        fixable: "code",
        messages: {
            nativeFunctionUseMsg: "Native Array.prototype.map should be used with arrays"
        }
    },

    create: function(context) {
        function getLodashMapIsUsedWithArrayReport(node) {
            return {
                node,
                messageId: 'nativeFunctionUseMsg'
            };
        }

        function isFirstArgumetObject(node) {
            return node.arguments[0].type === 'ObjectExpression'
        }

        function isFirstArgumentArray(node) {
            return node.arguments[0].type === 'ArrayExpression';
        }

        function hasTwoArguments(node) {
            return node.arguments.length === 2;
        }

        return {
            'CallExpression[callee.object.name="_"][callee.property.name="map"]'(node) {
                if (node.type === 'CallExpression') {
                    if (hasTwoArguments(node)) {
                        const errorReport = getLodashMapIsUsedWithArrayReport(node);
                        const sourceCode = context.getSourceCode();
                        const collection = sourceCode.getText(node.arguments[0]);
                        const callback = sourceCode.getText(node.arguments[1]);

                        if (isFirstArgumetObject(node)) {
                            return;
                        } else if (isFirstArgumentArray(node)) {
                            errorReport.fix = function (fixer) {
                                return fixer.replaceText(node, `${collection}.map(${callback})`)
                            }
                        } else {
                            errorReport.fix = function (fixer) {
                                return fixer.replaceText(node,
                                    `if (${collection} instanceof Array) {
                                            return ${collection}.map(${callback})    
                                        } else {
                                            return _.map(${collection}, ${callback})
                                        }`
                                )
                            }
                        }
                        context.report(errorReport);
                    }
                }
            }
        };
    }
};
