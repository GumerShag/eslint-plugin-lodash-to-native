const mapRule = require('../../../map/map.js');
const { RuleTester } = require('eslint');

let ruleTester = new RuleTester();
ruleTester.run("map-rule", {})