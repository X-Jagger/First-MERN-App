import React from 'react';
import {Link} from 'react-router-dom';
import NumInput from './NumInput.jsx';
import DateInput from './DateInput.jsx';
import {LinkContainer} from 'react-router-bootstrap';
import {FormGroup,FormControl,ControlLabel,ButtonToolbar,
	Button,Panel,Form,Col,Alert} from 'react-bootstrap';
import Toast from './Toast.jsx';

export default class IssueEdit extends React.Component {
	constructor() {
		super();
		//effort就是数字
		this.state = {
			issue:{
				_id:'',title:'',status:'',owner:'',effort:null,
				completionDate:null,created:null,
			},
			invalidFields:{},
			showingValidation:false,
			toastVisible:false,toastMessage:'',toastType:'success',
		};
		this.onChange = this.onChange.bind(this);
		this.onValidityChange = this.onValidityChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.dismissValidation = this.dismissValidation.bind(this);
		this.showValidation = this.showValidation.bind(this);
		this.showSuccess = this.showSuccess.bind(this);
		this.showError = this.showError.bind(this);
		this.dismissToast = this.dismissToast.bind(this);


	}	

	componentDidMount() {
		this.loadData();
	}
	componentDidUpdate(prevProps) {
		if (prevProps.match.params.id !== this.props.match.params.id){
			this.loadData();
		}
	}
	onSubmit(event) {
		event.preventDefault();
		this.showValidation();
		if (Object.keys(this.state.invalidFields).length !== 0) {
			return;
		}

		fetch(`/api/issues/${this.props.match.params.id}`,{
			method:'PUT',
			headers:{'Content-Type':'application/json'},
			body:JSON.stringify(this.state.issue),
		}).then(response => {
			if(response.ok) {
				response.json().then(updatedIssue => {
					updatedIssue.created 
					= new Date(updatedIssue.created);
					if (updatedIssue.completionDate){
						updatedIssue.completionDate 
						= new Date(updatedIssue.completionDate)
					};
					this.setState({
						issue:updatedIssue,
					})
					this.showSuccess('Updated issue successfully');
				})
			} else {
				response.json().then(error => {
					this.showError(`Failed to update issue: ${error.message}`);
				});
			}
		}).catch(err => {
			this.showError(`Error in sending data to server : ${err.message}`)
		})
	}
	onValidityChange(event,valid) {
		//event.target.name === 'completionDate'
		const invalidFields = Object.assign({},this.state.invalidFields);
		if (!valid) {
			invalidFields[event.target.name] = true;
		} else {
			delete invalidFields[event.target.name];
		}
		this.setState({invalidFields})
	}

	onChange(e,convertedValue) {
		const issue = Object.assign({},this.state.issue);//拷贝属性，
		const value = (convertedValue !== undefined) 
		? convertedValue : e.target.value;
		issue[e.target.name] = value;
		this.setState({
			issue
		})
	}
	showValidation(){
		this.setState({showingValidation:true});
	}
	dismissValidation(){
		this.setState({showingValidation:false});
	}
	loadData() {
		fetch(`/api/issues/${this.props.match.params.id}`)
		.then(response => {
			if(response.ok) {
				response.json().then(issue => {
					issue.created = new Date(issue.created);
					issue.completionDate = issue.completionDate != null 
					? new Date(issue.completionDate)
					: null;

					this.setState({issue});
					//console.log('IssueEdit-loadDate-returned issue',issue)

				});
			} else {
				response.json().then(error => {
					this.showError(`Failed to fetch issue: ${error.message}`);
				});
			}
		}).catch(error => {
			this.showError(`Error in fetching data from servr : ${error.message}`)
		})
	}
	//控制alert
	showSuccess(message) {
		this.setState({
			toastVisible:true,
			toastMessage:message,
			toastType:'success'
		})
	}
	showError(message) {
		this.setState({
			toastVisible:true,
			toastMessage:message,
			toastType:'danger'
		})
	}
	dismissToast(message) {
		this.setState({
			toastVisible:false,
		})
	}



	render() {
		//console.log("IssueEidt  this.props is:",this.props);

		const issue = this.state.issue;
		//判断是否还是invalid
		// const validationMessage = 
		// Object.keys(this.state.invalidFields).length 
		// === 0 ? null :(<div className='error'>Please correct invalid fields before submitting.</div>)
		//console.log('IssueEdit this.state is :',this.state)
		let validationMessage = null;
		if (Object.keys(this.state.invalidFields).length!== 0
			&& this.state.showingValidation) {
			validationMessage = (
				<Alert bsStyle="danger" onDismiss={this.dismissValidation}>
				Please correct invalid fields before submitting.
				</Alert>
				)
		}
		return (
			<Panel header="Edit Issue">
				<Form horizontal onSubmit={this.onSubmit}>
				<FormGroup>
					<Col componentClass={ControlLabel} sm={3}>ID</Col>
					<Col sm={9}>
						<FormControl.Static>{issue._id}</FormControl.Static>
					</Col>
				</FormGroup>
				<FormGroup>
					<Col componentClass={ControlLabel} sm={3}>Created</Col>
					<Col sm={9}>
					<FormControl.Static>
						{issue.created ? issue.created.toDateString() : ''}
					</FormControl.Static>
				</Col>
				</FormGroup>
				<FormGroup>
					<Col componentClass={ControlLabel} sm={3}>Status</Col>
					<Col sm={9}>
					<FormControl
					componentClass="select" name="status" value={issue.status}
					onChange={this.onChange}>
						<option value="New">New</option>
						<option value="Open">Open</option>
						<option value="Assigned">Assigned</option>
						<option value="Fixed">Fixed</option>
						<option value="Verified">Verified</option>
						<option value="Closed">Closed</option>
					</FormControl>
					</Col>
				</FormGroup>
				<FormGroup>
					<Col componentClass={ControlLabel} sm={3}>Owner</Col>
					<Col sm={9}>
						<FormControl name="owner" value={issue.owner} 
						onChange={this.onChange} />
					</Col>
				</FormGroup>
				<FormGroup>
					<Col componentClass={ControlLabel} sm={3}>Effort</Col>
					<Col sm={9}>
						<FormControl
						componentClass={NumInput} name="effort"
						value={issue.effort} onChange={this.onChange}
						/>
					</Col>
				</FormGroup>


				<FormGroup validationState={this.state.invalidFields. 
				completionDate ? 'error' : null}>
					<Col componentClass={ControlLabel} sm={3}>Completion Date</Col>
					<Col sm={9}>
						<FormControl
						componentClass={DateInput} name="completionDate"
						value={issue.completionDate} onChange={this.onChange}
						onValidityChange={this.onValidityChange}
						/>
						<FormControl.Feedback />
					</Col>
				</FormGroup>
				<FormGroup>
					<Col componentClass={ControlLabel} sm={3}>Title</Col>
					<Col sm={9}>
						<FormControl name="title" value={issue.title} 
						onChange={this.onChange} />
					</Col>
				</FormGroup>
				<FormGroup>
					<Col smOffset={3} sm={6}>
						<ButtonToolbar>
						<Button bsStyle="primary" type="submit">Submit</Button>
						<LinkContainer to="/issues">
							<Button bsStyle="link">Back</Button>
						</LinkContainer>
						</ButtonToolbar>
					</Col>
				</FormGroup>
				<FormGroup>
					<Col smOffset={3} sm={9}>{validationMessage}</Col>
				</FormGroup>


				</Form>
				<Toast
					showing={this.state.toastVisible}
					message={this.state.toastMessage}
					onDismiss={this.dismissToast}
					bsStyle={this.state.toastType}
				></Toast>
			</Panel>

			)
	}
}

// IssueEdit.propTypes = {
// 	params: React.propTypes.object.isRequired,
// }
// IssueEdit.propTypes = {
// 	params: React.PropTypes.object.isRequired,
// };