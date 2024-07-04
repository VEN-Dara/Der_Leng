import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Row, Col, Skeleton } from 'antd';
import { Link, NavLink, Route, Routes } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';
import { PageHeader } from '../../../resource/components/page-headers/page-headers';
import { Button } from '../../../resource/components/buttons/buttons';
import UilDollarSign from '@iconscout/react-unicons/icons/uil-dollar-sign';
import FavoriteProductList from './overview/FavoriteProductList';
import UseFetcher from '../../hooks/useFetcher';
import defaultProfile from '@/app/static/img/default_img/derleng-default-profile.png'
import defaultCover from '@/app/static/img/default_img/default_profile_cover.png'
import EditProfile from './overview/EditProfile';
import Shop from './overview/Shop';
import { isCustomer, isTourGuideOrAbove } from "../../utility/function/permission.js"
import NotFound from '../pages/404.js';
import { useSelector } from 'react-redux';

const UserCards = lazy(() => import('./overview/UserCard'));
const CoverSection = lazy(() => import('./overview/CoverSection'));
const UserBio = lazy(() => import('./overview/UserBio'));

const FILE_ENDPOINT = process.env.REACT_APP_FILE_ENDPOINT

function CustomerProfile() {
  const PageRoutes = [
    {
      path: '',
      breadcrumbName: 'ទំព័រដើម',
    },
    {
      path: '',
      breadcrumbName: 'គណនី​របស់ខ្ញុំ',
    },
  ];
  const path = '.'
  const data = useSelector((state) => state.userReducer.user)

  return (
    <>
      <PageHeader
        className={isCustomer(data.role) ? "px-8" : 'flex flex-wrap items-center justify-between px-8 xl:px-[15px] pt-2 pb-6 sm:pb-[30px] bg-transparent sm:flex-col sm:justify-center'}
        title="គណនី​របស់ខ្ញុំ"
        routes={isCustomer(data.role) ? null : PageRoutes}
        ghost
        buttons={[
          <Link
            to='/tour-guide-registration'
            key="1"
            className="page-header-actions"
          >
            {isCustomer(data.role) &&
              <Button
                className="bg-primary hover:bg-hbr-primary border-solid border-1 border-primary text-white dark:text-white87 text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[4px] px-[15px] h-[32px]"
                // className="text-primary hover:text-hbr-primary bg-transparent border-none shadow-none text-base font-medium leading-[22px] inline-flex items-center justify-center rounded-[4px] px-[15px] h-[32px]"
                size="small"
                type="primary"
              >
                ចូលរួមជាមគ្គុទ្ទេសក៍ទេសចរណ៍ជាមួយពួកយើង📦
              </Button>
            }
          </Link>,
        ]}
      />
      <main className="min-h-[715px] lg:min-h-[580px] bg-transparent px-8 xl:px-[15px] pb-[50px] ssm:pb-[30px]">
        <Row gutter={25}>
          <Col xxl={6} lg={8} md={10} xs={24}>
            <Suspense
              fallback={
                <div className="bg-white dark:bg-white10 p-[25px] rounded-[10px]">
                  <Skeleton avatar active paragraph={{ rows: 3 }} />
                </div>
              }
            >
              {data &&
                <UserCards
                  user={{ name: data.fullname, designation: data.role.name, img: data.profileImage ? `${FILE_ENDPOINT}${data.profileImage}` : defaultProfile }}
                />
              }
            </Suspense>
            <div className="mt-[25px]">
              <Suspense
                fallback={
                  <div className="bg-white dark:bg-white10 p-[25px] rounded-[10px]">
                    <Skeleton active paragraph={{ rows: 10 }} />
                  </div>
                }
              >
                {data &&
                  <UserBio user={{ email: data.email, phone: data.phone, telegram: data.telegram_account }} />
                }
              </Suspense>
            </div>
          </Col>
          <Col xxl={18} lg={16} md={14} xs={24} className=" md:mb-[25px]">
            <>
              <div className="relative z-[1] bg-white dark:bg-white10 rounded-10 mb-[25px]">
                <Suspense
                  fallback={
                    <div className="bg-white dark:bg-white10 p-[25px] rounded-[10px]">
                      <Skeleton active />
                    </div>
                  }
                >
                  {data &&
                    <CoverSection img={data.coverImage ? `${FILE_ENDPOINT}${data.coverImage}` : defaultCover} />
                  }
                </Suspense>
              </div>

              <Suspense
                fallback={
                  <div className="bg-white dark:bg-white10 p-[25px] rounded-[10px]">
                    <Skeleton active paragraph={{ rows: 10 }} />
                  </div>
                }
              >
                <Routes>
                  <Route index element={<FavoriteProductList />} />
                  <Route path="favorite" element={<FavoriteProductList />} />
                  <Route path="setting/*" element={<EditProfile />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </>
          </Col>
        </Row>
      </main>
    </>
  );
}

CustomerProfile.propTypes = {
  // match: propTypes.object,
};

export default CustomerProfile;
