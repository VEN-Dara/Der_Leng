import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Row, Col, Skeleton } from 'antd';
import { Route, Routes } from 'react-router-dom';

// =========================================> Local Import
import { PageHeader } from '../../components/page-headers/page-headers';
import { getCart } from '../../hooks/Product/useCartFetcher';

const CartTable = lazy(() => import('../ecommerce/overview/CartTable'));
const Ordersummary = lazy(() => import('../ecommerce/overview/Ordersummary'));

function ShoppingCart() {
  const PageRoutes = [
    {
      path: '/',
      breadcrumbName: 'Home',
    },
    {
      path: '',
      breadcrumbName: 'Tour Service Cart',
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
      console.log(percentage_discount)
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
        routes={PageRoutes}
        title="Tour Service Cart"
        className="flex  justify-between items-center px-8 xl:px-[15px] pt-2 pb-6 sm:pb-[30px] bg-transparent sm:flex-col"
      />
      <main className="min-h-[715px] lg:min-h-[580px] bg-transparent px-8 xl:px-[15px] pb-[50px] ssm:pb-[30px]">
        <div className="">
          <Row gutter={15}>
            <Col md={24}>
              <div className="bg-white dark:bg-white10 p-[25px] rounded-[10px]">
                <Row gutter={30}>
                  <Col xxl={17} xs={24}>
                    <Suspense
                      fallback={
                        <div className="bg-white dark:bg-white10 p-[25px] rounded-[10px]">
                          <Skeleton className="w-full" paragraph={{ rows: 10 }} active />
                        </div>
                      }
                    >
                      <Routes>
                        <Route index element={<CartTable dataProp={state} setRefreshData={setRefreshData}/>} />
                      </Routes>
                    </Suspense>
                  </Col>
                  <Col xxl={7} xs={24}>
                    <Suspense
                      fallback={
                        <div className="bg-white dark:bg-white10 p-[25px] rounded-[10px]">
                          <Skeleton paragraph={{ rows: 10 }} active />
                        </div>
                      }
                    >
                      <Ordersummary subtotal={subtotal} discount={subDiscountPrice} checkout={false} />
                    </Suspense>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </div>
      </main>
    </>
  );
}

export default ShoppingCart;
