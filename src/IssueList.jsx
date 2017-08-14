import IssueAdd from './IssueAdd.jsx';
import IssueFilter from './IssueFilter.jsx';

const IssueRow = ({issue}) => (
			<tr>
				<td>{issue._id}</td>
				<td>{issue.status}</td>
				<td>{issue.owner}</td>
				<td>{issue.created.toDateString()}</td>
				<td>{issue.effort}</td>
				<td>{issue.completionDate ? 
					issue.completionDate.toDateString() : ''}</td>
				<td>{issue.title}</td>

			</tr>	
			)
	

const IssueTable = ({issues}) => {
		console.log("test for rebuild by webpack")
		//issues为[]时,不会render IssueRow
		const issueRows = issues.map(
			issue => <IssueRow key={issue._id} issue={issue}/>)
		return (
			<table className="bordered-table">
				<thead>
					<tr>
						<th>Id</th>
						<th>Status</th>
						<th>Owner</th>
						<th>Created</th>
						<th>Effort</th>
						<th>Completion Date</th>
						<th>Title</th>
					</tr>
				</thead>
				<tbody>
					{issueRows}
				</tbody>
			</table>
			
			)
	}



export default class IssueList extends React.Component {
	constructor() {
		super();
		this.state = {
			issues:[]
		};
		this.loadData = this.loadData.bind(this);	
		 this.createIssue = this.createIssue.bind(this);
	} 

	createIssue(newIssue) {
			fetch('/api/issues',{
				method:'POST',
				headers:{'Content-Type':'application/json'},
				body:JSON.stringify(newIssue),
			})
			.then(response => {
				//console.log(response);
				//setTimeout(()=>response.json(),5000);
				//console.log(response.json());
				if(response.ok) {
					response.json()
			.then(updatedIssue => {
				console.log(updatedIssue);
				updatedIssue.created = new Date(updatedIssue.created);
				if(updatedIssue.completionDate){
					updatedIssue.completionDate = new Date(updatedIssue.completionDate);
				}
				console.log('updatedIssue is:',updatedIssue);
				const newIssues = this.state.issues.concat(updatedIssue);
				this.setState({issues:newIssues});
				//加入error后 就不会了console.log('空白也会添加一行');//？ why
			})
			
				} else {
					response.json().then(error => {
						alert('Failed to add issue:' + error.message)
					})
				} 
			})
			.catch(err => alert('Error in sending data to server:' + err.message)); 
			//错误捕获了还会运行上面的？
		}

	
	componentDidMount() { //render进行一次
		//console.log("componentDidMount");
		this.loadData();
	}
	loadData() {
		fetch('/api/issues')
		.then(response => {
			if(response.ok) {
				response.json()
				.then(data => {
					//console.log(data.records[0].created);
					console.log('Total count of records:',data._metadata.total_count)
					data.records.forEach(issue => {
						//为什么Date需要转换?
						//因为经过了json()的转换，Date对象转变为string
						//需要再转换为对象来调用toDateString();
						issue.created = new Date(issue.created);
						if(issue.completionDate) {
							issue.completionDate = new Date(issue.completionDate);
						}
					});
			this.setState({issues:data.records});
		});
			} else {
				response.json().then(error => {
					alert('Failed to fetch issues:' + error.message)
				})
			}
			
		}).catch(err => console.log(err));
	}
		

	render() {
		console.log('render time')
		return (
			<div>
			<h1>Issue Tracker</h1>
			<IssueFilter/>
			<hr/>
			<IssueTable issues={this.state.issues}/>
			<hr/>
			<IssueAdd createIssue={this.createIssue}/>
			</div>
			)
	}
}	