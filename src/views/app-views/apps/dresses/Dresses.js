import React, { useState } from "react";
import { useFetch } from "hooks";
import CustomTable from "../Components/CustomTable";
import { Rate, Tag, message, Upload, Modal, Badge } from "antd";
import { useSelector } from "react-redux";
import service from "auth/FetchInterceptor";
import { useHistory } from "react-router";
const Dresses = () => {
  const { services, isLoading, refetch } = useFetch("dress");
  const [singleImage, setSingleImage] = useState("");

  const { direction } = useSelector((state) => state.theme);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const changeStatus = async (record) => {
    setLoading(true);
    const key = "updatable!";
    message.loading({ content: "Loading...", key, duration: 15 });

    try {
      await service.post(`/web/dress/changeStatus/${record.id}`);
      message.success({ content: "Done!", key, duration: 2 });

      refetch();
      setLoading(false);
    } catch (error) {
      message.error({ content: "Error Occured!", key, duration: 2 });
      setLoading(false);
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "Name",
      dataIndex: "name_en",
      key: "name_en",
      sorter: (a, b) => a.name_en.length - b.name_en.length,
    },

    // {
    //   title: "Description ",
    //   dataIndex: "description_en",
    //   key: "description_en",
    //   render: (text) => {
    //     return trncate(text, 40);
    //   },
    //   sorter: (a, b) => a.description_en.length - b.description_en.length,
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
              `/app/apps/dresses/editDressStore?name=view&id=${obj.store_id}`
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
    //     <Rate
    //       allowHalf
    //       disabled
    //       style={{ width: 150 }}
    //       defaultValue={parseFloat(rate)}
    //     />
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
        pageTitle="Dresses List"
        dataRender={services}
        coloumRender={columns}
        isLoading={isLoading}
        refetch={refetch}
        endPoint={"dress"}
        editEndPoint="dresses/editProduct"
        addEndPoint={"dresses/AddDress"}
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

export default Dresses;
