"use client"; // this is a client component

import React, { useEffect, useState } from "react";
import {
  AutoComplete,
  Button,
  Col,
  Divider,
  Form,
  FormInstance,
  Row,
} from "antd";
import Axios from "axios";

interface ProductSearchProps {
  form: FormInstance;
  tableData?:[];
  setData?:any;
  getTableData:Function;
}

const API_URL = process.env.API_URL;
const { Option } = AutoComplete;

export const ProductSearch: React.FC<ProductSearchProps> = ({ form,tableData,setData,getTableData}) => {
  const [value, setValue] = useState("");
  const [options, setOptions] = useState([]);
  const [anotherOptions, setAnotherOptions] = useState<{ value: string }[]>([]);
  const [barcode, setBarcode] = useState<string>("");
  const [item, setItem] = useState<string>("");
  const [products, setProducts] = useState<[]>([]);
  

  useEffect(() => {
    let options: any = [];
    console.log(barcode, item, "Both in useEffect");
    const searchby =
      barcode && item
        ? `product?barcode=${barcode}&item=${item}`
        : barcode
        ? `product?barcode=${barcode}`
        : item
        ? `product?item=${item}`
        : null;
    if (searchby) {
      const URL = `${API_URL}/${searchby}`;

      const response = Axios.get(URL).then((response) => {
        if (response.status == 200) {
          console.log(response?.data?.data, "response");
          setData(response?.data?.data)
          response?.data?.data?.forEach((p: any) => {
            options.push(
              <Option key={p?.product_id} value={p?.item_name}>
                {p?.item_name}
              </Option>
            );
          });
          setProducts(options);
        }
      });
    }
  }, [barcode, item]);

  const onSelect = (data: string) => {
    console.log("onSelect", data);
  };

  const onChange = (data: string) => {
    setValue(data);
  };
  const onFinish = (value: string) => {
    console.log(value);
    // console.log(tableData,"tableData")
    getTableData(tableData)
  };
  const onSearchbarcode = (value: string) => {
    console.log(value, "text");
    setBarcode(value);
  };

  const onSearchByItem = (value: string) => {
    console.log(value, "vaa");
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
                  value={value}
                  // options={products}
                  style={{ width: 250 }}
                  onSelect={onSelect}
                  onSearch={(text) => onSearchbarcode(text)}
                  onChange={onChange}
                  placeholder="Barcode Search"
                >
                  {products}
                </AutoComplete>
              </Form.Item>
              <Form.Item name="item" label="Product">
                <AutoComplete
                  value={value}
                  // options={products}
                  style={{ width: 256, paddingLeft: 2 }}
                  onSelect={onSelect}
                  onSearch={(text) => onSearchByItem(text)}
                  onChange={onChange}
                  placeholder="Product Search"
                >
                  {products}
                </AutoComplete>
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
