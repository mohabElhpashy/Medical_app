 import InnerAppLayout from 'layouts/inner-app-layout';
import ChatContent from './ChatContent';
import ChatMenu from './ChatMenu';

import React, { useEffect, useState } from 'react'
 import service from "auth/FetchInterceptor";

const Chat = props => {
	const [list, setList] = useState([]);

	useEffect(async()=>{
		try {
		   const Records= await service.get("/web/chat_rooms");
			 console.log("Records.records",Records.records)
			setList(Records.records)
		  } catch (error) {
			// setSubmitLoading(false);
		  }
	  },[ ])
	return (
		<div className="chat">
			<InnerAppLayout 
				sideContent={<ChatMenu data={list} {...props}/>}
				mainContent={<ChatContent {...props}/>}
				sideContentWidth={450}
				sideContentGutter={false}
				border
			/>
		</div>
	)
}

export default Chat
