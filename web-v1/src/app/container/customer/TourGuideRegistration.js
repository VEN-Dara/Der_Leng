import React, { useState, useCallback, Suspense } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Form, Input, Button, Row, Col, Spin, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import AdminBgLight from '../../../resource/static/img/admin-bg-light.png';
import UploadImage from '../tour_package/overview/UploadPackageImage';
import DropFile from './overview/DropFile';
import ApiService from '../../config/api/apiService';

const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

function TourGuideRegistration() {
  const history = useNavigate();
  const [form] = Form.useForm();
  const [submitLoading, setSubmitLoading] = useState(false)
  const [cv, setCV] = useState(null)
  const api = new ApiService();
  const user = useSelector(state => (state.userReducer.user))
  console.log(user)

  const validateGoogleMapsUrl = (_, value) => {
    if (!value || /^(https:\/\/(www.google.com\/maps\/|maps.app.goo.gl\/)).*$/.test(value)) {
        return Promise.resolve();
    }
    return Promise.reject(new Error('សូមបញ្ចូល Google Maps URL ដែលត្រឹមត្រូវ.'));
};

  const validateCV = (_, value) => {
    if (cv) {
      return Promise.resolve();
    }
    return Promise.reject(new Error('សូមបញ្ចូលប្រវត្តិរូបសង្ខេប!'));
};

  const registerTourGuide = async (data) => {
    try {
      setSubmitLoading(true);
      message.loading('📦🛸ព័ត៍មានរបស់អ្នកកំពុងបង្ហោះ✈️ ...', 60)
      const response = await api.post('/staff/guide-registrations/', data);

      // Load message success
      message.destroy();
      message.success('ការចុះឈ្មោះរបស់អ្នកបានជោគជ័យ សូមរងចាំការត្រួតពិនិត្យ🥰')
      history('/')
  } catch (error) {
      message.destroy();
      console.error('Register error', error)
  } finally {
    setSubmitLoading(false)
  }
  }

  const handleSubmit = (value) => {
    const formData = new FormData();

    formData.append('cv', cv.originFileObj);
    formData.append('user', user.id);
    
    for(const key in value) {
      formData.append(key, value[key]);
    }

    registerTourGuide(formData);
  };

  return (
    <Suspense
      fallback={
        <div className="spin flex items-center justify-center h-[calc(100vh-132px)]">
          <Spin />
        </div>
      }
    >
      <div
        style={{ backgroundImage: `url("${AdminBgLight}")` }}
        className="bg-top bg-no-repeat"
      >
        <Row justify="center">
          <Col xxl={12} xl={12} md={12} sm={18} xs={24}>
            <div className="mt-6 bg-white rounded-md dark:bg-white10 shadow-regular dark:shadow-none">
              <div className="px-5 py-4 text-center border-b border-gray-200 dark:border-white10">
                <h2 className="mb-0 text-xl font-kantumruy-pro font-semibold text-dark dark:text-white87">ម​គ្គុ​ទេស​ក៍​ទេសចរណ៍ជាមួយ ដើរលេង</h2>
                <div className='w-full text-start mt-3 -mb-6'>
                  <p className=''>បន្ទាប់ពីអ្នកក្លាយជាមគ្គុទ្ទេសក៍ទេសចរណ៍ អ្នកអាចបង្កើតកញ្ចប់ទេសចរណ៍📦 និងចាប់ផ្តើមអាជីវកម្មទេសចរណ៍នៅទីនេះ</p>
                </div>
              </div>
              <div className="px-10 pt-8 pb-6">
                <Form name="login" form={form} onFinish={handleSubmit} layout="vertical">
                  <Form.Item
                    name='fullname_khmer'
                    label={<span className="font-kantumruy-pro">ឈ្មោះ ជាភាសាខ្មែរ</span>}
                    rules={[
                      {
                        required: true,
                        message: 'សូមបញ្ចូលឈ្មោះកញ្ចប់!',
                      },
                    ]}
                    className="[&>div>div>label]:text-base [&>div>div>label]:text-dark dark:[&>div>div>label]:text-white60 [&>div>div>label]:font-medium"
                    >
                    <Input maxLength={30} placeholder="សូមបញ្ចូលឈ្មោះ" className="font-kantumruy-pro text-sm h-[45px]" />
                  </Form.Item>
                  <Form.Item
                    name='fullname_english'
                    label={<span className="font-kantumruy-pro">ឈ្មោះ ជាឡាតាំង</span>}
                    rules={[
                      {
                        required: true,
                        message: 'សូមបញ្ចូលឈ្មោះកញ្ចប់!',
                      },
                    ]}
                    className="[&>div>div>label]:text-base [&>div>div>label]:text-dark dark:[&>div>div>label]:text-white60 [&>div>div>label]:font-medium"
                    >
                    <Input maxLength={30} placeholder="សូមបញ្ចូលឈ្មោះ" className="font-kantumruy-pro text-sm h-[45px]" />
                  </Form.Item>
                  <Form.Item
                    name='phone'
                    label={<span className="font-kantumruy-pro">លេខទូរស័ព្ទ</span>}
                    rules={[
                      {
                        required: true,
                        message: 'សូមបញ្ចូលលេខទូរស័ព្ទ!',
                      },
                    ]}
                    className="[&>div>div>label]:text-base [&>div>div>label]:text-dark dark:[&>div>div>label]:text-white60 [&>div>div>label]:font-medium"
                    >
                    <Input maxLength={30} placeholder="0123456789" className="font-kantumruy-pro text-sm h-[45px]" />
                  </Form.Item>
                
                  <Form.Item
                    name='address'
                    label={<span className="font-kantumruy-pro">អាសយដ្ឋាន</span>}
                    rules={[
                      {
                        required: true,
                        message: 'សូមបញ្ចូលអាសយដ្ឋាន!',
                      },
                    ]}
                    className="[&>div>div>label]:text-base [&>div>div>label]:text-dark dark:[&>div>div>label]:text-white60 [&>div>div>label]:font-medium"
                  >
                    <Input placeholder="សូមបញ្ចូលអាសយដ្ឋាន" className="font-kantumruy-pro text-sm h-[45px]" />
                  </Form.Item>
                  <Form.Item
                    name='location_url'
                    label={<span className="font-kantumruy-pro">តំណភ្ជាប់ទីតាំង</span>}
                    rules={[
                      { required: true, message: 'សូមបញ្ចូលតំណភ្ជាប់ទីតាំង!', },
                      { validator: validateGoogleMapsUrl },
                    ]}
                    className="[&>div>div>label]:text-base [&>div>div>label]:text-dark dark:[&>div>div>label]:text-white60 [&>div>div>label]:font-medium"
                  >
                    <Input placeholder="សូមបញ្ចូលតំណភ្ជាប់ទីតាំង" className="font-kantumruy-pro text-sm h-[45px]" />
                  </Form.Item>
                  <Form.Item
                    name='no_key'
                    label={<span className="font-kantumruy-pro">ប្រវត្តិរូបសង្ខេប</span>}
                    rules={[
                      { validator: validateCV },
                    ]}
                    className="[&>div>div>label]:text-base [&>div>div>label]:text-dark dark:[&>div>div>label]:text-white60 [&>div>div>label]:font-medium"
                  >
                    <DropFile setFile={setCV}/>
                  </Form.Item>
                  <Form.Item>
                    <Button
                      className="w-full h-12 p-0 my-6 text-base font-kantumruy-pro font-medium"
                      htmlType="submit"
                      type="primary"
                      size="large"
                    >
                      {submitLoading ? ( 'សូមរងចាំ...✈️' ) : 'ចុះឈ្មោះ'}
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </Suspense>
  );
}

export default TourGuideRegistration;
