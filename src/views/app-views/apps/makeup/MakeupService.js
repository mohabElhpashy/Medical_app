import { useFetch } from "hooks";
import React from "react";
import CustomTable from "../Components/CustomTable";
import { Badge, message, Modal, Tag, Upload } from "antd";
import service from "auth/FetchInterceptor";
import { useHistory } from "react-router";

const MakeupService = () => {
  const { services, refetch, isLoading } = useFetch("makeupServices");
  const [singleImage, setSingleImage] = React.useState("");
  const history = useHistory();
  const changeStatus = async (record) => {
    const key = "updatable!";
    message.loading({ content: "Loading...", key, duration: 15 });

    try {
      await service.post(`/web/makeupServices/changeStatus/${record.id}`);
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
      title: "Name",
      dataIndex: "name_en",
      key: "name_en",
      sorter: (a, b) => a.name_en.length - b.name_en.length,
    },
    // {
    //   title: "Description",
    //   dataIndex: "description_en",
    //   sorter: (a, b) => a.description_en.length - b.description_en.length,
    //   key: "description_en",
    // },
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
              `/app/apps/makeup/editReadForm?name=view&id=${obj.store_id}`
            )
          }
        >
          {name}
        </a>
      ),
    },
    {
      title: "Main Image ",
      dataIndex: "main_image",
      key: "main_image",
      render: (text, obj) => {
        return (
          <Upload
            disabled={true}
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
      sorter: (a, b) => a.price - b.price,
      render: (price) => `${price} EGP`,
      key: "price",
    },
    // {
    //   title: "Raiting",
    //   dataIndex: "rating",
    //   render: (rate) => {
    //     return (
    //       <Rate
    //         style={{ width: 150 }}
    //         allowHalf
    //         disabled
    //         defaultValue={parseFloat(rate)}
    //       />
    //     );
    //   },

    //   key: "rating",
    //   sorter: (a, b) => a.raiting - b.raiting,
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
            <>
              <Badge status="error" />
              <span>Inactive</span>
            </>
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
        pageTitle="Makeup Services"
        dataRender={services}
        coloumRender={columns}
        isLoading={isLoading}
        refetch={refetch}
        editEndPoint="makeup/editmakeupService"
        endPoint="makeupServices"
        addEndPoint="makeup/AddMakeupService"
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

export default MakeupService;
