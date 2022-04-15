
import { Avatar, Comment,Pagination, message, Rate, Tag, Tooltip ,Badge} from "antd";
import service from "auth/FetchInterceptor";
import { useFetch } from "hooks";
import ReactPaginate from 'react-paginate';
import { Table } from 'react-bootstrap';

import moment from "moment";
import React, { useState,useEffect } from "react";
import { useHistory } from "react-router";
import TestError from "../../../auth-views/errors/error-page-2";
import index from "../hotel";
function SearchKeyword() {
  // const { services, refetch, isLoading, isError } = useFetch("complains");
  const [loading, setLoading] = useState(false);
  const history = useHistory();
    const [allChat,setallchat]=useState([])
    const [ paginationInfo,setpaginationInfo]=useState({totalpages:""})
    const handlechange=(data)=>
    {
      console.log("selected",data.selected)
    }
  
  useEffect(async()=>{
    try {
       const Records= await service.get("/web/keyWords/search");
        // openNotificationWithIcon("success");
        // history.push("flashdeals");
        // setSubmitLoading(false);
        console.log("mohahahah",Records)

        setallchat(Records.records)
        setpaginationInfo({totalpages:Records.paginationInfo.totalPages})
      } catch (error) {
        // setSubmitLoading(false);
      }

  },[ ])

  
  
  return (
    <>
          <h3>Search Key Word</h3>

    <Table striped bordered hover title="Search Key Word">
  <thead>
    <tr>
      <th>#Id</th>
      <th>client_name</th>
      <th>Key Words</th>

      <th>created_at</th>
    
    </tr>
  </thead>
  <tbody>
    {allChat.map((data,index)=>{
      // console.log(data.key_word.product)
      const F_date=data.created_at.replace('Z','')
    const E_Date=F_date.replace('T',' ')
      return(
<tr key={index}>
      <td>{data.id}</td>
      <td>{data.client_name}</td>
      <td>{data.key_word.product?<div className="d-flex align-items-center justify-content-start ">
               
                {data.key_word.product}
             </div>:<div className="d-flex align-items-center justify-content-start ">
            {/* null */}
             </div>}</td>

      <td>{ E_Date }</td>
      {/* <td>@mdo</td> */}
    </tr>
      )
    })}
    
   
  </tbody>
</Table>
      <ReactPaginate 
      previousLabel={' previous'}
      nextLabel={'next'}
      breakLabel={'...'}
      pageCount={paginationInfo.totalpages}
      marginPagesDisplayed={3}
      pageRangeDisplayed={6}
      onPageChange={handlechange}
      containerClassName={'pagination pagination-md justify-content-end'}
      pageClassName={'page-item'}
      pageLinkClassName={'page-link'}
      previousClassName={'page-item'}
      previousLinkClassName={'page-link'}
      nextClassName={'page-item'}
      nextLinkClassName={'page-link'}
      breakClassName={'page-item'}
      breakLinkClassName={'page-link'}
      activeClassName={'active'}

      
      />
    </>
  );
}


export default SearchKeyword;
