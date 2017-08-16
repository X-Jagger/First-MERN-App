'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _mongodb = require('mongodb');

var _issue = require('./issue.js');

var _issue2 = _interopRequireDefault(_issue);

require('babel-polyfill');

var _sourceMapSupport = require('source-map-support');

var _sourceMapSupport2 = _interopRequireDefault(_sourceMapSupport);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express2.default)(); //实例化一个应用
app.use(_express2.default.static('static'));
// parse application/x-www-form-urlencoded 
app.use(_bodyParser2.default.urlencoded({
	extended: false
}));

// parse application/json 
app.use(_bodyParser2.default.json());

let db;
_mongodb.MongoClient.connect('mongodb://localhost/issuetracker').then(connection => {
	db = connection;
	app.listen(3000, () => {
		console.log('App started on port 3000');
	});
}).catch(error => {
	console.log('ERROR:', error);
});

app.get('/api/issues', (req, res) => {
	db.collection('issues').find().toArray().then(issues => {
		const metadata = {
			total_count: issues.length
		};
		res.json({
			_metadata: metadata,
			records: issues
		});
	}).catch(error => {
		console.log(error);
		res.status(500).json({
			message: `Internal Server Error : ${error}`
		});
	});
});

app.post('/api/issues', (req, res) => {
	const newIssue = req.body;
	newIssue.created = new Date();
	if (!newIssue.status) newIssue.status = 'New';
	const err = _issue2.default.validateIssue(newIssue);
	if (err) {
		res.status(422).json({
			message: `Invalid request: ${err}`
		});
		return;
	}
	db.collection('issues').insertOne(newIssue).then(result =>
	//下面是自己定义_id,自己传递回这个对象
	// result.ops[0]._id = 1;
	// console.log(result.ops[0]);
	// return result.ops[0];

	db.collection('issues').find({
		_id: result.insertedId
	}).limit(1).next() //limit(1)作用是啥
	).then(newIssue => {
		res.json(newIssue);
	}).catch(error => {
		console.log(error);
		res.status(500).json({
			message: `Internal Server Error: ${error}`
		});
	});
});
//# sourceMappingURL=server.js.map