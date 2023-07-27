import { Input, Space, Table, Tag } from 'antd';
import { ColumnsType } from 'antd/es/table';
import React from 'react'


interface DataType {
    key: string;
    name: string;
    Price: number;
    quantity: number;
    total: number;
  }

export const ProductTable = () =>  {


  // const onTextKeyPress = (event:any) => {
  //   if (!/[0-9.]/.test(event.key)) {
  //     event.preventDefault();
  //   }
  // }

  const handleMfrPriceChange = (value:number) => {
    console.log(value)
  }
    const columns: ColumnsType<DataType> = [
        {
          title: 'Product Name',
          dataIndex: 'name',
          key: 'name',
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
              <Input
                // value={contact.manufacturer_price}
                style={{ border: 'none', borderBottom: '1px solid' }}
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
    <div><Table columns={columns}/></div>
  )
}

export default ProductTable