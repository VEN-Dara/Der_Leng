import React, { useState, useEffect } from 'react';
import { Row, Col, Table, Form, Input, Spin, message } from 'antd';
import UilPlus from '@iconscout/react-unicons/icons/uil-plus';
import UilMinus from '@iconscout/react-unicons/icons/uil-minus';
import UilTrashAlt from '@iconscout/react-unicons/icons/uil-trash-alt';
import { GlobalUtilityStyle } from '../../styled';
import Heading from '../../../components/heading/heading';
import { Button } from '../../../components/buttons/buttons';
import { deleteCart, putCart } from '../../../hooks/Product/useCartFetcher';
import { formatDate } from '../../../service/date';

const FILE_ENDPOINT = process.env.REACT_APP_FILE_ENDPOINT

function CartTable({dataProp, setRefreshData}) {
  const cartData = dataProp.carts
  const isLoading = dataProp.isLoader
  
  const [state, setState] = useState({
    coupon: 0,
    promo: 0,
    current: 0,
  });

  const incrementUpdate = (id, quantity) => {
    const data = parseInt(quantity, 10) + 1;
    const customer_amount = data;
    putCart({customer_amount, id});
    setRefreshData(true);
  };

  const decrementUpdate = (id, quantity) => {
    const data = parseInt(quantity, 10) >= 2 ? parseInt(quantity, 10) - 1 : 1;
    const customer_amount = data;
    putCart({customer_amount, id});
    setRefreshData(true);
  };

  const cartDeleted = (id) => {
      deleteCart(id);
      message.success('Cart delete successfully!');
      setRefreshData(true);
  }

  const productTableData = [];

  if (cartData !== null) {
    cartData.map((data) => {
      const { id, customer_amount, booking_date, created_at, service } = data;
      const productData = data["package"]
      return productTableData.push({
        key: id,
        product: (
          <div className="cart-single">
            <figure className="flex items-center mb-0">
              <img
                className="max-w-[80px] min-h-[80px] ltr:mr-[25px] rtl:ml-[25px] rounded-[10px]"
                style={{ width: 80 }}
                src={ productData.thumbnail ? `${FILE_ENDPOINT}${productData.thumbnail}` : require(`../../../../../src/resource/static/img/default_img/travel-cambodia.png`)}
                alt=""
              />
              <figcaption>
                <div className="cart-single__info">
                  <Heading as="h6" className="text-base font-medium text-dark dark:text-white87">
                    {productData.name}
                  </Heading>
                  <ul className="flex items-center mb-0">
                    <li className="ltr:mr-5 rtl:ml-5">
                      <span className="text-dark dark:text-white87 ltr:mr-[5px] rtl:ml-[5px] text-[15px] font-medium">
                        Service :
                      </span>
                      <span className="text-body dark:text-white60 text-[15px]">{service.detail}</span>
                    </li>
                    <li>
                      <span className="text-dark dark:text-white87 ltr:mr-[5px] rtl:ml-[5px] text-[15px] font-medium">
                        {' '}
                        Booking Date :
                      </span>
                      <span className="text-body dark:text-white60 text-[15px]">{formatDate(booking_date)}</span>
                    </li>
                  </ul>
                </div>
              </figcaption>
            </figure>
          </div>
        ),
        price: <span className="text-body dark:text-white60 text-[15px]">${service.price}</span>,
        quantity: (
          <div className="cart-single-quantity">
            <Button
              onClick={() => decrementUpdate(id, customer_amount)}
              className=" bg-normalBG dark:bg-normalBGdark w-9 h-9 ltr:mr-4 rtl:ml-4 px-3 text-body dark:text-white60 border-none rounded-[10px]"
              type="default"
            >
              <UilMinus className="w-[12px] h-[12px]" />
            </Button>
            {customer_amount}
            <Button
              onClick={() => incrementUpdate(id, customer_amount)}
              className=" bg-normalBG dark:bg-normalBGdark w-9 h-9 ltr:ml-4 rtl:mr-4 px-3 text-body dark:text-white60 border-none rounded-[10px]"
              type="default"
            >
              <UilPlus className="w-[12px] h-[12px]" />
            </Button>
          </div>
        ),
        total: (
          <span className="inline-block min-w-[80px] text-primary text-[15px] font-semibold">
            ${(customer_amount * service.price).toFixed(2)}
          </span>
        ),
        action: (
          <div className="text-end">
            <Button
              onClick={() => cartDeleted(id)}
              className="bg-white dark:bg-white10 h-[38px] px-[11px] text-body dark:text-white60 border-none shadow-none hover:bg-danger-transparent hover:text-danger"
              to="#"
              size="default"
              type="danger"
              shape="circle"
              transparented
            >
              <UilTrashAlt className="w-[14px] h-[14px]" />
            </Button>
          </div>
        ),
      });
    });
  }

  const productTableColumns = [
    {
      title: 'Package',
      dataIndex: 'product',
      key: 'product',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Tourist',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 'total',
    },
    {
      title: '',
      dataIndex: 'action',
      key: 'action',
    },
  ];

  const submitCoupon = (values) => {
    setState({ ...state, coupon: values });
  };

  return (
    <>
      <GlobalUtilityStyle>
        {isLoading ? (
          <div className="spin flex items-center justify-center h-[calc(100vh-132px)]">
            <Spin />
          </div>
        ) : (
          <div className="table-responsive table-th-shape-none table-th-border-none hover-tr-none table-tr-hover-shadow table-td-border-none [&>div>div>div>div>div>.ant-table-content]:pb-5 ltr:[&>div>div>div>div>div>.ant-table-content>table>thead>tr>th:first-child]:rounded-l-10 rtl:[&>div>div>div>div>div>.ant-table-content>table>thead>tr>th:first-child]:rounded-r-10 rtl:[&>div>div>div>div>div>.ant-table-content>table>thead>tr>th:first-child]:rounded-none ltr:[&>div>div>div>div>div>.ant-table-content>table>thead>tr>th:last-child]:rounded-r-10 rtl:[&>div>div>div>div>div>.ant-table-content>table>thead>tr>th:last-child]:rounded-l-10 rtl:[&>div>div>div>div>div>.ant-table-content>table>thead>tr>th:last-child]:rounded-none">
            <Table pagination={false} dataSource={productTableData} columns={productTableColumns} />
          </div>
        )}
      </GlobalUtilityStyle>
      {/* =========================================> Apply Coupon <=========================================< */}
      {/* <div className="mt-[10px] mb-[20px]">
        <Form form={form} name="submitCoupon" onFinish={submitCoupon}>
          <Row gutter={15}>
            <Col lg={4} sm={8} xs={24}>
              <Form.Item name="coupon" label="">
                <Input
                  placeholder="Coupon Code"
                  className="max-w-[180px] bg-white dark:bg-white10 h-11 ltr:pl-5 rtl:pr-5 text-body dark:text-white60 border border-normal dark:border-white10 rounded-md"
                />
              </Form.Item>
            </Col>
            <Col lg={4} sm={8} xs={24}>
              <Button
                htmlType="submit"
                size="default"
                type="primary"
                className="px-5 text-sm font-semibold text-white border-none rounded-md bg-primary hover:bg-primary-hover h-11 dark:text-white87"
              >
                Apply Coupon
              </Button>
            </Col>
          </Row>
        </Form>
      </div> */}
    </>
  );
}

export default CartTable;
