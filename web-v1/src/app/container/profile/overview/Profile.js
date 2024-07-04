import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Input, Select, Skeleton, message } from 'antd';
import { Button } from '../../../../resource/components/buttons/buttons';
import Heading from '../../../../resource/components/heading/heading';
import { Tag } from '../../../../resource/components/tags/tags';
import { GlobalUtilityStyle } from '../../styled';
import { isUsernameExist } from '../../../redux/authentication/actionCreator'
import UseFetcher from '../../../hooks/useFetcher';

const { Option } = Select;
function Profile() {
  const [form] = Form.useForm();
  const useFetcher = new UseFetcher();
  const [state, setState] = useState({
    isLoading: false,
    data: null,
    success: false,
    message: null
  });

  const [initialState, setInitailState] = useState({
    isLoading: true,
    data: null,
    success: false,
    message: null
  })

  useEffect(() => {
    useFetcher.retrieve(setInitailState, "/auth/user");
  }, [])

  useEffect(() => {
    if(state.data !== null && state.success === true) {
      message.destroy();
      message.success("ព័ត៌មានរបស់អ្នកត្រូវបានធ្វើបច្ចុប្បន្នភាពដោយជោគជ័យ។✅✨")
    }
  }, [state])

  const handleSubmit = (values) => {
    setState(prevState => ({
      ...prevState,
      isLoading: true
    }))
    useFetcher.put("/auth/user", setState, values);
  };

  const handleCancel = (e) => {
    e.preventDefault();
    form.resetFields();
  };

  const checked = (checke) => {
    setState({ tags: checke });
  };

  const validateUsername = async (_, value) => {
    const isValidUsername = /^[a-zA-Z0-9_]+$/.test(value)
    if(!isValidUsername) {
      return Promise.reject('Username must contain only letters, numbers, and underscores.')
    }

    try {
      if ( value !== initialState.data.username && await isUsernameExist(value)) {
        return Promise.reject('This username already taken. Please choose another one.');
      }

    } catch (error) {
      console.error('Error checking username:', error);
      return Promise.reject('An error occurred while checking the username.');
    }

    return Promise.resolve();
  }

  const validatePhone = async (_, value) => {
    const isValidPhone = /^(?:\+|0(?!0))\d{7,14}$/.test(value);

    if (isValidPhone === false) {
      return Promise.reject('Phone number must be start with country code (+885) or zero (0).');
    }

    return Promise.resolve();
  };

  return (
    <div className="bg-white dark:bg-white10 m-0 p-0 mb-[25px] rounded-10 relative">
      <div className="py-[18px] px-[25px] text-dark dark:text-white87 font-medium text-[17px] border-regular dark:border-white10 border-b">
        <Heading as="h4" className="mb-0 text-lg font-medium">
          Edit Profile
        </Heading>
        <span className="mb-0.5 text-light dark:text-white60 text-13 font-normal">
          Set Up Your Personal Information
        </span>
      </div>
      <div className="p-[25px]">
        <GlobalUtilityStyle>
          <Row justify="center">
            <Col xxl={12} lg={16} xs={24}>
              { initialState.isLoading ? (
                <Skeleton active paragraph={{
                  rows: 8,
                }}/>

              ) : initialState.data !== null ? (
              <Form className="pt-2.5 pb-[30px]" name="editProfile" onFinish={handleSubmit}>
                <Form.Item
                  name="fullname"
                  initialValue={initialState.data.fullname}
                  label="Fullname"
                  className="mb-4 form-label-w-full form-label-text-start dark:text-white-60"
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="username"
                  initialValue={initialState.data.username}
                  label="@Username"
                  className="mb-4 form-label-w-full form-label-text-start dark:text-white-60"
                  rules={[
                    { required: true, message: 'Please input your username!' },
                    {validator: validateUsername}
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="email"
                  initialValue={initialState.data.email}
                  label="Email"
                  className="mb-4 form-label-w-full form-label-text-start dark:text-white-60"
                  rules={[{ required: true, message: 'Please input your email!', type: 'email' }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="phone"
                  initialValue={initialState.data.phone}
                  label="Phone Number"
                  className="mb-4 form-label-w-full form-label-text-start"
                  rules={[
                    { required: true, message: 'Please input your Phone number!' },
                    { validator: validatePhone}
                  ]}
                >
                  <Input />
                </Form.Item>

                <div className="mt-11">
                  <Button size="default" htmlType="submit" type="primary" className="h-11 px-[20px] font-semibold"
                    loading={state.isLoading}
                  >
                    Update Profile
                  </Button>
                  &nbsp; &nbsp;
                  <Button
                    size="default"
                    onClick={handleCancel}
                    type="light"
                    className="h-11 px-[20px] bg-regularBG dark:bg-white10 text-body dark:text-white87 font-semibold border-regular dark:border-white10"
                  >
                    Cancel
                  </Button>
                </div>
              </Form>
              ) : 
                <></>
            }
            </Col>
          </Row>
        </GlobalUtilityStyle>
      </div>
    </div>
  );
}

export default Profile;
