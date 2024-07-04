// =============================================================> Core library
import React, { useEffect, lazy, Suspense, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

// =============================================================> Core Third Party
import { Row, Col, Skeleton, Spin, List, Comment } from 'antd';

// =============================================================> Local
import { PageHeader } from '@/resource/components/page-headers/page-headers';
import PackageSchedule from './overview/PackageShedule';
import { getPackageById } from '../../hooks/Product/usePackageFetcher';
import NotFound from '../pages/404';
import Review from './overview/Review';

const DetailsRight = lazy(() => import('./overview/DetailsRight'));
const FILE_ENDPOINT = process.env.REACT_APP_FILE_ENDPOINT

function ProductDetails() {
  const PageRoutes = [
    {
      path: '/',
      breadcrumbName: 'ទំព័រដើម',
    },
    {
      path: '',
      breadcrumbName: 'ព័ត៌មានកញ្ចប់ទេសចរណ៍',
    },
  ];

  const { id } = useParams();
  const packageData = getPackageById({id});
  const { product, isLoader } = packageData;

  return (
    <>
      <PageHeader
        routes={PageRoutes}
        title="ព័ត៌មានកញ្ចប់ទេសចរណ៍"
        className="flex  justify-between items-center px-8 xl:px-[15px] pt-2 pb-6 sm:pb-[30px] bg-transparent sm:flex-col"
      />

      <main className="min-h-[715px] lg:min-h-[580px] bg-transparent px-8 xl:px-[15px] pb-[50px] ssm:pb-[30px]">
        { isLoader ? (
          <div className="spin flex items-center justify-center h-[calc(100vh-132px)]">
            <Spin />
          </div>
        ) : product ? (
          <div className="bg-white dark:bg-white10 p-[25px] rounded-[10px]">

            {/* ==================================> Carousel Daisy ==================================>   */}
            <div className=" carousel carousel-center min-md:mx-[15px] p-2 min-lg:p-4 mb-[10px] space-x-4 bg-neutral dark:bg-white rounded-box h-40 min-md:h-64 min-lg:h-80 min-xl:h-96">
              <div className="carousel-item gap-4 min-lg:gap-4 px-2 min-lg:px-4">
                { product.package_image.map(({id, image, type}) => {
                  return (
                    <img key={id} src={image} className="rounded-box" />
                    )
                  }) }
              </div>

            </div>

            <div className="p-[15px] pb-0 md:px-0">
              <Row gutter={30}>
                <Col xs={24} lg={14}>
                  <Suspense
                    fallback={
                      <div className="bg-white dark:bg-white10 p-[25px] rounded-[10px]">
                        <Skeleton active />
                      </div>
                    }
                  >
                    <DetailsRight product={product} />
                  </Suspense>
                </Col>
                <Col xs={24} lg={10}>
                  <PackageSchedule schedules={product.package_schedule}/>
                </Col>
              </Row>
            </div>
            <Review/>
          </div>
        ) :(
          <NotFound/>
        )}
      </main>
    </>
  );
}

export default ProductDetails;
