import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Statistic, message, Form, Input } from 'antd';
import { Input as Input5 } from 'antd-v5'
import { useSelector } from 'react-redux';
import UilTelegramAlt from '@iconscout/react-unicons/icons/uil-telegram-alt';
import UilTelegram from '@iconscout/react-unicons/icons/uil-telegram';
import './raw-style.css'
import axios from 'axios';

const API_ENDPOINT = `${process.env.REACT_APP_API_ENDPOINT}/api`;

function SyncTelegram() {
  const user = useSelector(state => state.userReducer.user)

  // :: Local variable ::
  const [step, setStep] = useState(1)
  const { Countdown } = Statistic;
  const [deadline, setDeadline] = useState(Date.now() + 0)
  const [otp, setOTP] = useState(null)
  const [username, setUsername] = useState(user.username)
  const [errMessage, setErrMessage] = useState(null)
  const [errMessageOTP, setErrMessageOTP] = useState(null)

  useEffect(() => {
    if (user && user.username) {
      setUsername(user.username)
    }
    console.log(user)
  }, [user])

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

  const handleVerifyOTP = async () => {
    if (!username) {
      console.log(username)
      setErrMessage("សូមបញ្ចូលលេខទូរស័ព្ទ ឈ្មោះគណនី ឬអ៊ីមែលរបស់អ្នក!")
      return
    }
    if (!otp) {
      setErrMessageOTP("សូមបញ្ចូលលេខបញ្ជាក់គណនី!")
      return
    }

    message.loading("កំពុងបញ្ជូនលេខបញ្ជាក់គណនី...📫", 1000 * 30)

    try {
      const response = await axios.post(`${API_ENDPOINT}/auth/otp/verify/${username}`, { code: otp });
      message.destroy()
      message.success("លេខបញ្ជាក់គណនីបានភ្ជាប់ Telegram ជោគជ័យ✅✨")
      setStep(1)
      setOTP('')
      setDeadline(Date.now() + 0)

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

  console.log(username)

  const handleRequestOtp = async () => {
    if (!username) {
      console.log(username)
      message.error("សូមបញ្ចូលលេខទូរស័ព្ទ ឈ្មោះគណនី ឬអ៊ីមែលរបស់អ្នក!")
      return
    }

    message.loading("កំពុងស្នើសុំលេខបញ្ជាក់គណនី...📫", 1000 * 30)
    setOTP('')

    try {
      const response = await axios.get(`${API_ENDPOINT}/auth/otp/generate/${username}`);

      if (response?.status === 200) {
        setDeadline(Date.now() + 1000 * 60 * 5)
        message.destroy()
        message.success("លេខបញ្ជាក់គណនីបានបញ្ជូនទៅ Telegram រួចរាល់✅✨")

      }
    } catch (error) {
      message.destroy()
      if (error?.response?.data?.error === "User matching query does not exist.") {
        setErrMessage("លេខទូរស័ព្ទ ឈ្មោះគណនី ឬអ៊ីមែលរបស់អ្នកមិនត្រឹមត្រូវទេ!")
      }
      if (error?.response?.data?.error === "User have not verified with telegram yet.") {
        message.warning("អ្នកប្រើប្រាស់មិនទាន់បានផ្ទៀងផ្ទាត់ជាមួយ Telegram នៅឡើយទេ!")
      }
      console.log(error.response)
    }
  }

  return (
    <div className="w-full flex flex-col items-center px-8">
      <div className="my-6 w-full max-w-[600px] bg-white rounded-md dark:bg-white10 shadow-regular dark:shadow-none">
        {user.telegram_account &&
          <div className="px-5 py-4 text-center border-b border-gray-200 dark:border-white10">
            <h2 className="mb-0 text-base font-kantumruy-pro font-medium text-dark dark:text-white87">គណនីបានភ្ជាប់ជាមួយ Telegram✅</h2>
            <ul className="mb-0 user-info__contact mt-2">
              <li className="flex items-center mb-1 last:mb-0 gap-[12px] text-primary text-base font-medium">
                <UilTelegramAlt className="w-[16px] h-[16px] text-primary" />{' '}
                <span>{user.telegram_account.first_name} {user.telegram_account.last_name}</span>
              </li>
              <Link to={`${"https://t.me/"}${user.telegram_account.username}`} target='_blank' referrerPolicy='no-referrer-when-downgrade'>
                <li className="flex items-center mb-1 last:mb-0 gap-[12px] text-success text-base font-medium hover:underline">
                  <UilTelegram className="w-[16px] h-[16px]" /> <span>{"t.me/"}{user.telegram_account.username}</span>
                </li>
              </Link>
            </ul>
          </div>
        }
        <div className="px-8 pt-8 pb-8">
          {step === 1 ? (
            <Link to="https://t.me/noimnakbot" target='_blank' referrerPolicy='no-referrer-when-downgrade'>
              <Button
                onClick={() => { handleSyncTelegram() }}
                className="w-full h-12 px-2 my-6 text-sm min-md:font-base font-medium"
                htmlType="submit"
                type="primary"
                size="large"
              >
                ធ្វើសមកាល Telegram 2FA
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
                        if (e.target.value) {
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
                  onClick={() => { handleRequestOtp() }}
                  className='w-full text-start'
                >
                  <p className="m-0 text-sm font-medium text-start text-secondary hover:text-primary">
                    ស្នើសុំលេខបញ្ជាក់
                  </p>
                </button>
                <button
                  onClick={() => { handleVerifyOTP() }}
                  className='w-full text-start'
                >
                  <p className="m-0 text-sm font-medium text-end text-success hover:text-success-hover">
                    បញ្ជាក់
                  </p>
                </button>

              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SyncTelegram;
