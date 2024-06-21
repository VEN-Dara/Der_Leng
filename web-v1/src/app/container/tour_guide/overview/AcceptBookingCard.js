import { Button } from "antd";
import { Cards } from "../../../../resource/components/cards/frame/cards-frame";
import DefaultPackageImage from '../../../static/img/default_img/travel-cambodia.png'

function AcceptBookingCard() {
    return (
        <Cards headless size="large" className="mb-[25px] ant-card-body-p-0 p-4">
            <div className='flex border-b border-gray-200 dark:border-white10 pb-2'>
                <div className='flex gap-2 w-full'>
                    <div className='min-h-20 min-w-20 h-20 w-20 rounded-4 overflow-hidden'>
                        <img src={DefaultPackageImage} className='object-cover h-full w-full' />
                    </div>
                    <div className='flex flex-col justify-between'>
                        <p className='p-0 m-0 font-kantumruy-pro font-medium text-sm'>ដំណើរកំសាន្តទៅអង្គរវត្ត</p>
                        <p className='p-0 m-0 font-kantumruy-pro font-normal text-sm'>ចំនួនអ្នកទេសចរ x2</p>
                        <p className='p-0 m-0 font-kantumruy-pro text-sm'> ថ្ងៃទី 12/06/2024</p>
                    </div>
                </div>
                <div className='min-w-[100px] flex flex-col items-end justify-end'>
                    <p className='p-0 m-0 font-kantumruy-pro font-medium text-sm'>សរុប: $45.00</p>
                </div>
            </div>
            <p className='p-0 m-0 font-kantumruy-pro font-medium text-sm mt-1'> ជម្រើស:
                <span className='p-0 m-0 font-kantumruy-pro font-normal text-sm'> ដើរប្រាសាទធំ​ + មធ្យោបាយធ្វើរតំណើរ + បាយថ្ងៃ </span>
            </p>
            <div className='flex justify-between items-center mt-2'>
                <div className='flex gap-2 items-center'>
                    <div className='rounded-full bg-primary border h-6 w-6'></div>
                    <div className="flex flex-col justify-center">
                        <p className='p-0 m-0 font-kantumruy-pro font-medium text-sm text-primary'> vendara </p>
                        <p className="p-0 m-0 font-kantumruy-pro text-[9px] font-normal">បង្កើត 12/04/2024</p>
                    </div>
                </div>
                <div className='flex gap-2'>
                    <Button className=" hover:bg-hbr-danger border-solid border-1 border-danger text-danger bg-transparent  hover:text-white text-[14px] font-meduim font-kantumruy-pro leading-[22px] inline-flex items-center justify-center rounded-[32px] px-4 h-[40px]">
                        បដិសេដ
                    </Button>
                    <Button className="bg-success-transparent hover:bg-hbr-success border-none text-success hover:text-white text-[14px] font-meduim font-kantumruy-pro leading-[22px] inline-flex items-center justify-center rounded-[32px] px-[16px] h-[40px]">
                        ទទួលព្រម
                    </Button>
                </div>
            </div>
        </Cards>
    )
}

export default AcceptBookingCard