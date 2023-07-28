"use client"; // this is a client component

import { Button, Col, DatePicker, Divider, Form, Input, InputNumber, Row } from "antd";
import Axios from 'axios'
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { ProductSearch } from "../component/ProductSearch";
import ProductTable from "../component/ProductTable";

export const Product = () => {

  const [productForm] = Form.useForm();
  const [customerForm] = Form.useForm();
  const [tableData,setData] = useState<[]>([]);
  
  const getTableData =(tableData:any) => {
    console.log(tableData,"in product")
  }
  useEffect(()=> {
    getTableData
  },[getTableData(tableData)])

  const onFinish = (value: string) => {
      console.log(value)
  };

  const onDateChange = (value:any) => {
    console.log(new Date(value))
  }

  return (
    <React.Fragment>
      <ProductSearch form={productForm} tableData={tableData} setData={setData} getTableData={getTableData} />
      <div style={{marginLeft : 230, marginTop:50}}>
        <span>Customer Details</span>
      </div>
      <div style={{marginTop : 30, marginLeft:150}}>
        <Form
          // {...formItemLayout}
          form={customerForm}
          name="class"
          onFinish={onFinish}
          scrollToFirstError
          className="form-layout-control"
        >
          <Row>
            <Col xs={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }} xl={{ span: 8 }} xxl={{ span: 7 }}>
              <Form.Item
                label="Customer Name:"
                name="customer"
                style={{ width: 270}}
                // rules={[{ required: true, message: 'Please input your name!' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="date"
                label="Purchase Date"
                style={{ width: 280}}>
                <DatePicker onChange={onDateChange} />
              </Form.Item>
            
            </Col>
            <Col>
              <Divider style={{ height: "450px", borderLeft: ".1rem solid gray" }} type='vertical' />
            </Col>
            <Col xs={{ span: 24 }} md={{ span: 24 }} lg={{ span: 24 }} xl={{ span: 15 }} xxl={{ span: 16 }}>
              <ProductTable tableData={tableData}/>

              <Row style={{marginTop:15,marginLeft:950}}>
                <Col span={24}>
                  <Form.Item
                    name="subtotal"
                    label="Subtotal:"
                    // style={{width:200}}
                  >
                    <InputNumber min={0}/>
                  </Form.Item>
                </Col>
              </Row>
              <Row style={{marginTop:10,marginLeft:950}}>
                <Col span={24}>
                  <Form.Item
                    name="discount"
                    label="Discount"
                    // style={{width:200}}
                  >
                    <InputNumber min={0}/>
                  </Form.Item>
                </Col>
              </Row>
              <Row style={{marginTop:10,marginLeft:950}}>
                <Col span={24}>
                  <Form.Item
                    name="final_total"
                    label="Final Price"
                    // style={{width:250}}
                  >
                    <InputNumber min={0} />
                  </Form.Item>
                </Col>
              </Row>
              <Row style={{marginTop:20}}>
                <Col span={24} style={{textAlign: 'end' }}>
                <Form.Item wrapperCol={{ span: 24 }}>
                  <Button type="primary" htmlType="submit">
                      Submit
                  </Button>
                  <Button type="dashed" htmlType="button" style={{marginLeft:10}}>
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
