import { Badge, message, Modal, Tag, Upload } from "antd";
import service from "auth/FetchInterceptor";
import { useFetch } from "hooks";
import React from "react";
import { useHistory } from "react-router";
import CustomTable from "../Components/CustomTable";
const Cars = () => {
  const { services, isLoading, refetch, error } = useFetch("cars");
  const [singleImage, setSingleImage] = React.useState("");
  const history = useHistory();

  const changeStatus = async (record) => {
    const key = "updatable!";
    message.loading({ content: "Loading...", key, duration: 15 });

    try {
      await service.post(`/web/cars/changeStatus/${record.id}`);
      refetch();
      message.success({ content: "Done!", key, duration: 2 });
    } catch (error) {
      message.error({ content: "Error Occured!", key, duration: 2 });
    }
  };
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name ",
      dataIndex: "name_en",
      key: "name_en",
      sorter: (a, b) => a.name_en.length - b.name_en.length,
    },
    {
      title: "Seller",
      dataIndex: "seller_name",
      key: "seller_name",
      // sorter: (a, b) => a.seller_name.length - b.seller_name.length,
      render: (name, obj) => (
        <a
          onClick={() =>
            history.push(`/app/apps/CRM/veForm?name=view&id=${obj.seller_id}`)
          }
        >
          {name}
        </a>
      ),
    },
    {
      title: "Store",
      dataIndex: "store_name",
      key: "store_name",
      // sorter: (a, b) => a.store_name.length - b.store_name.length,
      render: (name, obj) => (
        <a
          onClick={() =>
            history.push(
              `/app/apps/cars/editReadForm?name=view&id=${obj.store_id}`
            )
          }
        >
          {name}
        </a>
      ),
    },
    // {
    //   title: "Description ",
    //   dataIndex: "description_en",
    //   key: "description_en",
    //   render: (text) => {
    //     return trncate(text, 35);
    //   },
    //   sorter: (a, b) => a.description_en.length - b.description_en.length,
    // },
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
    // {
    //   title: "Rating",
    //   dataIndex: "rating",
    //   key: "rating",
    //   render: (rate) => (
    //     <Rate allowHalf disabled defaultValue={rate} style={{ width: 150 }} />
    //   ),
    //   sorter: (a, b) => a.raiting - b.rating,
    // },
    {
      title: "Status",
      dataIndex: "active",
      key: "active",
      render: (text, record) => {
        if (text) {
          return (
            <div style={{ display: "flex" }}>
              <Badge status="success" />
              <span style={{ fontWeight: "bolder" }}>Active</span>
            </div>
          );
        } else {
          return (
            <div style={{ display: "flex" }}>
              <Badge status="error" />
              <span style={{ fontWeight: "bolder" }}>Inactive</span>
            </div>
          );
        }
      },
    },
    {
      title: "Approved",
      dataIndex: "approve",
      key: "approve",
      render: (text, record) => {
        if (text) {
          return (
            <Tag
              className="cursor-pointer"
              onClick={() => changeStatus(record)}
              color="green"
            >
              Approve
            </Tag>
          );
        } else {
          return (
            <Tag
              className="cursor-pointer "
              onClick={() => changeStatus(record)}
              color="red"
            >
              UnApproved
            </Tag>
          );
        }
      },
    },
  ];

  return (
    <>
      <CustomTable
        pageTitle="Cars List"
        dataRender={services}
        coloumRender={columns}
        isLoading={isLoading}
        refetch={refetch}
        endPoint={"cars"}
        noDeleteAction
        error={error}
        addEndPoint="cars/AddCar"
        editEndPoint="cars/editCar"
      />
      <Modal
        visible={singleImage.length > 0}
        footer={null}
        onCancel={() => setSingleImage("")}
      >
        <img
          alt="image"
          style={{ width: "100%", height: 350 }}
          src={singleImage}
        />
      </Modal>
    </>
  );
};

export default Cars;
