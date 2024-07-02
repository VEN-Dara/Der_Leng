import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Input, Button, message } from 'antd';
import { GlobalUtilityStyle } from '../../styled';
import Heading from '../../../../resource/components/heading/heading';
import UseFetcher from '../../../hooks/useFetcher';

function Password() {
  const [form] = Form.useForm();
  const useFetcher = new UseFetcher();
  const [state, setState] = useState({
    isLoading: false,
    data: null,
    success: false,
    message: null
  });

  const handleSubmit = (values) => {
    setState(prevState => ({
    ...prevState,
    isLoading: true
    }))
    useFetcher.post("/auth/user/set_password", setState, values);
  };

  const handleCancel = (e) => {
    e.preventDefault();
    form.resetFields();
  };

  useEffect(() => {
    if(state.success === true && state.isLoading === false) {
      message.destroy()
      message.success("Password has been updated successfully.");
    }
  }, [state])

  const formatErrorResponse = () => {
    let message = "";
    const errorRes = state.message;
    console.log(errorRes)
    for (const errorField in errorRes) {
      const errMes = errorRes[errorField];
      const formatMes = errMes.map(errorMessage => `${errorField} - ${errorMessage}`);
      message += message + "\n" + formatMes.join('\n')
    }
    setState(prevState => ({
      ...prevState,
      message: message
    }))
  }

  const validatePassword = async (_, value) => {
    const hasLetter = /[a-zA-Z]/.test(value);
    const hasNumber = /\d/.test(value);

    if (hasLetter === false || hasNumber === false || value.length < 8) {
      return Promise.reject('Password must contain at least one letter and one number and 8 digit.');
    }

    return Promise.resolve();
  };

  return (
    <div className="bg-white dark:bg-white10 m-0 p-0 mb-[25px] rounded-10 relative">
      <div className="py-[18px] px-[25px] text-dark dark:text-white87 font-medium text-[17px] border-regular dark:border-white10 border-b">
        <Heading as="h4" className="mb-0 text-lg font-medium">
          Password Settings
        </Heading>
        <span className="mb-0.5 text-light dark:text-white60 text-13 font-normal">
          Change or reset your account password
        </span>
      </div>
      <div className="p-[25px]">
        <GlobalUtilityStyle>
          <Row justify="center">
            <Col xxl={12} sm={16} xs={24}>
              <Form form={form} name="changePassword" onFinish={handleSubmit}>
                <Form.Item name="old_password" label="Old Password" className="mb-4 form-label-w-full form-label-text-start"
                  rules={[
                    { required: true, message: 'Please input your old password!' },
                    { validator: validatePassword }
                  ]}
                >
                  <Input.Password />
                </Form.Item>
                <Form.Item name="password" label="New Password" className="mb-4 form-label-w-full form-label-text-start"
                  rules={[
                    { required: true, message: 'Please input your new password!' },
                    { validator: validatePassword }
                  ]}
                >
                  <Input.Password />
                </Form.Item>
                <Form.Item name="confirm_password" label="Confirm Password" className="mb-4 form-label-w-full form-label-text-start"
                  rules={[
                    { required: true, message: 'Please input your confirmation!' },
                    { validator: validatePassword }
                  ]}
                >
                  <Input.Password />
                </Form.Item>
                { state.message && !state.success && state.message.message ? <p className="mb-0 text-danger text-[13px]"> {state.message.message} </p> :
                  state.message && state.success ? <p className="mb-0 text-success text-[13px]"> {state.message} </p> :
                  <></>
                }
                <Form.Item className="mb-7">
                  <div className="flex items-center flex-wrap gap-[15px] mt-4">
                    <Button htmlType="submit" type="primary" className="h-11 px-[20px]" loading={state.isLoading}>
                      Change Password
                    </Button>
                    <Button
                      size="default"
                      onClick={handleCancel}
                      type="light"
                      className="h-11 px-[20px] bg-transparent dark:text-white87 dark:border-white10 dark:hover:text-primary dark:hover:border-primary"
                    >
                      Cancel
                    </Button>
                  </div>
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </GlobalUtilityStyle>
      </div>
    </div>
  );
}

export default Password;
