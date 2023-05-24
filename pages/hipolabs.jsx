import React, { useState, useEffect } from "react";
import axios from "axios";
import { Space, Table, Tag, Button, Modal, Input } from "antd";

function Task2() {
  const [data, setData] = useState([]);
  const [country, setCountry] = useState("");
  const [name, setName] = useState("");
  const [domains, setDomains] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [key, setKey] = useState("");

  const fetchInfo = () => {
    return axios
      .get("http://universities.hipolabs.com/search?country=pakistan")
      .then((res) => {
        console.log(res);
        const newData = res.data.map((d, index) => {
          return { ...d, key: index };
        });
        setData(newData);
        localStorage.setItem("university", JSON.stringify(newData));
      });
  };

  useEffect(() => {
    const storedData = localStorage.getItem("university");
    if (storedData) {
      setData(JSON.parse(storedData));
    } else {
      fetchInfo();
    }
  }, []);
  const handleUpdate = (record) => {
    setKey(record.key);
    setCountry(record.country);
    setName(record.name);
    setDomains(record.domains);
    setIsModalOpen(true);
  };
  const updateDataInLocalStorage = (updatedData) => {
    setData(updatedData);
    localStorage.setItem("university", JSON.stringify(updatedData));
  };
  const handleModalOk = () => {
    const updatedData = data.map((record) => {
      if (record.key === key) {
        return {
          ...record,
          country: country,
          name: name,
          domains: domains,
        };
      }
      return record;
    });
    console.log(updatedData[0])
    updateDataInLocalStorage(updatedData);
    setIsModalOpen(false);
  };

  const handleCancel=()=>{
    setIsModalOpen(false)
  }
  const columns = [
    {
      title: "Country",
      dataIndex: "country",
      key: "country",
      render: (text) => <div className="cell">{text}</div>,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <div className="cell">{text}</div>,
    },
    {
      title: "Domains",
      dataIndex: "domains",
      key: "domains",
      render: (text) => <div className="cell">{text.toString()}</div>,
    },
    
    {
      title: "Action",
      key: "action",
      width: "10%",
      render: (record) => (
        <Space>
          <Button onClick={() => handleUpdate(record)}>Update</Button>
        </Space>
      ),
    },
  ];
console.log(data[0])
  return (
    <div>
      <Table
        dataSource={data}
        columns={columns}
        
        className="custom-table"
        pagination={false}
      />

      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleModalOk}
        onCancel={handleCancel}
      >
        <label>
          Country:
          <Input
            style={{ width: "20%" }}
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </label>
        <br />
        <label>
          Name:
          <Input
            style={{ width: "20%" }}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <br />
        <label>
          Domains:
          <Input
            style={{ width: "20%" }}
            placeholder="domain"
            type="text"
            value={domains}
            onChange={(e) => setDomains(e.target.value)}
          />
        </label>
        <br />
      </Modal>
    </div>
  );
}
export default Task2;
