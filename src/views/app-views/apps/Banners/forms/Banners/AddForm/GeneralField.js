import { DeleteOutlined, LoadingOutlined } from "@ant-design/icons";
import {
  Card,
Col,
DatePicker,
Form,
Input,
Modal,
Row,
Select,
Table,
Upload,
message,
Button,
Tabs 
} from "antd";
import { ImageSvg } from "assets/svg/icon";
import service from "auth/FetchInterceptor";
import CustomIcon from "components/util-components/CustomIcon";
import { add, indexOf } from "lodash";
import React, { useEffect, useState } from "react";
import index from "views/app-views/apps/doctors";
import { useFetch } from "hooks";


const { Dragger } = Upload;
const { Option } = Select;



const rules = {
  name: [
    {
      required: true,
      message: "Please enter name",
    },
  ],
  description: [
    {
      required: true,
      message: "Please enter product description",
    },
  ],
  price: [
    {
      required: true,
      message: "Please enter product price",
    },
  ],
  ratio_discount:[
    {
      required: true,
      message: "Please enter ratio discount",
    }
  ],
  comparePrice: [],
  taxRate: [
    {
      required: true,
      message: "Please enter tax rate",
    },
  ],
  cost: [
    {
      required: true,
      message: "Please enter item cost",
    },
  ],
  capacity: [
    {
      required: true,
      message: "Please enter capacity",
    },
  ],
  discount: [
    {
      required: true,
      message: "Please enter discount",
    },
  ],
};

const { TabPane } = Tabs;
const col = (service_id, setSingleImage) => {
  // console.log("service id",service_id.id)

  return[
  {
    title: "ID",
    
    key: "id",
    render: (_, obj) => `# ${obj.variation_id ? obj.variation_id : obj.id}`,
  },
  {
    title: "Name",
    dataIndex: "product_name",
    key: "product_name",
    // sorter: (a, b) => a.product_name.length - b.product_name.length,
  },

  service_id == 7
    ? {   
        title: "Purchase Type",
        key: "variation_type",
        render: (_, obj) => `${obj.variation_type}`,
      }
    : service_id == 1
    ? {
        title: "Number of Hours",
        key: "VariationType",
        render: (_, obj) => `${obj.variation_type} Hours`,
      }
    : service_id == 6
    ? {
        title: "Number of Days",
        key: "VariationType",
        render: (_, obj) => `${obj.variation_type} Days`,
      }
    : service_id == 2
    ? {
        title: "Varation Name",
        key: "VariationType",
        render: (_, obj) => `${obj.variation_type}`,
      }
    : {},
  {
    title: "Main Image ",
    dataIndex: "main_image",
    key: "main_image",
    render: (text, obj) => {
      return (
        <Upload
          disabled={true}
          // fileList={props?.postObject?.images}
          fileList={[
            {
              uid: obj.id,
              name: obj.name_en,
              status: "done",
              url: obj.main_image,
            },
          ]}
          onPreview={(t) => setSingleImage(obj.main_image)}
          listType="picture-card"
        />
      );
    },
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
    render: (price) => `${price} EGP`,
  },
  // {
  //   title: "Price",
  //   dataIndex: "price",
  //   key: "price",
  //   render: (price) => `${price} EGP`,
  // },
]; }

 

const GeneralField = ({
  // category,
  // setPostObject,
  // postObject,
  
  // uploadLoading,
  setPostObject,
  postObject

  

}) => {
  
  const imageUploadProps = {
    name: "file",
    listType: "picture-card",
    showUploadList: false,
  };
  const uploadHandler = async (e,name) => {
    const key = "updatable";
    message.loading({ content: "Loading...", key, duration: 0.5 });
    console.log("options",e.target.files)
    const data=[]
    data.push(e.target.files[0])
    let x=data.map(file=>URL.createObjectURL(file))
    // const imageObject = {file: options.file };
    const formate_data = new FormData();
    console.log("e.target.files",e.target.files[0])
      try {
      
      // message.success({
      //   content: `${test.fileName} Uploaded Successfully!`,
      //   key,
      //   duration: 2,
      // });
      formate_data.append('image',e.target.files[0])

    
      
      if (name === "main_image") {
       setPostObject({ 
          ... postObject,
          icon: formate_data,
          preview_image: x[0],
        });
      } 
      // else {
      //   props.setPostObject({
      //     ...props.postObject,
      //     images: [
      //       ...props.postObject.images,
      //       {
      //         id: Math.floor(Math.random() * 10000),
      //         image: test.file_url,
      //       },
      //     ],
      //   });
      // }
    } catch (error) {
      // message.error({ content: ` Error!`, key, duration: 2 });
    }
  };
  const handleSubmit = (e) => {
     // const formData = new FormData();
    // formData.append("selectedFile", event.target.files[0]);
     // try {
    //   if(e.target&&e.target.files[0]){
    //     // console.log("e",e.target.files[0])
        // formData.append('file', e.target.files);
        // console.log("form data",formData)
    //      formData.append("username", "Groucho");
    //     formData.append("accountnum", 123456);
    //     formData.forEach(v=>console.log(v.File))

    //   let x=formData.get("file") // Groucho
        setPostObject({ 
          ... postObject,
          icon: e.target.files[0],
          preview_image: URL.createObjectURL(e.target.files[0]),
        });
    //   }
     

    // } catch(error) {
    //   console.log(error)
    // }
  }
 
   
  return (
    <Row gutter={16} style={{marginTop:"88px"}}>
      <Col xs={24} sm={24} md={17}>
        <Card title="Basic Info">
          <Form.Item
            required
            style={{
              display: "inline-block",
              width: "calc(50% - 5px)",
              marginRight: 8,
            }}
            name="name_ar"
            label="Name in Arabic"
            hasFeedback
            // rules={[
            //   ({ getFieldValue }) => ({
            //     validator(_, value) {
            //       const checkValidation = languageValidator(
            //         value.toLowerCase(),
            //         ARABIC_NUMBER_CHAR
            //       );
            //       if (checkValidation) {
            //         return Promise.resolve();
            //       } else {
            //         return Promise.reject("Please enter The Name in Arabic");
            //       }
            //     },
            //   }),
            // ]}
          >
            <Input
              name="name_ar"
              onPressEnter={(e) => e.preventDefault()}
              onChange={(event) =>
                setPostObject({
                  ...postObject,
                  name_ar: event.target.value,
                })
              }
              placeholder="Please enter Product Name in Arabic"
            />
          </Form.Item>

          <Form.Item
            style={{
              display: "inline-block",
              width: "calc(50% - 5px)",
            }}
            required
            name="name_en"
            label="Name in English"
            hasFeedback
            // rules={[
            //   ({ getFieldValue }) => ({
            //     validator(_, value) {
            //       const checkValidation = languageValidator(
            //         value.toLowerCase(),
            //         ENGLISH_Number_CHAR
            //       );
            //       if (checkValidation) {
            //         return Promise.resolve();
            //       } else {
            //         return Promise.reject("Please enter The Name in English");
            //       }
            //     },
            //   }),
            // ]}
          >
            <Input

              onPressEnter={(e) => e.preventDefault()}
              onChange={(event) =>
                setPostObject({
                  ...postObject,
                  name_en: event.target.value,
                })
              }
              placeholder="Please enter Product Name in English"
            />
          </Form.Item>

           
 
          
        </Card>
      </Col>
      <Col xs={24} sm={24} md={7}>
        <Card title="Media">
          <Form.Item required label="Main Image">
            <Dragger
              name="main_image"
              {...imageUploadProps}
              // customRequest={(options) => uploadHandler(options, "main_image")}
            >
              { postObject.icon ? (
                <img
                  src={postObject.preview_image}
                  alt="avatar"
                  className="img-fluid"
                />
              ) : (
                <div>
                  {postObject.icon ? (
                    <div>
                      <LoadingOutlined className="font-size-xxl text-primary" />
                      <div className="mt-3">Uploading</div>
                    </div>
                  ) : (
                    <div>
                      <CustomIcon className="display-3" svg={ImageSvg} />
                      <p>Click or drag file to upload</p>
                    </div>
                  )}
                </div>
              )}
            </Dragger>
          </Form.Item>
          {/* <input type="file" onChange={(e)=>uploadHandler(e,"main_image")}/> */}
          <input type="file"  name="image" onChange={handleSubmit}/>


          {/* <Modal
            // visible={singleImage.length > 0}
            footer={null}
            onCancel={() => setSingleImage("")}
          >
            <img
              alt="image"
              style={{ width: "100%", height: 350 }}
              src={singleImage}
            />
          </Modal> */}
        </Card>
        {/* <Card title="Organization">
          <Form.Item name="details" label="Details">
            <Select
              optionFilterProp="children"
              onChange={(e) =>
                props.setPostObject({ ...props.postObject, details: e })
              }
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
              style={{ width: "100%" }}
              placeholder="Please Select a Detail"
            >
              {props.gerericDetailesList?.map((elm) => (
                <Option value={elm.id} key={elm.id}>
                  {elm.name_en}
                </Option>
              ))}
            </Select>
          </Form.Item>
          
        </Card> */}
      </Col>
    </Row>
  );
};

export default GeneralField;
