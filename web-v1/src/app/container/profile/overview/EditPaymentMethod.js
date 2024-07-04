import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Input, Button, message, Radio, Spin } from 'antd';
import { GlobalUtilityStyle } from '../../styled';
import Heading from '../../../../resource/components/heading/heading';
import UseFetcher from '../../../hooks/useFetcher';
import WrappedCheckoutForm from '../../sale/overview/CheckoutForm';
import PaymentCard from '../../sale/overview/PaymentCard';
import UilTrashAlt from '@iconscout/react-unicons/icons/uil-trash-alt';
import { deletePaymentMedthod, getPaymentMethod } from '../../../../resource/hooks/Checkout/usePaymentFecher';

function EditPaymentMethod() {

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
    <div className="bg-white dark:bg-white10 m-0 p-0 mb-[25px] rounded-10 relative">
      <div className="py-[18px] px-[25px] text-dark dark:text-white87 font-medium text-[17px] border-regular dark:border-white10 border-b">
        <Heading as="h4" className="mb-0 text-lg font-medium">
          Payment Methods
        </Heading>
        <span className="mb-0.5 text-light dark:text-white60 text-13 font-normal">
          Add or delete your payment methods here!
        </span>
      </div>
      <div className="p-[25px]">
        <GlobalUtilityStyle>
          <Row justify="center">
            <Col xxl={12} sm={16} xs={24}>
              <Radio.Group style={{ width: '100%' }}>
                <WrappedCheckoutForm setRefreshData={setRefreshData} />
                <div className="my-[25px] bg-regularBG dark:bg-white10 p-[25px] rounded-[15px]">
                  <p className='font-medium text-base'>Credit Card</p>
                  {paymentMathod.isLoading ? (
                    <div className='w-full h-full flex justify-center items-center'>
                      <Spin />
                    </div>
                  ) : paymentMathod.data.length > 0 ? (
                    <Radio.Group disabled style={{ width: '100%' }} value={paymentMethodSelected} onChange={e => setPaymentMethodSelected(e.target.value)}>
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
                    <p>No credit card.</p>
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
                    <img className="xs:hidden h-20" src={require('@/resource/static/img/PayPalLogo.png')} alt="paypal" />
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
        </GlobalUtilityStyle>
      </div>
    </div>
  );
}

export default EditPaymentMethod;
