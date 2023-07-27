"use client"; // this is a client component
import React, { useState } from "react";
import { AutoComplete, Button, Col, Divider, Form, Row } from "antd";
import Axios from "axios";

interface ProductSearchProps {
  form: any;
}

const mockVal = (str: string, repeat = 1) => ({
  value: str.repeat(repeat),
});

export const ProductSearch: React.FC<ProductSearchProps> = ({ form }) => {
  const [value, setValue] = useState("");
  const [options, setOptions] = useState<{ value: string }[]>([]);
  const [anotherOptions, setAnotherOptions] = useState<{ value: string }[]>([]);

  const getPanelValue = (searchText: string) =>
    !searchText
      ? []
      : [mockVal(searchText), mockVal(searchText, 2), mockVal(searchText, 3)];

  const onSelect = (data: string) => {
    console.log("onSelect", data);
  };

  const onChange = (data: string) => {
    setValue(data);
  };
  const onFinish = (value: string) => {
    console.log(value);
  };
  return (
    <>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ marginTop: 60 }}>
          <span>Product Search</span>
          <div style={{ marginTop: 30 }}>
            <Form
              // {...formItemLayout}
              form={form}
              name="class"
              onFinish={onFinish}
              scrollToFirstError
              className="form-layout-control"
            >
              <Form.Item name="barcode" label="Barcode:">
                <AutoComplete
                  value={value}
                  options={anotherOptions}
                  style={{ width: 250 }}
                  onSelect={onSelect}
                  onSearch={(text) => setAnotherOptions(getPanelValue(text))}
                  onChange={onChange}
                  placeholder="Barcode Search"
                />
              </Form.Item>
              <Form.Item name="item" label="Product">
                <AutoComplete
                  value={value}
                  options={anotherOptions}
                  style={{ width: 256, paddingLeft: 2 }}
                  onSelect={onSelect}
                  onSearch={(text) => setAnotherOptions(getPanelValue(text))}
                  onChange={onChange}
                  placeholder="Product Search"
                />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ marginLeft: 90 }}
                >
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
      <Divider />
    </>
  );
};
