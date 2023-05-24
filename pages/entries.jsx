import React, { useState, useEffect } from "react";
import axios from "axios";
import { Space, Table, Tag, Button, Modal, Input, Form } from "antd";
import Layout from "./Layout";

function Task() {
  const [data, setData] = useState([]);
  
  const [isModalOpen, setIsModalOpen] = useState("");

  const [form] = Form.useForm();
  const fetchInfo = () => {
    return axios.get("https://api.publicapis.org/entries").then((res) => {
      const newData = res.data.entries.map((d, index) => {
        return { ...d, key: index };
      });
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
    form.setFieldsValue(record);
    setIsModalOpen(true);
  };
  
  const updateDataInLocalStorage = (updatedData) => {
    setData(updatedData);
    localStorage.setItem("entry", JSON.stringify(updatedData));
  };
 
  const onFinish = (values) => {
    const { key, API, Description, Category } = values;
    const updatedData = data.map((record) => {
      if (record.key === key) {
        return {
          ...record,
          API,
          Description,
          Category,
        };
      }
      return record;
    });
    updateDataInLocalStorage(updatedData);
    setIsModalOpen(false);
  };

  function handleCancel() {
    setIsModalOpen(false);
  }
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
      render: (_, record) => (
        <Space>
          <Button onClick={() => handleUpdate(record)}>Update</Button>
        </Space>
      ),
    },
  ];

  return (
    <Layout>
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
          
          onCancel={handleCancel}
          footer={null}
        >
          <Form
            form={form}
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item hidden={true} label="key" name="key"></Form.Item>
            <Form.Item label="API" name="API">
              <Input />
            </Form.Item>

            <Form.Item label="Description" name="Description">
              <Input />
            </Form.Item>

            <Form.Item label="Category" name="Category">
              <Input />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
          <br />
        </Modal>
      </div>
    </Layout>
  );
}
export default Task;
