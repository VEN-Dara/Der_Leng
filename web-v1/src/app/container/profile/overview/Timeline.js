import React, { lazy, Suspense } from 'react';
import { Row, Col, Skeleton } from 'antd';
import { useSelector } from 'react-redux';
import { Cards } from '../../../../resource/components/cards/frame/cards-frame';

const RightAside = lazy(() => import('./RightAside'));
const CreatePost = lazy(() => import('./timeline/CreatePost'));
const AllPosts = lazy(() => import('./timeline/Posts'));

function Timeline() {
  const { posts } = useSelector((state) => {
    return {
      posts: state.Profile.posts,
    };
  });
  return (
    <Row gutter={25}>
      <Col xxl={16} xs={24}>
        <Suspense
          fallback={
            <Cards className="mb-[25px]" headless>
              <Skeleton active />
            </Cards>
          }
        >
          <CreatePost />
        </Suspense>
        {posts
          .sort((a, b) => b.time - a.time)
          .map((post) => {
            return (
              <Suspense
                key={post.postId}
                fallback={
                  <Cards className="mb-[25px]" headless>
                    <Skeleton active />
                  </Cards>
                }
              >
                <AllPosts {...post} />
              </Suspense>
            );
          })}
      </Col>
      <Col xxl={8} xs={24}>
        <Suspense
          fallback={
            <Cards className="mb-[25px]" headless>
              <Skeleton active paragraph={{ rows: 10 }} />
            </Cards>
          }
        >
          <RightAside />
        </Suspense>
      </Col>
    </Row>
  );
}

export default Timeline;
