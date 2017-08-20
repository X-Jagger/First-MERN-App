import 'babel-polyfill'
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router,Route,Redirect,Switch,withRouter,Link} from 'react-router-dom';
//BrowerHistory
//Switch render 第一个match的route
import IssueList from './IssueList.jsx';
import IssueEdit from './IssueEdit.jsx';

const contentNode = document.getElementById('contents');
const NoMatch = () => <p>Page Not Found </p>
const App = () => (
	<div>
		<div className="header">
			<h1>Issue Tracker</h1>
			
		</div>
		<div className="contents">
			<Switch>
				<Route exact path="/issues" component={withRouter(IssueList)}/>
				<Route exact path="/issues/:id" component={IssueEdit}/>
				<Route path="*" component={NoMatch}/>
			</Switch>
		</div>
		<div className="footer">
			Hello ,this is the footer.
		</div>
	</div>
	)
// App.propTypes = {
// 	children:PropTypes.object.isRequired;
// }

const RoutedApp = () => (
	<Router >
		<App></App>
	</Router>
	)
ReactDOM.render(<RoutedApp/>,contentNode); //instantiation实例
if(module.hot) {
	module.hot.accept();
}