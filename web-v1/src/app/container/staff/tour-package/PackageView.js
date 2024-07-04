// =============================================================> Core library
import React, { useEffect, lazy, Suspense, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

// =============================================================> Core Third Party
import { Row, Col, Skeleton, Spin, List, Comment, Drawer } from 'antd';

// =============================================================> Local
import { PageHeader } from '@/resource/components/page-headers/page-headers';
import PackageSchedule from './overview/PackageShedule';
import { getPackageById } from '../../../hooks/Product/usePackageFetcher';
import NotFound from '../../pages/404';
import Review from '../../tour_package/overview/Review';
import { ShareButtonPageHeader } from '../../../../resource/components/buttons/share-button/share-button';
import { Button } from '../../../../resource/components/buttons/buttons';
import UilTrashAlt from '@iconscout/react-unicons/icons/uil-trash-alt';
import { alertModal } from '../../../../resource/components/modals/antd-modals';
import ApiService from '../../../config/api/apiService';
import UpdatePackage from '../../tour_package/UpdatePackage';

const DetailsRight = lazy(() => import('./overview/DetailsRight'));
const FILE_ENDPOINT = process.env.REACT_APP_FILE_ENDPOINT

function PackageView() {
  const PageRoutes = [
    {
      path: '',
      breadcrumbName: 'ទំព័រដើម',
    },
    {
      path: '',
      breadcrumbName: 'ព័ត៌មានកញ្ចប់ទេសចរណ៍',
    },
  ];

  const api = new ApiService();
  const { id } = useParams();
  const packageData = getPackageById({ id });
  const { product, isLoader } = packageData;
  const [openEditDrawer, setOpenEditDrawer] = useState(false)
  const navigate = useNavigate();

  const removePackage = async (id) => {
    alertModal.confirm({
      title: 'តើអ្នកពិតជាចង់លុបកញ្ចប់នេះមែនទេ?',
      content: '',
      className: 'font-kantumruy-pro',
      okText: 'បាទ, ចាស',
      okType: 'danger',
      cancelText: 'ទេ អរគុណ',
      async onOk() {
        try {
          const response = await api.delete(`/packages/${id}`);
          navigate('/tour-guide/tour-package')
        } catch (error) {
          console.log(error)
        }
      },
      onCancel() { }
    });
  }

  return (
    <>
      <PageHeader
        className="bg-regularBG dark:bg-regularBGdark md:flex-col md:justify-center"
        ghost
        title="កញ្ចប់ទេសចរណ៍"
        buttons={[
          <div
            key="1"
            className="page-header-actions flex items-center flex-wrap gap-[10px] md:justify-center"
          >
            <Button
              onClick={() => { removePackage(id) }}
              size="small"
              type="white"
              className="flex items-center justify-center gap-1 h-[36px] min-w-[100px] m-[5px] px-6 font-kantumruy-pro text-body dark:text-white60 hover:text-danger text-xs font-semibold border-normal hover:border-danger dark:border-white10 hover:dark:border-danger dark:bg-transparent dark:hover:text-danger"
              outlined
            >
              <UilTrashAlt className="w-[14px] h-[14px]" />
              លុបចោល
            </Button>
            <Button
              onClick={() => { setOpenEditDrawer(true) }}
              size="small"
              type="primary"
              className="flex items-center text-center justify-center min-w-[100px] h-[36px] m-[5px] px-6 bg-primary font-kantumruy-pro text-white dark:text-white87 text-xs font-semibold border-primary"
            >
              កែប្រែ
            </Button>
            <Drawer title="កែប្រែព័ត៍មានកញ្ចប់ទេសចរណ៍" placement="right" className='[&>div.ant-drawer-content-wrapper]:w-[100%] min-md:[&>div.ant-drawer-content-wrapper]:w-[600px] min-lg:[&>div.ant-drawer-content-wrapper]:w-[640px] ' onClose={() => { setOpenEditDrawer(false) }} open={openEditDrawer} >
              <UpdatePackage id={id} />
            </Drawer>
          </div>,
        ]}
      />

      <main className="min-h-[715px] lg:min-h-[580px] bg-transparent p-0 min-md:px-8 xl:px-[15px] pb-[50px] ssm:pb-[30px]">
        {isLoader ? (
          <div className="spin flex items-center justify-center h-[calc(100vh-132px)]">
            <Spin />
          </div>
        ) : product ? (
          <div className="bg-white dark:bg-white10 p-0 min-md:p-[25px] rounded-[10px]">

            {/* ==================================> Carousel Daisy ==================================>   */}
            <div className=" carousel carousel-center min-md:mx-[15px] p-2 min-lg:p-4 mb-[10px] space-x-4 bg-neutral dark:bg-white rounded-box h-40 min-md:h-64 min-lg:h-80 min-xl:h-96">
              <div className="carousel-item gap-4 min-lg:gap-4 px-2 min-lg:px-4">
                {product.package_image.map(({ id, image, type }) => {
                  return (
                    <img key={id} src={image} className="rounded-box" />
                  )
                })}
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
                <Col xs={30} lg={10}>
                  <PackageSchedule schedules={product.package_schedule} />
                </Col>
              </Row>
            </div>
            <Review />
          </div>
        ) : (
          <NotFound />
        )}
      </main>
    </>
  );
}

export default PackageView;
