import { InputNumber, Space, Table, Tag } from 'antd';
import { ColumnsType } from 'antd/es/table';
import React, { useState } from 'react'

interface ProductTableProps{
  tableData?:[]
  setData:Function;
  getTableData:Function;
}
interface DataType {
    key: string;
    name: string;
    price: number;
    quantity: number;
    total: number;
  }

export const ProductTable: React.FC<ProductTableProps>= ({tableData,setData,getTableData}) =>  {

  const [total, setTotal] = useState(0);

  const handleQuantity = (quantity:any,row:any,i:number,tableData:any) => {
 
    tableData[i]["quantity"] = quantity
    tableData[i]["total"] = row.price * quantity
    setTotal(tableData[i].total)
    setData(tableData)
    getTableData(tableData)
  }
    const columns: ColumnsType<DataType> = [
        {
          title: 'Product Name',
          dataIndex: 'item_name',
          key: 'item_name',
          render: (text) => <a>{text}</a>,
        },
        {
          title: 'Price($)',
          dataIndex: 'price',
          key: 'price',
        },
        {
          title: 'Quantity',
          dataIndex: 'quantity',
          key: 'quantity',
          render: (text,record,i) => (
            <>
              <InputNumber
                defaultValue={1}
                min={1}
                style={{ width:100 }}
                onChange={(e) => handleQuantity(e,record,i,tableData)} />
            </>
          ),
        },
        {
          title: 'Total Price($)',
          key: 'total',
          dataIndex: 'total',
          render: (text,record,i) => (
            <>
              <InputNumber
                value={record?.quantity ?  record?.total : record?.price}
                min={0}
                style={{ width:100 }}
                disabled
                 />
            </>
          ),
        },
        
      ];

  return (
    <div>
      <Table 
        pagination={false} 
        columns={columns} 
        dataSource={tableData}
        />
    </div>
  )
}
