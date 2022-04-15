import { Tag, Rate, message, Modal, Upload, Badge } from "antd";
import service from "auth/FetchInterceptor";
import { useFetch } from "hooks";
import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import CustomTable from "../Components/CustomTable";

function WeddingHalls() {
  const { services, isLoading, refetch } = useFetch("weddingHall");
  const [singleImage, setSingleImage] = React.useState("");
  const history = useHistory();
  const trncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  };
  const { direction } = useSelector((state) => state.theme);

  const changeStatus = async (record) => {
    const key = "updatable!";

    message.loading({ content: "Loading...", key, duration: 15 });

    try {
      await service.post(`/web/weddingHall/changeStatus/${record.id}`);
      message.success({ content: "Done!", key, duration: 2 });
      refetch();
    } catch (error) {
      message.error({ content: "Error Occured!", key, duration: 2 });
    }
  };
  const columns_en = [
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
      dataIndex: "hotelName",
      key: "hotelName",
      // sorter: (a, b) => a.store_name.length - b.store_name.length,
      render: (name, obj) => (
        <a
          onClick={() =>
            history.push(
              `/app/apps/hotel/veHotelForm?name=view&id=${obj.hotel_id}`
            )
          }
        >
          {name}
        </a>
      ),
    },
    // {
    //   title: "  Description ",
    //   dataIndex: "description_ar",
    //   key: "description_ar",
    //   render: (text) => trncate(text, 20),
    //   sorter: (a, b) => a.description_ar.length - b.description_ar.length,
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
    //   title: "Price",
    //   dataIndex: "price",
    //   key: "price",
    //   render: (price) => `${price} EGP`,
    //   sorter: (a, b) => a.price - b.price,
    // },

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

  const columns_ar = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },

    {
      title: "اسم",
      dataIndex: "name_ar",
      key: "name_ar",
      sorter: (a, b) => a.name_ar.length - b.nname_ename_ar.length,
    },

    {
      title: "وصف ",
      dataIndex: "description_ar",
      key: "description_ar",
      render: (text) => trncate(text, 20),
      sorter: (a, b) => a.description_ar.length - b.description_ar.length,
    },
    {
      title: "السعر",
      dataIndex: "price",
      key: "price",
      render: (price) => `${price} EGP`,
      sorter: (a, b) => a.price - b.price,
    },

    {
      title: "تقييم",
      dataIndex: "rating",
      key: "rating",
      render: (rate) => (
        <Rate allowHalf disabled defaultValue={rate} style={{ width: 150 }} />
      ),
      sorter: (a, b) => a.raiting - b.rating,
    },
  ];
  return (
    <>
      <CustomTable
        pageTitle={direction === "ltr" ? "Wedding Halls" : "قاعات الأفراح "}
        coloumRender={direction === "ltr" ? columns_en : columns_ar}
        dataRender={services}
        isLoading={isLoading}
        refetch={refetch}
        endPoint="weddingHall"
        addEndPoint="hotel/addWedding"
        editEndPoint="hotel/editWeddinghall"
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
}

export default WeddingHalls;
