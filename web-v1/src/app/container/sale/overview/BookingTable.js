import React, { useState } from 'react';
import { Row, Col, Table, Modal, Comment, Avatar, Input, Form, Rate, message, notification } from 'antd';
import UilLayers from '@iconscout/react-unicons/icons/uil-layers';
import UilPlus from '@iconscout/react-unicons/icons/uil-plus';
import UilMinus from '@iconscout/react-unicons/icons/uil-minus';

// ====================================> Local <====================================
import Heading from '../../../../resource/components/heading/heading';
import { Button } from '../../../../resource/components/buttons/buttons';
import { formatDate } from '../../../utility/format-function/date';
import { postReview } from '../../../hooks/Product/useReviewFetcher';
import { Link } from 'react-router-dom';

const FILE_ENDPOINT = process.env.REACT_APP_FILE_ENDPOINT

const { TextArea } = Input;
function BookingTable({ dataProp, setRefreshData }) {
  const cartData = dataProp.carts
  const isLoading = dataProp.isLoader
  const dataSource = [];
  const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];
  const [review, setReview] = useState({
    rating: 0,
    comment: "",
    package_id: null,
    booking_details: null
  })
  const [reviewResponse, setReviewResponse] = useState({
    data: null,
    isLoading: false,
    message: null,
  })


  // ==========================================> Modal Review <===========================================
  const userProfile = JSON.parse(localStorage.getItem("user"));

  const [reviewModalVisable, setReviewModalVisble] = useState(false)

  const handleReviewModalCancel = () => {
    setReviewModalVisble(false)
  }

  const handleReviewModalOk = () => {
    if (review.rating === 0) {
      message.destroy()
      message.error("Please provide tour service a rating star.")
      return
    }

    postReview(setReviewResponse, review)
    setRefreshData(true);
    setReviewModalVisble(false)
  }

  const handleReviewModalShow = (package_id, booking_details_id) => {
    setReview(prevRev => ({
      ...prevRev,
      package_id,
      booking_details: booking_details_id

    }))
    setReviewModalVisble(true)
  }

  const handleChangeRating = (value) => {
    setReview(prevState => ({
      ...prevState,
      rating: value,
    }));
  };

  const handleChangeComment = (event) => {
    setReview(prevState => ({
      ...prevState,
      comment: event.target.value,
    }));
  }


  // ==========================================> Subtotal and SubDiscount Calculate <===========================================
  let subtotal = 0;
  let subDiscountPrice = 0;

  if (cartData !== null) {
    cartData.map((data) => {
      const { id, customer_amount, booking_date, created_at, service, booking_details_id } = data;
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
                src={productData.thumbnail ? `${FILE_ENDPOINT}${productData.thumbnail}` : require(`@/resource/static/img/default_img/travel-cambodia.png`)}
                alt=""
              />
              <figcaption>
                <div className="cart-single__info">
                  <Heading as="h6" className="text-base font-medium text-dark dark:text-white87">
                    <Link
                      to={`/tour-service/${productData.id}`}
                      className="text-dark hover:text-primary dark:text-white87 hover:dark:text-primary"
                    >
                      {productData.name}
                    </Link>
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
          <div className="text-start">
            {/* <Button
                  onClick={() => handleReviewModalShow(productData.id, booking_details_id)}
                  size="default"
                  className="hover:bg-primary border-1 border-style border-primary text-primary hover:text-white text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[40px] px-[14px] h-[40px] shadow-btn gap-[8px] dark:text-primary dark:bg-transparent"
                >
                  <UilLayers className="w-[14px] h-[14px]" />
                  Reviews
                </Button>
                <Modal
                  key={productData.id}
                  type="primary"
                  title="Share Your Thoughts: Tour-service review"
                  open={reviewModalVisable}
                  onOk={handleReviewModalOk}
                  onCancel={handleReviewModalCancel}
                  style={{ minWidth: '60%' }}
                >
                  <div className="dark:text-white60">
                    <span className="pl-10 ant-rate-content">
                      <Rate
                        tooltips={desc}
                        onChange={handleChangeRating}
                        value={review.rating}
                        className=" [&>li.ant-rate-star-zero>div>div>span>svg]:text-[#c6d0dc]"
                        style={{ fontSize: '16px' }}
                      />
                      &nbsp;&nbsp;
                      {`${review.rating ? desc[review.rating - 1] : ''}`}
                    </span>
                    <Comment
                      avatar={<Avatar src={`${userProfile && userProfile.profile_image ? (FILE_ENDPOINT + userProfile.profile_image) : require("@/app/static/img/default_img/derleng-default-profile.png")}`} alt="Han Solo" />}
                      content={
                        <TextArea
                          value={review.comment}
                          onChange={handleChangeComment}
                          rows={4}
                          autoSize={{ minRows: 4, maxRows: 100 }}
                        />
                      }
                    />
                  </div>
                </Modal> */}
            { 
            // reviewResponse.data && reviewResponse.data.booking_details === booking_details_id ?
            //   <span className="ant-rate-content">
            //     <Rate
            //       className="ltr:[&>li]:mr-0.5 rtl:[&>li]:ml-0.5 [&>li.ant-rate-star-zero>div>div>span>svg]:text-[#c6d0dc]"
            //       allowHalf
            //       defaultValue={reviewResponse.data.rating}
            //       disabled
            //     />
            //   </span>
            // : 
            data.review == null ?
              <>
                <Button
                  onClick={() => handleReviewModalShow(productData.id, booking_details_id)}
                  size="default"
                  className="hover:bg-primary border-1 border-style border-primary text-primary hover:text-white text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[40px] px-[14px] h-[40px] shadow-btn gap-[8px] dark:text-primary dark:bg-transparent"
                >
                  <UilLayers className="w-[14px] h-[14px]" />
                  Reviews
                </Button>
              </> :
              <span className="ant-rate-content">
                <Rate
                  className="ltr:[&>li]:mr-0.5 rtl:[&>li]:ml-0.5 [&>li.ant-rate-star-zero>div>div>span>svg]:text-[#c6d0dc]"
                  allowHalf
                  defaultValue={data.review.rating}
                  disabled
                />
              </span>
            }
          </div>
        )
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
    {
      title: 'Review',
      dataIndex: 'action',
      key: 'action',
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
      <Modal
        type="primary"
        title="Share Your Thoughts: Tour-service review"
        open={reviewModalVisable}
        onOk={handleReviewModalOk}
        onCancel={handleReviewModalCancel}
        style={{ minWidth: '60%' }}
      >
        <div className="dark:text-white60">
          <span className="pl-10 ant-rate-content">
            <Rate
              tooltips={desc}
              onChange={handleChangeRating}
              value={review.rating}
              className=" [&>li.ant-rate-star-zero>div>div>span>svg]:text-[#c6d0dc]"
              style={{ fontSize: '16px' }}
            />
            &nbsp;&nbsp;
            {`${review.rating ? desc[review.rating - 1] : ''}`}
          </span>
          <Comment
            avatar={<Avatar src={`${userProfile && userProfile.profile_image ? (FILE_ENDPOINT + userProfile.profile_image) : require("@/app/static/img/default_img/derleng-default-profile.png")}`} alt="Han Solo" />}
            content={
              <TextArea
                value={review.comment}
                onChange={handleChangeComment}
                rows={4}
                autoSize={{ minRows: 4, maxRows: 100 }}
              />
            }
          />
        </div>
      </Modal>
    </div>
  )
}

export default BookingTable;