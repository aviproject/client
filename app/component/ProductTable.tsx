import { Input, InputNumber, Space, Table, Tag } from 'antd';
import { ColumnsType } from 'antd/es/table';
import React from 'react'

interface ProductTableProps{
  tableData?:[]
}
interface DataType {
    key: string;
    name: string;
    Price: number;
    quantity: number;
    total: number;
  }

export const ProductTable: React.FC<ProductTableProps>= ({tableData}) =>  {


  // const onTextKeyPress = (event:any) => {
  //   if (!/[0-9.]/.test(event.key)) {
  //     event.preventDefault();
  //   }
  // }
  console.log(tableData,"in Table")
  const handleMfrPriceChange = (value:number) => {
    console.log(value)
  }
    const columns: ColumnsType<DataType> = [
        {
          title: 'Product Name',
          dataIndex: 'item_name',
          key: 'item_name',
          render: (text) => <a>{text}</a>,
        },
        {
          title: 'Price',
          dataIndex: 'price',
          key: 'price',
        },
        {
          title: 'Quantity',
          dataIndex: 'quantity',
          key: 'quantity',
          render: (_, { quantity }) => (
            <>
              <InputNumber
                // value={contact.manufacturer_price}
                min={0}
                style={{ width:100 }}
                onChange={(c) => { handleMfrPriceChange(quantity) }} />
            </>
          ),
        },
        {
          title: 'Total',
          key: 'total',
          dataIndex: 'total',
        },
        
      ];

  return (
    <div><Table pagination={false} columns={columns} dataSource={tableData}/></div>
  )
}

export default ProductTable