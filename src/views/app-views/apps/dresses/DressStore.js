import React, { useState, useEffect } from "react";
import { useFetch } from "hooks";
import CustomTable from "../Components/CustomTable";
import { useHistory } from "react-router-dom";
import { Modal, Upload } from "antd";
const DressStore = () => {
  const { services, isLoading, refetch, isSuccess } = useFetch("dressStore");
  const history = useHistory();
  const [singleImage, setSingleImage] = useState("");
  const [currentList, setCurrentList] = useState([]);

  useEffect(() => setCurrentList(services), [isSuccess, services]);

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
          {obj.seller_first_name || obj.name}
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
      title: "City",
      dataIndex: "city_name",
      sorter: (a, b) => a.city_name - b.city_name,
      key: "city_name",
      render: (name, obj) => obj.city_name_en || obj.city_name,
    },
  ];
  return (
    <div>
      <CustomTable
        pageTitle={"Dress Stores"}
        dataRender={currentList}
        setCurrentList={setCurrentList}
        prevousState={services}
        coloumRender={columns}
        isLoading={isLoading}
        refetch={refetch}
        endPoint={"dressStore"}
        editEndPoint="dresses/editDressStore"
        addEndPoint={"dresses/AddDressStore"}
        noAddOption
        searchUrl="stores/search/7?store_search"
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
    </div>
  );
};

export default DressStore;
