'use strict';

const { Pool } = require('pg');
const pool = new Pool();

const validateString = (val, name) => {
	if (typeof val !== 'string')
		throw new TypeError(`${name} must be a string.`);
}

const validateInteger = (val, name) => {
	if (typeof val !== 'number')
		throw new TypeError(`${name} must be an integer.`);
};

const validateEnum = (val, name, max) => {
	if (typeof val !== 'number' || val > max)
		throw new TypeError(`${name} must be an integer in the range of [0..${max}].`);
};

module.exports = {
	user: {
		add: async({ github_login, slack_id }) => {
			validateString(github_login, 'user.github_login');
			validateString(slack_id, 'user.slack_id');
			await pool.query('INSERT INTO Users(github_login, slack_id) VALUES($1, $2)', [github_login, slack_id]);
		}
	},

	issue: {
		add: async({ github_id, status, title, url }) => {
			validateInteger(github_id, 'issue.github_id');
			validateEnum(status, 1, 'issue.status');
			validateString(title, 'issue.title');
			validateString(url, 'issue.url');
			await pool.query('INSERT INTO Issues(github_id, status, title, url) VALUES($1, $2, $3, $4)', [github_id, status, title, url]);
		},

		addRel: async({ user_id, issue_github_id, type }) => {
			validateInteger(user_id, 'rel.user_id');
			validateInteger(issue_github_id, 'rel.issue_github_id');
			validateEnum(type, 3, 'rel.type');
		}
	}
};
