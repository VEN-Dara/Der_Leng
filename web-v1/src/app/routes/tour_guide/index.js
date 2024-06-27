import { Spin } from 'antd';
import React, { lazy, Suspense, useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Category from './category.js';
import ResultSearch from './resultSearch.js';
import CustomerProfile from '../../container/profile/CustomerProfile.js';
const Myprofile = lazy(() => import('../../../resource/container/profile/myProfile/Index'));
const Chat = lazy(() => import('../../../resource/container/chat/ChatApp'));
const NotFound = lazy(() => import('../../container/pages/404'));
const Home = lazy(() => import('../../container/pages/Home'));
const Cart = lazy(() => import('../../container/pages/Cart'));
const BookingPage = lazy(() => import('../../container/pages/Booking.js'))
const ProductDetails = lazy(() => import('../../container/tour_package/ProductDetails.js'))
const CheckoutPage = lazy(() => import('../../../resource/container/ecommerce/Checkout.js'))
import CreatePackage from '../../container/tour_package/CreatePackage.js';
import withTourGuideLayout from '../../layout/tour_guide/withTourGuideLayout.js';
import Dashboard from '../../container/tour_guide/Dashboard.js';
import TourPackage from '../../container/tour_guide/TourPackage.js';
import Review from '../../container/tour_guide/Review.js';
import Setting from '../../container/tour_guide/Setting.js';
import AcceptBooking from '../../container/tour_guide/AcceptBooking.js';
import SaleHistory from '../../container/tour_guide/SaleHistory.js';
import PackageView from '../../container/tour_guide/tour-package/PackageView.js';


const TourGuide = React.memo(() => {
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
        <Route index path="/" element={<Navigate to='/tour-guide/dashboard' />} />
        <Route index path="/dashboard" element={<Dashboard />} />

        {/* :: =============== >> Product */}
        <Route exact path="/tour-package" element={<TourPackage/>} />
        <Route exact path="/new" element={<CreatePackage/>} />
        <Route index path="/tour-package/:id" element={<PackageView/>} />
        
        {/* :: =============== >> Sale */}
        <Route exact path='/accept-booking' element={<AcceptBooking />} />
        <Route exact path='/history-sale' element={<SaleHistory />} />

        {/* :: =============== >> Review */}
        <Route exact path='/my-review' element={<Review />} />

        {/* :: =============== >> Profile and Setting */}
        <Route path="profile/myProfile/*" element={<CustomerProfile/>} />

        {/* :: =============== >> Sale */}
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/checkout' element={<CheckoutPage/>}/>
        <Route path='booking/*' element={<BookingPage/>}/>

        {/* :: =============== >> Chat and Nitifocation */}
        <Route path="chat/*" element={<Chat />} />

        {/* :: =============== >> Not found */}
        <Route path="*" element={<NotFound />} />
        <Route path="/404" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
});

export default withTourGuideLayout(TourGuide);
