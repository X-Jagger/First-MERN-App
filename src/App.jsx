import 'babel-polyfill'
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router,Route,Redirect,Switch,withRouter,Link} from 'react-router-dom';
//BrowerHistory
//Switch render 第一个match的route
import IssueList from './IssueList.jsx';
import IssueEdit from './IssueEdit.jsx';
import {LinkContainer} from 'react-router-bootstrap';
import {Navbar,Nav,NavItem,NavDropdown,MenuItem,Glyphicon} from 'react-bootstrap'
import IssueAddNavItem from './IssueAddNavItem.jsx';

const contentNode = document.getElementById('contents');
const NoMatch = () => <p>Page Not Found </p>
const Header = () => (
	<Navbar fluid>
		<Navbar.Header>
			<Navbar.Brand>Issue Tracker</Navbar.Brand>
		</Navbar.Header>
				<Nav>
					<LinkContainer to="/issues">
						<NavItem>Issues</NavItem>
					</LinkContainer>
					<LinkContainer to="/reports">
						<NavItem>Reports</NavItem>
					</LinkContainer>
				</Nav>
				<Nav pullRight>
					<IssueAddNavItem></IssueAddNavItem>
					<NavDropdown id="user-dropdown" 
					title={<Glyphicon glyph="option-horizontal"/>} > 
					<MenuItem>
							Logout
						</MenuItem>
					</NavDropdown>
						
					
				</Nav>
			
		</Navbar>
	
	)
const App = () => (
	<div >
		<Header/>
		<div className="container-fluid">
			<Switch>
				<Route exact path="/issues" component={withRouter(IssueList)}/>
				<Route exact path="/issues/:id" component={IssueEdit}/>
				<Route path="*" component={NoMatch}/>
			</Switch>
		
		<hr/>
		<h5><small>
			Hello ,this is the footer.
		</small></h5>
		</div>
	</div>
	)


const RoutedApp = () => (
	<Router >
		<App></App>
	</Router>
	)
ReactDOM.render(<RoutedApp/>,contentNode); //instantiation实例
if(module.hot) {
	module.hot.accept()
}