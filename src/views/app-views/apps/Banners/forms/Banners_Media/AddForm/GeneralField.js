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
Button
} from "antd";
import { ImageSvg } from "assets/svg/icon";
import service from "auth/FetchInterceptor";
import Flex from "components/shared-components/Flex";
import CustomIcon from "components/util-components/CustomIcon";
import { add, indexOf } from "lodash";
import React, { useEffect, useState } from "react";
import index from "views/app-views/apps/doctors";


const { Dragger } = Upload;
const { Option } = Select;
const main=[]
const listofserviceProvider=[]
console.log("main",main)







const GeneralField = ({
  category,
  setPostObject,
  postObject,
  
  uploadLoading,
  serviceProvider


  

}) => {

  console.log("service_provider_id",postObject)

  const [Products, setProducts] = useState([]);
  const [TargetType,setTargetType]=useState({value:""})

  const  service=[  "home", "product" ,"seller" ,"service" ,"flashdeals" ,"offers" ]
useEffect(()=>{
  console.log("mohab",TargetType)
},[TargetType])
 
  return (
    <Row gutter={16}>
      <Col xs={24} sm={24} md={17}>
        <Card title="Basic Info">
          <Form.Item
            required
            hasFeedback
            style={{
              display: "inline-block",
              width: "calc(50% - 5px)",
              marginRight: 8,
            }}
            name="name_ar"
            label="Name in Arabic"
            // rules={[
            //   feildChecker.name_ar
            //     ? []
            //     : ({ getFieldValue }) => ({
            //         validator(_, value) {
            //           const checkValidation = languageValidator(
            //             value,
            //             ARABIC_alpha
            //           );
            //           if (checkValidation) {
            //             props.setButtonChecker(true);
            //             return Promise.resolve();
            //           } else {
            //             props.setButtonChecker(false);
            //             return Promise.reject(
            //               "Please enter The Name in Arabic"
            //             );
            //           }
            //         },
            //       }),
            // ]}
          >
            <Input
              name="name_ar"
              // disabled={props.checkView}
              // defaultValue={props.postObject.name_ar}
              // onPressEnter={(e) => e.preventDefault()}
              onChange={(event) => {
                // setFieldChecker({ ...feildChecker, name_ar: false });
                 setPostObject({
                 ...postObject,
                 name_ar: event.target.value,
                });
              }}
              placeholder="Please enter serviceProvider Name in Arabic"
            />
          </Form.Item>

          <Form.Item
            style={{
              display: "inline-block",
              width: "calc(50% - 5px)",
            }}
            hasFeedback
            required
            name="name_en"
            label="Name in English"
            // rules={[
            //   feildChecker.name_en
            //     ? []
            //     : ({ getFieldValue }) => ({
            //         validator(_, value) {
            //           const checkValidation = languageValidator(
            //             lowerCase(value),
            //             ENGLISH_ALPH
            //           );
            //           if (checkValidation) {
            //             props.setButtonChecker(true);
            //             return Promise.resolve();
            //           } else {
            //             props.setButtonChecker(false);
            //             return Promise.reject(
            //               "Please enter The Name in English"
            //             );
            //           }
            //         },
            //       }),
            // ]}
          >
            <Input
              name="name_en"
              // disabled={props.checkView}
              onPressEnter={(e) => e.preventDefault()}
              // defaultValue={props.postObject.name_en}
              onChange={(event) => {
                // setFieldChecker({ ...feildChecker, name_en: false });
                setPostObject({
                  ...postObject,
                  name_en: event.target.value,
                });
              }}
              placeholder="Please enter serviceProvider Name in English"
            />
          </Form.Item>

          <Form.Item
            required
            hasFeedback
            name="description_ar"
            label="Description in Arabic"
            // rules={[
            //   feildChecker.description_ar
            //     ? []
            //     : ({ getFieldValue }) => ({
            //         validator(_, value) {
            //           const checkValidation = languageValidator(
            //             value,
            //             ARABIC_alpha
            //           );
            //           if (checkValidation) {
            //             props.setButtonChecker(true);
            //             return Promise.resolve();
            //           } else {
            //             props.setButtonChecker(false);
            //             return Promise.reject(
            //               "Please enter The Description in Arabic"
            //             );
            //           }
            //         },
            //       }),
            // ]}
          >
            <Input.TextArea
              name="description_ar"
              // disabled={props.checkView}
              placeholder="Enter the Description in Arabic"
              // defaultValue={props.postObject.description_ar}
              onChange={(event) => {
                // setFieldChecker({ ...feildChecker, description_ar: false });
                 setPostObject({
                  ...postObject,
                  description_ar: event.target.value,
                });
              }}
              rows={4}
            />
          </Form.Item>

          <Form.Item
            required
            hasFeedback
            name="description_en"
            label="Description in English"
            // rules={[
            //   feildChecker.description_en
            //     ? []
            //     : ({ getFieldValue }) => ({
            //         validator(_, value) {
            //           const checkValidation = languageValidator(
            //             lowerCase(value),
            //             ENGLISH_ALPH
            //           );
            //           if (checkValidation) {
            //             props.setButtonChecker(true);
            //             return Promise.resolve();
            //           } else {
            //             props.setButtonChecker(false);
            //             return Promise.reject(
            //               "Please enter The Description in English"
            //             );
            //           }
            //         },
            //       }),
            // ]}
          >
            <Input.TextArea
              name="description_en"
              // disabled={props.checkView}
              placeholder="Enter the Description in English"
              // defaultValue={props.postObject.description_en}
              onChange={(event) => {
                // setFieldChecker({ ...feildChecker, description_en: false });
                setPostObject({
                  ...postObject,
                  description_en: event.target.value,
                });
              }}
              rows={4}
            />
          </Form.Item>
          <Form.Item
            style={{
              display: "inline-block",
              width: "calc(100% - 5px)",
            }}
            hasFeedback
            required
            name="Price"
            label="Price"
            // rules={[
            //   feildChecker.name_en
            //     ? []
            //     : ({ getFieldValue }) => ({
            //         validator(_, value) {
            //           const checkValidation = languageValidator(
            //             lowerCase(value),
            //             ENGLISH_ALPH
            //           );
            //           if (checkValidation) {
            //             props.setButtonChecker(true);
            //             return Promise.resolve();
            //           } else {
            //             props.setButtonChecker(false);
            //             return Promise.reject(
            //               "Please enter The Name in English"
            //             );
            //           }
            //         },
            //       }),
            // ]}
          >
            <Input
              name="Price"
              // disabled={props.checkView}
              addonAfter="EGP"
              onPressEnter={(e) => e.preventDefault()}
              // defaultValue={props.postObject.name_en}
              onChange={(event) => {
                // setFieldChecker({ ...feildChecker, name_en: false });
                setPostObject({
                  ... postObject,
                  price: event.target.value,
                });
              }}
              placeholder="Please enter Price"
            />
          </Form.Item>
          <Form.Item
            name="agency_id"
            required
            label={<span>service Provider&nbsp;</span>}
          >
            <Select
              showSearch
              // disabled={props.checkView}
              name="serviceProvider"
              // defaultValue={props.postObject.agency_id}
              placeholder="Select a service Provider"
              optionFilterProp="children"
              onChange={(e) =>
                setPostObject({ ... postObject, service_provider_id: e })
              }
              // value={props.postObject.agency_id}
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
            >
              {serviceProvider?.map((element) => (
                <Option key={element.id} value={element.id}>
                  {element?.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          
        
          
        </Card>
      </Col>
      <Col xs={24} sm={24} md={7}>
        <Card title="Media">
          <Form.Item required label="Main Image">
            <Dragger
              // disabled={props.checkView}
              name="main_image"
              // {...imageUploadProps}
              // customRequest={(options) => uploadHandler(options, "main_image")}
            >
              {/* {
              props.postObject.main_image ? (
                <img
                  src={
                    props.postObject.custom_image
                      ? props.postObject.custom_image
                      : props.postObject.main_image
                  }
                  alt="avatar"
                  className="img-fluid"
                />
              ) 
              : (
                <div>
                  {props.postObject.custom_image ? (
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
              )} */}
            </Dragger>
          </Form.Item>
        

          {/* <Modal
            visible={singleImage.length > 0}
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

      </Col>
    </Row>
  );
};

export default GeneralField;
