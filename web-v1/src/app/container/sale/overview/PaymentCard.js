import { Radio } from 'antd'

import masterImage from '../../../static/img/creditCard/master.png';
import visaImage from '../../../static/img/creditCard/visa.png';
import unionpayImage from '../../../static/img/creditCard/unionpay.png';

const cardImages = {
    mastercard: masterImage,
    visa: visaImage,
    unionpay: unionpayImage,
};

const PaymentCard = ({creditCard, isSelected=false}) => {
    const { id, last4, brand, expMonth, expYear } = creditCard;
    return (
        <Radio
            checked={isSelected}
            value={JSON.stringify({ id, last4, brand, expMonth, expYear })}
            style={{ width: '100%' }}
            className="ltr:[&>span.ant-radio]:mr-[15px] [&>span:not(.ant-radio)]:max-w-[407px] rtl:[&>span.ant-radio]:ml-[15px] [&>span:not(.ant-radio)]:flex [&>span:not(.ant-radio)]:items-center [&>span:not(.ant-radio)]:justify-between [&>span:not(.ant-radio)]:w-full [&>span:not(.ant-radio)]:h-[60px] [&>span:not(.ant-radio)]:px-[25px] [&>span:not(.ant-radio)]:sm:px-[10px] [&>span:not(.ant-radio)]:text-body dark:[&>span:not(.ant-radio)]:text-white60 [&>span:not(.ant-radio)]:text-[15px] [&>span:not(.ant-radio)]:font-medium [&>span:not(.ant-radio)]:border [&>span:not(.ant-radio)]:border-primary dark:[&>span:not(.ant-radio)]:border-white10 [&>span:not(.ant-radio)]:rounded-[10px]"
        >   
            <div className='text-body dark:text-white60 text-[15px] font-medium flex items-center gap-2 h-6 overflow-hidden'>
                <span className='sm:hidden'>**** **** ****</span> {last4}
                <img className="xs:hidden h-8" src={cardImages[`${brand.toLowerCase()}`] ? cardImages[`${brand.toLowerCase()}`] : cardImages[`visa`]} alt="credit card" />
            </div>
            <p className='m-0 text-[12px] font-[400]'>
                Exp: {expMonth}/{expYear}
            </p>
        </Radio>
    )
}

export default PaymentCard;