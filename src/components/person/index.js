import { 
	Modal, 
	Button, 
	WhiteSpace, 
	WingBlank, 
	Icon,
	InputItem,
	Picker,
	List
} from 'antd-mobile';
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as get_person_info from '../../store/action/person-info'
import { withRouter } from 'react-router-dom'
import { 
	BrowserRouter as Router, 
	Route, 
	Link, 
	useRouteMatch 
} from 'react-router-dom'
class Person extends Component {
	constructor(props) {
		super(props)
		// 从本地储存拿出最新数据生成人头菜单数据
		let person_list = localStorage.getItem('person') ? JSON.parse(localStorage.getItem('person')) : []
		let person_list2 = []
		// 如果本地储存有历史人头数据，则取出人头
		person_list.length && person_list.forEach((item, index) => {
			person_list2.push({
				id: item.id,
				name: item.name
			})
		})
		this.state = {
			name_list: person_list2,
			active: 1,
			modalShow: false,
			person: {
				name: '11',
				age: '',
				sex: '',
				defaultSex: ['0'],
				height: '',
				address: '',
				wellknownSaying: '',
				occupation: '',
				love: ''
			},
			sexList: [
				{
					label: '男',
					value: '1'
				},
				{
					label: '女',
					value: '0'
				}
			]
		}
		this.onClose = this.onClose.bind(this)
		this.onShow = this.onShow.bind(this)
		this.savePersonInfo = this.savePersonInfo.bind(this)
	}
	componentWillMount() {
		// 默认选中第一个人
		let id = 0
		if (this.state.name_list.length > 0) {
			id = this.state.name_list[0].id
		} else {
			id = this.state.active
		}
		this.setid(id)
	}
	// 点击人并获取相应人id，触发父组件方法，通过dispatch更新人的信息
	setid(id){
		this.setState({
			active: id
		})
		let { set_person_info } = this.props
		set_person_info(id)
	}
	// 关闭人基本信息模态
	onClose () {
		this.setState({
			modalShow: false
		})
	}
	// 显示添加人基本信息模态
	onShow () {
		this.setState({
			modalShow: true
		})
	}
	// 性别选择监听并设置
	onChangeSex(val){
		let person = this.state.person
		person.sex = val[0]
		person.defaultSex = val
		this.setState({
			person: person
		})
	}
	// 提交保存添加的基本人信息
	savePersonInfo(){
		let name_list = []
		let maxArr
		let newId
		if (this.state.name_list.length > 0) {
			name_list = this.state.name_list
			maxArr = name_list.sort((a, b) => {
				return b.id - a.id
			})
			// 算出历史最大id加一得出最新id给与新添加人信息
			newId = maxArr[0].id + 1	
		} else {
			// 如果一开始没有任何数据，初始id为1
			newId = 1
		}
		// 组装最新新菜单数据
		name_list.push({
			name: this.state.person.name,
			id: newId
		})
		// 更新数据
		this.setState({
			name_list
		})
		// 通过store保存提交
		this.props.actionList.add_person_info({
			id:newId,
			name: this.state.person.name,
			age: this.state.person.age,
			sex: this.state.person.sex,
			defaultSex: this.state.person.defaultSex,
			height: this.state.person.height,
			address: this.state.person.address,
			wellknownSaying: this.state.person.wellknownSaying,
			occupation: this.state.person.occupation,
			love: this.state.person.love
		})
		// 选中新增当前这条
		this.setid(newId)
		// 关闭弹窗
		this.onClose()
	}
	// 文本框输入监听并且更新sate
	setPerson(a, b) {
		let person = this.state.person
		person[a] = b
		this.setState({
			person: person
		})
	}
	// 删除人
	removePerson(index, id){
		let name_list = this.state.name_list
		// 删除本地储存里的信息
		this.props.actionList.del_person_info({
			id: id
		})
		name_list.splice(index, 1)
		this.setState({
			name_list: name_list
		}, () => {
			// 删除完成后自动展示下一条数据
			if(this.state.name_list.length) {
				if (this.state.name_list[index]) {
					this.setid(this.state.name_list[index].id)
				} else {
					this.setid(this.state.name_list[0].id)
				}
			} else{
				this.setid(-1)
			}
		})
	}
	render(){
		
		return (
				<div>
					<WingBlank><WhiteSpace size="lg" /><Button type="primary" onClick={this.onShow}>添加成员</Button><WhiteSpace /><WhiteSpace size="lg" /></WingBlank>
					<ul>
						{
							this.state.name_list.map((item, index) => {
								return <li className={this.state.active == item.id ? 'active-li' : ''} key={item.id} id={item.id} onClick={this.setid.bind(this, item.id)}>{item.name}<WhiteSpace size="lg" /><Button type="warning" onClick={this.removePerson.bind(this,index, item.id)}>删除{item.name}</Button><WhiteSpace size="lg" /><WhiteSpace size="lg" /></li>
							})
						}
					</ul>
					
						<Modal 
						onClose={this.onClose}
						popup
						visible={this.state.modalShow}
						animationType="slide-up"
						>
							
							<WingBlank>
								<WhiteSpace size="lg" />
								<WhiteSpace size="lg" />
									<List>
										<InputItem
							            defaultValue={this.state.person.name}
							            clear
							            ref={el => this.autoFocusInst = el}
							            placeholder="请输入名字"
							            onChange={this.setPerson.bind(this, 'name')}
							          >名字</InputItem>

							          <InputItem
							            defaultValue={this.state.person.age}
							            placeholder="请输入年龄"
							            onChange={this.setPerson.bind(this, 'age')}
							          >年龄</InputItem>

							          <Picker
								          data={this.state.sexList}
								          value={this.state.person.defaultSex}
								          cols={1}
								          onChange={this.onChangeSex.bind(this)}
								        >
								          <List.Item arrow="horizontal">性别</List.Item>
								        </Picker>

							          <InputItem
							            defaultValue={this.state.person.height}
							            placeholder="请输入身高"
							            onChange={this.setPerson.bind(this, 'height')}
							          >身高</InputItem>

							          <InputItem
							            defaultValue={this.state.person.address}
							            placeholder="请输入地址"
							            onChange={this.setPerson.bind(this, 'address')}
							          >地址</InputItem>

							          <InputItem
							            defaultValue={this.state.person.wellknownSaying}
							            placeholder="名言名句"
							            onChange={this.setPerson.bind(this, 'wellknownSaying')}
							          >名言</InputItem>

							          <InputItem
							            defaultValue={this.state.person.occupation}
							            placeholder="输入职业"
							            onChange={this.setPerson.bind(this, 'occupation')}
							          >职业</InputItem>

							          <InputItem
							            defaultValue={this.state.person.love}
							            placeholder="输入爱好"
							            onChange={this.setPerson.bind(this, 'love')}
							          >爱好</InputItem>
						          </List>
					            <WhiteSpace size="lg" />
					            <WhiteSpace size="lg" />
					            	<Button type="primary" onClick={this.savePersonInfo}>提交保存</Button><WhiteSpace />
					            <WhiteSpace />
				          </WingBlank>
						</Modal>
					
				</div>
			)
	}
}
const mapStateToProps = function (state) {
	return {
	}
}
const mapDispatchToProps = function (dispatch) {
	return {
		// bindActionCreators把所有的action合并成到actionList对象里面
		actionList: bindActionCreators(get_person_info, dispatch)
	}
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Person))