import { Spin } from 'antd';
import React, { lazy, Suspense, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import withCustomerLayout from '../../layout/customer/withCustomerLayout.js';
import Category from './category.js';
import ResultSearch from './resultSearch.js';
import CustomerProfile from '../../container/profile/CustomerProfile.js';
const Chat = lazy(() => import('../../../resource/container/chat/ChatApp'));
const NotFound = lazy(() => import('../../container/pages/404'));
const Home = lazy(() => import('../../container/pages/Home'));
const Cart = lazy(() => import('../../container/pages/Cart'));
const BookingPage = lazy(() => import('../../container/pages/Booking.js'))
const ProductDetails = lazy(() => import('../../container/tour_package/ProductDetails.js'))
// const CheckoutPage = lazy(() => import('../../../resource/container/ecommerce/Checkout.js'))
const CheckoutPage = lazy(() => import('../../container/sale/Checkout.js'))
import TourGuideRegistration from '../../container/customer/TourGuideRegistration.js';


const Customer = React.memo(() => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <Suspense
      fallback={
        <div className="spin flex items-center justify-center bg-white dark:bg-dark h-screen w-full fixed z-[999] ltr:left-0 rtl:right-0 top-0">
          <Spin />
        </div>
      }
      className="bg-green-500"
    >
      <Routes>
        {/* :: =============== >> list package */}
        <Route index path="/" element={<Home />} />
        <Route index path="/results" element={<ResultSearch/>} />
        <Route index path="/category/:category" element={<Category/>} />

        {/* :: =============== >> Product */}
        <Route index path="tour-service/:id" element={<ProductDetails />} />

        {/* :: =============== >> Profile */}
        <Route path="profile/myProfile/*" element={<CustomerProfile/>} />

        {/* :: =============== >> Sale */}
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/checkout' element={<CheckoutPage/>}/>
        <Route path='booking/*' element={<BookingPage/>}/>

        {/* :: =============== >> Chat and Nitifocation */}
        <Route path="chat/*" element={<Chat />} />

        <Route path="/tour-guide-registration" element={<TourGuideRegistration/>} />

        {/* :: =============== >> Not found */}
        <Route path="*" element={<NotFound />} />
        <Route path="/404" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
});

export default withCustomerLayout(Customer);
