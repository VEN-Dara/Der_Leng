import React, { Suspense, useEffect, useState } from 'react';
import { Row, Col, Skeleton } from 'antd';
import { PageHeader } from '../../../resource/components/page-headers/page-headers';
import { Cards } from '../../../resource/components/cards/frame/cards-frame';
import { Button } from '../../../resource/components/buttons/buttons';
import { GlobalUtilityStyle } from '../styled';
import Heading from '../../../resource/components/heading/heading';
import OverviewDataList from './overview/OverviewDatalist';
import ApiService from '../../config/api/apiService';
import { DataService } from '../../config/dataService/dataService';

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
  const [state, setState] = useState({
    data: null,
    isLoading: true,
    error: null
  })

  const fetchDashboard = async () => {
    try {
      const response = await DataService.get('/staff/dashboard')
      setState(preState => ({
        ...preState,
        data: response.data,
        isLoading: false,
      }))

    } catch (error) {
      setState(preState => ({
        ...preState,
        isLoading: false,
        error: error
      }))
    }      
  }

  useEffect(() => {
    fetchDashboard();
  }, [])

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
                            <OverviewDataList data={state.data} />
                        </Suspense>
                    </Col>
                    </Row>
              </div>
            </Col>
          </Row>
        </main>
      </GlobalUtilityStyle>
    </>
  );
}

export default Dashboard;
