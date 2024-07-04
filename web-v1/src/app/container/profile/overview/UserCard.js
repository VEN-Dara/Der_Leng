import React, { useEffect, useState } from 'react';
import UilEnvelope from '@iconscout/react-unicons/icons/uil-envelope';
import UilFavorite from '@iconscout/react-unicons/icons/uil-favorite';
import UilUserPlus from '@iconscout/react-unicons/icons/uil-user-plus';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Col, Row, Upload, message } from 'antd';
import Heading from '../../../../resource/components/heading/heading';
import { Button } from '../../../../resource/components/buttons/buttons';
import UilCamera from '@iconscout/react-unicons/icons/uil-camera';
import UseFetcher from '../../../hooks/useFetcher';
import UilShop from '@iconscout/react-unicons/icons/uil-shop';
import { isTourGuideOrAbove } from '../../../utility/function/permission';

const FILE_ENDPOINT = process.env.REACT_APP_FILE_ENDPOINT

function UserCards({ user }) {
  const { name, designation, img } = user;
  const path = '.';

  const useFetcher = new UseFetcher();
  const formData = new FormData();
  const [state, setState] = useState({
    isLoading: false,
    data: null,
    success: false,
    message: null
  });

  const handleBeforeUpload = (newFile) => {
    uploadCoverImage(newFile);
    return false;
  };

  const uploadCoverImage = (file) => {
    formData.append('profileImage', file);
    setTimeout(message.loading("Profile image uploading...", 0), 9000)
    useFetcher.put("/auth/user", setState, formData, OnUploadSuccess);
  }

  const OnUploadSuccess = () => {
    message.destroy();
    message.success("Profile image updated successfully! Looking great!🥰")
  }

  return (
    <div className="relative">
      <div className="bg-white dark:bg-white10 px-[25px] pt-[30px] pb-[18px] rounded-[10px] text-center flex flex-col items-center">

        {/* ====================================>> Top right btn <<=================================== */}
        {/* { isTourGuideOrAbove() && 
          <Link to={`${path}/shop`}>
            <Button
              size="default"
              raised
              type="white"
              shape="circle"
              className="absolute top-5 right-4 inline-flex items-center justify-center bg-white hover:bg-primary hover:text-white border-normal dark:bg-white10 text-body dark:text-white60 w-[40px] h-[40px] ltr:mr-[10px] rtl:ml-[10px] rounded-full shadow-[0_5px_10px_rgba(160,160,260,0.13)] dark:shadow-[0_5px_30px_rgba(1,4,19,.60)]"
            >
              <UilShop className="w-[14px] h-[14px]" />
            </Button>
          </Link>
        } */}
        <figure className="mb-[18px] h-[120px] w-[120px] relative overflow-hidden rounded-full">
          <img
            className="max-w-full max-h-full w-full h-full rounded-full inline-block object-cover"
            src={state.data ? FILE_ENDPOINT + state.data.profileImage : img}
            alt=""
          />
          <Upload
            beforeUpload={handleBeforeUpload}
            showUploadList={false}
            accept="image/jpeg,image/png,image/gif"
            className='w-full h-full absolute top-0 left-0 opacity-0 hover:opacity-100'
          >
          <div className='w-[120px] h-[120px] relative'>
          <span className="absolute bottom-0 w-full bg-gray-800 bg-opacity-50 flex items-center justify-center px-4 xs:px-3 py-2 text-white gap-[8px]">
              <UilCamera className="w-4 h-4" />
          </span>
          </div>
          </Upload>
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
              ចំណូលចិត្ត
            </Button>
            </Link>
            <Link to={`${path}/setting/info`}>
              <Button
                className="group text-[13px] border-normal font-semibold text-theme-gray dark:text-white87 btn-outlined h-[40px] dark:border-white10 px-[25px] rounded-[6px] flex items-center gap-[5px] leading-[22px] hover:text-white hover:bg-primary transition duration-300 dark:bg-primary"
                size="default"
              >
                <UilUserPlus className="w-[14px] h-[14px] text-light dark:text-white87 group-hover:text-white transition duration-300" />
                ការកំណត់
              </Button>
            </Link>
          </div>
        </figcaption>
      </div>
    </div>
  );
}

UserCards.propTypes = {
  user: PropTypes.object,
};

export default UserCards;
