import React, { Suspense } from 'react';
import { PageHeader } from '../../../resource/components/page-headers/page-headers';
import { Cards } from '../../../resource/components/cards/frame/cards-frame';
import { GlobalUtilityStyle } from '../styled';
import Heading from '../../../resource/components/heading/heading';
import { Col, Row, List, Comment, Rate, Spin } from "antd"
import { useEffect, useState } from "react"
import { getReview } from "../../hooks/Product/useReviewFetcher"
import { Link, useParams } from "react-router-dom"
import defaultProfile from "@/app/static/img/default_img/derleng-default-profile.png"
import { formatDate } from '../../utility/format-function/date'
import useScrollFetcher from '../../hooks/api-fetcher/useScrollFetcher';

// @Todo console warning from button

function Review() {
  const PageRoutes = [
    {
      path: '/tour-guide',
      breadcrumbName: 'ទំព័រដើម',
    },
    {
      path: '',
      breadcrumbName: 'ការវាយតម្លៃ',
    },
  ];

  // const [state, setState] = useState({
  //   data: [],
  //   isLoading: true,
  //   next: null,
  //   message: null,
  //   page: 1,
  // })

  const path = "/tour-guide/reviews"
  const { data= [], page= 1, pageSize= 1, isLoading= true, isLoadMore= false } = useScrollFetcher({path});
  console.log(useScrollFetcher({path}))

  // const package_id = useParams().id;
  // const package_id = '';

  // useEffect(() => {
  //   getReview(setState, package_id)
  // }, [])

  // const handleGetMoreReview = () => {
  //   getReview(setState, package_id, state.page)
  // }
  return (
    <>
      <GlobalUtilityStyle>
        <PageHeader
          routes={PageRoutes}
          title="ការវាយតម្លៃ"
          className="flex md:flex-col items-center justify-between px-8 ssm:px-[15px] pt-2 pb-6 bg-transparent font-kantumruy-pro"
        />
        <main className="min-h-[715px] lg:min-h-[580px] px-8 xl:px-[15px] pb-[30px] bg-transparent font-kantumruy-pro">
          <Row gutter={30}>
            <Col xs={24}>
              <div className="bg-white dark:bg-white10 m-0 p-0 text-theme-gray dark:text-white60 text-[15px] mb-[25px] rounded-10 relative">
                {/* <div className="h-[60px] px-[25px] text-dark dark:text-white87 font-medium text-[17px] border-regular dark:border-white10 border-b">
                  <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
                    ថ្ងៃនេះ
                  </h1>
                </div> */}
                {isLoading ?
                  (
                    <div className="spin flex items-center justify-center">
                      <Spin />
                    </div>
                  ) :
                  (
                    <div className="px-[25px]">
                      <List
                        className="comment-list"
                        // header={`2 replies`}
                        itemLayout="horizontal"
                        dataSource={data}
                        renderItem={(item) => (
                          <li>
                            <Comment
                              author={item.user.fullname}
                              avatar={item.user.profile_image ? item.user.profile_image : defaultProfile}
                              content={(
                                <>
                                  <Rate
                                    className="relative -top-[2px] flex items-center ltr:[&>li]:mr-0.5 rtl:[&>li]:ml-0.5 [&>li.ant-rate-star-zero>div>div>span>svg]:text-[#c6d0dc]"
                                    allowHalf
                                    defaultValue={item.rating}
                                    disabled
                                  />
                                  <p className="text-black dark:text-white">{item.comment}</p>
                                </>
                              )}
                              datetime={formatDate(item.created_at)}
                            />
                          </li>
                        )}
                      />
                      {/* {
                        state.next && <button onClick={() => { handleGetMoreReview() }} className="text-primary hover:text-green-400 hover:underline">See more...</button>
                      } */}
                    </div>

                  )
                }
              </div>
            </Col>
          </Row>
        </main>
      </GlobalUtilityStyle>
    </>
  );
}

export default Review;
