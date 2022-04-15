import { Table } from "antd";
import service from "auth/FetchInterceptor";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
function AdminLogs() {
  const { data, isLoading, refetch, error, isSuccess } = useQuery(
    "adminActivityLog",
    async () => {
      const res = await service
        .get(`/web/adminActivityLog`)
        .then((res) => res.data);
      return res;
    }
  );

  const [paginationn, setPagenation] = useState({});
  useEffect(() => {
    setPagenation(data);
    console.log("dadadata",data)
  }, [isSuccess]);

  const handleChange = async (currentObj) => {
    const data = await service.get(
      `/web/adminActivityLog?page=${currentObj.current}`
    );
    setPagenation(data.data);
  };
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id - b.id,
      render: (id) => `# ${id}`,
    },
    {
      title: "Method",
      dataIndex: "method",
      key: "method",
      render: (method) => `${method}`,
    },
    {
      title: "URL ",
      dataIndex: "url",
      key: "url",
      render: (url) => `${url}`,
    },

    
  ];
  return (
    <div>
      <Table
        bordered
        title={() => <h2>Admin Logs</h2>}
        dataSource={paginationn?.data}
        rowKey={(item) => item.id}
        columns={columns}
        pagination={paginationn}
        onChange={(current) => handleChange(current)}
      />
    </div>
  );
}

export default AdminLogs;
