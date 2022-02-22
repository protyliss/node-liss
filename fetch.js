const https = require('https');
const http  = require('http');

class FetchResponse {
	constructor(response, body) {
		this._response = response;
		this._body     = body;
	}

	get body() {
		return this._body;
	}

	get ok() {
		return Math.round(this._response.statusCode / 100) * 100 === 200
	}

	get status() {
		return this._response.statusCode;
	}

	get statusText() {
		return this._response.statusText;
	}

	text() {
		return Promise.resolve(this._body);
	}

	json() {
		return Promise.resolve(JSON.parse(this._body));
	}
}

function fetch(input, option = {}) {
	const url    = input;
	const scheme = url.startsWith('https') ? https : http;
	let method   = 'get';
	if (option.method) {
		method = option.method.toLowerCase();
		delete option.method;
	}

	return new Promise((resolve, reject) => {
		scheme[method.toLowerCase()](
			url,
			option,
			response => {
				let body = '';
				response.on('data', chunk => body += chunk);
				response.on('end', () => resolve(new FetchResponse(response, body)));
			}
		)
			.on('error', reject);
	});
}

module.exports = fetch;
