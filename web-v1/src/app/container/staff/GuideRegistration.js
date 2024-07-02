import React, { useEffect, useState } from 'react';
import { Row, Col, Skeleton, Empty, message } from 'antd';
import { PageHeader } from '../../../resource/components/page-headers/page-headers';
import { GlobalUtilityStyle } from '../styled';
import ApiService from '../../config/api/apiService';
import TourGuideCard from './overview/TourGuideCard';

// @Todo console warning from button

function GuideRegistration() {
  const PageRoutes = [
    {
      path: '/staff',
      breadcrumbName: 'ទំព័រដើម',
    },
    {
      path: '',
      breadcrumbName: 'សំណើរចុះឈ្មោះ',
    },
  ];

  const api = new ApiService();
  const [state, setState] = useState({
    data: [],
    isLoading: false
  })
  const [btnLoading, setBtnLoading] = useState({
    acceptLoading: false,
    rejectLoading: false
  })

  const fetchRegistration = async () => {
    setState(preState => ({ ...preState, isLoading: true }))
    try {
      const response = await api.get('/staff/guide-registrations');
      console.log(response)
      setState(preState => ({
        ...preState,
        data: response.data.results
      }))
    } catch (error) {
      console.error(error)
    } finally {
      setState(preState => ({ ...preState, isLoading: false }))
    }
  }

  const acceptRegistration = async (register_id) => {
    try {
      setBtnLoading(prevLoading => ({...prevLoading, acceptLoading: true}));
      const response = await api.post(`/staff/assign_tour_guide/${register_id}`);
      setState(preState => ({
        ...preState,
        data: state.data.filter(register => register.id !== register_id)
      }))
      message.success('កំណត់អ្នកប្រើប្រាស់ជាមគ្គុទ្ទេសក៍ទេសចរណ៍ដោយជោគជ័យ📧✈️');
      
    } catch (error) {
      console.error('Accept register error', error);
      
    } finally {
      setBtnLoading(prevLoading => ({...prevLoading, acceptLoading: true}));
    }
  }
  
  const rejectRegistration = async (register_id) => {
    try {
      setBtnLoading(prevLoading => ({...prevLoading, rejectLoading: true}));
      const response = await api.post(`/staff/assign_tour_guide/${register_id}`);
      setState(preState => ({
        ...preState,
        data: state.data.filter(register => register.id !== register_id)
      }))
      message.success('បដិសេធអ្នកប្រើប្រាស់ជាមគ្គុទ្ទេសក៍ទេសចរណ៍ដោយជោគជ័យ📦✈️');

    } catch (error) {
      console.error('reject register error', error);

    } finally {
      setBtnLoading(prevLoading => ({...prevLoading, rejectLoading: true}));
    }
  }

  useEffect(() => {
    fetchRegistration();
  }, [])

  return (
    <>
      <GlobalUtilityStyle>
        <PageHeader
          routes={PageRoutes}
          title="សំណើរចុះឈ្មោះ"
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
                  state.data.map((guide) => (
                    <TourGuideCard key={guide.id} data={guide} btnLoading={btnLoading} handleAcceptRegistration={acceptRegistration} handleRejectRegistration={rejectRegistration}/>
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

export default GuideRegistration;
