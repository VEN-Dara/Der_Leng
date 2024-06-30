import { Button, Spin } from "antd";
import { Cards } from "../../../../resource/components/cards/frame/cards-frame";
import DefaultPackageImage from '../../../static/img/default_img/travel-cambodia.png'
import { formatDate } from "../../../utility/format-function/date";
import { Link } from "react-router-dom";

function HistoryBookingCard({data}) {
    const FILE_ENDPOINT = process.env.REACT_APP_FILE_ENDPOINT;

    return (
        <Cards headless size="large" className="mb-[25px] ant-card-body-p-0 p-4">
            <div className='flex border-b border-gray-200 dark:border-white10 pb-2'>
                <div className='flex gap-2 w-full'>
                    <div className='min-h-20 min-w-20 h-20 w-20 rounded-4 overflow-hidden'>
                        <img src={ data.tour_package.thumbnail ? `${FILE_ENDPOINT}${data.tour_package.thumbnail}` : DefaultPackageImage} className='object-cover h-full w-full' />
                    </div>
                    <div className='flex flex-col justify-between'>
                        <Link to={`/tour-guide/tour-package/${data.tour_package.id}`}>
                            <p className='p-0 m-0 font-kantumruy-pro text-primary font-medium text-sm'>{data.tour_package.name}</p>
                        </Link>
                        <p className='p-0 m-0 font-kantumruy-pro font-normal text-sm'>ចំនួនអ្នកទេសចរ x{data.customer_amount}</p>
                        <p className='p-0 m-0 font-kantumruy-pro text-sm'> ថ្ងៃទី {formatDate(data.booking_date)}</p>
                    </div>
                </div>
                <div className='min-w-[100px] flex flex-col items-end justify-end'>
                    <p className='p-0 m-0 font-kantumruy-pro font-medium text-sm'>សរុប: ${data.total_price}</p>
                </div>
            </div>
            <div className='flex justify-between items-center mt-2'>
                <div className='flex gap-2 items-center'>
                    <div className="flex flex-col justify-center">
                        <p className='p-0 m-0 font-kantumruy-pro font-medium text-sm text-primary'> {data.user.fullname} </p>
                        <p className="p-0 m-0 font-kantumruy-pro text-[9px] font-normal">បង្កើត {formatDate(data.created_at)}</p>
                    </div>
                </div>
                <p className='p-0 m-0 font-kantumruy-pro font-medium text-sm mt-1'> ជម្រើស:
                    <span className='p-0 m-0 font-kantumruy-pro font-normal text-sm'> {data.service_name}</span>
                </p>
            </div>
        </Cards>
    )
}

export default HistoryBookingCard