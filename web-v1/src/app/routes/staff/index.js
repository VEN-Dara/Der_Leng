import { Spin } from 'antd';
import React, { lazy, Suspense, useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import CustomerProfile from '../../container/profile/CustomerProfile.js';
const Chat = lazy(() => import('../../../resource/container/chat/ChatApp'));
const NotFound = lazy(() => import('../../container/pages/404'));
import Dashboard from '../../container/staff/Dashboard.js';
import withStaffLayout from '../../layout/staff/withStaffLayout.js';
import TourGuide from '../../container/staff/TourGuide.js';
import GuideRegistration from '../../container/staff/GuideRegistration.js';


const Staff = React.memo(() => {
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
        <Route index path="/" element={<Navigate to='/staff/dashboard' />} />
        <Route index path="/dashboard" element={<Dashboard />} />

        {/* :: =============== >> Tour guide */}
        <Route exact path="/guide-register" element={<GuideRegistration/>} />
        <Route exact path="/tour-guide" element={<TourGuide/>} />

        {/* :: =============== >> Profile and Setting */}
        <Route path="profile/myProfile/*" element={<CustomerProfile/>} />

        {/* :: =============== >> Chat and Nitifocation */}
        <Route path="chat/*" element={<Chat />} />

        {/* :: =============== >> Not found */}
        <Route path="*" element={<NotFound />} />
        <Route path="/404" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
});

export default withStaffLayout(Staff);
