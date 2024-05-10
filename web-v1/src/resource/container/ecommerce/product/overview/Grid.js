import React from 'react';
import { Row, Col, Spin } from 'antd';
import ProductCards from './ProductCards';
import Heading from '../../../../components/heading/heading';
import NoResult from '../../../pages/NoResult';
import { Link } from 'react-router-dom';

function Grid({state}) {
  const {packages, isLoader, isLoadMore} = state;

  return (
    <Row gutter={30}>
      {isLoader ? (
        <Col xs={24}>
          <div className="spin flex items-center justify-center h-[calc(100vh-132px)]">
            <Spin />
          </div>
        </Col>
      ) : packages.length ? (
        packages.map(({ id, name, amount_rating, avg_rating, default_price, percentage_discount, address, thumbnail }) => {
          return (
            <Col xxl={6} lg={8} md={12} xs={24} key={id}>
              <Link to={`/tour-service/${id}`}>
                <ProductCards product={{ id, name, amount_rating, avg_rating, default_price, percentage_discount, popular: false, address, thumbnail }} />
              </Link>
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
