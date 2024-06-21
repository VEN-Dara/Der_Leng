import React, { Suspense } from 'react';
import { Row, Col, Skeleton, Button } from 'antd';
import { PageHeader } from '../../../resource/components/page-headers/page-headers';
import { Cards } from '../../../resource/components/cards/frame/cards-frame';
import { GlobalUtilityStyle } from '../styled';
import Heading from '../../../resource/components/heading/heading';
import AcceptBookingCard from './overview/AcceptBookingCard';

// @Todo console warning from button

function AcceptBooking() {
  const PageRoutes = [
    {
      path: '/tour-guide',
      breadcrumbName: 'ទំព័រដើម',
    },
    {
      path: '',
      breadcrumbName: 'បញ្ជីបានកក់',
    },
  ];
  return (
    <>
      <GlobalUtilityStyle>
        <PageHeader
          routes={PageRoutes}
          title="បញ្ជីបានកក់"
          className="flex md:flex-col items-center justify-between px-8 ssm:px-[15px] pt-2 pb-6 bg-transparent font-kantumruy-pro"
        />
        <main className="min-h-[715px] lg:min-h-[580px] px-8 xl:px-[15px] pb-[30px] bg-transparent">
          <Row gutter={15}>
            <Col xs={24}>
              <AcceptBookingCard/>
            </Col>
          </Row>
        </main>
      </GlobalUtilityStyle>
    </>
  );
}

export default AcceptBooking;
