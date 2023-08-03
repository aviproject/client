"use client"; // this is a client component

import React, {useState } from "react";
import {
  AutoComplete,
  Button,
  Col,
  Divider,
  Form,
  FormInstance,
  Row,
  notification,
} from "antd";
import Axios from "axios";

interface ProductSearchProps {
  form: FormInstance;
  tableData?: [];
  setData?: any;
  getTableData: Function;
}

const API_URL = process.env.API_URL;

export const ProductSearch: React.FC<ProductSearchProps> = ({
  form,
  tableData,
  setData,
  getTableData,
}) => {
  const [selectedvalue, setSelectedValue] = useState("");
  const [options, setOptions] = useState<[]>([]);
  const [barcode, setBarcode] = useState<string>("");
  const [item, setItem] = useState<string>("");

  const onSelect = (data: string) => {
    console.log("onSelect", data);
    setSelectedValue(data);
  };

  const onFinish = async (value: { barcode: string; item: string }) => {
    const searchby =
      value?.barcode && value?.item
        ? `product?barcode=${value?.barcode}&item=${value?.item}`
        : value?.barcode
        ? `product?barcode=${value?.barcode}`
        : value?.item
        ? `product?item=${value?.item}`
        : "product";

    const URL = `${API_URL}/${searchby}`;

    let data: any = [];
    try {
      const response = await Axios.get(URL).then((response) => {
        if (response.status == 200 && response?.data?.data?.length) {
          data.push(...options, ...response?.data?.data);
          setOptions(data);
          setData(data);
          getTableData(data);
          notification.success({ message: response?.data?.message });
        } else {
          setOptions(response?.data?.data);
          setData(response?.data?.data);
          getTableData(response?.data?.data);
          notification.error({ message: response?.data?.message });
        }
      });
    } catch (error) {
      notification.error({ message: "please try again!" });
    }
  };
  const onSearchbarcode = (value: string) => {
    setBarcode(value);
  };

  const onSearchByItem = (value: string) => {
    setItem(value);
  };
  return (
    <>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ marginTop: 60 }}>
          <span style={{ paddingLeft: 60 }}>Product Search</span>
          <div
            style={{ marginTop: 30, display: "flex", justifyContent: "center" }}
          >
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
                  // value={value}
                  // options={products}
                  style={{ width: 250 }}
                  onSelect={onSelect}
                  onSearch={(text) => onSearchbarcode(text)}
                  placeholder="Barcode Search"
                ></AutoComplete>
              </Form.Item>
              <Form.Item name="item" label="Product">
                <AutoComplete
                  // value={value}
                  // options={products}
                  style={{ width: 256, paddingLeft: 2 }}
                  onSelect={onSelect}
                  onSearch={(text) => onSearchByItem(text)}
                  placeholder="Product Search"
                ></AutoComplete>
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
