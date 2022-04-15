import React, { useState, useEffect } from "react";
import { useFetch } from "hooks";
import { useHistory } from "react-router";
// import { Avatar, Comment, message, Rate, Table, Tag, Tooltip ,Badge} from "antd";

import { Link } from "react-router-dom";
import CustomTable from "../Components/CustomTable";
import { Modal, Upload,Badge,Tag,message } from "antd";
import service from "auth/FetchInterceptor";

const Banner = () => {
  const { services, refetch, isLoading, error, isSuccess } =
    useFetch("serviceProvider");
  const [singleImage, setSingleImage] = useState("");
  const changeStatus = async (record) => {
    const key = "updatable!";
    message.loading({ content: "Loading...", key, duration: 15 });

    try {
      await service.put(`/serviceProvider/changeStatues/${record.id}`);
      refetch();
      message.success({ content: "Done!", key, duration: 2 });
    } catch (error) {
      message.error({ content: "Error Occured!", key, duration: 2 });
    }
  };
   
  const [currentList, setCurrentList] = useState([]);
  console.log("lisisisisis",services)
  useEffect(() => setCurrentList(services), [isSuccess, services]);

  const history = useHistory();

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
       {
      title: "Name",
      dataIndex: "name",
      key: "name",
      // render: (text, obj) => {
      //   return (
      //     <Upload
      //       disabled={true}
      //       fileList={[
      //         {
      //           uid: obj.id,
      //           name: obj.image_en,
      //           status: "done",
      //           url: obj.image_en,
      //         },
      //       ]}
      //       onPreview={(t) => setSingleImage(obj.image_en)}
      //       listType="picture-card"
      //     />
      //   );
      // },
    },
    // {
    //   title: "Name Eng",
    //   dataIndex: "name_en",
    //   key: "name_en",
    //   // render: (text, obj) => {
    //   //   return (
    //   //     <Upload
    //   //       disabled={true}
    //   //       fileList={[
    //   //         {
    //   //           uid: obj.id,
    //   //           name: obj.image_ar,
    //   //           status: "done",
    //   //           url: obj.image_ar,
    //   //         },
    //   //       ]}
    //   //       onPreview={(t) => setSingleImage(obj.image_ar)}
    //   //       listType="picture-card"
    //   //     />
    //   //   );
    //   // },
    // },
    {
      title: "Main Image ",
      dataIndex: "logo",
      key: "logo",
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
                url: obj.logo,
              },
            ]}
            // onPreview={(t) => setSingleImage(obj.logo)}
            listType="picture-card"
          />
        );
      },
    },
    {
      title: "Is Active?",
      dataIndex: "active",
      render: (text, record) => {
        if (text) {
          return (
            <Tag
              className="cursor-pointer"
              onClick={() => changeStatus(record)}
              color="green"
            >
              Activated
            </Tag>
          );
        } else {
          return (
            <Tag
              className="cursor-pointer "
              onClick={() => changeStatus(record)}
              color="red"
            >
              Inactive
            </Tag>
          );
        }
      },     // render: (text, obj) => {
      //   return (
      //     <Upload
      //       disabled={true}
      //       fileList={[
      //         {
      //           uid: obj.id,
      //           name: obj.image_ar,
      //           status: "done",
      //           url: obj.image_ar,
      //         },
      //       ]}
      //       onPreview={(t) => setSingleImage(obj.image_ar)}
      //       listType="picture-card"
      //     />
      //   );
      // },
    },
    
    // {
    //   title: "Type ",
    //   dataIndex: "type",
    //   key: "type",
    //   // render: (text, obj) => {
    //   //   return (
    //   //     <Upload
    //   //       disabled={true}
    //   //       fileList={[
    //   //         {
    //   //           uid: obj.id,
    //   //           name: obj.image_ar,
    //   //           status: "done",
    //   //           url: obj.image_ar,
    //   //         },
    //   //       ]}
    //   //       onPreview={(t) => setSingleImage(obj.image_ar)}
    //   //       listType="picture-card"
    //   //     />
    //   //   );
    //   // },
    // },
    // {
    //   title: "Created At",
    //   dataIndex: "created_at",
    //   key: "created_at",
    //   // render: (text, obj) => {
    //   //   return (
    //   //     <Upload
    //   //       disabled={true}
    //   //       fileList={[
    //   //         {
    //   //           uid: obj.id,
    //   //           name: obj.image_ar,
    //   //           status: "done",
    //   //           url: obj.image_ar,
    //   //         },
    //   //       ]}
    //   //       onPreview={(t) => setSingleImage(obj.image_ar)}
    //   //       listType="picture-card"
    //   //     />
    //   //   );
    //   // },
    // },
  ];

  return (
    <>
      <CustomTable
        pageTitle="List of serviceProvider "
        endPoint={"serviceProvider"}
        addEndPoint="Banners/AddserviceProvider"
        editEndPoint="Banners/edit_serviceProvider_ReadForm"
        dataRender={services}
        coloumRender={columns}
        refetch={refetch}
        isLoading={isLoading}
        error={error}
        // dataRender={currentList}
        prevousState={services}
        setCurrentList={setCurrentList}
        // refetch={refetch}
      // error={error}
      />
     
    
    </>
  );
};


export default Banner;
