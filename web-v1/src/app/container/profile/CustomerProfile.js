import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Row, Col, Skeleton } from 'antd';
import { NavLink, Route, Routes } from 'react-router-dom';
import { PageHeader } from '../../../resource/components/page-headers/page-headers';
import { Button } from '../../../resource/components/buttons/buttons';
import UilDollarSign from '@iconscout/react-unicons/icons/uil-dollar-sign';
import FavoriteProductList from './overview/FavoriteProductList';
import UseFetcher from '../../hooks/useFetcher';
import defaultProfile from '@/app/static/img/default_img/derleng-default-profile.png'
import defaultCover from '@/app/static/img/default_img/default_profile_cover.png'
import EditProfile from './overview/EditProfile';
import Shop from './overview/Shop';
import { isTourGuideOrAbove } from "../../utility/permission.js"
import NotFound from '../pages/404.js';

const UserCards = lazy(() => import('./overview/UserCard'));
const CoverSection = lazy(() => import('./overview/CoverSection'));
const UserBio = lazy(() => import('./overview/UserBio'));
const Overview = lazy(() => import('./overview/Overview'));
const Timeline = lazy(() => import('./overview/Timeline'));
const Activity = lazy(() => import('./overview/Activity'));

const FILE_ENDPOINT = process.env.REACT_APP_FILE_ENDPOINT

function CustomerProfile() {
  const PageRoutes = [
    {
      path: '/',
      breadcrumbName: 'Explore',
    },
    {
      path: '',
      breadcrumbName: 'My Profile',
    },
  ];
  const path = '.'
  const useFetcher = new UseFetcher();
  const [state, setState] = useState({
    isLoading: false,
    data: null,
    next: null,
    page: 1,
    message: null,
    success: false
  })
  const apiUrl = '/auth/user'

  useEffect(() => {
    useFetcher.retrieve(setState, apiUrl);
  }, [])

  console.log(isTourGuideOrAbove())

  return (
    <>
      <PageHeader
        className="flex flex-wrap items-center justify-between px-8 xl:px-[15px] pt-2 pb-6 sm:pb-[30px] bg-transparent sm:flex-col sm:justify-center"
        title="My Profile"
        routes={PageRoutes}
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
              { state.data &&
              <UserCards
                user={{ name: state.data.fullname, designation: state.data.role.name, img: state.data.profileImage ? `${FILE_ENDPOINT}${state.data.profileImage}` : defaultProfile }}
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
                { state.data && 
                <UserBio user={{email:state.data.email, phone:state.data.phone}} />
                }
              </Suspense>
            </div>
          </Col>
          {/* <Col xxl={18} lg={16} md={14} xs={24} className="md:order-[-1] md:mb-[25px]"> */}
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
                  { state.data && 
                  <CoverSection img={state.data.coverImage ? `${FILE_ENDPOINT}${state.data.coverImage}` : defaultCover} />
                  }

                  {/* ===========================================> Nav Profile <=========================================== */}
                  {/* <nav className="px-[25px]">
                    <ul className="m-0 flex items-center gap-[22px]">
                      <li>
                        <NavLink
                          className="relative block py-[20px] px-[5px] text-light dark:text-white60 [&.active]:text-primary after:[&.active]:bg-primary after:absolute after:bottom-0 ltr:after:left-0 rtl:after:right-0 after:w-full after:h-[2px] after:bg-transparent after:transition-all after:duration-300 after:ease-in-out after:invisible [&.active]:after:visible font-medium"
                          to={`${path}/overview`}
                        >
                          Overview
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          className="relative block py-[20px] px-[5px] text-light dark:text-white60 [&.active]:text-primary after:[&.active]:bg-primary after:absolute after:bottom-0 ltr:after:left-0 rtl:after:right-0 after:w-full after:h-[2px] after:bg-transparent after:transition-all after:duration-300 after:ease-in-out after:invisible [&.active]:after:visible font-medium"
                          to={`${path}/timeline`}
                        >
                          Timeline
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          className="relative block py-[20px] px-[5px] text-light dark:text-white60 [&.active]:text-primary after:[&.active]:bg-primary after:absolute after:bottom-0 ltr:after:left-0 rtl:after:right-0 after:w-full after:h-[2px] after:bg-transparent after:transition-all after:duration-300 after:ease-in-out after:invisible [&.active]:after:visible font-medium"
                          to={`${path}/activity`}
                        >
                          Activity
                        </NavLink>
                      </li>
                    </ul>
                  </nav> */}
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
                  { isTourGuideOrAbove() ? <Route index element={<Shop/>}/> : <Route index element={<FavoriteProductList/>}/>}
                  { isTourGuideOrAbove() && <Route path="shop" element={<Shop/>}/>}
                  <Route path="favorite" element={<FavoriteProductList/>}/>
                  <Route path="setting/*" element={<EditProfile/>}/>
                  <Route path="*" element={<NotFound/>}/>
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
