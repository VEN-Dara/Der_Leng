import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Row, Col, Skeleton } from 'antd';
import { Route, Routes } from 'react-router-dom';
import { WizardWrapper } from '../styled';
import { PageHeader } from '../../../resource/components/page-headers/page-headers';
import { getCart } from '../../hooks/Product/useCartFetcher';
import { Cards } from '../../../resource/components/cards/frame/cards-frame';

const Checkout = lazy(() => import('./overview/CheckoutWizard'));
const Ordersummary = lazy(() => import('./overview/Ordersummary'));

function CheckoutPage() {
  const PageRoutes = [
    {
      path: '/',
      breadcrumbName: 'Home',
    },
    {
      path: '',
      breadcrumbName: 'Checkout',
    },
  ];

  const [state, setState] = useState({
    carts: [],
    isLoader: true,
  })
  
  const [refreshData, setRefreshData] = useState(true)

  const {isLoader, carts} = state;
  
  let subtotal = 0;
  let subDiscountPrice = 0;

  if (!isLoader && carts !== null) {
    carts.map((cart) => {
      const percentage_discount = cart["package"].percentage_discount;
      const quantity = cart.customer_amount;
      const price = cart.service.price;
      const discountPrice = percentage_discount*cart.service.price/100;
      subtotal += parseInt(quantity, 10) * parseInt(price, 10);
      subDiscountPrice += parseInt(quantity, 10) * parseInt(discountPrice, 10)
      return subtotal;
    });
  }

  useEffect(() => {
    getCart(setState)
    setRefreshData(false)
  }, [refreshData])

  return (
    <>
      <PageHeader
        className="flex justify-between items-center px-8 xl:px-[15px] pt-2 pb-6 sm:pb-[30px] bg-transparent sm:flex-col"
        title="Shopping Cart"
        routes={PageRoutes}
      />
      <main className="min-h-[715px] lg:min-h-[580px] bg-transparent px-8 xl:px-[15px] pb-[50px] ssm:pb-[30px]">
        <Row gutter={15}>
          <Col md={24}>
            <Cards className="[&>.ant-card-body]:p-[40px] xl:[&>.ant-card-body]:px-[15px]" headless>
              <Row gutter={30}>
                <Col xxl={17} xs={24} className="3xl:mb-[50px] xs:px-0">
                  <WizardWrapper>
                    <Suspense
                      fallback={
                        <Cards headless>
                          <Skeleton paragraph={{ rows: 10 }} active />
                        </Cards>
                      }
                    >
                      <Routes>
                        <Route index element={<Checkout dataProp={state} setRefreshCartData={setRefreshData} />} />
                      </Routes>
                    </Suspense>
                  </WizardWrapper>
                </Col>
                <Col xxl={7} xs={24}>
                  <Suspense
                    fallback={
                      <Cards headless>
                        <Skeleton paragraph={{ rows: 10 }} active />
                      </Cards>
                    }
                  >
                    <Ordersummary subtotal={subtotal} discount={subDiscountPrice} checkout={true} />
                  </Suspense>
                </Col>
              </Row>
            </Cards>
          </Col>
        </Row>
      </main>
    </>
  );
}

export default CheckoutPage;
