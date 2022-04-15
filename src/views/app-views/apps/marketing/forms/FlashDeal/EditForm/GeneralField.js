import { Card, Form, Input, Row, Select, Upload,
  DatePicker,Col,Table} from "antd";
import React, { useState } from "react";
import { languageValidator, numberValidator } from "constants/helperFunctions";
import moment from "moment";
import { DATE_FORMAT_YYYY_MM_DDTHH_mm_ssZ } from "constants/DateConstant";
import { ImageSvg } from "assets/svg/icon";
import { DeleteOutlined, LoadingOutlined } from "@ant-design/icons";
import CustomIcon from "components/util-components/CustomIcon";

import {
  ARABIC_alpha,
  ENGLISH_ALPH,
  NUMBER_CONSTANTS,
} from "constants/LanguagesConstent";
import { lowerCase } from "lodash";
const { Dragger } = Upload;
const col = (service_id, setSingleImage) => {
  console.log("service id ",service_id)
  return[
  {
    title: "ID",
    
    key: "id",
    render: (_, obj) => `# ${obj.variation_id ? obj.variation_id : obj.id}`,
  },
  {
    title: "Product Name Ar",
    dataIndex: "product_name_ar",
    key: "product_name_ar",
    // sorter: (a, b) => a.product_name.length - b.product_name.length,
  },

  
  {
    title: "product_name_en ",
    dataIndex: "product_name_en",
    key: "product_name_en",
   
  },
  {
    title: "Price",
    dataIndex: "product_default_price",
    key: "product_default_price",
    render: (product_default_price) => `${product_default_price} EGP`,
  },
  {
    title: "discount",
    dataIndex: "discount",
    key: "discount",
    render: (discount) => `${discount} %`,
  },
  {
    title: "New Price",
    dataIndex: "new_price",
    key: "new_price",
    render: (new_price) => `${new_price} EGP`,
  },
  {
    title: "Total Capacity",
    dataIndex: "total_capacity",
    key: "total_capacity",
  },
  // {
  //   title: "Price",
  //   dataIndex: "price",
  //   key: "price",
  //   render: (price) => `${price} EGP`,
  // },
]; }
const ListOfProducts = ({
  name,
  col,
  data,
  setPostObject,
  postObject,
  setCurrentPrice,
  setPRODUCT,
  setALL_Products,

  PRODUCT
}) => {
  const [singleImage, setSingleImage] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [Product_details,setProduct_details]=useState({total_capacity:"",discount:"",product_id:"",variation_id:"",available_from:"",available_to:""});
  const [oldprice,setoldprice]=useState({value:""});


   
 
  return (
    <>
      <Table
        // title={() => (
        //   <Search
        //     setCurrentList={setCurrentList}
        //     prevousState={data}
        //     url={''}
        //   />
        // )}
        // rowSelection={{
        //   type: "checkbox",
        //   onSelect:(index,data)=>handlech(index)
            
        //   ,
        
        //   getCheckboxProps: (record) => ({
        //     onClick: (t) => alert(record.id),
        //   }),
        // }}
        columns={col(postObject?.service_id, setSingleImage)}
        dataSource={data}
        rowKey={(item) => (item.variation_id ? item.variation_id : item.id)}
      />
    
      
    </>
  );
};

const GeneralField = ({
  postObject,
  setPostObject,
  checkViewMode,
  MyProducts,
  servicesList,
  setButtonChecker,
}) => {
  const [feildChecker, setFieldChecker] = useState({
    number: true,
    subject_ar: true,
    subject_en: true,
    body_ar: true,
    body_en: true,
    capacity:null
  });
  // console.log("service list =>>>>>",postObject)
  return (
    <>
    <Row xs={24} sm={24} md={17}>
    <Col xs={24} sm={24} md={17}>
    <Card title="Basic Info" className="w-100">
        <Form.Item
          name="subject_ar"
          label="Subject in Arabic:"
          hasFeedback
          required
          onPressEnter={(e) => e.preventDefault()}
          rules={[
            feildChecker.subject_ar
              ? []
              : ({ getFieldValue }) => ({
                  validator(_, value) {
                    const checkValidation = languageValidator(
                      value,
                      ARABIC_alpha
                    );
                    if (checkValidation) {
                      setButtonChecker(true);
                      return Promise.resolve();
                    } else {
                      setButtonChecker(false);
                      return Promise.reject(
                        "Please enter The Subject in Arabic"
                      );
                    }
                  },
                }),
          ]}
          style={{
            display: "inline-block",
            width: "calc(50% - 5px)",
            marginRight: 8,
          }}
        >
          <Input
            placeholder="Please enter the Subject in Arabic"
            defaultValue={postObject?.name_ar}
            disabled={checkViewMode}
            onChange={(e) => {
              setPostObject({ ...postObject, subject_ar: e.target.value });
              setFieldChecker({ ...feildChecker, subject_ar: false });
            }}
            onPressEnter={(e) => e.preventDefault()}
          />
        </Form.Item>
        <Form.Item
          hasFeedback
          name="subject_en"
          label="Subject in English:"
          required
          rules={[
            feildChecker.subject_en
              ? []
              : ({ getFieldValue }) => ({
                  validator(_, value) {
                    const checkValidation = languageValidator(
                      lowerCase(value),
                      ENGLISH_ALPH
                    );
                    if (checkValidation) {
                      setButtonChecker(true);
                      return Promise.resolve();
                    } else {
                      setButtonChecker(false);
                      return Promise.reject(
                        "Please enter The Subject in English"
                      );
                    }
                  },
                }),
          ]}
          style={{ display: "inline-block", width: "calc(50% - 5px)" }}
        >
          <Input
            onPressEnter={(e) => e.preventDefault()}
            disabled={checkViewMode}
            defaultValue={postObject?.name_en}
            onChange={(e) => {
              setPostObject({ ...postObject, subject_en: e.target.value });
              setFieldChecker({ ...feildChecker, subject_en: false });
            }}
            placeholder="Please enter the Subject in English"
          />
        </Form.Item>

      
         <Form.Item required name="offer_date" label="Offer Period">
            <DatePicker.RangePicker
              className="w-100"
              showTime
              disabled={checkViewMode}
              defaultValue={[
                moment(
                  postObject?.end_date,
                  DATE_FORMAT_YYYY_MM_DDTHH_mm_ssZ
                ),
                moment(
                  postObject?.start_date,
                  DATE_FORMAT_YYYY_MM_DDTHH_mm_ssZ
                ),
              ]}
              onOk={(event) => {
                const offerFrom = moment(event[0]).format(
                  DATE_FORMAT_YYYY_MM_DDTHH_mm_ssZ
                );
                const offerTo = moment(event[1]).format(
                  DATE_FORMAT_YYYY_MM_DDTHH_mm_ssZ
                );
                setPostObject({
                  ...postObject,
                  offer_to: postObject.end_date,
                  offer_from: postObject.start_date,
                });
              }}
            />
          </Form.Item>
      </Card>
    </Col>
     
      <Col xs={24} sm={24} md={7}>
        <Card title="Product Image" style={{ marginLeft: 15 }}>
          <Form.Item required label="Main Image">
            <Dragger
              showUploadList={false}
              name="main_image"
              // customRequest={(options) => uploadHandler(options, "main_image")}
              disabled={checkViewMode}
            >
              {postObject?.main_image ? (
                <img
                  src={postObject?.main_image}
                  alt="avatar"
                  className="img-fluid"
                  style={{ maxHeight: 200 }}
                />
              ) : (
                <div>
                  {postObject.main_image ? (
                    <div>
                      <LoadingOutlined className="font-size-xxl text-primary" />
                      <div className="mt-3">Uploading</div>
                    </div>
                  ) : (
                    <div>
                      <CustomIcon className="display-3" svg={ImageSvg} />
                      <p>Clic k or drag file to upload</p>
                    </div>
                  )}
                </div>
              )}
            </Dragger>
          </Form.Item>
        </Card>
      </Col>
     

    </Row>
    <Row gutter={12}>
              <Col xs={24} sm={24} md={17} lg={17}>
              <Card title={"My Products"}>
          <ListOfProducts
            col={col}
            data={MyProducts}
            
     
          />
        </Card>
      
      </Col>
          
            </Row>
    

    
    </>
    
  );
};

export default GeneralField;
