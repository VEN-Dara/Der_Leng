import React, { useState } from 'react';
import { InboxOutlined } from '@ant-design/icons';
import { Upload, message } from 'antd';

const { Dragger } = Upload;

const DropFile = ({ setFile }) => {
  const [fileList, setFileList] = useState([]);

  const dummyRequest = ({ onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };

  const handleChange = info => {
    let newFileList = [...info.fileList];
    newFileList = newFileList.slice(-1);

    setFileList(newFileList);
    setFile(newFileList[0]);

    if (info.fileList.length > 1) {
      message.warning("អ្នកអាចបញ្ចូលបានតែមួយឯកសារប៉ុណ្ណោះ។");
    }
  };

  const props = {
    name: 'file',
    multiple: false,
    customRequest: dummyRequest,
    fileList,
    onChange: handleChange,
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
    onPreview: async file => {
      if (!file.url && !file.preview) {
        file.preview = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsArrayBuffer(file.originFileObj);
          reader.onload = () => {
            const blob = new Blob([reader.result], { type: file.type });
            const url = URL.createObjectURL(blob);
            resolve(url);
          };
          reader.onerror = error => reject(error);
        });
      }
      const fileUrl = file.url || file.preview;
      window.open(fileUrl, '_blank');
    },
  };

  return (
    <Dragger {...props}>
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">ចុច ឬអូសឯកសារមកទីនេះ</p>
      <p className="ant-upload-hint">
        សរសេរសង្ខេបអំពីប្រវត្តិរូបសង្ខេបរបស់អ្នក និងលិខិតបញ្ជាក់មគ្គុទ្ទេសក៍ទេសចរណ៍។
      </p>
    </Dragger>
  );
};

export default DropFile;
