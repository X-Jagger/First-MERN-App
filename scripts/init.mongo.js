db = new Mongo().getDB('issuetracker');
db.issues.remove({});
db.issues.insert([{
	status: 'Open',
	owner: 'Ravan',
	created: new Date('2017-08-15'),
	effort: 6,
	completionDate: undefined,
	title: 'Error inn console when clicking Add',
}, {
	status: 'Assigned',
	owner: 'Eddie',
	created: new Date('2017-08-16'),
	effort: 15,
	completionDate: new Date('2017-08-30'),
	title: 'Missing bottom border on panel',
}])
db.issues.createIndex({
	owner: 1
});
db.issues.createIndex({
	status: 1
});
db.issues.createIndex({
	created: 1
});