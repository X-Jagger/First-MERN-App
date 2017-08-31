import React from 'react';
import {withRouter} from 'react-router-dom';
import {NavItem,Button,ButtonToolbar,Modal,Form,
Glyphicon,FormGroup,FormControl,ControlLabel,Button,ButtonToolbar} from 'react-bootstrap';
import Toast from './Toast.jsx';

class IssueAddNavItem extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showing:false,
			toastVisible:false,toastMessage:'',toastType:'success',
		}
		this.showModal = this.showModal.bind(this);
		this.hideModal = this.hideModal.bind(this);
		this.submit = this.submit.bind(this);
		this.showError = this.showError.bind(this);
		this.dismissToast = this.dismissToast.bind(this);

	}
	showModal(){
		this.setState({showing:true})
	}	
	hideModal(){
		this.setState({showing:false})
	}	
	showError(message){
		this.setState({toastVisible:true,toastMessage:message,toastType:'danger'})
	}	
	dismissToast(){
		this.setState({toastVisible:false})
	}	
	submit(e){
		e.preventDefault();
		this.hideModal();
		const form = document.forms.issueAdd;
		const newIssue = {
			owner:form.owner.value,title:form.title.value,
			status:'New',created:new Date(),
		};
		fetch('/api/issues',{
			method:'POST',
			headers:{'Content-Type':'application/json'},
			body:JSON.stringify(newIssue)
		}).then(response => {
			if(response.ok) {
				response.json().then(updateIssue => {
					this.props.router.push(`/issues/${updateIssue._id}`)
				})
			} else {
				response.json().then(error => {
					this.showError(`Failed to add issue: ${error.message}`)
				})
			}
		}).catch(err => {
			this.showError(`Error in sending data to server: ${err.message}`)
		})
	}
	render() {
		return (
			
			)
	}
}

// setFilter(query) {
// 		this.props.history.push({
// 			pathname:this.props.location.pathname,
// 			search:query}) }
