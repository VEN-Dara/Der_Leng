import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Row, Col, Skeleton } from 'antd';
import { Route, Routes } from 'react-router-dom';

// =========================================> Local Import
import { PageHeader } from '../../components/page-headers/page-headers';
import { getBooking } from '../../hooks/Checkout/useBookingFetcher';

const BookingTable = lazy(() => import('../ecommerce/overview/BookingTable'));
const Ordersummary = lazy(() => import('../ecommerce/overview/Ordersummary'));

function BookingPage() {
  const PageRoutes = [
    {
      path: '/',
      breadcrumbName: 'Home',
    },
    {
      path: '',
      breadcrumbName: 'Booking',
    },
  ];

  const [state, setState] = useState({
    data: [],
    isLoader: true,
  })
  
  const [refreshData, setRefreshData] = useState(true)

  const {isLoader, data} = state;
  
  let subtotal = 0;
  let subDiscountPrice = 0;

  // if (!isLoader && carts !== null) {
  //   carts.map((cart) => {
  //     const percentage_discount = cart["package"].percentage_discount;
  //     console.log(percentage_discount)
  //     const quantity = cart.customer_amount;
  //     const price = cart.service.price;
  //     const discountPrice = percentage_discount*cart.service.price/100;
  //     subtotal += parseInt(quantity, 10) * parseInt(price, 10);
  //     subDiscountPrice += parseInt(quantity, 10) * parseInt(discountPrice, 10)
  //     return subtotal;
  //   });
  // }

  useEffect(() => {
    getBooking(setState)
    setRefreshData(false)
  }, [refreshData])


  return (
    <>
      <PageHeader
        routes={PageRoutes}
        title="Tour Service Booking"
        className="flex  justify-between items-center px-8 xl:px-[15px] pt-2 pb-6 sm:pb-[30px] bg-transparent sm:flex-col"
      />
      <main className="min-h-[715px] lg:min-h-[580px] bg-transparent px-8 xl:px-[15px] pb-[50px] ssm:pb-[30px]">
        <div className="">
          <Row gutter={15}>
            <Col md={24}>
              <div className="bg-white dark:bg-white10 p-[25px] rounded-[10px]">
                <Row gutter={30}>
                  {data.map(({carts, created_at, currency, customer, id, total_price}) => {
                    return (
                      <>
                      {(carts.length !== 0) &&
                        <Col xxl={17} xs={24} key={id} >
                          <Suspense
                            fallback={
                              <div className="bg-white dark:bg-white10 p-[25px] rounded-[10px]">
                                <Skeleton className="w-full" paragraph={{ rows: 10 }} active />
                              </div>
                            }
                          >
                            <Routes>
                              <Route index element={<BookingTable dataProp={{carts, created_at, currency, customer, total_price, id, isLoader}}/>} />
                            </Routes>
                          </Suspense>
                        </Col>
                      }
                      </>
                    )
                  })}
                </Row>
              </div>
            </Col>
          </Row>
        </div>
      </main>
    </>
  );
}

export default BookingPage;
