import React from 'react';
import {Link} from 'react-router-dom';
// import PropTypes from 'prop-types'
export default class IssueEdit extends React.Component {
	
	render() {
		console.log("Eidt!!:",this.props)
		return (
			<div> 
			<p>This is a placeholder for the Issue Eidt page 
			{this.props.match.params.id}.</p>
			<Link to="/issues">Back to issue list</Link>
			</div>
			)
	}
}

// IssueEdit.propTypes = {
// 	params: React.propTypes.object.isRequired,
// }
// IssueEdit.propTypes = {
// 	params: React.PropTypes.object.isRequired,
// };