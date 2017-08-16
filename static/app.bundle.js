webpackJsonp([0],{

/***/ 102:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(20);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var IssueFilter = function (_React$Component) {
	_inherits(IssueFilter, _React$Component);

	function IssueFilter() {
		_classCallCheck(this, IssueFilter);

		return _possibleConstructorReturn(this, (IssueFilter.__proto__ || Object.getPrototypeOf(IssueFilter)).apply(this, arguments));
	}

	_createClass(IssueFilter, [{
		key: 'render',
		value: function render() {
			return _react2.default.createElement(
				'div',
				null,
				' This is a placeholder for the issue Filter.'
			);
		}
	}]);

	return IssueFilter;
}(_react2.default.Component);

exports.default = IssueFilter;

/***/ }),

/***/ 84:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _IssueList = __webpack_require__(85);

var _IssueList2 = _interopRequireDefault(_IssueList);

var _react = __webpack_require__(20);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(58);

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var contentNode = document.getElementById('contents');
_reactDom2.default.render(_react2.default.createElement(_IssueList2.default, null), contentNode); //instantiation实例
if (false) {
	module.hot.accept();
}

/***/ }),

/***/ 85:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _IssueAdd = __webpack_require__(86);

var _IssueAdd2 = _interopRequireDefault(_IssueAdd);

var _IssueFilter = __webpack_require__(102);

var _IssueFilter2 = _interopRequireDefault(_IssueFilter);

var _react = __webpack_require__(20);

var _react2 = _interopRequireDefault(_react);

__webpack_require__(57);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var IssueRow = function IssueRow(_ref) {
	var issue = _ref.issue;
	return _react2.default.createElement(
		'tr',
		null,
		_react2.default.createElement(
			'td',
			null,
			issue._id
		),
		_react2.default.createElement(
			'td',
			null,
			issue.status
		),
		_react2.default.createElement(
			'td',
			null,
			issue.owner
		),
		_react2.default.createElement(
			'td',
			null,
			issue.created.toDateString()
		),
		_react2.default.createElement(
			'td',
			null,
			issue.effort
		),
		_react2.default.createElement(
			'td',
			null,
			issue.completionDate ? issue.completionDate.toDateString() : ''
		),
		_react2.default.createElement(
			'td',
			null,
			issue.title
		)
	);
};

var IssueTable = function IssueTable(_ref2) {
	var issues = _ref2.issues;

	//console.log("test for rebuild by webpack")
	//issues为[]时,不会render IssueRow
	var issueRows = issues.map(function (issue) {
		return _react2.default.createElement(IssueRow, { key: issue._id, issue: issue });
	});
	return _react2.default.createElement(
		'table',
		{ className: 'bordered-table' },
		_react2.default.createElement(
			'thead',
			null,
			_react2.default.createElement(
				'tr',
				null,
				_react2.default.createElement(
					'th',
					null,
					'Id'
				),
				_react2.default.createElement(
					'th',
					null,
					'Status'
				),
				_react2.default.createElement(
					'th',
					null,
					'Owner'
				),
				_react2.default.createElement(
					'th',
					null,
					'Created'
				),
				_react2.default.createElement(
					'th',
					null,
					'Effort'
				),
				_react2.default.createElement(
					'th',
					null,
					'Completion Date'
				),
				_react2.default.createElement(
					'th',
					null,
					'Title'
				)
			)
		),
		_react2.default.createElement(
			'tbody',
			null,
			issueRows
		)
	);
};

var IssueList = function (_React$Component) {
	_inherits(IssueList, _React$Component);

	function IssueList() {
		_classCallCheck(this, IssueList);

		var _this = _possibleConstructorReturn(this, (IssueList.__proto__ || Object.getPrototypeOf(IssueList)).call(this));

		_this.state = {
			issues: []
		};
		_this.loadData = _this.loadData.bind(_this);
		_this.createIssue = _this.createIssue.bind(_this);
		return _this;
	}

	_createClass(IssueList, [{
		key: 'createIssue',
		value: function createIssue(newIssue) {
			var _this2 = this;

			fetch('/api/issues', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(newIssue)
			}).then(function (response) {
				//console.log(response);
				//setTimeout(()=>response.json(),5000);
				//console.log(response.json());
				if (response.ok) {
					response.json().then(function (updatedIssue) {
						updatedIssue.created = new Date(updatedIssue.created);
						if (updatedIssue.completionDate) {
							updatedIssue.completionDate = new Date(updatedIssue.completionDate);
						}
						console.log('updatedIssue is:', updatedIssue);
						var newIssues = _this2.state.issues.concat(updatedIssue);
						_this2.setState({ issues: newIssues });
						//加入error后 就不会了console.log('空白也会添加一行');//？ why
					});
				} else {
					response.json().then(function (error) {
						alert('Failed to add issue:' + error.message);
					});
				}
			}).catch(function (err) {
				return alert('Error in sending data to server:' + err.message);
			});
			//错误捕获了还会运行上面的？
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			//render进行一次
			//console.log("componentDidMount");
			this.loadData();
		}
	}, {
		key: 'loadData',
		value: function loadData() {
			var _this3 = this;

			fetch('/api/issues').then(function (response) {
				if (response.ok) {
					response.json().then(function (data) {
						//console.log(data.records[0].created);
						console.log('Total count of records:', data._metadata.total_count);
						data.records.forEach(function (issue) {
							//为什么Date需要转换?
							//因为经过了json()的转换，Date对象转变为string
							//需要再转换为对象来调用toDateString();
							issue.created = new Date(issue.created);
							if (issue.completionDate) {
								issue.completionDate = new Date(issue.completionDate);
							}
						});
						_this3.setState({ issues: data.records });
					});
				} else {
					response.json().then(function (error) {
						alert('Failed to fetch issues:' + error.message);
					});
				}
			}).catch(function (err) {
				return console.log(err);
			});
		}
	}, {
		key: 'render',
		value: function render() {
			//console.log('render time')
			return _react2.default.createElement(
				'div',
				null,
				_react2.default.createElement(
					'h1',
					null,
					'Issue Tracker'
				),
				_react2.default.createElement(_IssueFilter2.default, null),
				_react2.default.createElement('hr', null),
				_react2.default.createElement(IssueTable, { issues: this.state.issues }),
				_react2.default.createElement('hr', null),
				_react2.default.createElement(_IssueAdd2.default, { createIssue: this.createIssue })
			);
		}
	}]);

	return IssueList;
}(_react2.default.Component);

exports.default = IssueList;

/***/ }),

/***/ 86:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(20);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var IssueAdd = function (_React$Component) {
	_inherits(IssueAdd, _React$Component);

	function IssueAdd() {
		_classCallCheck(this, IssueAdd);

		var _this = _possibleConstructorReturn(this, (IssueAdd.__proto__ || Object.getPrototypeOf(IssueAdd)).call(this));

		_this.handleSubmit = _this.handleSubmit.bind(_this);
		return _this;
	}
	//const createIssue = this.props.createIssue;


	_createClass(IssueAdd, [{
		key: 'handleSubmit',
		value: function handleSubmit(e) {
			e.preventDefault(); //默认动作有个刷新
			var form = document.forms.issueAdd;
			this.props.createIssue({
				owner: form.owner.value,
				title: form.title.value,
				status: 'New'
			});
			form.owner.value = '';
			form.title.value = '';
		}
	}, {
		key: 'render',
		value: function render() {
			return _react2.default.createElement(
				'div',
				null,
				_react2.default.createElement(
					'form',
					{ name: 'issueAdd', onSubmit: this.handleSubmit },
					_react2.default.createElement('input', { type: 'text', name: 'owner', placeholder: 'Owner' }),
					_react2.default.createElement('input', { type: 'text', name: 'title', placeholder: 'Title' }),
					_react2.default.createElement(
						'button',
						null,
						'Add'
					)
				)
			);
		}
	}]);

	return IssueAdd;
}(_react2.default.Component);

exports.default = IssueAdd;

/***/ })

},[84]);