const {heading, box} = require('../decorate.js');

console.log(box`node.js!`);

require('../core/prompts/select-job')(__dirname);
