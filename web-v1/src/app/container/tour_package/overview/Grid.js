import React from 'react';
import { Row, Col, Spin } from 'antd';
import { Link } from 'react-router-dom';

// ====================================> Local <====================================
import ProductCards from './ProductCards';
import NoResult from '../../../../resource/container/pages/NoResult';

function Grid({state}) {
  const {packages, isLoader, isLoadMore} = state;

  return (
    <Row gutter={20} >
      {isLoader ? (
        <Col xs={24}>
          <div className="spin flex items-center justify-center h-[calc(100vh-132px)]">
            <Spin />
          </div>
        </Col>
      ) : packages.length ? (
        packages.map(({ id, name, amount_rating, avg_rating, default_price, percentage_discount, address, thumbnail, favorite }) => {
          return (
            <Col xxl={4} lg={6} md={8} xs={24} key={id}>
                <ProductCards product={{ id, name, amount_rating, avg_rating, default_price, percentage_discount, favorite, address, thumbnail }} />
              {/* <Link to={`/tour-service/${id}`}>
              </Link> */}
            </Col>
          );
        })
      ) : (
        <Col md={24}>
          <NoResult/>
        </Col>
      )}
      {isLoadMore && 
      <div className= " w-full spin flex items-center justify-center">
        <Spin />
      </div>
      }
    </Row>
  );
}

export default Grid;
