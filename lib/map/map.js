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

    create(context) {
        function reportLodashMapIsUsedWithArray(node) {
            context.report({
                node,
                messageId: nativeFunctionUseMsg
                loc: {}
            })
        }

        return '';
    }
};