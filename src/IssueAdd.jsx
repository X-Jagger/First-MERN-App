import React from 'react';
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
		console.log("test for Add Component!")
		return (
			<div>
				<form name="issueAdd" onSubmit={this.handleSubmit}>
				<input type="text" name="owner" placeholder="Owner"/>
				<input type="text" name="title" placeholder="Title"/>
				<button>Add</button>
				</form>
			</div>
			)
	}
}