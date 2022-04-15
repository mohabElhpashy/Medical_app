import { useFetch } from "hooks";
import React from "react";
import CustomTable from "../Components/CustomTable";
import { statusStyle } from "../Components/constants/coloumStyle";
import { Badge, message, Modal, Rate, Tag, Upload } from "antd";
import service from "auth/FetchInterceptor";
import { useHistory } from "react-router";
const CheckUps = () => {
  const { services, isLoading, refetch } = useFetch("checkups");
  const [singleImage, setSingleImage] = React.useState("");
  const history = useHistory();
  const trncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  };

  const changeStatus = async (record) => {
    const key = "updatable!";
    message.loading({ content: "Loading...", key, duration: 15 });

    try {
      await service.post(`/web/checkups/changeStatus/${record.id}`);
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
              `/app/apps/doctors/editReadForm?name=view&id=${obj.store_id}`
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
    //     return trncate(text, 20);
    //   },
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
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => `${price} EGP`,
      sorter: (a, b) => a.price - b.price,
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
        pageTitle={"CheckUps List"}
        endPoint={"checkups"}
        editEndPoint="doctors/eeditCheckUp"
        addEndPoint="doctors/AddCheckUPs"
        dataRender={services}
        coloumRender={columns}
        refetch={refetch}
        isLoading={isLoading}
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

export default CheckUps;
