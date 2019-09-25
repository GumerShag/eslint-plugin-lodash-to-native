module.exports = {
    configs: {
        recommended: {
            plugins: ['lodash-to-native'],
            rules: {
                'lodash-to-native/map': 'warn'
            }
        }
    },
    rules: {
        "map": require('./lib/map')
    }
};