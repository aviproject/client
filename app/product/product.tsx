"use client"; // this is a client component

import {
  Button,
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  InputNumber,
  Row,
  notification,
} from "antd";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import { ProductSearch } from "../component/ProductSearch";
import { ProductTable } from "../component/ProductTable";
import moment from "moment";

export const Product = () => {
  const API_URL = process.env.API_URL;
  const [productForm] = Form.useForm();
  const [customerForm] = Form.useForm();
  const [tableData, setData] = useState<[]>([]);
  const [discountValue, setDiscount] = useState(0)

  const getTableData = (tableData: any) => {
    const sum = tableData?.reduce(
      (a: number, v: any) => a + Number(v?.total ? v?.total : v?.price),
      0
    );
    customerForm.setFieldValue("subtotal", sum);
    customerForm.setFieldValue("final_price",customerForm.getFieldValue("subtotal") - discountValue);
  };
  useEffect(() => {
    getTableData;
  }, [getTableData(tableData)]);

  const onFinish = (value: any) => {
    const URL = `${API_URL}/createorder`;
    try {
      if (tableData.length) {
        const response = Axios({
          method: "post",
          url: URL,
          data: {
            customer_name: value?.customer_name,
            purchase_date: moment(value?.purchase_date?.$d).format("MM/DD/YYYY"),
            subtotal: value?.subtotal,
            discount: value?.discount,
            final_price: value?.final_price,
            items: tableData,
          },
        }).then((response) => {
           if (response?.data?.statusCode == 200) notification.success({message : response?.data?.message})
        });
      } else {
        notification.warning({ message: "Please add Products!" });
      }
    } catch (error) {
      console.log("Failed try again!");
    }
  };

  const onDateChange = (value: any) => {
    console.log(new Date(value));
  };

  const onDiscountChnage = (e: any) => {
    setDiscount(e)
    if (tableData.length)
      customerForm.setFieldValue(
        "final_price",
        customerForm.getFieldValue("subtotal") - e
      );
  };

  const onCancel = () => {
    setData([])
    setDiscount(0)
    productForm.resetFields();
    customerForm.resetFields();
  }

  return (
    <React.Fragment>
      <ProductSearch
        form={productForm}
        tableData={tableData}
        setData={setData}
        getTableData={getTableData}
      />
      <div style={{ marginLeft: 230, marginTop: 50 }}>
        <span>Customer Details</span>
      </div>
      <div style={{ marginTop: 30, marginLeft: 150 }}>
        <Form
          form={customerForm}
          name="class"
          onFinish={onFinish}
          scrollToFirstError
          className="form-layout-control"
          
        >
          <Row>
            <Col
              xs={{ span: 24 }}
              md={{ span: 24 }}
              lg={{ span: 24 }}
              xl={{ span: 8 }}
              xxl={{ span: 7 }}
            >
              <Form.Item
                label="Customer Name:"
                name="customer_name"
                style={{ width: 270 }}
                rules={[{ required: true, message: 'Please input name!' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="purchase_date"
                label="Purchase Date"
                style={{ width: 280 }}
                rules={[{ required: true, message: 'Please select date!' }]}
              >
                <DatePicker onChange={onDateChange} />
              </Form.Item>
            </Col>
            <Col>
              <Divider
                style={{ height: "450px", borderLeft: ".1rem solid gray" }}
                type="vertical"
              />
            </Col>
            <Col
              xs={{ span: 24 }}
              md={{ span: 24 }}
              lg={{ span: 24 }}
              xl={{ span: 15 }}
              xxl={{ span: 16 }}
            >
              <ProductTable
                tableData={tableData}
                setData={setData}
                getTableData={getTableData}
              />
              <Row style={{ marginTop: 15, marginLeft: 950 }}>
                <Col span={24}>
                  <Form.Item
                    name="subtotal"
                    label="Subtotal($):"
                  >
                    <InputNumber min={0} disabled />
                  </Form.Item>
                </Col>
              </Row>
              <Row style={{ marginTop: 10, marginLeft: 950 }}>
                <Col span={24}>
                  <Form.Item
                    name="discount"
                    label="Discount($):"
                  >
                    <InputNumber
                      min={0}
                      value={discountValue}
                      onChange={(e) => onDiscountChnage(e)}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row style={{ marginTop: 10, marginLeft: 950 }}>
                <Col span={24}>
                  <Form.Item
                    name="final_price"
                    label="Final Price($):"
                  >
                    <InputNumber min={0} disabled />
                  </Form.Item>
                </Col>
              </Row>
              <Row style={{ marginTop: 20 }}>
                <Col span={24} style={{ textAlign: "end" }}>
                  <Form.Item wrapperCol={{ span: 24 }}>
                    <Button type="primary" htmlType="submit">
                      Submit
                    </Button>
                    <Button
                      htmlType="button"
                      style={{ marginLeft: 10 }}
                      onClick={onCancel}
                    >
                      Cancel
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
            </Col>
          </Row>
        </Form>
      </div>
    </React.Fragment>
  );
};
