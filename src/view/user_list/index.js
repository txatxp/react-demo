import React, {Component} from 'react'
import { user_list_action } from '../../store/action/user-list'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Footer from '../../components/footer/footer'
class UserList extends Component {
	constructor(props){
		super(props)
		this.state = {}
	}
	componentWillMount(){
		this.props.sendUser().then((res) => {
			console.log(res, '{{{{')
		})
	}
	goUserDetail (params) {
		console.log(params, '___params')
		console.log(this.props)
		this.props.history.push(`/user_detail/${params.id}/?img_src=${encodeURIComponent(params.imgSrc)}`)
	}
	render(){
		return (
				<div>
					<ul>
						{
							this.props.user.length > 0 && this.props.user.map((item, index) => {
								return (
										<li key={item.id} onClick={this.goUserDetail.bind(this, {
											id: item.id,
											imgSrc: item.avatar_url
										})}>
											<div>用户：{item.login}</div>
											<div>照片：<img width="100" src={item.avatar_url} /></div>
											<br /><br /><br />
										</li>
									)
							})
						}
					</ul>
					<Footer></Footer>
				</div>
			)
	}
}
let mapStateToProps = function (state) {
	return {
		user: state.user_list_reduce
	}
}
let mapDispatchToProps = function (dispatch) {
	return {
		sendUser: function () {
			return user_list_action()(dispatch)
		}
	}
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserList))
