import React, { useState } from 'react';
import { Upload, message } from 'antd';
import UilCamera from '@iconscout/react-unicons/icons/uil-camera';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';

function CoverSection({img}) {

  const [file, setFile] = useState(null)

  const handleBeforeUpload = (newFile) => {
    console.log(newFile)
    setFile(newFile)
    return false;
  };

  const uploadCoverImage = (file) => {
    
  }

  return (
    <div className="relative">
      <img
        className="w-full min-h-[150px] max-h-[220px] object-cover rounded-t-10"
        src={img}
        alt="banner"
      />
      <Upload
        beforeUpload={handleBeforeUpload}
        showUploadList={false}
        accept="image/jpeg,image/png,image/gif"
        className="opacity-0 hover:opacity-100 absolute border border-white rounded-md top-5 ltr:right-5 rtl:left-5 lg:top-1/2 lg:ltr:right-1/2 lg:rtl:left-1/2 lg:-translate-y-1/2 lg:ltr:translate-x-1/2 lg:rtl:-translate-x-1/2 border-opacity-30"
      >
        <Link to="#" className="flex items-center px-4 xs:px-3 py-2 text-white gap-[8px]">
          <UilCamera className="w-4 h-4" /> Change Cover
        </Link>
      </Upload>
    </div>
  );
}

CoverSection.propTypes = {
  match: propTypes.object,
};

export default CoverSection;
