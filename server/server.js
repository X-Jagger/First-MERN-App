import express from 'express';
import bodyParser from 'body-parser';
import {
	MongoClient
} from 'mongodb';
import Issue from './issue.js';
import 'babel-polyfill';
import SourceMapSupport from 'source-map-support';
import path from 'path';

const app = express(); //实例化一个应用
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
	const filter = {
		$or: [{
			effort: {
				$exists: false
			}
		}, {}]
	};
	console.log("req.query :", req.query)
	if (req.query.status) filter.status = req.query.status;
	if (req.query.effort_lte || req.query.effort_gte)
		filter.$or[1] = {
			effort: {}
		};
	if (req.query.effort_lte) filter.$or[1].effort.$lte =
		parseInt(req.query.effort_lte, 10);
	if (req.query.effort_gte) filter.$or[1].effort.$gte =
		parseInt(req.query.effort_gte, 10);

	db.collection('issues').find(filter).toArray().then(issues => {
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

app.get('*', (req, res) => {
	res.sendFile(path.resolve('static/index.html'))
})

app.post('/api/issues', (req, res) => {
	const newIssue = req.body;
	newIssue.created = new Date();
	if (!newIssue.status)
		newIssue.status = 'New';
	const err = Issue.validateIssue(newIssue)
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