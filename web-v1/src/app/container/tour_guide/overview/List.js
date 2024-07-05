import React, { useState } from 'react';
import { Row, Col, Spin, Empty, Button } from 'antd';
import ProductCardsList from './ProductCardList';
import NoResult from '../../pages/NoResult';
import ApiService from '../../../config/api/apiService';
import { alertModal } from '../../../../resource/components/modals/antd-modals';

function List({ state }) {
  const { data=[], isLoading=true, isLoadMore=false } = state || {};
  const api = new ApiService();

  const removePackage = async (id) => {
    alertModal.confirm({
      title: 'តើអ្នកពិតជាចង់លុបកញ្ចប់នេះមែនទេ?',
      content: '',
      className: 'font-kantumruy-pro',
      okText: 'បាទ, ចាស',
      okType: 'danger',
      cancelText: 'ទេ អរគុណ',
      async onOk() {
          try {
            const response = await api.delete(`/packages/${id}`);
            setData(data.filter(p => p.id !== id));
          } catch (error) {
            console.log(error)
          }
      },
      onCancel() {}
    });
  }

  return (
    <Row gutter={15}>
      {isLoading ? (
        <div className="spin flex items-center justify-center h-[calc(100vh-132px)]">
          <Spin />
        </div>
      ) : data.length > 0 ? (
        data.map(({ id, name, amount_rating, avg_rating, default_price, percentage_discount, address, thumbnail, description, favorite }) => {
          return (
            <Col xs={24} key={id}>
                <ProductCardsList removePackage={removePackage} product={{ id, name, amount_rating, avg_rating, default_price, percentage_discount, address, thumbnail, description, favorite }} />
            </Col>
          );
        })
      ) : (
        <Col xs={24}>
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
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
