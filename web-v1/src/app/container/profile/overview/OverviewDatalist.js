import React from 'react';
import { Row, Col } from 'antd';
import propTypes from 'prop-types';
import OverviewCard from '../../../../resource/components/cards/OverviewCard';

import OverviewData from '../../../../resource/demoData/overviewData.json';

const OverviewDataList = React.memo(({ column }) => {
  const OverviewDataSorted = OverviewData.slice(0, 4);

  return (
    <div>
      <Row gutter={25}>
        {OverviewDataSorted.map((item, i) => {
          return (
            <Col className="mb-[25px]" xxl={column === '2' ? null : 6} md={12} xs={24} key={i}>
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
