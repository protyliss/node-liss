const ngPromptSelectProject = require("./select-project");

/**
 *
 * @param {{}} option
 * @param {boolean} option.multiple
 * @param {boolean} option.requireConfirm
 * @returns {Promise<Array.<string, {}>>}
 */
function ngPromptSelectApplication(option = {}) {
	return ngPromptSelectProject({
		...option,
		type: 'application'
	})
}

module.exports = ngPromptSelectApplication;
