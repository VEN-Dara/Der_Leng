import React, { Suspense, useCallback } from 'react';
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
import { DataService } from '../../config/dataService/dataService';
import ApiService from '../../config/api/apiService';
import useScrollFetcher from '../../hooks/api-fetcher/useScrollFetcher';

// @Todo console warning from button
const api = new ApiService()
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
  const path = "/tour-guide/packages"
  const packageFetcher = useScrollFetcher({path});
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
              {packageFetcher.isLoading ?
                <div className="bg-white dark:bg-white10 p-[25px] rounded-[10px]">
                  <Skeleton active paragraph={{ rows: 10 }} />
                </div>
                :
                <>
                <div className="block mb-4 bg-white dark:bg-[#1b1e2b] shadow-regular dark:shadow-[0_5px_30px_rgba(1,4,19,.60)] rounded-[10px] p-[25px]">
                  <div className="flex w-full justify-end border-regular dark:border-white10">
                    <Link to='/tour-guide/new'>
                      <Button size="default" type="primary" className="text-sm font-semibold h-10 px-6 rounded-6 font-kantumruy-pro">
                        បង្កើតកញ្ចប់ 📦
                      </Button>
                    </Link>
                  </div>
                </div>
                  <List state={packageFetcher} />
                </>
              }
            </Col>
          </Row>
        </main>
      </GlobalUtilityStyle>
    </>
  );
}

export default TourPackage;
