module.exports = {
    configs: {
        recommended: {
            plugins: ['lodash-to-native'],
            env: {
                browser: true,
                es6: true,
                node: true
            },
            rules: {
                'lodash-to-native/map': 'warn'
            }
        }
    },
    rules: {
        "map": require('./lib/map/map.js')
    }
};