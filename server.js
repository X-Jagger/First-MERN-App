const express = require('express'); // a function
const MongoClient = require('mongodb').MongoClient;

const app = express(); //实例化一个应用
const bodyParser = require('body-parser');
app.use(express.static('static'));
// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({
	extended: false
}))

// parse application/json 
app.use(bodyParser.json())

let db;
MongoClient.connect('mongodb://localhost/issuetracker')
	.then(connection => {
		db = connection;
		app.listen(3000, () => {
			console.log('App started on port 3000');
		})
	})
	.catch(error => {
		console.log('ERROR:', error);
	})

app.get('/api/issues', (req, res) => {
	db.collection('issues').find().toArray().then(issues => {
		const metadata = {
			total_count: issues.length
		};
		res.json({
			_metadata: metadata,
			records: issues
		})
	}).catch(error => {
		console.log(error);
		res.status(500).json({
			message: `Internal Server Error : ${error}`
		});
	});

})

const validIssueStatus = {
	New: true,
	open: true,
	Assigned: true,
	Fixed: true,
	Verified: true,
	Closed: true,
}
const issueFieldType = {
	id: 'required',
	status: 'required',
	owner: 'required',
	effort: 'optional',
	created: 'required',
	completionDate: 'optional',
	title: 'required',
}

function validateIssue(issue) {
	for (const field in issueFieldType) {
		const type = issueFieldType[field];
		if (!type) {
			delete issue[field];
		} else if (type === 'required' && !issue[field]) {
			return `${field} is required`;
		}
	}
	if (!validIssueStatus[issue.status]) {
		return `${issue.status} is not a valid status.`;
	}
	return null;
}
app.post('/api/issues', (req, res) => {
	const newIssue = req.body;
	newIssue.id = issues.length + 1;
	newIssue.created = new Date();
	if (!newIssue.status) {
		newIssue.status = 'New';
	}
	const err = validateIssue(newIssue);
	if (err) {
		res.status(422).json({
			message: `Invalid request : ${err}`
		});
		return null;
	}
	issues.push(newIssue);
	res.json(newIssue); // = JSON.stringify() + res.send()

})