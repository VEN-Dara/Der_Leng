import React, { Suspense } from 'react';
import { Row, Col, Skeleton } from 'antd';
import { PageHeader } from '../../../resource/components/page-headers/page-headers';
import { Cards } from '../../../resource/components/cards/frame/cards-frame';
import { GlobalUtilityStyle } from '../styled';
import Heading from '../../../resource/components/heading/heading';
import { useEffect, useState } from "react"
import UseFetcher from '../../hooks/useFetcher';
import List from "./overview/List";
import { Button } from "../../../resource/components/buttons/buttons";
import { Link } from "react-router-dom";

// @Todo console warning from button

function TourPackage() {
  const PageRoutes = [
    {
      path: '/tour-guide',
      breadcrumbName: 'ផ្ទាំងព័ត៍មាន',
    },
    {
      path: '',
      breadcrumbName: 'កញ្ចប់ទេសចរណ៍',
    },
  ];
  const apiUrl = "/packages"
  const [state, setState] = useState({
    isLoading: false,
    data: [],
    next: null,
    page: 1,
  })
  const user = JSON.parse(localStorage.getItem("user")) || { id: null, username: null };
  const useFetcher = new UseFetcher();

  useEffect(() => {
    useFetcher.get(setState, `${apiUrl}`)
  }, [])
  return (
    <>
      <GlobalUtilityStyle>
        <PageHeader
          routes={PageRoutes}
          title="កញ្ចប់ទេសចរណ៍"
          className="flex md:flex-col items-center justify-between px-8 ssm:px-[15px] pt-2 pb-6 bg-transparent font-kantumruy-pro"
        />
        <main className="min-h-[715px] lg:min-h-[580px] px-8 xl:px-[15px] pb-[30px] bg-transparent">
          <Row gutter={15}>
            <Col xs={24}>
              {state.isLoading ?
                <div className="bg-white dark:bg-white10 p-[25px] rounded-[10px]">
                  <Skeleton active paragraph={{ rows: 10 }} />
                </div>
                :
                <div className="block bg-white dark:bg-[#1b1e2b] shadow-regular dark:shadow-[0_5px_30px_rgba(1,4,19,.60)] rounded-[10px] p-[25px] min-h-[715px] lg:min-h-[580px]">
                  <div className="flex w-full justify-end border-regular dark:border-white10 border-b pb-5">
                    <Link to='/tour-guide/new'>
                      <Button size="default" type="primary" className="text-sm font-semibold h-10 px-6 rounded-6 font-kantumruy-pro">
                        បង្កើតកញ្ចប់ 📦
                      </Button>
                    </Link>
                  </div>
                  <List state={{ packages: state.data, isLoader: state.isLoading, isLoadMore: false }} />
                </div>
              }
            </Col>
          </Row>
        </main>
      </GlobalUtilityStyle>
    </>
  );
}

export default TourPackage;
