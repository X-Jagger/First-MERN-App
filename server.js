const express = require('express'); // a function
const app = express(); //实例化一个应用
//use means mounts a middlewave
//express.static() generates a middlewave
//'static' is a parameter indicating the directory where all static files reside
const bodyParser = require('body-parser');

app.use(express.static('static'));
// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({
	extended: false
}))

// parse application/json 
app.use(bodyParser.json())

const issues = [{
	id: 1,
	status: 'Open',
	owner: 'Ravan',
	created: new Date('2016-08-15'),
	effort: 5,
	completionDate: undefined,
	title: 'Error in console when clicking Add',
}, {
	id: 2,
	status: 'Assigned',
	owner: 'Eddie',
	created: new Date('2016-08-16'),
	effort: 14,
	completionDate: new Date('2016-08-30'),
	title: 'Missing bottom border on panel',
}, ];
app.get('/api/issues', (req, res) => {
	const metadata = {
		total_count: issues.length
	};
	res.json({
		_metadata: metadata,
		records: issues
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


app.listen(3000, function() {
	console.log('App started on port 3000!!')
})