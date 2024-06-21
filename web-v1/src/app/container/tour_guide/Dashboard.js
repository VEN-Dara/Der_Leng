import React, { Suspense } from 'react';
import { Row, Col, Skeleton } from 'antd';
import { PageHeader } from '../../../resource/components/page-headers/page-headers';
import { Cards } from '../../../resource/components/cards/frame/cards-frame';
import { Button } from '../../../resource/components/buttons/buttons';
import { GlobalUtilityStyle } from '../styled';
import Heading from '../../../resource/components/heading/heading';
import OverviewDataList from './overview/OverviewDatalist';

// @Todo console warning from button

function Dashboard() {
  const PageRoutes = [
    {
      path: '/tour-guide',
      breadcrumbName: 'ផ្ទាំងព័ត៍មាន',
    },
    {
      path: 'dashboard',
      breadcrumbName: 'ផ្ទាំងព័ត៍មាន',
    },
  ];
  return (
    <>
      <GlobalUtilityStyle>
        <PageHeader
          routes={PageRoutes}
          title="ផ្ទាំងព័ត៍មាន"
          className="flex md:flex-col items-center justify-between px-8 ssm:px-[15px] pt-2 pb-6 bg-transparent font-kantumruy-pro"
        />
        <main className="min-h-[715px] lg:min-h-[580px] px-8 xl:px-[15px] pb-[30px] bg-transparent">
          <Row gutter={15}>
            <Col xs={24}>
              <div>
              <Row gutter={25}>
                    <Col xxl={12} xs={24}>
                        <Suspense
                            fallback={
                                <Cards headless className="mb-[25px]">
                                    <Skeleton active />
                                </Cards>
                            }
                        >
                            <OverviewDataList />
                        </Suspense>
                    </Col>
                    </Row>
                {/* <Cards headless size="large" className="mb-[25px] ant-card-body-p-25">
                  <Heading className="text-dark dark:text-white87 font-semibold text-[20px] leading-[24px] mb-[15px]">
                    Theme Colors
                  </Heading>
                  <Row gutter={25}>
                    <Col xxl={12} xs={24}>
                        <Suspense
                            fallback={
                                <Cards headless className="mb-[25px]">
                                    <Skeleton active />
                                </Cards>
                            }
                        >
                            <OverviewDataList />
                        </Suspense>
                    </Col>
                    </Row>
                </Cards> */}
              </div>
            </Col>
          </Row>
        </main>
      </GlobalUtilityStyle>
    </>
  );
}

export default Dashboard;
