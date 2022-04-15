import { useFetch } from "hooks";
import React from "react";
import CustomTable from "../Components/CustomTable";
import { APPLICATION_CURRENCY } from "../Components/constants/viewConstants";
import { Modal, Upload } from "antd";
import { useHistory } from "react-router";
const PhotoSession = () => {
  const { services, refetch, isLoading, error } = useFetch("photosession");
  const [singleImage, setSingleImage] = React.useState("");
  const history = useHistory();
  const trncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
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
    },
    // {
    //   title: "Description ",
    //   dataIndex: "description",
    //   key: "description",
    //   render: (text) => {
    //     return trncate(text, 50);
    //   },
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
      dataIndex: "store_name",
      key: "store_name",
      // sorter: (a, b) => a.store_name.length - b.store_name.length,
      render: (name, obj) => (
        <a
          onClick={() =>
            history.push(
              `/app/apps/photographer/editReadForm?name=view&id=${obj.store_id}`
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
      render: (price) => `${price} ${APPLICATION_CURRENCY}`,
      key: "price",
    },

    {
      title: "Photo Count",
      dataIndex: "photos_count",
      render: (photo) => `${photo} Photos`,

      key: "photos_count",
    },
  ];

  return (
    <>
      <CustomTable
        pageTitle="List of PhotoSessions"
        endPoint="photosession"
        addEndPoint="photographer/AddPhotoSession"
        editEndPoint="photographer/editphotoSession"
        dataRender={services}
        coloumRender={columns}
        refetch={refetch}
        isLoading={isLoading}
        error={error}
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

export default PhotoSession;
