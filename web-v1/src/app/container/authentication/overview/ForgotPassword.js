// ========================================================>> Core library
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// ========================================================>> THird library
import { Row, Col, Button, Statistic, message, Form, Input } from 'antd';
import { Input as Input5 } from 'antd-v5'
import { useDispatch, useSelector } from 'react-redux';
import { AuthFormWrap } from './style';
import Cookies from 'js-cookie';
import axios from 'axios';

// ========================================================>> Local library
import './raw-style.css'
import { FETCH_USER_SUCCESS } from '../../../redux/user-info/actions';
import actions from '../../../redux/authentication/actions';
const { loginSuccess } = actions;
import ApiService from '../../../config/api/apiService'

const API_ENDPOINT = `${process.env.REACT_APP_API_ENDPOINT}/api`;

function ForgotPassword() {
  const [state, setState] = useState({
    values: null,
  });
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const user = useSelector(state => state.userReducer.user)
  const api = new ApiService();
  
  // :: Local variable ::
  const stepAction = {
    request_otp: 1,
    verify_otp: 2,
    set_new_password: 3
  }
  const [step, setStep] = useState(stepAction.request_otp)
  const { Countdown } = Statistic;
  const [deadline, setDeadline] = useState(Date.now() + 0)
  const [otp, setOTP] = useState(null)
  const [username, setUsername] = useState(user.username)
  const [pwErrMessage, setPwErrMessage] = useState(null)
  const [errMessageOTP, setErrMessageOTP] = useState(null)
  const [loading, setLoading] = useState({
    passwordLoading: false,
    usernameLoading: false,
    otpLoading: false,
  })

  const onFinish = () => {
    console.log('finished!');
  };

  const handleSyncTelegram = () => {
    setStep(2);
  }

  const onChange = (text) => {
    if (text) {
      setErrMessageOTP(null)
    }
    setOTP(text);
  }

  const validatePassword = async (_, value) => {
    const hasLetter = /[a-zA-Z]/.test(value);
    const hasNumber = /\d/.test(value);

    if (hasLetter === false || hasNumber === false || value.length < 8) {
      return Promise.reject('ពាក្យសម្ងាត់ត្រូវតែមានយ៉ាងហោចណាស់អក្សរមួយ និងលេខមួយ និង 8 ខ្ទង់។');
    }

    return Promise.resolve();
  };

  const validateComfirmationPassword = async (_, value) => {
    const hasLetter = /[a-zA-Z]/.test(value);
    const hasNumber = /\d/.test(value);

    if (hasLetter === false || hasNumber === false || value.length < 8) {
      return Promise.reject('ពាក្យសម្ងាត់ត្រូវតែមានយ៉ាងហោចណាស់អក្សរមួយ និងលេខមួយ និង 8 ខ្ទង់។');
    }

    return Promise.resolve();
  };

  // =====================================================================>> Request api func

  const handleVerifyOTP = async () => {
    console.log(username)
    setUsername("derleng")
    if (!username) {
      setErrMessage("សូមបញ្ចូលលេខទូរស័ព្ទ ឈ្មោះគណនី ឬអ៊ីមែលរបស់អ្នក!")
      return
    }
    if (!otp || otp.length < 6) {
      setErrMessageOTP("សូមបញ្ចូលលេខបញ្ជាក់គណនី!")
      return
    }

    message.loading("កំពុងបញ្ជូនលេខបញ្ជាក់គណនី...📫", 1000 * 30)

    try {
      const response = await axios.post(`${API_ENDPOINT}/auth/otp/verify/${username}`, { code: otp });
      Cookies.set('access_token', response.data.access_token);
      Cookies.set('refresh_token', response.data.refresh_token);
      
      // =============> Save User Info to Local Storage <=============
      localStorage.setItem("user", JSON.stringify(response.data.user))
      dispatch({
        type: FETCH_USER_SUCCESS,
        payload: response.data.user
      });
      
      message.destroy()
      setStep(3)

    } catch (error) {
      console.log(error.response)
      message.destroy()
      if (error?.response?.data?.error === "User matching query does not exist.") {
        setErrMessage("លេខទូរស័ព្ទ ឈ្មោះគណនី ឬអ៊ីមែលរបស់អ្នកមិនត្រឹមត្រូវទេ!")
      }
      if (error?.response?.data?.error === "OTP matching query does not exist.") {
        setErrMessageOTP("OTP ដែលបានផ្តល់គឺមិនត្រឹមត្រូវទេ។")
      }

      if (error?.response?.data?.error === "User have not verified with telegram yet.") {
        message.warning("អ្នកប្រើប្រាស់មិនទាន់បានផ្ទៀងផ្ទាត់ជាមួយ Telegram នៅឡើយទេ!")
      }
    }
  };

  const handleRequestOtp = async (value) => {
    if (!value.username) {
      setErrMessage("សូមបញ្ចូលលេខទូរស័ព្ទ ឈ្មោះគណនី ឬអ៊ីមែលរបស់អ្នក!")
      return
    }

    message.loading("កំពុងស្នើសុំលេខបញ្ជាក់គណនី...📫", 1000 * 30)
    setOTP('')
    setUsername(value.username)

    try {
      const response = await axios.get(`${API_ENDPOINT}/auth/otp/generate/${value.username}`);

      if (response?.status === 200) {
        setDeadline(Date.now() + 1000 * 60 * 5)
        message.destroy()
        message.success("លេខបញ្ជាក់គណនីបានបញ្ជូនទៅ Telegram រួចរាល់✅✨")
        setStep(2)
      }
    } catch (error) {
      console.log(error)
      message.destroy()
      if (error?.response?.data?.error === "User matching query does not exist.") {
        message.warning("លេខទូរស័ព្ទ ឈ្មោះគណនី ឬអ៊ីមែលរបស់អ្នកមិនត្រឹមត្រូវទេ!")
      }
      if (error?.response?.data?.error === "User have not verified with telegram yet.") {
        message.warning("អ្នកប្រើប្រាស់មិនទាន់បានផ្ទៀងផ្ទាត់ជាមួយ Telegram នៅឡើយទេ!")
      }
      console.log(error.response)
    }
  }


  const setNewPassword = async (value) => {
    console.log("helloo")
    if(value.password != value.comfirmation) {
      setPwErrMessage("បញ្ជាក់ពាក្យសម្ងាត់ថ្មី មិនត្រឹមត្រូវ")
      return
    }

    try {
      setLoading(prevloading => ({...prevloading, passwordLoading: true}))
      const response = await api.post('/auth/user/reset_password', {password: value.password, confirm_password: value.comfirmation})
      message.success("កំណត់ពាក្យសម្ងាត់ឡើងវិញបានជោគជ័យ✅✨")
      Cookies.set('logedIn', true);
      dispatch(loginSuccess(true));
      navigate('/');

    } catch (error) {
      console.error("Reset pw error", error)
      console.log(error.response)

    } finally {
      setLoading(prevloading => ({...prevloading, passwordLoading: false}))
    }
  }

  const handleSubmit = (value) => {
    if(step === stepAction.request_otp) {
      handleRequestOtp(value);
    } else if(step === stepAction.set_new_password) {
      setNewPassword(value)
    }
  }

  return (
    <Row justify="center">
      <Col xxl={6} xl={8} md={12} sm={18} xs={24}>
        <AuthFormWrap className="mt-6 bg-white rounded-md dark:bg-white10 shadow-regular dark:shadow-none">
          <Form name="forgotPass" onFinish={handleSubmit} layout="vertical">
            <div className="px-5 py-4 text-center border-b border-gray-200 dark:border-white10">
              <h2 className="mb-0 text-xl font-semibold text-dark dark:text-white87">ភ្លេចពាក្យសម្ងាត់របស់អ្នកមែនទេ?</h2>
            </div>

            {
              step === stepAction.request_otp ? (
                <div className="px-10 pt-8 pb-6">
                  <p className="mb-4 dark:text-white60">
                    សូមបញ្ចូលអាសយដ្ឋានអ៊ីមែល ឈ្មោះគណនី ឬលេខទូរស័ព្ទដែលអ្នកបានប្រើ ហើយយើងនឹងផ្ញើការណែនាំទៅអ្នកដើម្បីកំណត់ពាក្យសម្ងាត់របស់អ្នកឡើងវិញ។
                  </p>
                  <Form.Item
                    label="អាសយដ្ឋានអ៊ីមែល ឈ្មោះគណនី ឬលេខទូរស័ព្ទ"
                    name="username"
                    rules={[{ required: true, message: 'សូមបញ្ចូលអាសយដ្ឋានអ៊ីមែល ឈ្មោះគណនី ឬលេខទូរស័ព្ទ!'}]}
                  >
                    <Input placeholder="name@example.com" />
                  </Form.Item>
                  <Form.Item>
                    <Button
                      className="block w-full h-12 p-0 text-sm font-medium"
                      htmlType="submit"
                      type="primary"
                      size="large"
                    >
                      ស្នើសុំលេខបញ្ជាក់
                    </Button>
                  </Form.Item>
                </div>
              ) : step === stepAction.verify_otp ? (
                <div className="px-10 pt-8 pb-6">
                  <p className="mb-4 dark:text-white60">
                    នៅពេលអ្នកជោគជ័យក្នុងការភ្ជាប់គណនីរបស់អ្នកជាមួយ Telegram អ្នកអាចស្នើសុំលេខ OTP នៅទីនេះ។
                  </p>
                  <div className='flex flex-col items-center mt-4 '>
                    <Input5.OTP formatter={(str) => str.toUpperCase()} value={otp} onChange={onChange}
                      className="[&>input]:border-primary rounded-4 bg-red-500"
                    />
                    <div className='flex items-baseline gap-1 w-full'>
                      <button
                        onClick={() => { handleRequestOtp({username}) }}
                        className='text-start'
                      >
                        <p className="m-0 text-sm font-normal text-start dark:text-white60 hover:text-success hover:underline">
                          ស្នើសុំលេខបញ្ជាក់ម្ដងទៀត
                        </p>
                      </button>
                      <p className="text-sm font-normal flex-1 text-danger mb-0">
                        {' '}{errMessageOTP}
                      </p>
                      <Countdown className="[&>div>span]:text-sm [&>div>span]:font-normal [&>div>span]:text-danger" value={deadline} onFinish={onFinish} format="mm:ss" />
                      <p className="m-0 text-sm font-normal text-danger">
                        នាទី
                      </p>
                    </div>
                  </div>
                    <Button
                      className="block w-full h-12 p-0 text-sm font-medium mt-1"
                      onClick={() => {handleVerifyOTP()}}
                      type="primary"
                      size="large"
                    >
                      បញ្ជាក់លេខសម្ងាត់
                    </Button>
                </div>
              ) : (
                <div className="px-10 pt-8 pb-6">
                  <p className="mb-4 dark:text-white60">
                    សូមបញ្ចូលពាក្យសម្ងាត់ថ្មីរបស់អ្នកដែលមានយ៉ាងហោចណាស់ 8 ខ្ទង់ អក្សរមួយ និងចំនួនគត់មួយ។
                  </p>
                  <Form.Item
                    label="ពាក្យសម្ងាត់ថ្មី"
                    name="password"
                    rules={[{ required: true, message: 'សូមបញ្ចូលពាក្យសម្ងាត់!'}, {validator: validatePassword}]}
                  >
                    <Input.Password placeholder="Password" />
                  </Form.Item>
                  <Form.Item
                    label="បញ្ជាក់ពាក្យសម្ងាត់ថ្មី"
                    name="comfirmation"
                    onChange={() => setPwErrMessage('')}
                    rules={[{ required: true, message: 'សូមបញ្ចូលពាក្យសម្ងាត់!'}, {validator: validatePassword}]}
                  >
                    <Input.Password placeholder="comfirmation" />
                  </Form.Item>
                  <p className="text-sm font-medium flex-1 text-danger mb-4 -mt-2">
                      {' '}{pwErrMessage}
                  </p>
                  <Form.Item>
                    <Button
                      className="block w-full h-12 p-0 text-sm font-medium"
                      htmlType="submit"
                      type="primary"
                      size="large"
                    >
                      { loading.passwordLoading ? "សូមរងចាំ..." : "កំណត់ពាក្យសម្ងាត់ឡើងវិញ" }
                    </Button>
                  </Form.Item>
                </div>
              )
            }

            <div className="p-6 text-center bg-section dark:bg-white10 rounded-b-md">
              <p className="mb-0 text-sm font-medium text-body dark:text-white60">
                ត្រលប់​ទៅ
                <Link to="/" className="ltr:ml-1.5 rtl:mr-1.5 text-info hover:text-primary">
                  ទំព័រដើម
                </Link>
              </p>
            </div>
          </Form>
        </AuthFormWrap>
      </Col>
    </Row>
  );
}

export default ForgotPassword;
