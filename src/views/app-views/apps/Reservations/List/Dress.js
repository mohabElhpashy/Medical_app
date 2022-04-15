import {
    Badge,
    Menu,
    message,
    Table,
    Tooltip,
    Modal,
    Form,
    DatePicker,
    Select,
    Button,
    Input
  } from "antd";
  import  {PlusOutlined} from "@ant-design/icons";
  import service from "auth/FetchInterceptor";
  import EllipsisDropdown from "components/shared-components/EllipsisDropdown";
  import Flex from "components/shared-components/Flex";
  import { getPaymentStatus, handleChange,handleChange_cLIENT } from "constants/helperFunctions";
  import { useFetch } from "hooks";
  import React, { useState } from "react";
  import { useHistory } from "react-router";
  import utils from "utils";
  import { RESERVATION_STATUS } from "constants/statusConstant";
  import {
    DATE_FORMAT_Farahy,
    DATE_FORMAT_YYYY_MM_DDTHH_mm_ssZ,
  } from "constants/DateConstant";
  import ServiceIdConstants from "constants/ServiceIdConstants";
  import moment from "moment";
  import CustomTable from "../../Components/CustomTable";
  const ListRequests = () => {
    const CURRENT_DATE = moment().format(DATE_FORMAT_Farahy);
  
    const { services, isLoading, refetch, error } = useFetch("dressReservation");
    const dressProdctRes = useFetch("dress");
    const dressVariationRes = useFetch("dressVariation");
  
    const dressVarationList = dressVariationRes.services;
    const dressProdctList = dressProdctRes.services;
    const history = useHistory();
    const inialState = {
      type: null,
      reservation_id: null,
      seller_id: null,
      data: [],
      new_date: "",
    };
    const [statusVisible, setStatusVisible] = useState({
      replace: false,
      rescdual: false,
    });
    const [currentObject, setCurrentObject] = useState({
      type: null,
      reservation_id: null,
      seller_id: null,
      id: null,
      data: [],
      new_date: "",
      new_product_id: "",
      new_variation_id: "",
    });
    const [AddComments,setAddComments]=useState(false)
  const[allComment,setallComment]=useState([])
  const[PostComment,setPostComment]=useState("")
  const[GetRes_id,setGetRes_id]=useState()
    // const handleChange = async (id, type) => {
    //   message.loading({ content: "Loading...", key, duration: 15 });
    //   try {
    //     await service.put(`/web/dressReservation/changeStatus/${id}`, {
    //       status_id: type,
    //     });
    //     refetch();
    //     message.success({ content: "Done!", key, duration: 2 });
    //   } catch (error) {
    //     message.error({ content: "Error Occured!", key, duration: 2 });
    //   }
    // };
  const [Status_Id,setStatus_Id]=useState({value:""})
    const [form] = Form.useForm();
  
    let changeStatus = {};
    const dropdownMenu =  (row) => {
     
      return(
        <Menu>
          <span className=" d-flex align-items-center justify-content-center">
            <h5 className="mt-1">Status</h5>
          </span>
          {row.next_statues !="PICKUP" && row.next_statues !="REFUSED"   ?
          <>
          <Menu.Item
            onClick={() =>
              handleChange(
                row.id,
                "dressReservation",
                row.next_statues.type,   
                           refetch
              )
            }
          >
            <Flex alignItems="center">
              <Badge status="processing" />
                <span className="ml-2">{row.next_statues.name_en}</span><br/>
            </Flex>
          </Menu.Item>
         
           <Menu.Item
            onClick={() =>
              handleChange_cLIENT(
                row.id,
                "dressReservation",
                'REFUSED',  
                 
                           refetch
              )
            }
          >
            <Flex alignItems="center">
              <Badge status="error" />
                <span className="ml-2">Refused By Client</span><br/>
            </Flex>
          </Menu.Item>
  
  
         
           <Menu.Item
            onClick={() =>
              handleChange(
                row.id,
                "dressReservation",
                'REFUSED',   
                refetch
              )
            }
          >
            <Flex alignItems="center">
              <Badge status="error" />
                <span className="ml-2">Refused By Seller</span><br/>
            </Flex>
          </Menu.Item>
          {/* /Can Renew/ */}
          {row.can_renew == true?
          <Menu.Item
            // onClick={() =>
            //   handleChange(
            //     row.id,
            //     "dressReservation",
            //     'REFUSED',   
            //     refetch
            //   )
            // }
          >
            <Flex alignItems="center">
              <Badge status="success" />
                <span className="ml-2">Can Renew</span><br/>
            </Flex>
          </Menu.Item>:
          <Menu.Item
           disabled={true}
           // onClick={() =>
            //   handleChange(
            //     row.id,
            //     "dressReservation",
            //     'REFUSED',   
            //     refetch
            //   )
            // }
          >
            <Flex alignItems="center">
              <Badge status="success" />
                <span className="ml-2">Can Renew</span><br/>
            </Flex>
          </Menu.Item>}
         {/* /can_replace/ */}
         {row.can_replace== true?<Menu.Item
            // onClick={() =>
            //   handleChange(
            //     row.id,
            //     "dressReservation",
            //     'REFUSED',   
            //     refetch
            //   )
            // }
          >
            <Flex alignItems="center">
              <Badge status="success" />
                <span className="ml-2">Can Replace</span><br/>
            </Flex>
          </Menu.Item>:<Menu.Item
          disabled
            // onClick={() =>
            //   handleChange(
            //     row.id,
            //     "dressReservation",
            //     'REFUSED',   
            //     refetch
            //   )
            // }
          >
            <Flex alignItems="center">
              <Badge status="success" />
                <span className="ml-2">Can Replace</span><br/>
            </Flex>
          </Menu.Item>}
            
            {/* /can_replace/ */}
         {row.can_reschedule== true?<Menu.Item
            // onClick={() =>
            //   handleChange(
            //     row.id,
            //     "dressReservation",
            //     'REFUSED',   
            //     refetch
            //   )
            // }
          >
            <Flex alignItems="center">
              <Badge status="success" />
                <span className="ml-2">Can Reschedule</span><br/>
            </Flex>
          </Menu.Item>:<Menu.Item
          disabled
            // onClick={() =>
            //   handleChange(
            //     row.id,
            //     "dressReservation",
            //     'REFUSED',   
            //     refetch
            //   )
            // }
          >
            <Flex alignItems="center">
              <Badge status="success" />
                <span className="ml-2">Can Reschedule</span><br/>
            </Flex>
          </Menu.Item>}
            </>
           : 
           <>
          <Menu.Item  
          disabled
            onClick={() =>
              handleChange(
                row.id,
                "dressReservation",
                row.next_statues.type,   
                           refetch
              )
            }
          >
            <Flex alignItems="center">
              <Badge status="error" />
                <span className="ml-2">Refused By Client</span><br/>
            </Flex>
          </Menu.Item>
  
  
         
           <Menu.Item
           disabled={true}
            onClick={() =>
              handleChange(
                row.id,
                "dressReservation",
                row.next_statues.type,   
                           refetch
              )
            }
          >
            <Flex alignItems="center"  >
              <Badge status="error"  />
                <span   className="ml-2">Refused By Seller</span><br/>
            </Flex>
          </Menu.Item>
          {/* /Can Renew/ */}
          {row.can_renew == true?
          <Menu.Item
            
          >
            <Flex alignItems="center">
              <Badge status="success" />
                <span className="ml-2">Can Renew</span><br/>
            </Flex>
          </Menu.Item>:
          <Menu.Item
           disabled={true}
           
          >
            <Flex alignItems="center">
              <Badge status="success" />
                <span className="ml-2">Can Renew</span><br/>
            </Flex>
          </Menu.Item>}
         {/* /can_replace/ */}
         {row.can_replace== true?<Menu.Item
           
          >
            <Flex alignItems="center">
              <Badge status="success" />
                <span className="ml-2">Can Replace</span><br/>
            </Flex>
          </Menu.Item>:<Menu.Item
          disabled
           
          >
            <Flex alignItems="center">
              <Badge status="success" />
                <span className="ml-2">Can Replace</span><br/>
            </Flex>
          </Menu.Item>}
            
            {/* /can_replace/ */}
         {row.can_reschedule== true?<Menu.Item
           
          >
            <Flex alignItems="center">
              <Badge status="success" />
                <span className="ml-2">Can Reschedule</span><br/>
            </Flex>
          </Menu.Item>:<Menu.Item
          disabled
           
          >
            <Flex alignItems="center">
              <Badge status="success" />
                <span className="ml-2">Can Reschedule</span><br/>
            </Flex>
          </Menu.Item>}
           </>
           }
            
           
    
        
        </Menu>
      );
    }
    const getallComments=async(elm)=>{
      // set reservation id
      setGetRes_id(elm.id)
        try {
            await service.get(`/web/allComments/reservation/${7}/${elm.id}`).then(comment=>{
              // console.log("comment",comment.data)
              setallComment(comment.data)});
              setAddComments(true)
              
            // message.success({ content: "Done!", key, duration: 2 });
          } catch (error) {
            // message.error({ content: "Error Occured!", key, duration: 2 });
          }
      console.log("elm",elm)
    }
    const PostCoMMent=async()=>{
      console.log("PostComment",PostComment)
      try {
        await service.post(`/web/addComment/reservation`,{
          service_id:7,
          reservation_id:GetRes_id,
          comment:PostComment
        });
          setAddComments(false)
        // message.success({ content: "Done!", key, duration: 2 });
      } catch (error) {
        // message.error({ content: "Error Occured!", key, duration: 2 });
      }
    }
    const columns = [
      {
        title: "ID",
        dataIndex: "id",
        key: "id",
        sorter: (a, b) => a.id - b.id,
      },
      {
        title: "Client Name",
        dataIndex: "client_name",
        key: "client_name",
        render: (id) => `${id}`,
        sorter: (a, b) => a.client_name - b.client_name,
      },
      {
        title: "Dress Name",
        dataIndex: "product_name_en",
        key: "product_name_en",
        // sorter: (a, b) => a.store_name.length - b.store_name.length,
        render: (name, obj) => (
          <a
            onClick={() =>
              history.push(
                `/app/apps/dresses/editProduct?name=view&id=${obj.product_id}`
              )
            }
          >
            {name}
          </a>
        ),
      },
      {
        title: "Store",
        dataIndex: "store_name_en",
        key: "store_name_en",
        // sorter: (a, b) => a.store_name.length - b.store_name.length,
        render: (name, obj) => (
          <a
            onClick={() =>
              history.push(
                `/app/apps/dresses/editDressStore?name=view&id=${obj.store_id}`
              )
            }
          >
            {name}
          </a>
        ),
      },
  
      {
        title: "Fit Date",
        dataIndex: "fit_date",
        key: "fit_date",
        sorter: (a, b) => a.fit_date - b.fit_date,
        render: (date) => date.split(" ")[0],
      },
      {
        title: "PickUp Date",
        dataIndex: "pickup_date",
        key: "pickup_date",
        sorter: (a, b) => a.pickup_date - b.pickup_date,
        render: (date) => date.split(" ")[0],
      },
  
      {
        title: "Status",
        dataIndex: "status_id",
        render: (_, record) => (
          <>
            <Badge status={getPaymentStatus(record.status_type)} />
            <span>
              {record.status_type
                .split("")
                .map((element, index) => {
                  if (index > 0) {
                    return element.toLowerCase();
                  } else {
                    return element;
                  }
                })
                .join("")}
            </span>
            {record.status_type === "REFUSED" && (
              <>
                <span style={{ marginLeft: 5, marginRight: 5 }}>By</span>
                <span>
                  {record.action_by
                    .split("")
                    .map((element, index) => {
                      if (index > 0) {
                        return element.toLowerCase();
                      } else {
                        return element;
                      }
                    })
                    .join("")}
                </span>
              </>
            )}
          </>
        ),
        sorter: (a, b) => utils.antdTableSorter(a, b, "status_id"),
      },
      {
        title: "Total Price",
        dataIndex: "total_price",
        key: "total_price",
        render: (price) => `${price} EGP`,
        sorter: (a, b) => a.total_price - b.total_price,
      },
      {
        title: "",
        dataIndex: "actions",
        render: (_, elm) => {
          console.log("my Item=>",elm)
          return(
          <div className="text-right">
            <EllipsisDropdown  menu={dropdownMenu(elm)} />
          </div>
        )}
      },
      {
        title: "Add Comments",
        dataIndex: "actions",
        render: (_, elm) => {
          // console.log("my Item=>",elm)
          return(
          <div className="text-right">
  <Button onClick={()=>getallComments(elm)} ><PlusOutlined /></Button>        </div>
        )}
      },
    ];
  
    return (
      <>
        <CustomTable
          pageTitle="List of Reservations"
          noEditAction
          noDeleteAction
          noAddOption
          editEndPoint="dresses/readReservation"
          dataRender={services}
          coloumRender={columns}
        />
        <Modal
          title={statusVisible.rescdual ? "Reschedule" : "Replace"}
          visible={statusVisible.replace || statusVisible.rescdual}
          destroyOnClose={true}
          okText="Save"
          // afterClose={() => }
          onCancel={() => {
            form.resetFields();
            setStatusVisible(false);
            setCurrentObject(inialState);
          }}
          okButtonProps={{
            disabled: statusVisible.rescdual
              ? !currentObject.new_date
              : !currentObject.new_product_id || !currentObject.new_variation_id,
          }}
          onOk={async () => {
            const key = "Updateable!";
            message.loading({ content: "Loading...", key, duration: 15 });
            const finalObject = statusVisible.rescdual
              ? {
                  type: "reschedule",
                  seller_id: currentObject?.seller_id,
                  reservation_id: currentObject?.id,
                  new_date: currentObject?.new_date,
                }
              : {
                  type: "replace",
                  seller_id: currentObject?.seller_id,
                  reservation_id: currentObject?.id,
                  new_product_id: currentObject?.new_product_id,
                  new_variation_id: currentObject?.new_variation_id,
                };
            try {
              await service.post(
                `web/reservationRequest/${ServiceIdConstants.DRESS_ID}`,
                finalObject
              );
              setStatusVisible(false);
              refetch();
              message.success({ content: "Done!", key, duration: 2 });
            } catch (error) {
              message.error({ content: "Error Occured!", key, duration: 2 });
            }
          }}
        >
          <Form form={form} layout="vertical">
            {statusVisible.rescdual ? (
              <Form.Item required name="new_date" label="New Date">
                <DatePicker
                  disabledDate={(current) =>
                    CURRENT_DATE > current.format(DATE_FORMAT_Farahy)
                  }
                  className="w-100"
                  showTime
                  onOk={(event) => {
                    // console.log(event, "This is the Event");
                    // const offerFrom = moment(event[0]);
                    // console.log(offerFrom?._d.toUTCString(), "TESTTT");
                    // const offerTo = moment(event[1]).format(
                    //   DATE_FORMAT_YYYY_MM_DDTHH_mm_ssZ
                    // );
                    const formatedDate = event?._d.toUTCString();
                    setCurrentObject({
                      ...currentObject,
                      new_date: moment(formatedDate).format(
                        DATE_FORMAT_YYYY_MM_DDTHH_mm_ssZ
                      ),
                    });
                  }}
                />
              </Form.Item>
            ) : (
              <>
                <Form.Item
                  name="new_product_id"
                  required
                  label={<span>Dress &nbsp;</span>}
                >
                  <Select
                    showSearch
                    placeholder="Select a Dress"
                    optionFilterProp="children"
                    onChange={(e) =>
                      setCurrentObject({ ...currentObject, new_product_id: e })
                    }
                    value={currentObject.new_product_id}
                    filterOption={(input, option) =>
                      option.props.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {dressProdctList?.map((element) => (
                      <Select.Option key={element.id} value={element.id}>
                        {element?.name_en}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item
                  name="new_variation_id"
                  required
                  label={<span>Dress Varation &nbsp;</span>}
                >
                  <Select
                    showSearch
                    placeholder="Select a Varation"
                    optionFilterProp="children"
                    onChange={(e) =>
                      setCurrentObject({ ...currentObject, new_variation_id: e })
                    }
                    value={currentObject.new_variation_id}
                    filterOption={(input, option) =>
                      option.props.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {dressVarationList?.map((element) => (
                      <Select.Option key={element.id} value={element.id}>
                        {element?.purchase_type}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </>
            )}
          </Form>
        </Modal>

        <Modal
        title={  "Add Comments" }
        visible={AddComments}
        destroyOnClose={true}
       
        // afterClose={() => }
        onCancel={() => {
          setAddComments(false)
        }}
        okButtonProps={{
          disabled: statusVisible.rescdual
            ? !currentObject.new_date
            : !currentObject.new_product_id || !currentObject.new_variation_id,
        }}
        // onOk={async () => {
        //   const key = "Updateable!";
        //   message.loading({ content: "Loading...", key, duration: 15 });
        //   const finalObject = statusVisible.rescdual
        //     ? {
        //         type: "reschedule",
        //         seller_id: currentObject?.seller_id,
        //         reservation_id: currentObject?.id,
        //         new_date: currentObject?.new_date,
        //       }
        //     : {
        //         type: "replace",
        //         seller_id: currentObject?.seller_id,
        //         reservation_id: currentObject?.id,
        //         new_product_id: currentObject?.new_product_id,
        //         new_variation_id: currentObject?.new_variation_id,
        //       };
        //   try {
        //     await service.post(
        //       `web/reservationRequest/${ServiceIdConstants.DRESS_ID}`,
        //       finalObject
        //     );
        //     setStatusVisible(false);
        //     refetch();
        //     message.success({ content: "Done!", key, duration: 2 });
        //   } catch (error) {
        //     message.error({ content: "Error Occured!", key, duration: 2 });
        //   }
        // }}
      >
        <div  style={{display:"flex",flexDirection:"column" ,height:"200px",overflowY:"scroll",padding:"5px"}}>
        {allComment!=""?allComment.map((dta,index)=>{
      return(
        <>
        <div style={{display:"flex",justifyContent:"space-evenly",marginBottom:"3px"}}>
          <div><span>Email:</span><span style={{ textDecoration: "underline"}}>{dta.admin.email}</span></div>
          <div><span>Date:</span><span style={{ textDecoration: "underline"}}>{dta.updated_at.slice(0, 10)}</span></div>

        </div>
        <Form.Item
        required
        name="description_ar"
       
      >
        <div key={index}>
        <Input.TextArea
          // placeholder="Enter the Description in Arabic"
          // onChange={(event) =>
          //   props.setPostObject({
          //     ...props.postObject,
          //     description_ar: event.target.value,
          //   })
          // }
          disabled
          defaultValue={dta.comment}
          rows={4}
        />
        </div>
      </Form.Item>
      </> 
      )
    }):<h1>No Comments Added</h1>}
    
       
        </div>
        <div  style={{display:"flex",flexDirection:"column"}}>
    <Form.Item
        required
        name="description_ar"
        // label="Description in Arabic"
       
      >
        <Input.TextArea
          placeholder="Enter Your Comments "
          // onChange={(event) =>
          //   props.setPostObject({
          //     ...props.postObject,
          //     description_ar: event.target.value,
          //   })
          // }
          onChange={(e)=>setPostComment( e.target.value)}
          rows={4}
        />
      </Form.Item>
      <Button onClick={PostCoMMent} type="primary">POST</Button>
    </div>
   
    
              
       </Modal>
      </>
    );
  };
  
  export default ListRequests;
  