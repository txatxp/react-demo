import React, {Component} from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as get_person_info from '../../store/action/person-info'
import { BrowserRouter as Router, Route, Switch, Link, withRouter } from 'react-router-dom'
import RouteWithSubRoutes from '../../router/RouteWithSubRoutes'
import Person from '../../components/person'
import Footer from '../../components/footer/footer'
class Home extends Component {
	constructor(props){
		super(props)
		this.state = {}
		this.setPersonInfo = this.setPersonInfo.bind(this)
	}
	componentWillMount(){
	}
	setPersonInfo (id) {
		this.props.actionList.get_person_info({
			id: id
		})
	}
	render(){
		let { routes } = this.props
		let { person_info_reduce } = this.props
		return (
					<div>
						<Person set_person_info={this.setPersonInfo}></Person>
						<hr />
						
								{
									person_info_reduce && (
										<div className="person-info">
											<div>名字：{person_info_reduce.name}</div>
											<div>年龄：{person_info_reduce.age}</div>
											<div>性别：{person_info_reduce.sex == 1 ? '男' : '女'}</div>
											<div>身高：{person_info_reduce.height}</div>
											<div>地址：{person_info_reduce.address}</div>
											<div>名言：{person_info_reduce.wellknownSaying}</div>
											<div>职业：{person_info_reduce.occupation}</div>
											<div>爱好：{person_info_reduce.love}</div>
										</div>
									)
								}
								
							<Footer></Footer>
					</div>
			)
	}
}
const mapStateToProps = function (state) {
	return {
		person_info_reduce: state.person_info_reduce
	}
}
const mapDispatchToProps = function (dispatch) {
	return {
		// bindActionCreators把所有的action合并成到actionList对象里面
		actionList: bindActionCreators(get_person_info, dispatch)
	}
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home))
