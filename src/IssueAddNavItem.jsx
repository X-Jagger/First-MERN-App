import React from 'react';
import {withRouter} from 'react-router-dom';
import {NavItem,Modal,Form,
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
				console.log("this.props",this.props)
				response.json().then(updateIssue => {
					//this.props.history.location.pathname = `issues/${updateIssue._id}`;
					
					var history = this.props.history;
					if (history.location.pathname != "/issues") {
						history.goBack();
					} 
					else 
					history.push(`issues/${updateIssue._id}`)

					//this.props.router.push(`/issues/${updateIssue._id}`)
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
			<NavItem onClick={this.showModal}>
			<Glyphicon glyph="plus" />Create Issue
			<Modal keyboard show={this.state.showing} onHide={this.hideModal} >
				<Modal.Header closeButton>
					<Modal.Title>Create Issue</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form name="issueAdd">
						<FormGroup>
							<ControlLabel>Title</ControlLabel>
							<FormControl name="title" autoFocus></FormControl>
						</FormGroup>
						<FormGroup>
							<ControlLabel>Owner</ControlLabel>
							<FormControl name="owner"></FormControl>
						</FormGroup>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<ButtonToolbar>
						<Button type="button" bsStyle="primary"
						onClick={this.submit}>Sumbit</Button>
						<Button bsStyle="link" onClick={this.hideModal}>Cancel</Button>
					</ButtonToolbar>
				</Modal.Footer>
			</Modal>
			<Toast showing={this.state.toastVisible}
			message={this.state.toastMessage} 
			onDismiss={this.dismissToast}
			byStyle={this.state.toastTypest} ></Toast>
			</NavItem>
			)
	}
}

export default withRouter(IssueAddNavItem);

// setFilter(query) {
// 		this.props.history.push({
// 			pathname:this.props.location.pathname,
// 			search:query}) }
