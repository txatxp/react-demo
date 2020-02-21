import React, { Component } from 'react'
import { connect } from 'react-redux'
import url from 'url'
import { withRouter } from 'react-router-dom'
class UserDetail extends Component {
	constructor(props){
		super(props)
		this.state = {
			user_id: 0,
			user_pic: ''
		}
	}
	componentWillMount(){
		let queryParams = url.parse(this.props.location.search, true)
		this.setState({
			user_id: this.props.match.params.id,
			user_pic: queryParams.query.img_src
		})
	}
	render(){
		return (
				<>
					<React.Fragment>用户ID: {this.state.user_id}</React.Fragment>
					<React.Fragment>用户照片：<img width="200" src={this.state.user_pic} /></React.Fragment>
				</>
			)
	}
}
const mapStateToProps = function (state) {
	return {}
}
const mapDispatchToProps = function (dispatch) {
	return {}
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserDetail))