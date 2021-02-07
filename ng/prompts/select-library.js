const ngPromptSelectProject = require("./select-project");

/**
 *
 * @param {{}} option
 * @param {boolean} option.multiple
 * @param {boolean} option.requireConfirm
 * @returns {Promise<Array.<string, {}>>}
 */
function ngPromptSelectLibrary(option = {}) {
	return ngPromptSelectProject({
		...option,
		type: 'library'
	})
}

module.exports = ngPromptSelectLibrary;
