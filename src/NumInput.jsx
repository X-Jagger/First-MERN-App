import React from 'react';

export default class NumInput extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			value: this.format(props.value)
			//其实没什么用，因为IssueEdit第一次render时
			//还没有fetch数据，props.value为null，
			//此时constructor初始化已经完成了，并不会再改变value了
			//只有通过componentWillReceiveProps来获取新改变
		};
		this.onBlur = this.onBlur.bind(this);
		this.onChange = this.onChange.bind(this);
		//console.log('NumInput super()--props is ',this.props)
	}
	
	//即使props没变，react也会call它,初始props并不会call
	//从IssueEdit传入的value就是newProps.value,

	componentWillReceiveProps(newProps) {
		this.setState({
			value:this.format(newProps.value)
		})
	}
	
	//失去焦点时发生，调用parent的onChange方法，改变parent IssueEdit的state
	onBlur(e) {
		this.props.onChange(e,this.unformat(this.state.value))
		//不是下面的onChange，而是parent的
	}

	//e.target.value必须是string,才有match方法
	onChange(e) {
		if(Number(e.target.value) || e.target.value === '') {
			this.setState({value:e.target.value})
			
		}
	}
	//转换为str
	format(num) {
		return num != null ? num.toString() : '';
	}
	//转化为num
	unformat(str) {
		const val = parseInt(str,10);
		return isNaN(val) ? 0 : val;
	}
	render() {
		// console.log("NumInput.this.props is :",this.props)
		// console.log("NumInput.this.state is :",this.state)
		//console.log('NumInput ...this,')
		return (
			<input type="text"
			{...this.props} value={this.state.value}
			onBlur={this.onBlur} onChange={this.onChange}	/>
			)

	}
}
//NumInput.propTypes = {}