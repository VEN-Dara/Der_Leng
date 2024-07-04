import React, { useState, useCallback } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Form, Input, Button, Row, Col } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../../redux/authentication/actionCreator';
import { Checkbox } from '../../../components/checkbox/checkbox';
import { LoginGoogle } from './GoogleLogin';

function SignIn() {
  const history = useNavigate();
  const dispatch = useDispatch();
  const [message, setMessage] = useState('')
  const isLoading = useSelector((state) => state.auth.loading);
  const [form] = Form.useForm();
  const [state, setState] = useState({
    checked: null,
  });
  const handleSubmit = useCallback(
    (values) => {
      dispatch(login(values, () => history.push('/')))
        .catch((error) => {
          if(error.response) {
            setMessage("ពាក្យសម្ងាត់មិនត្រឹមត្រូវទេ សូមពិនិត្យពាក្យសម្ងាត់របស់អ្នកពីរដង ហើយព្យាយាមម្តងទៀត។")
          }
        });
    },
    [history, dispatch],
  );

  const onChange = (checked) => {
    setState({ ...state, checked });
  };

  return (
    <Row justify="center">
      <Col xxl={6} xl={8} md={12} sm={18} xs={24}>
        <div className="mt-6 bg-white rounded-md dark:bg-white10 shadow-regular dark:shadow-none">
          <div className="px-5 py-4 text-center border-b border-gray-200 dark:border-white10">
            <h2 className="mb-0 text-xl font-kantumruy-pro font-semibold text-dark dark:text-white87">ចូលរួមជាមួយ ដើរលេង</h2>
          </div>
          <div className="px-10 pt-8 pb-6">
            <Form name="login" form={form} onFinish={handleSubmit} layout="vertical">
              <Form.Item
                name="username"
                rules={[{ message: 'សូមបញ្ចូលអាសយដ្ឋានអ៊ីមែល ឈ្មោះគណនី ឬលេខទូរស័ព្ទ', required: true }]}
                initialValue="customer"
                label="អាសយដ្ឋានអ៊ីមែល ឈ្មោះគណនី ឬលេខទូរស័ព្ទ"
                className="[&>div>div>label]:text-sm [&>div>div>label]:text-dark dark:[&>div>div>label]:text-white60 [&>div>div>label]:font-medium"
              >
                <Input placeholder="name@example.com" />
              </Form.Item>
              <Form.Item
                name="password"
                initialValue="customer@123.com"
                label="ពាក្យសម្ងាត់"
                className="[&>div>div>label]:text-sm [&>div>div>label]:text-dark dark:[&>div>div>label]:text-white60 [&>div>div>label]:font-medium"
              >
                <Input.Password placeholder="Password" />
              </Form.Item>
              <p className='text-red-500'>{message !== '' ? message : null}</p>
              <div className="flex flex-wrap items-center justify-end gap-[10px]">
                {/* <Checkbox onChange={onChange} checked={state.checked} className="text-xs text-light dark:text-white60">
                  Keep me logged in
                </Checkbox> */}
                <NavLink className=" text-primary text-13" to="/forgotPassword">
                  ភ្លេចពាក្យសម្ងាត់មែនទេ?
                </NavLink>
              </div>
              <Form.Item>
                <Button
                  className="w-full h-12 p-0 my-6 text-sm font-medium"
                  htmlType="submit"
                  type="primary"
                  size="large"
                >
                  {isLoading ? 'សូមរងចាំ...' : 'ចូលគណនី'}
                </Button>
              </Form.Item>
              <p className="relative text-body dark:text-white60 -mt-2.5 mb-6 text-center text-13 font-medium before:absolute before:w-full before:h-px ltr:before:left-0 rtl:before:right-0 before:top-1/2 before:-translate-y-1/2 before:z-10 before:bg-gray-200 dark:before:bg-white10">
                <span className="relative z-20 px-4 bg-white dark:bg-[#1b1d2a]">ឬ</span>
              </p>
              <LoginGoogle/>
            </Form>
          </div>
          <div className="p-6 text-center bg-gray-100 dark:bg-white10 rounded-b-md">
            <p className="mb-0 text-sm font-medium text-body dark:text-white60">
            មិនទាន់មានគណនីមែនទេ?
              <Link to="/register" className="ltr:ml-1.5 rtl:mr-1.5 text-info hover:text-primary">
                ចុះឈ្មោះ
              </Link>
            </p>
          </div>
        </div>
      </Col>
    </Row>
  );
}

export default SignIn;
