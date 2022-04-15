import service from "auth/FetchInterceptor";
import { useFetch } from "hooks";
import React from "react";
import CustomTable from "../Components/CustomTable";
import { Badge, message, Modal, Rate, Tag, Upload } from "antd";
import { useHistory } from "react-router";
const BeautyCenterServices = () => {
  const { services, isLoading, refetch } = useFetch("beautyCenterServices");
  const [singleImage, setSingleImage] = React.useState("");
  const history = useHistory();
  const changeStatus = async (record) => {
    const key = "updatable!";
    message.loading({ content: "Loading...", key, duration: 15 });

    try {
      await service.post(`/web/beautyCenterServices/changeStatus/${record.id}`);
      message.success({ content: "Done!", key, duration: 2 });

      refetch();
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
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.length - b.name.length,
    },
    // {
    //   title: "Description",
    //   dataIndex: "description",
    //   key: "description",
    //   sorter: (a, b) => a.description.length - b.description.length,
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
      dataIndex: "store_name_en",
      key: "store_name_en",
      // sorter: (a, b) => a.store_name.length - b.store_name.length,
      render: (name, obj) => (
        <a
          onClick={() =>
            history.push(
              `/app/apps/beauty/editReadForm?name=view&id=${obj.store_id}`
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
      key: "price",
      render: (price) => `${price} EGP`,
      sorter: (a, b) => a.price - b.price,
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
            <>
              <Badge status="success" />
              <span>Active</span>
            </>
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
        pageTitle="Beauty Center Services"
        dataRender={services}
        coloumRender={columns}
        isLoading={isLoading}
        refetch={refetch}
        endPoint="beautyCenterServices"
        editEndPoint="beauty/editBeautyCenterService"
        addEndPoint="beauty/AddBeautyCenterServices"
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

export default BeautyCenterServices;
