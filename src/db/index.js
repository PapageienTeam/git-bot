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

const db = module.exports = {
	rel_types: ['assigned', 'created', 'mentioned', 'subscribed'],
	issue_status_types: ['open', 'closed'],

	clearAll: async() => {
		await pool.query('DELETE FROM "User"');
		await pool.query('DELETE FROM "Issue"');
		await pool.query('DELETE FROM user_issue_rel');
	},

	user: {
		add: async({ github_login, slack_id }) => {
			validateString(github_login, 'user.github_login');
			validateString(slack_id, 'user.slack_id');
			await pool.query('INSERT INTO "User"(github_login, slack_id) VALUES($1, $2)', [github_login, slack_id]);
		}
	},

	issue: {
		add: async({
			github_id,
			status,
			title,
			url,

			assignee = null,
			creator = null
		}) => {
			validateInteger(github_id, 'issue.github_id');
			validateEnum(status, 1, 'issue.status');
			validateString(title, 'issue.title');
			validateString(url, 'issue.url');
			await pool.query('INSERT INTO "Issue"(github_id, status, title, url) VALUES($1, $2, $3, $4)', [github_id, status, title, url]);

			async function addRel(user_github_login, type) {
				let res = await pool.query('SELECT id FROM "User" WHERE github_login = $1', [user_github_login]);
				if (res.rows.length > 0) {
					let id = res.rows[0].id;
					let typeId = db.rel_types.indexOf(type);
					await pool.query('INSERT INTO user_issue_rel(user_id, issue_github_id, type) VALUES($1, $2, $3)', [id, github_id, typeId]);
				} else {
					console.warn(`No user entry found for github_login = ${user_github_login}`);
				}
			}
			await addRel(assignee, 'assigned');
			await addRel(creator, 'created');
		},

		listBySlackUserID: async(user_slack_id, filter = null) => {
			validateString(user_slack_id, 'user_slack_id');
			let userRes = await pool.query('SELECT github_id FROM "User" WHERE slack_id = $1', [user_slack_id]);
			if (userRes.rows.length > 0) {
				let user_github_id = res.rows[0].github_id;
				let res = await pool.query('SELECT status, title, url FROM "Issue" WHERE github_id = $1', [user_github_id]);
				let issues = [];
				for(let row of res.rows) {
					if (row.status === 0 /* open */) {
						issues.push({
							title: row.title,
							url: row.url
						});
					}
				}
				return issues;
			} else {
				console.warn(`No user entry found for slack_id = ${user_slack_id}`);
			}
		}
	}
};
