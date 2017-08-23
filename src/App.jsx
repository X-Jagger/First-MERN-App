import 'babel-polyfill'
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router,Route,Redirect,Switch,withRouter,Link} from 'react-router-dom';
//BrowerHistory
//Switch render 第一个match的route
import IssueList from './IssueList.jsx';
import IssueEdit from './IssueEdit.jsx';
import {LinkContainer} from 'react-router-bootstrap'
import {Navbar,Nav,NavItem,NavDropdown,MenuItem,Glyphicon} from 'react-bootstrap'


const contentNode = document.getElementById('contents');
const NoMatch = () => <p>Page Not Found </p>
const Header = () => (
	<Navbar>
		<Navbar.Header>
			<Navbar.Brand>Issue Tracker</Navbar.Brand>
		</Navbar.Header>
				<Nav>
					<LinkContainer to="/issues">
						<NavItem>Issues</NavItem>
					</LinkContainer>
					<LinkContainer to="reports">
						<NavItem>Reports</NavItem>
					</LinkContainer>
				</Nav>
				<Nav pullRight>
					<NavItem>
						<Glyphicon glyph="plus"></Glyphicon>
						Create Issue
					</NavItem>
					<NavDropdown id="user-dropdown" 
					title={<Glyphicon glyph="option-horizontal"/>} > 
					</NavDropdown>
						<MenuItem>
							Logout
						</MenuItem>
					
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
		</div>
		<hr/>
		<h5><small><div className="footer">
			Hello ,this is the footer.
		</div></small></h5>
		
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