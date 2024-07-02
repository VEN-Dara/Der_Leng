import React from 'react';
import { Timeline } from 'antd';
import { TimeLinePointerIconWrap, TimelineNormalWrap, TimelineBoxWrap } from '../../../../resource/container/ui-elements/ui-elements-styled.js';
import { SwClock } from '../../../../resource/components/utilities/icons.js';

function PackageSchedule({schedules}) {
  const colors = ["#FB3586", "#2C99FF", "#fa8b0c", "#FB3586", "#ff4d4f", "#20c997", "#FF69A5"]

  return (
    <>
      <main className="min-h-[715px] lg:min-h-[580px] px-8 xl:px-[15px] pb-[30px] bg-transparent">
        <div className="bg-white dark:bg-white10 m-0 p-0 text-theme-gray dark:text-white60 text-[15px] mb-[25px] rounded-10 relative">
          <div className="h-[60px] px-[25px] text-dark dark:text-white87 font-medium text-[17px] border-regular dark:border-white10 border-b">
            <h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
              Trip Schedule
            </h1>
          </div>
          <TimeLinePointerIconWrap className="p-[25px]">
            <Timeline>
              {schedules.map((schedule) => {
                return (
                  <Timeline.Item className="primary" key={schedule.id} dot={<SwClock size={20} color={colors[`${Math.floor(Math.random() * (colors.length - 0)) + 0}`]} />}>
                    <div className='flex gap-4'>
                      <h3>{schedule.start_time} to {schedule.end_time}</h3>
                      {/* <span className="tags">{schedule.start_time} to {schedule.end_time}</span> */}
                      <h3>{schedule.destination}</h3>
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