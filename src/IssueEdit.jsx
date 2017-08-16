import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types'
export default class IssueEdit extends React.Component {
	render() {
		return (
			<div> 
			<p>This is a placeholder for the Issue Eidt page {this.props.params.id}.</p>
			<Link to="/issues">Back to issue list</Link>
			</div>
			)
	}
}

// IssueEdit.propTypes = {
// 	params: React.propTypes.object.isRequired,
// }
IssueEdit.propTypes = {
	params: React.PropTypes.object.isRequired,
};