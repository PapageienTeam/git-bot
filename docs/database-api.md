# Database API

## Usage
```js
const db = require('./db');
```

## Users
```js
await db.user.add({
	// Properties of entity: 'User'
});
```

## Issues
```js
await db.issue.add({
	// Properties of entity: 'Issue'
});
```

```js
await db.issue.addRel({
	// Properties of entity: 'user_issue_rel'
});
```
