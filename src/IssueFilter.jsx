import React from 'react';
import {Link} from 'react-router-dom';


export default class IssueFilter extends React.Component {
	constructor() {
		super();
		this.clearFilter = this.clearFilter.bind(this);
		this.setFilterOpen = this.setFilterOpen.bind(this);
		this.setFilterAssigned = this.setFilterAssigned.bind(this);
	}
	clearFilter(e) {
		e.preventDefault();
		this.props.setFilter("")
	}
	setFilterOpen(e) {
		e.preventDefault();
		this.props.setFilter('?status=Open')
	}
	setFilterAssigned(e) {
		e.preventDefault();
		this.props.setFilter('?status=Assigned')
	}

	render() {
		const Separator = () => <span> | </span>;
		return (
			<div>
				<a href='#' onClick={this.clearFilter}>All Issues</a>
				
				<Separator></Separator>
				<a href='#' onClick={this.setFilterOpen}>Open Issues</a>
				<Separator></Separator>
				<a href='#' onClick={this.setFilterAssigned}>Assigned Issues</a>
			</div>
		)
	}
}

