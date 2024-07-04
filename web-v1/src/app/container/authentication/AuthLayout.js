import { Spin } from 'antd';
import React, { Suspense } from 'react';
import DerlengLogo from '../../static/img/logo/derleng-logo.svg';
import AdminBgLight from '../../../resource/static/img/admin-bg-light.png';

const AuthLayout = (WraperContent) => {
  return function () {
    return (
      <Suspense
        fallback={
          <div className="spin flex items-center justify-center h-[calc(100vh-132px)]">
            <Spin />
          </div>
        }
      >
        <div
          style={{ backgroundImage: `url("${AdminBgLight}")` }}
          className="bg-top bg-no-repeat bg-white dark:bg-[#010413]"
        >
          <div className="py-[120px] 2xl:py-[80px] px-[15px]bg">
            <div className="flex justify-center">
              <img className="dark:hidden" src={DerlengLogo.default} alt="" />
              <img className="hidden dark:block" src={DerlengLogo.default} alt="" />
              
            </div>
            <WraperContent />
          </div>
        </div>
      </Suspense>
    );
  };
};

export default AuthLayout;
