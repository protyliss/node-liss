const PATH = require('path');

const {heading, box} = require('../decorate.js');
const [job]          = process.argv.slice(2);

console.log(box`Angular!`);

require('../core/prompts/select-job')([
	__dirname, PATH.join(__dirname, '../node')
], false);
