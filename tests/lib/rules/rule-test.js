const mapRule = require('../../../map/map.js');
const { RuleTester } = require('eslint');

let ruleTester = new RuleTester();
ruleTester.run("map", mapRule, {
    valid: [],
    invalid: [
        {
            code: "_.map([], function() {})",
            errors: [
                {
                    messageId: "Native Array.prototype.map should be used with arrays"
                }
            ]
        }
    ]
});