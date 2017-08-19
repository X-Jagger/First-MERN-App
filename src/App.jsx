import 'babel-polyfill'
import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter as Router,Route,Redirect,Switch,withRouter} from 'react-router-dom';
//BrowerHistory
//Switch render 第一个match的route
import IssueList from './IssueList.jsx';
import IssueEdit from './IssueEdit.jsx';

const contentNode = document.getElementById('contents');
const NoMatch = () => <p>Page Not Found </p>
const RoutedApp = () => (
	<Router>
		<div> 
		<Redirect from="/" to="/issues" />
		<Switch>
		<Route exact path="/issues" component={withRouter(IssueList)}/>
		<Route exact path="/issues/:id" component={IssueEdit}/>
		<Route path="*" component={NoMatch}/>
		</Switch>
		</div>
	</Router>
	)
ReactDOM.render(<RoutedApp/>,contentNode); //instantiation实例
if(module.hot) {
	module.hot.accept();
}