import React, { useState, useEffect } from "react";
import axios from "axios";
import { Space, Table, Tag, Button, Modal, Input, Form } from "antd";
import Layout from "./Layout";

function Task2() {
  const [data, setData] = useState([]);
 
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [form] = Form.useForm();
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
  const handleUpdate =(record)=>{
form.setFieldsValue(record)
setIsModalOpen(true);

  }
 
  const updateDataInLocalStorage = (updatedData) => {
    setData(updatedData);
    localStorage.setItem("university", JSON.stringify(updatedData));
  };
  
  const onFinish = (values) => {
    const { key, country, name, domains } = values
    const updatedData = data.map((record) => {
      if (record.key === key) {
        return {
          ...record,
          country,
          name,
          domains,
        };
      }
      return record;
    });
    updateDataInLocalStorage(updatedData);
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
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
          footer={null}
          
          onCancel={handleCancel}
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
            <Form.Item label="country" name="country">
              <Input />
            </Form.Item>

            <Form.Item label="name" name="name">
              <Input />
            </Form.Item>

            <Form.Item label="domains" name="domains">
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
export default Task2;
