import React, { useState } from 'react';
import { Button, Timeline } from 'antd';
import { TimeLinePointerIconWrap, TimelineNormalWrap, TimelineBoxWrap } from '../../../../../resource/container/ui-elements/ui-elements-styled.js';
import { SwClock } from '../../../../../resource/components/utilities/icons.js';
import UilTrashAlt from '@iconscout/react-unicons/icons/uil-trash-alt';
import { alertModal } from '../../../../../resource/components/modals/antd-modals.js';
import ApiService from '../../../../config/api/apiService.js';

function PackageSchedule({schedules}) {
  const colors = ["#FB3586", "#2C99FF", "#fa8b0c", "#FB3586", "#ff4d4f", "#20c997", "#FF69A5"]
  const [scheduleData, setScheduleData] = useState(schedules || [])
  const api = new ApiService()

  const removeService = async (id) => {
    alertModal.confirm({
      title: 'តើអ្នកពិតជាចង់លុបសេវាកម្មនេះមែនទេ?',
      content: '',
      className: 'font-kantumruy-pro',
      okText: 'បាទ, ចាស',
      okType: 'danger',
      cancelText: 'ទេ អរគុណ',
      async onOk() {
        try {
          const response = await api.delete(`/package-schedules/${id}/`);
          setScheduleData(scheduleData.filter(s => s.id != id));
        } catch (error) {
          console.log(error.response)
        }
      },
      onCancel() { }
    });
  }
  return (
    <>
      <main className="min-h-[715px] lg:min-h-[580px] pb-[30px] bg-transparent">
        <div className="bg-white dark:bg-white10 m-0 p-0 text-theme-gray dark:text-white60 text-[15px] mb-[25px] rounded-10 relative">
          <div className="h-[60px] px-[25px] text-dark dark:text-white87 font-medium text-[17px] border-regular dark:border-white10 border-b">
            <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
              Trip Schedule
            </h1>
          </div>
          <TimeLinePointerIconWrap>
            <Timeline>
              {scheduleData.map((schedule) => {
                return (
                  <Timeline.Item className="primary p-0" key={schedule.id} dot={<SwClock size={20} color={colors[`${Math.floor(Math.random() * (colors.length - 0)) + 0}`]} />}>
                    <div className='flex items-center gap-2'>
                      <div className='flex items-center gap-2 min-md:gap-4 w-[300px]'>
                      <h3>{schedule.start_time} to {schedule.end_time}</h3>
                      <h3>{schedule.destination}</h3>
                      </div>
                      <Button
                        onClick={() => removeService(schedule.id)}
                        className="bg-gray-100 dark:bg-white10 h-[36px] w-[36px] mb-6 px-[11px] text-body dark:text-white60 border-none shadow-none hover:bg-danger-transparent hover:text-danger"
                        to="#"
                        size="default"
                        type="danger"
                        shape="circle"
                        transparented
                      >
                        <UilTrashAlt className="w-[14px] h-[14px]" />
                      </Button>
                    </div>
                  </Timeline.Item>
                )
              })}
            </Timeline>
          </TimeLinePointerIconWrap>
        </div>
      </main>
    </>
  );
}

export default PackageSchedule;