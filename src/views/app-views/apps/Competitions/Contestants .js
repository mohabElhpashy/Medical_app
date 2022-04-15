


import { Avatar, Comment, message, Rate, Table, Tag, Tooltip ,Badge} from "antd";
import service from "auth/FetchInterceptor";
import { useFetch } from "hooks";
import moment from "moment";
import React, { useState,useEffect } from "react";
import { useHistory } from "react-router";
import TestError from "../../../auth-views/errors/error-page-2";
function ChatRoom() {
  // const { services, refetch, isLoading, isError } = useFetch("complains");
  const [loading, setLoading] = useState(false);
  const history = useHistory();
    const [allChat,setallchat]=useState([])
  
  useEffect(async()=>{
    try {
       const Records= await service.get("/web/competition/clients")
        // openNotificationWithIcon("success");
        // history.push("flashdeals");
        // setSubmitLoading(false);
        setallchat(Records.record)
      } catch (error) {
        // setSubmitLoading(false);
      }
  },[])

  
  // if (isError) {
  //   <TestError />;
  // }
  const columns = [
    {
      title: "contestant id",
      dataIndex: "client_id",
      key: "client_id",
      render: (client_id) => `# ${client_id}`,
    },
    {
      title: "contestant Name",
      dataIndex: "client_full_name",
      key: "client_full_name",
      render: (text, Obj) => (
        <Comment
          actions={[
            <span key=' key="comment-basic-dislike"'>
             
            </span>,
          ]}
     
          content={
          // <p>{Obj.seller_first_name}{" "}{Obj.seller_last_name}</p>
          (
            <a
              onClick={() =>{
               
            history.push(`ReadClient?name=view&id=${Obj.client_id}`)
              }
              }
              
            >
              {/* {Obj.first_name || Obj.first_name +Obj.last_name} */}
              {Obj.client_full_name}
            </a>
          )

        }
        
        />
      ),

    //   render: (text, Obj) => (
    //     <Comment
    //       actions={[
    //         <span key=' key="comment-basic-dislike"'>
             
    //         </span>,
    //       ]}
     
    //       content={<p>{Obj.client_first_name}{" "}{Obj.client_last_name}</p>}
        
    //     />
    //   ),
    },

    {
        title: "Contestant Number",
        dataIndex: "contestant_number",
        key: "contestant_number",
  
      //   render: (text, Obj) => (
      //     <Comment
      //       actions={[
      //         <span key=' key="comment-basic-dislike"'>
               
      //         </span>,
      //       ]}
       
      //       content={<p>{Obj.client_first_name}{" "}{Obj.client_last_name}</p>}
          
      //     />
      //   ),
      },
      {
        title: "Competition Name",
        dataIndex: "competition_name_en",
        key: "competition_name_en",
  
      //   render: (text, Obj) => (
      //     <Comment
      //       actions={[
      //         <span key=' key="comment-basic-dislike"'>
               
      //         </span>,
      //       ]}
       
      //       content={<p>{Obj.client_first_name}{" "}{Obj.client_last_name}</p>}
          
      //     />
      //   ),
      },
      {
        title: "Number Of register",
        dataIndex: "client_count",
        key: "client_count",
  
    
      },
    ,
  ];
  return (
    <>
      <Table
        tableLayout="auto"
        rowKey={(item) => item.id?.toString()}
        columns={columns}
        bordered
        dataSource={allChat}
        title={() => <h2> Contestants </h2>}
      ></Table>
    </>
  );
}

export default ChatRoom;
