import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Row, Col, Form, Input, Select, Radio, Table, Spin, message, notification } from 'antd';
import { Link } from 'react-router-dom';
import UilPlus from '@iconscout/react-unicons/icons/uil-plus';
import UilMinus from '@iconscout/react-unicons/icons/uil-minus';
import UilEdit from '@iconscout/react-unicons/icons/uil-edit';
import UilCheck from '@iconscout/react-unicons/icons/uil-check';
import UilTrashAlt from '@iconscout/react-unicons/icons/uil-trash-alt';
import { useDispatch, useSelector } from 'react-redux';
import { Steps } from '../../../components/steps/steps';
import Heading from '../../../components/heading/heading';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { Button } from '../../../components/buttons/buttons';
import { GlobalUtilityStyle } from '../../styled';
import { formatDate } from '../../../service/date';
import WrappedCheckoutForm from './CheckoutForm';
import PaymentCard from './PaymentCard';
import { deletePaymentMedthod, getPaymentMethod } from '../../../hooks/Checkout/usePaymentFecher';
import { putCart } from '../../../hooks/Product/useCartFetcher';
import CheckOutModal from './CheckoutModal';
import { postBooking } from '../../../hooks/Checkout/useBookingFetcher';

const FILE_ENDPOINT = process.env.REACT_APP_FILE_ENDPOINT

const { Option } = Select;
function CheckOut({ dataProp, setRefreshCartData }) {
  const cartData = dataProp.carts
  const isLoading = dataProp.isLoader

  const [form] = Form.useForm();

  const [state, setState] = useState({
    status: 'process',
    isFinished: false,
    current: 1,
  });

  const { status, isFinished, current } = state;

  useLayoutEffect(() => {
    const activeElement = document.querySelectorAll('.ant-steps-item-active');
    const successElement = document.querySelectorAll('.ant-steps-item-finish');

    activeElement.forEach((element) => {
      if (element.previousSibling) {
        const bgImage = element.previousSibling;
        if (bgImage.classList.contains('success-step-item')) {
          bgImage.classList.remove('success-step-item');
        } else {
          bgImage.classList.remove('wizard-step-item');
        }
        bgImage.classList.add('wizard-steps-item-active');
      }
    });

    successElement.forEach((element) => {
      if (element.previousSibling) {
        const bgImage = element.previousSibling;
        bgImage.classList.remove('wizard-steps-item-active');
        bgImage.classList.add('success-step-item');
        // if(bgImage.classList.has('.ant-steps-item-active'))
      }
    });
  });

  const incrementUpdate = (id, quantity) => {
    const data = parseInt(quantity, 10) + 1;
    const customer_amount = data;
    putCart({ customer_amount, id });
    setRefreshCartData(true);
  };

  const decrementUpdate = (id, quantity) => {
    const data = parseInt(quantity, 10) >= 2 ? parseInt(quantity, 10) - 1 : 1;
    const customer_amount = data;
    putCart({ customer_amount, id });
    setRefreshCartData(true);
  };

  const next = () => {
    setState({
      ...state,
      status: 'process',
      current: current + 1,
    });
  };

  const prev = () => {
    setState({
      ...state,
      status: 'process',
      current: current - 1,
    });
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOk = async () => {
    const listCartId = cartData.map(cart => cart.id);
    const carts = listCartId.map(id => ({id}))
    const data = {
      payment_method: JSON.parse(paymentMethodSelected).id,
      carts: JSON.stringify(carts)
    }
    
    const response = await postBooking(data)
    
    if(response.status === 200) {
      setState({
        ...state,
        status: 'finish',
        isFinished: true,
        current: 0,
      });
    }
    else {
      
      notification.error({
        message: 'Failed Checkout!',
        description:`We apologize, but it seems there was an issue processing your order at this time. Please double-check your payment information and try again. If the problem persists, feel free to reach out to our customer support team for assistance. Thank you for your patience and understanding`,
      });
    }
    
    setIsModalOpen(false)
  };

  const handleCancel = () => {
    setIsModalOpen(false)
  };

  const done = () => {
    if(!paymentMethodSelected) {
      message.error("Please select a payment method to proceed with your purchase!")
      return
    }
    if(cartData.length===0) {
      message.warning("We're sorry, but it appears that your shopping cart is currently empty!")
      return
    }
    setIsModalOpen(true)
  };

  const month = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];

  const dataSource = [];

  // ==========================================> Subtotal and SubDiscount Calculate <===========================================
  let subtotal = 0;
  let subDiscountPrice = 0;

  if (cartData !== null) {
    cartData.map((data) => {
      const { id, customer_amount, booking_date, created_at, service } = data;
      const productData = data["package"]
      const discountPrice = productData.percentage_discount*service.price/100;
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
            <Button
              onClick={() => decrementUpdate(id, customer_amount)}
              className="flex items-center justify-center bg-section dark:bg-white10 w-9 h-9 p-0 text-body dark:text-white60 border-none rounded-[10px]"
              type="default"
            >
              <UilMinus className="w-3 h-3" />
            </Button>
            {customer_amount}
            <Button
              onClick={() => incrementUpdate(id, customer_amount)}
              className="flex items-center justify-center bg-section dark:bg-white10 w-9 h-9 p-0 text-body dark:text-white60 border-none rounded-[10px]"
              type="default"
            >
              <UilPlus className="w-3 h-3" />
            </Button>
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

  // =============> Get Payment Mathod <==================
  const [paymentMathod, setPaymentMethod] = useState({
    isLoading: true,
    data: []
  })
  const [paymentMethodSelected, setPaymentMethodSelected] = useState(null);
  const [refreshData , setRefreshData] = useState()

  const paymentMethodDeleted = async (id) => {
    const response = await deletePaymentMedthod(id)
    if(response.status===200) {
      message.success('Payment delete successfully!');
      setRefreshData(!refreshData);
    }
  }
  
  useEffect(() => {
    getPaymentMethod(setPaymentMethod)
    setRefreshData(false)
  }, [refreshData])

  return (
    <>
      <Steps
        isswitch
        current={0}
        status={status}
        steps={[
          {
            title: 'Payment Method',
            content: (
              <div className="w-[580px] sm:px-[25px] ssm:px-[15px]">
                <Row justify="center">
                  <Col sm={22} xs={24}>
                    <Heading as="h4" className="mb-[38px] text-xl md:text-lg ssm:text-base font-semibold">
                      1. Please Select Your Payment Method
                    </Heading>
                    <Radio.Group style={{ width: '100%' }}>
                      <WrappedCheckoutForm setRefreshData={setRefreshData} />
                      <div className="my-[25px] bg-regularBG dark:bg-white10 p-[25px] rounded-[15px]">
                        <p className='font-medium text-base'>Credit Card</p>
                        {paymentMathod.isLoading ? (
                          <div className='w-full h-full flex justify-center items-center'>
                            <Spin />
                          </div>
                        ) : paymentMathod.data.length > 0 ? (
                          <Radio.Group style={{ width: '100%' }} value={paymentMethodSelected} onChange={e => setPaymentMethodSelected(e.target.value)}>
                            {paymentMathod.data.map(({ id, last4, brand, exp_month, exp_year, is_default }) => {
                              return (
                                <div className='mb-[15px] flex justify-between items-center'>
                                  <PaymentCard key={id} creditCard={{ id, last4, brand, expMonth: exp_month, expYear: exp_year }} />
                                  <div className="text-end">
                                  <Button
                                    onClick={() => paymentMethodDeleted(id)}
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
                                </div>
                              )
                            })}
                          </Radio.Group>
                        ) : (
                          <p className='text-body'>No credit card.</p>
                        )}
                      </div>

                      {/* ================================> Other payment Choice <============================ */}

                      <div className="mb-[25px]">
                        <Radio
                          disabled
                          value="payPal"
                          style={{ width: '100%' }}
                          className="ltr:[&>span.ant-radio]:mr-[15px] rtl:[&>span.ant-radio]:ml-[15px] [&>span:not(.ant-radio)]:flex [&>span:not(.ant-radio)]:items-center [&>span:not(.ant-radio)]:justify-between [&>span:not(.ant-radio)]:w-full [&>span:not(.ant-radio)]:h-[60px] [&>span:not(.ant-radio)]:px-[25px] [&>span:not(.ant-radio)]:text-body dark:[&>span:not(.ant-radio)]:text-white60 [&>span:not(.ant-radio)]:text-[15px] [&>span:not(.ant-radio)]:font-medium [&>span:not(.ant-radio)]:border [&>span:not(.ant-radio)]:border-regular dark:[&>span:not(.ant-radio)]:border-white10 [&>span:not(.ant-radio)]:rounded-[10px]"
                        >
                          Pay With PayPal (upcoming)
                          <img className="xs:hidden h-20" src={require('../../../static/img/PayPalLogo.png')} alt="paypal" />
                        </Radio>
                      </div>
                      <div className="">
                        <Radio
                          disabled
                          value="cash"
                          style={{ width: '100%' }}
                          className="ltr:[&>span.ant-radio]:mr-[15px] rtl:[&>span.ant-radio]:ml-[15px] [&>span:not(.ant-radio)]:flex [&>span:not(.ant-radio)]:items-center [&>span:not(.ant-radio)]:justify-between [&>span:not(.ant-radio)]:w-full [&>span:not(.ant-radio)]:h-[60px] [&>span:not(.ant-radio)]:px-[25px] [&>span:not(.ant-radio)]:text-body dark:[&>span:not(.ant-radio)]:text-white60 [&>span:not(.ant-radio)]:text-[15px] [&>span:not(.ant-radio)]:font-medium [&>span:not(.ant-radio)]:border [&>span:not(.ant-radio)]:border-regular dark:[&>span:not(.ant-radio)]:border-white10 [&>span:not(.ant-radio)]:rounded-[10px]"
                        >
                          Cash on delivery (upcoming)
                        </Radio>
                      </div>
                    </Radio.Group>
                  </Col>
                </Row>
              </div>
            ),
          },
          {
            title: 'Review Order',
            content:
              status !== 'finish' ? (
                <div className="w-full 3xl:px-[30px] ssm:px-[15px]">
                  <Heading as="h4" className="mb-[38px] text-xl md:text-lg ssm:text-base font-semibold">
                    4. Review and confirm Order
                  </Heading>
                  <GlobalUtilityStyle>
                    <div className="p-[25px] ssm:px-[15px] rounded-[10px] border border-normal dark:border-white10">
                      <div className="bg-regularBG dark:bg-white10 mb-[25px] p-[25px] rounded-[15px]">
                        <div>
                          <Heading
                            as="h5"
                            className="flex items-center justify-between mb-[25px] text-body dark:text-white60 text-lg font-normal"
                          >
                            Payment Method
                          </Heading>
                        </div>
                        { paymentMethodSelected && (
                          <PaymentCard key={`${paymentMethodSelected.id}-selected`} creditCard={JSON.parse(paymentMethodSelected)} isSelected={true} />
                        )}
                      </div>
                      <div className="bg-regularBG dark:bg-white10 mb-[25px] p-[25px] rounded-[15px]">
                        <div className="border-b table-responsive table-bg-transparent table-head-none hover-tr-none table-td-border-none border-regular dark:border-white10">
                          <Table pagination={false} dataSource={dataSource} columns={columns}/>
                        </div>
                        <Row justify="end">
                          {/* <Col xxl={8} xl={5} md={9} sm={14} xs={24} offset={!rtl ? 10 : 0}> */}
                          <Col xxl={8} xl={5} md={9} sm={14} xs={24} offset={!true ? 10 : 0}>
                            <div className="invoice-summary-inner">
                              <ul className="flex flex-col mt-5 mb-[10px]">
                                <li className="inline-flex justify-between">
                                  <span className="text-dark dark:text-white87 text-[15px] font-medium">Subtotal :</span>
                                  <span className="text-dark dark:text-white87 text-[15px] font-medium">{`$${subtotal}`}</span>
                                </li>
                                <li className="inline-flex justify-between">
                                  <span className="text-dark dark:text-white87 text-[15px] font-medium">Discount :</span>
                                  <span className="text-dark dark:text-white87 text-[15px] font-medium">{`-$${subDiscountPrice}`}</span>
                                </li>
                              </ul>
                              <Heading className="flex justify-between" as="h4">
                                <span className="text-base font-medium text-dark dark:text-white87">Total : </span>
                                <span className="text-lg font-semibold text-primary">{`$${subtotal - subDiscountPrice}`}</span>
                              </Heading>
                            </div>
                          </Col>
                        </Row>
                      </div>
                    </div>
                  </GlobalUtilityStyle>
                </div>
              ) : (
                <Row justify="center" style={{ width: '100%' }}>
                  <Col xl={22} xs={24}>
                    <div className="checkout-successful 3xl:px-[30px]">
                      <Cards
                        headless
                        bodyStyle={{
                          borderRadius: '20px',
                        }}
                      >
                        <Cards headless>
                          <span className="icon-success">
                            <UilCheck />
                          </span>
                          <Heading as="h3">Payment Successful</Heading>
                          <p>Thank you! We have received your Payment</p>
                        </Cards>
                      </Cards>
                    </div>
                  </Col>
                </Row>
              ),
          },
        ]}
        onNext={next}
        onPrev={prev}
        onDone={done}
        isfinished={isFinished}
      />
      <CheckOutModal subDiscountPrice={subDiscountPrice} subtotal={subtotal} handleOk={handleOk} handleCancel={handleCancel} visible={isModalOpen}/>
    </>
  );
}

export default CheckOut;
