import React, { useState, useEffect } from "react";
import { useFetch } from "hooks";
import CustomTable from "../Components/CustomTable";
import { useHistory } from "react-router";
import { Modal, Upload } from "antd";

const MakeUp = () => {
  const { services, isLoading, refetch, isSuccess } = useFetch("makeups");
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
      title: "Phone Number",
      dataIndex: "phone",
      key: "phone",
      sorter: (a, b) => a.phone - b.phone,
    },

    {
      title: "City Name",
      dataIndex: "city_name",
      key: "city_name",
    },
  ];
  return (
    <>
      <CustomTable
        pageTitle="MakeUp List"
        dataRender={currentList}
        coloumRender={columns}
        refetch={refetch}
        isLoading={isLoading}
        endPoint="makeups"
        addEndPoint="makeup/AddMakeUp"
        editEndPoint="makeup/editReadForm"
        prevousState={services}
        setCurrentList={setCurrentList}
        searchUrl="stores/search/5?store_search"
        noAddOption
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

export default MakeUp;
