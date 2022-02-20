const PATH = require('path');
console.log('Typescript!');

require('../core/prompts/select-job')([
	__dirname,
	PATH.join(__dirname, '../node')
], false);
