import React, {Component} from 'react'
import { bindActionCreators } from 'redux'
import * as footer_list_action from '../../store/action/footer-list'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import List from './component/list'
import './footer.css'
class Footer extends Component {
	constructor(props){
		super(props)
		this.state = {
			footer_list: false
		}
	}
	componentWillMount(){
		this.props.actionList.footer_list_action([
				{
					name: '首页',
					id: 1,
					active: true,
					routerType: 'Home',
					link: '/'
				},
				{
					name: '用户列表',
					id: 2,
					active: false,
					routerType: 'UserList',
					link: '/user_list'
				},
				{
					name: '我的',
					id: 3,
					active: false,
					routerType: 'My',
					link: '/my'
				}
			])
		this.setState({
			footer_list: true
		})
	}
	render () {
		let { user_list_reduce } = this.props
		let { pathname } = this.props.location
		return (
				<div className="footer-box">
					<ul>
						{
							this.state.footer_list && user_list_reduce.map((item, index) => {
								return <List key={item.id} name={item.name} active={item.link == pathname ? true : false} router_type={item.routerType ? item.routerType : 'Home'} link={item.link}></List>
							})
						}
					</ul>
				</div>
			)
	}
}
const mapStateToProps = function (state) {
	return {
		user_list_reduce: state.footer_list_reduce
	}
}
const mapDispatchToProps = function (dispatch) {
	return {
		// bindActionCreators把所有的action合并成到actionList对象里面
		actionList: bindActionCreators(footer_list_action, dispatch)
	}
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Footer))
