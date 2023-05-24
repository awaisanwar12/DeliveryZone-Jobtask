import React, { useState, useEffect } from "react";
import axios from "axios";
import { Space, Table, Tag, Button,Modal,Input } from "antd";

function Task() {
  const [data, setData] = useState([]);
  const [api, setAPI] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [isModalOpen,setIsModalOpen]= useState("");
const [key,setKey]= useState("");

  
  const fetchInfo = () => {
    return axios.get("https://api.publicapis.org/entries").then((res) => {
      
      const newData = res.data.entries.map((d, index) => {
        return {...d, key: index}
      })
      setData(newData);
      localStorage.setItem("entry", JSON.stringify(newData));
    });
  };

  useEffect(() => {
    const storedData = localStorage.getItem("entry");
    if (storedData) {
      setData(JSON.parse(storedData));
    } else {
      fetchInfo();
    }
  }, []);
   const handleUpdate = (record) => {
setKey(record.key)
    setAPI(record.API);
    setDescription(record.Description);
    setCategory(record.Category);
    setIsModalOpen(true);
  };
   const updateDataInLocalStorage = (updatedData) => {
    setData(updatedData);
    localStorage.setItem('entry', JSON.stringify(updatedData));
  };
   const handleModalOk = () => {
    const updatedData = data.map((record) => {
      
      if (record.key === key) {
        return {
          ...record,
          API: api,
          Description: description,
          Category: category,
        };
      }
      return record;
    });
    updateDataInLocalStorage(updatedData);
    setIsModalOpen(false);
  };

  // const generateRowKey = (record) => {
  //   return record.API; // Use the "API" field as the row key
  // };
  const columns = [
    {
      title: "API",
      dataIndex: "API",
      key: "API",
      render: (text) => <div className="cell">{text}</div>,
    },
    {
      title: "Description",
      dataIndex: "Description",
      key: "Description",
      render: (text) => <div className="cell">{text}</div>,
    },
    {
      title: "Category",
      dataIndex: "Category",
      key: "Category",
      render: (text) => <div className="cell">{text}</div>,
    },
    {
      title: "Auth",
      dataIndex: "Auth",
      key: "Auth",
      render: (text) => <div className="cell">{text ? "Yes" : "No"}</div>,
    },
    {
      title: "Action",
      key: "action",
      width: "10%",
      render: (_,record) => (
        <Space>
          <Button onClick={() => handleUpdate(record)}>Update</Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Table
        dataSource={data}
        columns={columns}
        // rowKey={generateRowKey}
        className="custom-table"
        pagination={false}
      />
      
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleModalOk}
        // onCancel={handleCancel}
      >
        <label>
          API:
          <Input
            style={{ width: "20%" }}
            type="text"
            value={api}
            onChange={(e) => setAPI(e.target.value)}
          />
        </label>
        <br />
        <label>
          Description:
          <Input
            style={{ width: "20%" }}
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <br />
        <label>
          Catagory:
          <Input
            style={{ width: "20%" }}
            placeholder="category"
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </label>
        <br />
      </Modal>
    </div>
  );
}
export default Task;
