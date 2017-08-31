import React from 'react';
import {Form,FormControl,Button} from 'react-bootstrap';

//Inline Forms
export default class IssueAdd extends React.Component {
	constructor() {
		super();
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	//const createIssue = this.props.createIssue;
	handleSubmit(e) {
		e.preventDefault();//默认动作有个刷新
		var form = document.forms.issueAdd;
		this.props.createIssue({
			owner:form.owner.value,
			title:form.title.value,
			status:'New',
		})
		form.owner.value = '';
		form.title.value = ''; 
	}
	render() {
		return (
			<div>
				<Form inline name="issueAdd" onSubmit={this.handleSubmit}>
					<FormControl  name="owner" placeholder="Owner"></FormControl>{' '}
					<FormControl  name="title" placeholder="Title"></FormControl>{' '}
					<Button type="submit" bsStyle="primary">Add</Button>
				</Form>

			</div>
			)
	}
}