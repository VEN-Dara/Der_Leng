import React, { useState } from 'react';
import { Upload, message } from 'antd';
import UilCamera from '@iconscout/react-unicons/icons/uil-camera';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import UseFetcher from '../../../hooks/useFetcher';

const FILE_ENDPOINT = process.env.REACT_APP_FILE_ENDPOINT

function CoverSection({img}) {

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
    formData.append('coverImage', file);
    setTimeout(message.loading("Cover image uploading...", 0), 9000)
    useFetcher.put("/auth/user", setState, formData, OnUploadSuccess);
  }

  const OnUploadSuccess = () => {
    message.destroy();
    message.success("Cover image updated successfully! Looking great!🥰")
  }

  return (
    <div className="relative min-h-[150px] max-h-[220px] overflow-hidden flex items-center">
      <img
        className="w-full object-cover rounded-t-10"
        src={state.data ? FILE_ENDPOINT + state.data.coverImage : img}
        alt="banner"
      />
      <div className='absolute top-0 left-0 w-full h-full flex justify-center items-center'>
        <Upload
          beforeUpload={handleBeforeUpload}
          showUploadList={false}
          accept="image/jpeg,image/png,image/gif"
          className="opacity-0 hover:opacity-100 border-2 border-white rounded-md border-opacity-30"
          // className="opacity-0 hover:opacity-100 absolute border-2 border-white rounded-md top-5 ltr:right-5 rtl:left-5 lg:top-1/2 lg:ltr:right-1/2 lg:rtl:left-1/2 lg:-translate-y-1/2 lg:ltr:translate-x-1/2 lg:rtl:-translate-x-1/2 border-opacity-30"
        >
          <span className="flex items-center px-4 xs:px-3 py-2 text-white gap-[8px]">
            <UilCamera className="w-4 h-4" /> Change Cover
          </span>
        </Upload>
      </div>
    </div>
  );
}

CoverSection.propTypes = {
  match: propTypes.object,
};

export default CoverSection;
