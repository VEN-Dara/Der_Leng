import React from 'react';
import UilEnvelope from '@iconscout/react-unicons/icons/uil-envelope';
import UilFavorite from '@iconscout/react-unicons/icons/uil-favorite';
import UilUserPlus from '@iconscout/react-unicons/icons/uil-user-plus';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Col, Row } from 'antd';
import Heading from '../../../components/heading/heading';
import { Button } from '../../../components/buttons/buttons';

function UserCards({ user }) {
  const { name, designation, img } = user;
  const path = '.';
  return (
    <div className="relative">
      <div className="bg-white dark:bg-white10 px-[25px] pt-[30px] pb-[18px] rounded-[10px] text-center flex flex-col items-center">
        <figure className="mb-[18px] h-[120px] w-[120px]">
          <img
            className="max-w-full max-h-full w-full h-full rounded-full inline-block object-cover"
            src={img}
            alt=""
          />
        </figure>
        <figcaption>
          <div className="static">
            <Heading
              className="text-[16px] mb-[6px] font-medium text-dark dark:text-white87 leading-[20px] hover:[&>a]:text-primary"
              as="h6"
            >
              <Link className="text-dark dark:text-white87" to="#">
                {name}
              </Link>
            </Heading>
            <p className="text-[13px] mb-[18px] text-success font-medium">{designation}</p>
          </div>

          <div className="static flex flex-wrap items-center justify-center gap-[10px]">
            <Link to={`${path}/favorite`}>
            <Button
              className="group text-[13px] font-semibold text-theme-gray dark:text-white87 btn-outlined h-[40px] dark:border-white10 px-[25px] rounded-[6px] flex items-center gap-[5px] leading-[22px] hover:text-white hover:bg-primary transition duration-300 dark:bg-transparent border-normal"
              size="default"
            >
              <UilFavorite className="w-[15px] h-[15px] text-light dark:text-white87 group-hover:text-white transition duration-300" />
              Favorite
            </Button>
            </Link>
            <Link to={`${path}/edit`}>
              <Button
                className="group text-[13px] border-normal font-semibold text-theme-gray dark:text-white87 btn-outlined h-[40px] dark:border-white10 px-[25px] rounded-[6px] flex items-center gap-[5px] leading-[22px] hover:text-white hover:bg-primary transition duration-300 dark:bg-primary"
                size="default"
              >
                <UilUserPlus className="w-[14px] h-[14px] text-light dark:text-white87 group-hover:text-white transition duration-300" />
                Edit Profile
              </Button>
            </Link>

            {/* ===========================================> Message & follow Btn <=========================================== */}
                
            {/* <Button
              className="group text-[13px] font-semibold text-theme-gray dark:text-white87 btn-outlined h-[40px] dark:border-white10 px-[25px] rounded-[6px] flex items-center gap-[5px] leading-[22px] hover:text-white hover:bg-primary transition duration-300 dark:bg-transparent border-normal"
              size="default"
            >
              <UilEnvelope className="w-[15px] h-[15px] text-light dark:text-white87 group-hover:text-white transition duration-300" />
              Message
            </Button>
            <Button
              className="group text-[13px] border-normal font-semibold text-theme-gray dark:text-white87 btn-outlined h-[40px] dark:border-white10 px-[25px] rounded-[6px] flex items-center gap-[5px] leading-[22px] hover:text-white hover:bg-primary transition duration-300 dark:bg-primary"
              size="default"
            >
              <UilUserPlus className="w-[14px] h-[14px] text-light dark:text-white87 group-hover:text-white transition duration-300" />
              Following
            </Button> */}
          </div>

          {/* =====================> Qty of Revenue order product <===================== */}
          {/* <div className="static pt-[20px] mt-[18px] dark:border-white10 border-t-1">
            <Row gutter={15}>
              <Col xs={8}>
                <div>
                  <h2 className="text-[16px] font-semibold leading-[1.5] mb-4px text-dark dark:text-white87">
                    {' '}
                    $72,572{' '}
                  </h2>
                  <p className="mb-0 text-light dark:text-white60">Revenue</p>
                </div>
              </Col>
              <Col xs={8}>
                <div>
                  <h2 className="text-[16px] font-semibold leading-[1.5] mb-4px text-dark dark:text-white60">
                    {' '}
                    3,257{' '}
                  </h2>
                  <p className="mb-0 text-light dark:text-white60">Orders</p>
                </div>
              </Col>
              <Col xs={8}>
                <div>
                  <h2 className="text-[16px] font-semibold leading-[1.5] mb-4px text-dark dark:text-white60"> 74 </h2>
                  <p className="mb-0 text-light dark:text-white60">Products</p>
                </div>
              </Col>
            </Row>
          </div> */}
        </figcaption>
      </div>
    </div>
  );
}

UserCards.propTypes = {
  user: PropTypes.object,
};

export default UserCards;
