import React from 'react';
import { Row, Col } from 'antd';
import propTypes from 'prop-types';
import OverviewCard from './OverviewCard';

const OverviewDataList = React.memo(({ column, data }) => {
  const { total_package = null, total_booking = null, monthly_income = null, total_income = null } = data || {};
  const OverviewDataSorted = [
      {
        "id": 1,
        "type": "primary",
        "icon": "briefcase.svg",
        "label": "កញ្ចប់ទេសចរណ៍សរុប",
        "total": total_package,
        "suffix": "",
        "prefix": "",
        "status": "growth",
        "statusRate": "25.36",
        "decimel": 0,
        "dataPeriod": "ចាប់តាំងពីខែមុន",
        "statusColor":"success"
      },
      {
        "id": 2,
        "type": "info",
        "icon": "shopping-cart.svg",
        "label": "ការកក់សរុប",
        "total": total_booking,
        "suffix": "",
        "prefix": "",
        "status": "growth",
        "statusRate": "25.36",
        "decimels": 0,
        "separator": ",",
        "dataPeriod": "ចាប់តាំងពីខែមុន",
        "statusColor":"success"
      },
      {
        "id": 3,
        "type": "secondary",
        "icon": "dollar-circle.svg",
        "label": "ចំណូលខែនេះ",
        "total": monthly_income,
        "suffix": "",
        "prefix": "$",
        "status": "down",
        "statusRate": "25.36",
        "decimels": 0,
        "separator": ",",
        "dataPeriod": "ចាប់តាំងពីខែមុន",
        "statusColor":"danger"
      },
      {
        "id": 4,
        "type": "warning",
        "icon": "dollar-circle.svg",
        "label": "ចំណូលសរុប",
        "total": total_income,
        "suffix": "",
        "prefix": "$",
        "status": "growth",
        "statusRate": "25.36",
        "decimels": 0,
        "separator": ",",
        "dataPeriod": "ចាប់តាំងពីការដកប្រាក់ចុងក្រោយ",
        "statusColor":"success"
      },
  ]

  return (
    <div>
      <Row gutter={25}>
        {OverviewDataSorted.map((item, i) => {
          return (
            <Col className="mb-[25px] font-kantumruy-pro" xxl={column === '2' ? null : 6} md={12} xs={24} key={i}>
              <OverviewCard data={item} contentFirst />
            </Col>
          );
        })}
      </Row>
    </div>
  );
});

OverviewDataList.propTypes = {
  column: propTypes.string,
};

OverviewDataList.defaultProps = {
  column: '2',
};

export default OverviewDataList;
