import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
class List extends Component {
	constructor(props){
		super(props)
		this.goJump = this.goJump.bind(this)
		this.state = {
			LinkShow: false
		}
	}
	goJump() {
		let ts = this
		let { router_type } = ts.props
		switch(router_type){
			case 'Home':
				ts.props.history.push('/')
				break
			case 'UserList':
				ts.props.history.push('/user_list')
				break
			case 'My':
				ts.props.history.push('/my')
				break
			default:
				ts.props.history.push('/')
				break
		}
	}
	render(){
		let {id, name, active, router_type, link} = this.props
		let { LinkShow } = this.state
		if (!LinkShow) {
			return <li className={active ? 'active' : ''} key={id} router_type={router_type?router_type:'Home'} onClick={this.goJump}>{name}</li>
		} else {
			return <li className={active ? 'active' : ''} key={id} router_type={router_type?router_type:'Home'}>
				<Link to={link?link:'/'}>{name}</Link>
			</li>
		}
	}
}
export default withRouter(connect()(List))