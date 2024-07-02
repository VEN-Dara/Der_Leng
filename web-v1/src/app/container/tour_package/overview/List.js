import React from 'react';
import { Row, Col, Spin } from 'antd';
import ProductCardsList from './ProductCardList';
import NoResult from '../../pages/NoResult';

function List({ state }) {
  const { packages=[], isLoader=true, isLoadMore=false } = state || {};

  return (
    <Row gutter={15}>
      {isLoader ? (
        <div className="spin flex items-center justify-center h-[calc(100vh-132px)]">
          <Spin />
        </div>
      ) : packages.length ? (
        packages.map(({ id, name, amount_rating, avg_rating, default_price, percentage_discount, address, thumbnail, description, favorite }) => {
          return (
            <Col xs={24} key={id}>
                <ProductCardsList product={{ id, name, amount_rating, avg_rating, default_price, percentage_discount, address, thumbnail, description, favorite }} />
            </Col>
          );
        })
      ) : (
        <Col xs={24}>
          <NoResult/>
        </Col>
      )}
      {isLoadMore &&
        <div className=" w-full spin flex items-center justify-center">
          <Spin />
        </div>
      }
    </Row>
  );
}

export default List;
