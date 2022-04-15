import React, { useEffect, useState } from 'react'
import ChatData from "assets/data/chat.data.json"
import { Badge, Input } from 'antd';
import AvatarStatus from 'components/shared-components/AvatarStatus';
import { COLOR_1 } from 'constants/ChartConstant';
import { SearchOutlined,UserOutlined   } from '@ant-design/icons';
import { useHistory } from "react-router-dom";
import service from "auth/FetchInterceptor";
import IMG from '../../../../../../src/Capture_______.PNG'



const ChatMenu = ({ match, location,data }) => {
	const [list, setList] = useState([]);
	console.log("ChatData",ChatData)
	const x=[  {client_first_name :"mohab",seller_first_name:"mohamed",
created_at:"mohasdh"}]

	let history = useHistory();
	const openChat = id => {
		const data = list.map( elm => {
			if(elm.id === id) {
				elm.unread = 0
			}
			return elm
		})
		setList(data)
		history.push(`${match.url}/${id}`)
	}

	const searchOnChange = e => {
		const query = e.target.value;
		const data = ChatData.filter(item => {
			return query === ''? item : item.name.toLowerCase().includes(query)
		})
		setList(data)
	}

	const id = parseInt(location.pathname.match(/\/([^/]+)\/?$/)[1])
	
	return (
		<div className="chat-menu">
			<div className="chat-menu-toolbar">
				<Input 
					placeholder="Search" 
					onChange={searchOnChange}
					prefix={
						<SearchOutlined className="font-size-lg mr-2"/>
					}
				/>
			</div>
			<div className="chat-menu-list">
				{
					data.map( (item, i) => (
						<div 
							key={`chat-item-${item.id}`} 
							onClick={() => openChat(item.conversation_id)} 
							className={`chat-menu-list-item ${i === (list.length - 1)? 'last' : ''} ${item.id === id? 'selected' : ''}`}
						>
							<AvatarStatus src={IMG} name={`${item.client_first_name} ==>${item.seller_first_name}`}
							//  subTitle={item.msg[item.msg.length - 1].text}
							 />
							<div className="text-right">
								<div className="chat-menu-list-item-time">{item.created_at}</div>
								{item.begin_chat ? <span></span> : <Badge  status="error" />}
							</div>
						</div>
					))
				}
			</div>
		</div>
	)
}

export default ChatMenu
