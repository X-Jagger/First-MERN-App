import React from 'react';
import {Link} from 'react-router-dom';
import queryString from 'query-string';
import {Col,Row,FormGroup,FormControl,
	ControlLabel,InputGroup,ButtonToolbar,Button}
	 from 'react-bootstrap';



export default class IssueFilter extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			status:props.initFilter.status || '',
			effort_gte:props.initFilter.effort_gte || '',
			effort_lte:props.initFilter.effort_lte || '',
			changed:false,
		}
		
		this.onChangeStatus = this.onChangeStatus.bind(this);
		this.onChangeEffortGte = this.onChangeEffortGte.bind(this);
		this.onChangeEffortLte = this.onChangeEffortLte.bind(this);
		this.applyFilter = this.applyFilter.bind(this);
		this.resetFilter = this.resetFilter.bind(this);
		this.clearFilter = this.clearFilter.bind(this);

	}
	componetWillReceiveProps(newProps) {
		this.setState({
			status:this.props.initFilter.status || '',
			effort_gte:this.props.initFilter.effort_gte || '',
			effort_lte:this.props.initFilter.effort_lte || '',
			changed:false,
		})
	}
	resetFilter() {
		console.log('resetFilter\'s this.props:',this.props)
		this.setState({
			status:this.props.initFilter.status || '',
			effort_gte:this.props.initFilter.effort_gte || '',
			effort_lte:this.props.initFilter.effort_lte || '',
			changed:false,
		})
	}

	onChangeStatus(e) {
		this.setState({
			status:e.target.value,
			changed:true,
			statusName:e.target.value,
		})
	}
	onChangeEffortGte(e) {
		const effortString = e.target.value;
		//console.log('value is :',effortString)
		if (effortString.match(/^\d*$/)) {
			this.setState({
				effort_gte:`${e.target.value}`,
				changed:true
			})
		}
	}
	onChangeEffortLte(e) {

		const effortString = e.target.value;
		//console.log('value is :',effortString)
		if (effortString.match(/^\d*$/)) {
			this.setState({
				effort_lte:e.target.value,
				changed:true
			})
		}
	}
	applyFilter() {
		const newFilter = {}
		// const newFilter = {};
		if(this.state.status) newFilter.status = this.state.status;
		if(this.state.effort_gte) newFilter.effort_gte = this.state.effort_gte;
		if(this.state.effort_lte) newFilter.effort_lte = this.state.effort_lte;
		const stringified = queryString.stringify(newFilter);
		//console.log('stringified is:' ,stringified)
		this.props.setFilter(stringified);
	}
	clearFilter() {
		this.props.setFilter("")
	}
	render() {
		const Separator = () => <span> | </span>;
		return (
			<Row>
				<Col xs={6} sm={4} md={4} lg={3} >
					<FormGroup >
						<ControlLabel>Status</ControlLabel>
						<FormControl componentClass="select" value={this.state.status}
						onChange={this.onChangeStatus} >
							<option value=""></option>
							<option value="">(Any)</option>
							<option value="New">New</option>
							<option value="Open">Open</option>
							<option value="Assigned">Assigned</option>
							<option value="Fixed">Fixed</option>
							<option value="Verified">Verified</option>
							<option value="Closed">Closed</option>
						</FormControl>
					</FormGroup>
				</Col>
				<Col xs={6} sm={4} md={4} lg={3} >
					<FormGroup>
						<ControlLabel>Effort</ControlLabel>
						<InputGroup>
							<FormControl value={this.state.effort_gte}
							onChange={this.onChangeEffortGte} ></FormControl>
							<InputGroup.Addon>-</InputGroup.Addon>
							<FormControl value={this.state.effort_lte}
							onChange={this.onChangeEffortLte} ></FormControl>

						</InputGroup>
					</FormGroup>
				</Col>
				<Col xs={6} sm={4} md={4} lg={3} >
					<FormGroup>
					<ControlLabel></ControlLabel>
					<ButtonToolbar>
						<Button bsStyle="primary" onClick={this.applyFilter} >Apply</Button>
						<Button onClick={this.resetFilter} 
						disabled={!this.state.changed} >Reset</Button>
						<Button onClick={this.clearFilter} >Clear</Button>
					</ButtonToolbar>
					</FormGroup>
				</Col>
			</Row>

		)
	}
}

// IssueFilter.propTypes = {
// 	setFilter:
// 	initFilter:
// }