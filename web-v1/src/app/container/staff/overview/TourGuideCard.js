import { Button, Spin } from "antd";
import { Cards } from "../../../../resource/components/cards/frame/cards-frame";
import DefaultPackageImage from '../../../static/img/default_img/travel-cambodia.png'
import { formatDate } from "../../../utility/format-function/date";
import { Link } from "react-router-dom";

function TourGuideCard({data, handleAcceptRegistration, handleRejectRegistration, btnLoading}) {
    const FILE_ENDPOINT = process.env.REACT_APP_FILE_ENDPOINT;

    return (
        <Cards headless size="large" className="mb-[12px] ant-card-body-p-0 p-6">
            <div className='flex flex-col min-md:flex-row gap-4 justify-between items-center'>
                <div className='flex gap-2 w-full min-md:w-[58%] overflow-hidden'>
                    <div className='min-h-20 min-w-20 h-20 w-20 rounded-4'>
                        <img src={ data.profile_image ? `${FILE_ENDPOINT}${data.profile_image}` : DefaultPackageImage} className='object-cover h-full w-full' />
                    </div>
                    <div className='flex flex-col justify-start min-md:justify-between'>
                        <p className='p-0 m-0 font-kantumruy-pro text-primary font-semibold text-base'>{data.fullname_khmer} {data.fullname_english}</p>
                        <p className='p-0 m-0 font-kantumruy-pro font-normal text-base'>{data.phone} • {data.email}</p>
                        <p className='p-0 m-0 hidden min-md:block font-kantumruy-pro font-normal text-base'>
                            ទីតាំង: {data.address}
                            <a className="text-success" target="_blank"  href={data.location_url}>🗺️Google Map</a>
                        </p>
                    </div>
                </div>
                <p className='p-0 m-0 min-md:hidden font-kantumruy-pro font-normal text-base'>
                    ទីតាំង: {data.address}
                    <a
                        href={data.location_url}
                        target="_blank"
                        className="font-semibold"
                        >
                        🗺️ Google Map
                    </a>
                </p>
                <a
                    href={data.cv}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold h-7 text-sm p-1 px-4 rounded-4 bg-slate-800 text-white"
                >
                    Read CV
                </a>
                <div className='min-w-[100px] flex flex-col items-center justify-between'>
                    <div className='flex gap-2'>
                        <Button className="min-w-[70px] hover:bg-hbr-danger border-solid border-1 border-danger text-danger bg-transparent  hover:text-white text-[14px] font-meduim font-kantumruy-pro leading-[22px] inline-flex items-center justify-center rounded-[32px] px-4 h-[40px]"
                            onClick={() => {handleRejectRegistration(data.id)}}
                            >
                            {false ? <Spin size="small" ></Spin> : 'បដិសេដ'}
                        </Button>
                        <Button className="min-w-[75px] bg-success-transparent hover:bg-hbr-success border-none text-success hover:text-white text-[14px] font-meduim font-kantumruy-pro leading-[22px] inline-flex items-center justify-center rounded-[32px] px-[16px] h-[40px]"
                            onClick={() => {handleAcceptRegistration(data.id)}}
                        >
                            {false ? <Spin size="small" ></Spin> : 'ទទួលព្រម'}
                        </Button>
                    </div>
                </div>
            </div>
        </Cards>
    )
}

export default TourGuideCard