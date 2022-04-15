import React, { useState, useEffect } from "react";
import { useFetch } from "hooks";
import CustomTable from "../Components/CustomTable";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Modal, Upload } from "antd";
const Hotels = () => {
  const history = useHistory();
  const [currentList, setCurrentList] = useState([]);
  const { services, isLoading, refetch, isSuccess } = useFetch("hotels");
  const [singleImage, setSingleImage] = useState("");

  useEffect(() => setCurrentList(services), [isSuccess, services]);

  const trncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  };

  const { direction } = useSelector((state) => state.theme);
  const columns_en = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Store Name",
      dataIndex: "name_en",
      key: "name_en",
      sorter: (a, b) => a.name_en.length - b.name_en.length,
    },
    {
      title: "Seller Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.length - b.name.length,
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
      title: "Phone Number",
      dataIndex: "phone",

      key: "phone",
    },
    {
      title: "Open At",
      dataIndex: "open_at",
      sorter: (a, b) => a.open_at - b.open_at,
      key: "open_at",
    },

    {
      title: "City Name",
      dataIndex: "city_name",
      sorter: (a, b) => a.city_name - b.city_name,
      key: "city_name",
    },
  ];
  const columns_ar = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "الاسم",
      dataIndex: "name_ar",
      key: "name_ar",
      sorter: (a, b) => a.name_ar.length - b.name_ar.length,
    },
    {
      title: "العنوان",
      dataIndex: "address_ar",
      render: (text) => {
        return trncate(text, 30);
      },
      key: "address_ar",
      sorter: (a, b) => a.address_ar.length - b.address_ar.length,
    },
    {
      title: "الهاتف",
      dataIndex: "phone",

      key: "phone",
    },

    {
      title: "اسم البائع",
      dataIndex: "name",
      sorter: (a, b) => a.name - b.name,
      key: "name",
    },
  ];
  return (
    <>
      <CustomTable
        pageTitle={direction === "ltr" ? "List Of Hotels" : "قائمه الفنادق"}
        endPoint={"hotels"}
        addEndPoint="hotel/addHotel"
        editEndPoint="hotel/veHotelForm"
        dataRender={currentList}
        coloumRender={direction === "ltr" ? columns_en : columns_ar}
        isLoading={isLoading}
        refetch={refetch}
        setCurrentList={setCurrentList}
        noAddOption
        prevousState={services}
        searchUrl="stores/search/2?store_search"
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

export default Hotels;
