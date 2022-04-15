import { Modal, Upload } from "antd";
import { useFetch } from "hooks";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import CustomTable from "../Components/CustomTable";

const BeautyCenter = () => {
  const { services, refetch, isLoading, error, isSuccess } =
    useFetch("beautyCenters");

  const [currentList, setCurrentList] = useState([]);
  useEffect(() => setCurrentList(services), [isSuccess, services]);
  const [singleImage, setSingleImage] = useState("");

  const history = useHistory();
  const columns = [
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
      sorter: (a, b) => a.phone - b.phone,
    },
    {
      title: "Open At",
      dataIndex: "open_at",
      key: "open_at",
      sorter: (a, b) => a.open_at - b.open_at,
    },
    {
      title: "Close At",
      dataIndex: "close_at",
      key: "close_at",
      sorter: (a, b) => a.close_at - b.close_at,
    },
    // {
    //   title: "Country Name",
    //   dataIndex: "country_name",
    //   key: "country_name",
    // },

    {
      title: "City Name",
      dataIndex: "city_name",
      key: "city_name",
    },
  ];

  return (
    <>
      <CustomTable
        pageTitle="Beauty Centers List"
        coloumRender={columns}
        refetch={refetch}
        isLoading={isLoading}
        error={error}
        endPoint="beautyCenters"
        addEndPoint="beauty/AddBeautyCenter"
        editEndPoint="beauty/editReadForm"
        noAddOption
        dataRender={currentList}
        prevousState={services}
        setCurrentList={setCurrentList}
        searchUrl="stores/search/4?store_search"
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

export default BeautyCenter;
