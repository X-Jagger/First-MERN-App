import React from 'react';
import {Alert, Collapse} from 'react-bootstrap';


//Alert 模版
export default class Toast extends React.Component{
	componentDidUpdate() {
		if(this.props.showing) {
			clearTimeout(this.dismissTimer);
			console.log("test success")
			this.dismissTimer =  setTimeout(this.props.onDismiss,5000);
		}
	}
	componentWillUnmount() {
		clearTimeout(this.dismissTimer);
	}
	
	render() {
		return (
			<Collapse in={this.props.showing}>
				<div style={{position:'fixed',top:30,left:0,
				right:0,textAlign:'center'}}>
				<Alert 
					style={{display:'inline-block',width:500}}
					bsStyle={this.props.bsStyle || 'success' }
					onDismiss={this.props.onDismiss}
				> 
				{this.props.message}
				</Alert>
				</div>
			</Collapse>
			)
	}
}

// Toast.defaultProps = {
// 	bsStyle:'success'
// }

