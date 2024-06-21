import React, { Suspense } from 'react';
import { Row, Col, Skeleton } from 'antd';
import { PageHeader } from '../../../resource/components/page-headers/page-headers';
import { Cards } from '../../../resource/components/cards/frame/cards-frame';
import { GlobalUtilityStyle } from '../styled';
import Heading from '../../../resource/components/heading/heading';

// @Todo console warning from button

function Setting() {
  const PageRoutes = [
    {
      path: '/admin',
      breadcrumbName: 'Theme Configuration',
    },
    {
      path: '',
      breadcrumbName: 'Theme Configuration',
    },
  ];
  return (
    <>
      <GlobalUtilityStyle>
        <PageHeader
          routes={PageRoutes}
          title="Theme Configuration"
          className="flex md:flex-col items-center justify-between px-8 ssm:px-[15px] pt-2 pb-6 bg-transparent"
        />
        <main className="min-h-[715px] lg:min-h-[580px] px-8 xl:px-[15px] pb-[30px] bg-transparent">
          <Row gutter={15}>
            <Col xs={24}>
              <div>
                <Cards headless size="large" className="mb-[25px] ant-card-body-p-25">
                  <Heading className="text-dark dark:text-white87 font-semibold text-[20px] leading-[24px] mb-[15px]">
                    Theme Colors
                  </Heading>
                  <div>
                    {/* ==================== >> Content here << ====================== */}
                  </div>
                </Cards>
              </div>
            </Col>
          </Row>
        </main>
      </GlobalUtilityStyle>
    </>
  );
}

export default Setting;
