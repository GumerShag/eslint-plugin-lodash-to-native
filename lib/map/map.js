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

        function isLodashFunctionCall(node) {
            return node.object.name === '_' && node.object.property === 'map';
        }

        function hasTwoArguments(node) {
            return node.arguments.length === 2;
        }

        return {
            ExpressionStatement(node) {
                if (node.expression.type === 'CallExpression') {
                    const callExpressionNode = node.expression;
                    if (isLodashFunctionCall(callExpressionNode) && hasTwoArguments(callExpressionNode)) {
                        const errorReport = getLodashMapIsUsedWithArrayReport(callExpressionNode);
                        const sourceCode = context.getSourceCode();
                        const collection = sourceCode.getText(node.arguments[0]);
                        const callback = sourceCode.getText(node.arguments[1]);

                        if (isFirstArgumetObject(callExpressionNode)) {
                            return;
                        } else if (isFirstArgumentArray(callExpressionNode)) {
                            errorReport.fix = function (fixer) {
                                return fixer.replaceText(node, `${collection}.map(${callback})`)
                            }
                        } else {
                            errorReport.fix = function (fixer) {
                                return fixer.replaceText(callExpressionNode,
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
