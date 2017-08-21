import React from 'react';

export default class DateInput extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			value:this.editFormat(props.value),
			focused:false,
			valid:true,
		}
		this.onFocus = this.onFocus.bind(this);
		this.onBlur = this.onBlur.bind(this);
		this.onChange = this.onChange.bind(this);
	}
	componentWillReceiveProps(newProps) {
		if (newProps.value !== this.props.value) {
			this.setState({
				value:this.editFormat(newProps.value)
			})
		}
	}
	onFocus() {
		this.setState({focused:true})
	}
	onBlur(e) {
		const value = this.unformat(this.state.value);
		// === '' 排除空的日期为null的情况
		const valid = this.state.value === '' || value != null;
		if(valid !== this.state.valid && this.props.onValidityChange){
			this.props.onValidityChange(e,valid)
		}
		this.setState({
			focused:false,
			valid
		});
		if (valid) this.props.onChange(e,value);
	}
	//不太合理
	onChange(e) {
		if(e.target.value.match(/^[\d-]*$/)) {
			this.setState({
				value:e.target.value
			})
		}
	}

	//"Mon Aug 21 2017"
	displayFormat(date) {
		return (date != null) ? date.toDateString() : ''
	}

	// "2017-08-21T15:24:08.685Z" 转变为"2017-08-21"
	editFormat(date) {
		return (date != null) ? date.toISOString().substr(0,10) : '';
	}
	//判断valid,如果不符合日期格式,则返回null
	unformat(str) {
		str = str.match(/^\d{4}-\d{2}-\d{2}$/) ? str : ''
		const val = new Date(str);
		return isNaN(val.getTime()) ? null : val;
	}

	render() {
		const className = (!this.state.valid && !this.state.focused) 
		? 'invalid' : null
		const value = (this.state.focused || !this.state.valid) 
		? this.state.value : this.displayFormat(this.props.value);
		//这里只能用displayFormat(this.props.value),因为它需要一个new Date()对象
		console.log('DateInput this.props',this.props)
		console.log('DateInput this.state',this.state)
		return (
			<input type="text" size={15} name={this.props.name}
			className={className} value={value} 
			placeholder={'yyyy-mm-dd'}
			onFocus={this.onFocus} onBlur={this.onBlur}
			onChange={this.onChange}
			/>
			)
	}
}

// DateInput.propTypes = {
// 	value: React.PropTypes.object,
// 	onChange: React.PropTypes.func.isRequired,
// 	onValidityChange: React.PropTypes.func,
// 	name: React.PropTypes.string.isRequired,
// }