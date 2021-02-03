console.log('Angular!');

const PATH = require('path');
const [job] = process.argv.slice(2);

require('../core/prompts/select-job')([
	__dirname, PATH.join(__dirname, '../node')
], false);
