import React from 'react';
import { Row, Col, Table} from 'antd';
import UilPlus from '@iconscout/react-unicons/icons/uil-plus';
import UilMinus from '@iconscout/react-unicons/icons/uil-minus';
import Heading from '../../../components/heading/heading';
import { Button } from '../../../components/buttons/buttons';
import { formatDate } from '../../../service/date';

const FILE_ENDPOINT = process.env.REACT_APP_FILE_ENDPOINT

function BookingTable({dataProp}) {
  const cartData = dataProp.carts
  const isLoading = dataProp.isLoader
  const dataSource = [];

  // ==========================================> Subtotal and SubDiscount Calculate <===========================================
  let subtotal = 0;
  let subDiscountPrice = 0;

  if (cartData !== null) {
    cartData.map((data) => {
      const { id, customer_amount, booking_date, created_at, service } = data;
      const productData = data["package"]
      const discountPrice = productData.percentage_discount * service.price / 100;
      subtotal += parseInt(customer_amount, 10) * parseInt(service.price, 10);
      subDiscountPrice += parseInt(customer_amount, 10) * parseInt(discountPrice, 10)
      return dataSource.push({
        key: id,
        product: (
          <div className="cart-single">
            <div className="flex items-center gap-x-[25px]">
              <img
                className="max-w-[80px] min-h-[80px] ltr:mr-[25px] rtl:ml-[25px] rounded-[10px]"
                style={{ width: 80 }}
                src={productData.thumbnail ? `${FILE_ENDPOINT}${productData.thumbnail}` : require(`../../../../../src/resource/static/img/default_img/travel-cambodia.png`)}
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
            </div>
          </div>
        ),
        price: <span className="text-body dark:text-white60 text-[15px]">${service.price}</span>,
        quantity: (
          <div className="flex items-center gap-x-4">
            {customer_amount}
          </div>
        ),
        total: (
          <span className="text-dark dark:text-white87 text-[15px] font-medium">${(customer_amount * service.price).toFixed(2)}</span>
        ),
        action: (
          <div className="table-action">
          </div>
        ),
      });
    });
  }

  const columns = [
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
  ];

  return (
    <div className="w-full dark:bg-white10 mb-[25px] p-[25px] rounded-[15px]">
      <div className="border-b table-responsive table-bg-transparent table-head-none hover-tr-none table-td-border-none border-regular dark:border-white10">
        <Table pagination={false} dataSource={dataSource} columns={columns} />
      </div>
      <Row justify="end">
        <Col xxl={8} xl={5} md={9} sm={14} xs={24} offset={!true ? 10 : 0}>
          <div className="invoice-summary-inner">
            <ul className="flex flex-col mt-5 mb-[10px]">
              <li className="inline-flex justify-between">
                <span className="text-dark dark:text-white87 text-[15px] font-medium">Booked at:</span>
                <span className="text-dark dark:text-white87 text-[15px] font-medium">{`${formatDate(dataProp.created_at)}`}</span>
              </li>
              <li className="inline-flex justify-between">
                <span className="text-dark dark:text-white87 text-[15px] font-medium">Subtotal :</span>
                <span className="text-dark dark:text-white87 text-[15px] font-medium">{`$${subtotal}`}</span>
              </li>
              {/* <li className="inline-flex justify-between">
                <span className="text-dark dark:text-white87 text-[15px] font-medium">Discount :</span>
                <span className="text-dark dark:text-white87 text-[15px] font-medium">{`-$${subDiscountPrice}`}</span>
              </li> */}
            </ul>
            <Heading className="flex justify-between" as="h4">
              <span className="text-base font-medium text-dark dark:text-white87">Paid : </span>
              <span className="text-lg font-semibold text-primary">{`$${dataProp.total_price}`}</span>
            </Heading>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default BookingTable;