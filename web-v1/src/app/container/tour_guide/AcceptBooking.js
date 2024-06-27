import React, { useEffect, useState } from 'react';
import { Row, Col, Skeleton, Empty } from 'antd';
import { PageHeader } from '../../../resource/components/page-headers/page-headers';
import { GlobalUtilityStyle } from '../styled';
import AcceptBookingCard from './overview/AcceptBookingCard';
import ApiService from '../../config/api/apiService';

// @Todo console warning from button

function AcceptBooking() {
  const PageRoutes = [
    {
      path: '/tour-guide',
      breadcrumbName: 'ទំព័រដើម',
    },
    {
      path: '',
      breadcrumbName: 'រងចាំទទួលព្រម',
    },
  ];

  const api = new ApiService();
  const [state, setState] = useState({
    data: [],
    isLoading: false
  })

  const fetchBooking = async () => {
    setState(preState => ({ ...preState, isLoading: true }))
    try {
      const response = await api.get('/tour-guide/accept_booking/new');
      setState(preState => ({
        ...preState,
        data: response.data
      }))
    } catch (error) {
      console.error(error)
    } finally {
      setState(preState => ({ ...preState, isLoading: false }))
    }
  }

  useEffect(() => {
    fetchBooking();
  }, [])

  return (
    <>
      <GlobalUtilityStyle>
        <PageHeader
          routes={PageRoutes}
          title="រងចាំទទួលព្រម"
          className="flex md:flex-col items-center justify-between px-8 ssm:px-[15px] pt-2 pb-6 bg-transparent font-kantumruy-pro"
        />
        <main className="min-h-[715px] lg:min-h-[580px] px-8 xl:px-[15px] pb-[30px] bg-transparent">
          <Row gutter={15}>
            <Col xs={24}>
              {
                state.isLoading ? (
                  <div className="bg-white dark:bg-white10 p-[25px] rounded-[10px]">
                    <Skeleton active paragraph={{ rows: 10 }} />
                  </div>
                ) : state.data.length > 0 ? (
                  state.data.map((booking) => (
                    <AcceptBookingCard key={booking.id} data={booking}/>
                  ))
                ) : (
                  <div className="bg-white dark:bg-white10 p-[25px] rounded-[10px]">
                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                  </div>
                )
              }
            </Col>
          </Row>
        </main>
      </GlobalUtilityStyle>
    </>
  );
}

export default AcceptBooking;
