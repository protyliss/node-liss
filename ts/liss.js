const PATH           = require('path');
const {heading, box} = require('../decorate.js');

console.log(box`Typescript!`);

require('../core/prompts/select-job')([
	__dirname,
	PATH.join(__dirname, '../node')
], false);
