import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Row, Col, Button, Statistic, message, Form, Input } from 'antd';
import { Input as Input5 } from 'antd-v5'
import { useDispatch, useSelector } from 'react-redux';
import { AuthFormWrap } from './style';
import Cookies from 'js-cookie';
import './raw-style.css'
import axios from 'axios';
import { FETCH_USER_SUCCESS } from '../../../redux/user-info/actions';
import actions from '../../../redux/authentication/actions';
const {loginSuccess} = actions;

const API_ENDPOINT = `${process.env.REACT_APP_API_ENDPOINT}/api`;

function SyncTelegram() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const user = useSelector(state => state.userReducer.user)

  // :: Local variable ::
  const [step, setStep] = useState(1)
  const { Countdown } = Statistic;
  const [deadline, setDeadline] = useState(Date.now() + 0)
  const [otp, setOTP] = useState(null)
  const [username, setUsername] = useState(user.username)
  const [errMessage, setErrMessage] = useState(null)
  const [errMessageOTP, setErrMessageOTP] = useState(null)

  const onFinish = () => {
    console.log('finished!');
  };

  const handleSyncTelegram = () => {
    setStep(2);
  }

  const onChange = (text) => {
    if(text) {
      setErrMessageOTP(null)
    }
    setOTP(text);
  }

  const handleVerifyOTP = async () => {
    if(!username) {
      setErrMessage("សូមបញ្ចូលលេខទូរស័ព្ទ ឈ្មោះគណនី ឬអ៊ីមែលរបស់អ្នក!")
      return
    }
    if(!otp) {
      setErrMessageOTP("សូមបញ្ចូលលេខបញ្ជាក់គណនី!")
      return
    }
    
    message.loading("កំពុងបញ្ជូនលេខបញ្ជាក់គណនី...📫", 1000 * 30)

    try {
      const response = await axios.post(`${API_ENDPOINT}/auth/otp/verify/${username}`, {code: otp});
      Cookies.set('access_token', response.data.access_token);
      Cookies.set('refresh_token', response.data.refresh_token);
      Cookies.set('logedIn', true);

      // =============> Save User Info to Local Storage <=============
      localStorage.setItem("user", JSON.stringify(response.data.user))
      dispatch({
        type: FETCH_USER_SUCCESS,
        payload: response.data.user
      });
      
      message.destroy()
      dispatch(loginSuccess(true));
      navigate('/')

    } catch (error) {
      console.log(error.response)
      message.destroy()
      if(error?.response?.data?.error === "User matching query does not exist.") {
        setErrMessage("លេខទូរស័ព្ទ ឈ្មោះគណនី ឬអ៊ីមែលរបស់អ្នកមិនត្រឹមត្រូវទេ!")
      }
      if(error?.response?.data?.error === "OTP matching query does not exist.") {
        setErrMessageOTP("OTP ដែលបានផ្តល់គឺមិនត្រឹមត្រូវទេ។")
      }

      if(error?.response?.data?.error === "User have not verified with telegram yet.") {
        message.warning("អ្នកប្រើប្រាស់មិនទាន់បានផ្ទៀងផ្ទាត់ជាមួយ Telegram នៅឡើយទេ!")
      }
    }
  };

  const handleRequestOtp = async () => {
    if(!username) {
      setErrMessage("សូមបញ្ចូលលេខទូរស័ព្ទ ឈ្មោះគណនី ឬអ៊ីមែលរបស់អ្នក!")
      return
    }
    
    message.loading("កំពុងស្នើសុំលេខបញ្ជាក់គណនី...📫", 1000 * 30)
    setOTP('')

    try {
      const response = await axios.get(`${API_ENDPOINT}/auth/otp/generate/${username}`);

      if(response?.status === 200) {
        setDeadline(Date.now() + 1000 * 60 *5)
        message.destroy()
        message.success("លេខបញ្ជាក់គណនីបានបញ្ជូនទៅ Telegram រួចរាល់✅✨")

      }
    } catch (error) {
      message.destroy()
      if(error?.response?.data?.error === "User matching query does not exist.") {
        setErrMessage("លេខទូរស័ព្ទ ឈ្មោះគណនី ឬអ៊ីមែលរបស់អ្នកមិនត្រឹមត្រូវទេ!")
      }
      if(error?.response?.data?.error === "User have not verified with telegram yet.") {
        message.warning("អ្នកប្រើប្រាស់មិនទាន់បានផ្ទៀងផ្ទាត់ជាមួយ Telegram នៅឡើយទេ!")
      }
      console.log(error.response)
    }
  }

  return (
    <Row justify="center">
      <Col xxl={6} xl={8} md={12} sm={18} xs={24}>
        <AuthFormWrap className="mt-6 bg-white rounded-md dark:bg-white10 shadow-regular dark:shadow-none">
          <div className="px-5 py-4 text-center border-b border-gray-200 dark:border-white10">
            <h2 className="mb-0 text-xl font-kantumruy-pro font-semibold text-dark dark:text-white87">ចូលរួមជាមួយ ដើរលេង</h2>
          </div>
          <div className="px-8 pt-8 pb-8">
            { step === 1 ? (
              <Link to="https://t.me/noimnakbot" target='_blank' referrerPolicy='no-referrer-when-downgrade'>
                <Button
                  onClick={() => {handleSyncTelegram()}}
                  className="w-full h-12 px-2 my-6 text-base font-medium"
                  htmlType="submit"
                  type="primary"
                  size="large"
                >
                  ធ្វើសមកាល Telegram 2FA ជាមួយគណនីរបស់អ្នក
                </Button>
              </Link>

            ) : (
              <div className='flex flex-col items-center'>
                {
                  user.id === null && (
                    <Form.Item
                      name="username"
                      rules={[{ message: 'សូមបញ្ចូលលេខទូរស័ព្ទ ឈ្មោះគណនី ឬអ៊ីមែលរបស់អ្នក!', required: true }]}
                      label="សូមបញ្ចូលលេខទូរស័ព្ទ ឈ្មោះគណនី ឬអ៊ីមែលរបស់អ្នក"
                      className="[&>div>div>label]:text-sm [&>div>div>label]:text-dark dark:[&>div>div>label]:text-white60 [&>div>div>label]:font-medium"
                    >
                      <Input 
                        placeholder="name@example.com" 
                        value={username}
                        onChange={e => {
                          setUsername(e.target.value);
                          if(e.target.value) {
                            setErrMessage(null)
                          }
                        }}
                      />
                      <p className="text-sm font-normal text-danger mb-0">
                        {errMessage}
                      </p>
                    </Form.Item>

                  )
                }
                <p className="text-sm font-normal text-body dark:text-white60 mb-4">
                  នៅពេលអ្នកជោគជ័យក្នុងការភ្ជាប់គណនីរបស់អ្នកជាមួយ Telegram អ្នកអាចស្នើសុំលេខ OTP នៅទីនេះ។
                </p>
                <div className='flex flex-col items-end mt-4'>
                  <Input5.OTP formatter={(str) => str.toUpperCase()} value={otp} onChange={onChange} 
                    className="[&>input]:border-primary rounded-4 bg-red-500"
                  />
                  <div className='flex items-baseline gap-1 w-full'>
                    <p className="text-sm font-normal flex-1 text-danger mb-0">
                      {' '}{errMessageOTP}
                    </p>
                    <Countdown className="[&>div>span]:text-sm [&>div>span]:font-medium [&>div>span]:text-danger" value={deadline} onFinish={onFinish} format="mm:ss" />
                    <p className="m-0 text-sm font-medium text-danger">
                      នាទី
                    </p>
                  </div>
                </div>
                <div className='flex justify-between w-full mt-6 gap-2'>
                <button
                  onClick={() => {handleRequestOtp()}}
                  className='w-full text-start'
                >
                  <p className="m-0 text-sm font-medium text-start text-secondary hover:text-primary">
                    ស្នើសុំលេខបញ្ជាក់
                  </p>
                </button>
                <button
                  onClick={() => {handleVerifyOTP()}}
                  className='w-full text-start'
                >
                  <p className="m-0 text-sm font-medium text-end text-success hover:text-success-hover">
                    បញ្ជាក់
                  </p>
                </button>

              </div>
              </div>
            ) }
          </div>
          <div className="p-6 text-end bg-gray-100 dark:bg-white10 rounded-b-md">
            <p className="mb-0 text-base font-medium text-body dark:text-white60">
              <Link to="/login" className="ltr:ml-1.5 rtl:mr-1.5 text-body hover:text-primary">
                រំលង
              </Link>
            </p>
          </div>
        </AuthFormWrap>
      </Col>
    </Row>
  );
}

export default SyncTelegram;
