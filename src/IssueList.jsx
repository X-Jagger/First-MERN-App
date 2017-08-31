import IssueFilter from './IssueFilter.jsx';
import React from 'react';
import 'whatwg-fetch';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import {Button,Glyphicon,Table,Panel} from 'react-bootstrap';
import IssueAdd from './IssueAdd.jsx';
const IssueRow = (props) => {
	function onDeleteClick() {
		props.deleteIssue(props.issue._id)
	}
	const issue = props.issue;
	return (
	<tr>
		<td><Link to={`/issues/${issue._id}`}>
		{issue._id.substr(-4)}</Link></td>
		<td>{issue.status}</td>
		<td>{issue.owner}</td>
		<td>{issue.created.toDateString()}</td>
		<td>{issue.effort}</td>
		<td>{issue.completionDate ? 
			issue.completionDate.toDateString() : ''}</td>
		<td>{issue.title}</td>
		<td><Button bsSize="xsmall" onClick={onDeleteClick}><Glyphicon glyph="trash"/></Button></td>
	</tr>	
			)
} 
// IssueRow.propTypes = {
// 	issue: React.PropTypes.object.isRequired,
// 	deleteIssue: React.PropTypes.func.isRequired,
// };
const IssueTable = (props) => {
		const issues = props.issues;
		//issues为[]时,不会render IssueRow
		const issueRows = issues.map(issue => 
			<IssueRow key={issue._id} issue={issue}
			deleteIssue={props.deleteIssue} />)
		return (
			<Table bordered condensed hover responsive>
				<thead>
					<tr>
						<th>Id</th>
						<th>Status</th>
						<th>Owner</th>
						<th>Created</th>
						<th>Effort</th>
						<th>Completion Date</th>
						<th>Title</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{issueRows}
				</tbody>
			</Table>
			
			)
	}
// IssueTable.propTypes = {
// 	issues: React.PropTypes.array.isRequired,
// 	deleteIssue: React.PropTypes.func.isRequired,
// };


export default class IssueList extends React.Component {
	constructor() {
		super();
		this.state = {
			issues:[]
		};
		this.loadData = this.loadData.bind(this);	
		this.createIssue = this.createIssue.bind(this);
		this.setFilter = this.setFilter.bind(this);	
		this.deleteIssue = this.deleteIssue.bind(this);	
	} 
	deleteIssue(id) {
		//console.log(id);
		fetch(`/api/issues/${id}`,{
			method:'DELETE'
		}).then(response => {
			if(!response.ok) alert ('Failed to delete issue')
			else this.loadData();
		});
	}

	setFilter(query) {
		this.props.history.push({pathname:this.props.location.pathname,search:query})
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

	//因为有load data的动作，所以必须判断是否更新完毕，否则会一直loadData();
	componentDidUpdate(prevProps) {
		// console.log('prevProps is !! ',prevProps.location)
		const oldQuery = queryString.parse(prevProps.location.search);
		const newQuery = queryString.parse(this.props.location.search);
		//console.log("oldQuery,newQuery is :",oldQuery,newQuery);
		if (oldQuery.status === newQuery.status
			&& oldQuery.effort_gtz === newQuery.effort_gtz
			&& oldQuery.effort_ltz === newQuery.effort_ltz
			) {
			return;
		} 
			this.loadData();
		
		
	}
	loadData() {
		// console.log('location is : ',this.props.location);
		// console.log('props is : ',this.props);
		fetch(`/api/issues${this.props.location.search}`)
		.then(response => {
			if(response.ok) {
				response.json()
				.then(data => {
					//console.log(datac.reords[0].created);
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
		//console.log('look for search:',this.props.history.push)
		//console.log('initFilter',this.props.location)
		//console.log('IssueList this.props:',this.props)
		const initFilter =  queryString.parse(this.props.location.search)
		return (
			<div>
			<Panel collapsible header="Filter">
				<IssueFilter setFilter={this.setFilter}
			initFilter={initFilter}/>
			</Panel>

			<IssueTable issues={this.state.issues} deleteIssue={this.deleteIssue}/>
			
			
			</div>
			)
	}
}	

// IssueList.propTypes = {
// 	router:PropTypes.object,
// }