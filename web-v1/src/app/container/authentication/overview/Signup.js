import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Row, Col, Form, Input, Button } from 'antd';

import { useDispatch } from 'react-redux';
import { AuthFormWrap } from './style';
import { Checkbox } from '../../../components/checkbox/checkbox';
import { isUsernameExist, register } from '../../../redux/authentication/actionCreator';
import { LoginGoogle } from './GoogleLogin';

function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [message, setMessage] = useState('')

  const [state, setState] = useState({
    values: null,
    checked: null,
  });

  const handleSubmit = (values) => {
    dispatch(register(values))
      .then((response) => {
        setMessage('')
        navigate('/sync-telegram');
      })
      .catch((error) => {
        if (error.response.data.errors) {
          setMessage(error.response.data.errors[0][1][0])
        }
        else if (error.response.data) {
          setMessage(JSON.stringify(error.response.data))
        }
      });
  };

  const onChange = (checked) => {
    setState({ ...state, checked });
  };

  const validateUsername = async (_, value) => {
    const isValidUsername = /^[a-zA-Z0-9_]+$/.test(value)
    if (!isValidUsername) {
      return Promise.reject('ឈ្មោះអ្នកប្រើប្រាស់ត្រូវតែមានអក្សរ លេខ និងសញ្ញាគូសក្រោមប៉ុណ្ណោះ(underscores)។.')
    }

    try {
      if (await isUsernameExist(value)) {
        return Promise.reject('ឈ្មោះ​អ្នក​ប្រើ​នេះ​បាន​យក​រួច​ហើយ។ សូមជ្រើសរើសមួយផ្សេងទៀត!');
      }

    } catch (error) {
      console.error('Error checking username:', error);
      return Promise.reject('កំហុសបានកើតឡើងខណៈពេលកំពុងពិនិត្យឈ្មោះអ្នកប្រើប្រាស់។');
    }

    return Promise.resolve();
  }

  const validatePhone = async (_, value) => {
    const isValidPhone = /^(\+\d{7,15}|0\d{9,12})$/.test(value);

    if (isValidPhone === false) {
      return Promise.reject('លេខទូរស័ព្ទត្រូវតែមានលេខកូដប្រទេស (+885) ឬចាប់ផ្តើមដោយសូន្យ!');
    }

    return Promise.resolve();
  };
  const validatePassword = async (_, value) => {
    const hasLetter = /[a-zA-Z]/.test(value);
    const hasNumber = /\d/.test(value);

    if (hasLetter === false || hasNumber === false || value.length < 8) {
      return Promise.reject('ពាក្យសម្ងាត់ត្រូវតែមានយ៉ាងហោចណាស់អក្សរមួយ និងលេខមួយ និង 8 ខ្ទង់!');
    }

    return Promise.resolve();
  };

  return (
    <Row justify="center">
      <Col xxl={6} xl={8} md={12} sm={18} xs={24}>
        <AuthFormWrap className="mt-6 bg-white rounded-md dark:bg-white10 shadow-regular dark:shadow-none">
          <div className="px-5 py-4 text-center border-b border-gray-200 dark:border-white10">
            <h2 className="mb-0 text-xl font-kantumruy-pro font-semibold text-dark dark:text-white87">ចុះឈ្មោះជាមួយ ដើរលេង</h2>
          </div>
          <div className="px-10 pt-8 pb-6">
            <Form name="register" onFinish={handleSubmit} layout="vertical">
              <Form.Item
                label="ឈ្មោះ"
                name="fullname"
                className="[&>div>div>label]:text-sm [&>div>div>label]:text-dark dark:[&>div>div>label]:text-white60 [&>div>div>label]:font-medium"
                rules={[{ required: true, message: 'សូមបញ្ចូលឈ្មោះពេញរបស់អ្នក!' }]}
              >
                <Input placeholder="ប៊ុន ធឿន" />
              </Form.Item>
              <Form.Item
                label="ឈ្មោះ​គណនី"
                name="username"
                className="[&>div>div>label]:text-sm [&>div>div>label]:text-dark dark:[&>div>div>label]:text-white60 [&>div>div>label]:font-medium"
                rules={[
                  { required: true, message: 'សូមបញ្ចូលឈ្មោះអ្នកប្រើប្រាស់របស់អ្នក!' },
                  { validator: validateUsername }
                ]}
              >
                <Input placeholder="mr_example" />
              </Form.Item>
              <Form.Item
                name="email"
                label="អាស័យ​ដ្ឋាន​អ៊ី​ម៉េ​ល"
                className="[&>div>div>label]:text-sm [&>div>div>label]:text-dark dark:[&>div>div>label]:text-white60 [&>div>div>label]:font-medium"
                rules={[{ required: true, message: 'សូមបញ្ចូលអ៊ីមែលរបស់អ្នក!', type: 'email' }]}
              >
                <Input placeholder="name@example.com" />
              </Form.Item>
              <Form.Item
                label="ទូរស័ព្ទ"
                name="phone"
                className="[&>div>div>label]:text-sm [&>div>div>label]:text-dark dark:[&>div>div>label]:text-white60 [&>div>div>label]:font-medium"
                rules={[
                  { required: true, message: 'សូមបញ្ចូលលេខទូរស័ព្ទរបស់អ្នក!' },
                  { validator: validatePhone }
                ]}
              >
                <Input placeholder="+855123456789" />
              </Form.Item>
              <Form.Item
                label="ពាក្យសម្ងាត់"
                name="password"
                className="[&>div>div>label]:text-sm [&>div>div>label]:text-dark dark:[&>div>div>label]:text-white60 [&>div>div>label]:font-medium"
                rules={[
                  { required: true, message: 'សូមបញ្ចូលពាក្យសម្ងាត់របស់អ្នក!' },
                  { validator: validatePassword }
                ]}
              >
                <Input.Password placeholder="ពាក្យសម្ងាត់" />
              </Form.Item>
              <Form.Item
                label="បញ្ជាក់ពាក្យសម្ងាត់"
                name="comfirmation"
                className="[&>div>div>label]:text-sm [&>div>div>label]:text-dark dark:[&>div>div>label]:text-white60 [&>div>div>label]:font-medium"
                rules={[
                  { required: true, message: 'សូមបញ្ចូលបញ្ជាក់ពាក្យសម្ងាត់របស់អ្នក!' },
                  { validator: validatePassword }
                ]}
              >
                <Input.Password placeholder="បញ្ជាក់ពាក្យសម្ងាត់" />
              </Form.Item>
              <p className='text-red-500'>{message !== '' ? message : null}</p>
              {/* <div className="flex items-center justify-between">
                <Checkbox onChange={onChange} checked={state.checked}>
                  Creating an account means you're okay with our Terms of Service and Privacy Policy
                </Checkbox>
              </div> */}
              <Form.Item>
                <Button
                  className="w-full h-12 p-0 my-6 text-sm font-medium"
                  htmlType="submit"
                  type="primary"
                  size="large"
                >
                  បង្កើតគណនី
                </Button>
              </Form.Item>
              <p className="relative text-body dark:text-white60 -mt-2.5 mb-6 text-center text-13 font-medium before:absolute before:w-full before:h-px ltr:before:left-0 rtl:before:right-0 before:top-1/2 before:-translate-y-1/2 before:z-10 before:bg-gray-200 dark:before:bg-white10">
                <span className="relative z-20 px-4 bg-white dark:bg-[#1b1d2a]">Or</span>
              </p>
              <LoginGoogle />
            </Form>
          </div>
          <div className="p-6 text-center bg-gray-100 dark:bg-white10 rounded-b-md">
            <p className="mb-0 text-sm font-medium text-body dark:text-white60">
              មានគណនីរួចហើយ?
              <Link to="/" className="ltr:ml-1.5 rtl:mr-1.5 text-info hover:text-primary">
                ចូលគណនី
              </Link>
            </p>
          </div>
        </AuthFormWrap>
      </Col>
    </Row>
  );
}

export default SignUp;
