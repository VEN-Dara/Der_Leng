import React, { useRef, useState } from 'react';
import { ReactSVG } from 'react-svg';

// ==============================> Library <==============================
import { Rate, DatePicker, Select, message, notification } from 'antd';
import moment from 'moment';
import UilHeart from '@iconscout/react-unicons/icons/uil-heart';
import UilShoppingBag from '@iconscout/react-unicons/icons/uil-shopping-bag';
import PropTypes from 'prop-types';

// =============================================> Local <====================================
import Heading from '@/resource/components/heading/heading';
import { Button } from '@/resource/components/buttons/buttons';
import { postCart } from '../../../hooks/Product/useCartFetcher';
import UseFetcher from '../../../hooks/useFetcher';
import { Link } from 'react-router-dom';

const { Option } = Select;

const DetailsRight = React.memo(({ product }) => {
  const [state, setState] = useState({
    customer_amount: 1,
    service: product.package_service[0].id,
    booking_date: null
  });

  const { id, name, description, percentage_discount, tour_place_coordinate, address, video_url, is_close, create_at, category, user, package_image, package_schedule, package_service, avg_rating, amount_rating, unavailable_dates } = product;
  const { customer_amount } = state;
  const [showPrice, setShowPrice] = useState(package_service[0].price)

  const incrementCustomer_amount = (e) => {
    e.preventDefault();
    setState({
      ...state,
      customer_amount: customer_amount + 1,
    });
  };

  const decrementCustomer_amount = (e) => {
    e.preventDefault();
    if (customer_amount !== 1)
      setState({
        ...state,
        customer_amount: customer_amount - 1,
      });
  };

  // =================================> Date Picker Properties <=================================
  const onDateChange = (dateString) => {
    setState({ ...state, booking_date: dateString })
  };

  const onServiceChange = (service) => {
    setState({ ...state, service })
    const serviceObj = package_service.find(service_obj => service_obj.id === service)
    setShowPrice(serviceObj.price)
  };

  const addToCard = () => {
    console.log(state.booking_date)
    // return
    if (state.service === null) {
      message.warning('សូមជ្រើសរើសសេវាកម្មទេសចរណ៍!');
      scrollToSection(bookingElementRef);
      return
    }
    if (state.booking_date === null) {
      message.warning('សូមជ្រើសរើសកាលបរិច្ឆេទកក់!');
      return
    }
    if (state.customer_amount === 0) {
      message.warning('ចំនួនភ្ញៀវទេសចរណ៍មិនអាច 0!');
      return
    }
    // if (product?.max_daily_bookings === 0) {
    //   message.warning('កញ្ចប់នេះអស់សេវាកម្មសម្រាប់ថ្ងៃនេះ!');
    //   return
    // }

    postCart(state) && openSuccessCartNotification();
  }

  function disabledDate(current) {
    // Disable dates in the past and today
    if (current && (current <  moment().endOf('day'))) {
      return true;
    }
  
    // Disable specific dates from unavailable_dates
    const disabledDates = unavailable_dates.map(item => moment(item.date).startOf('day'));
    const isUnavailable = disabledDates.some(date => date.isSame(current, 'day'))
    // const dateString = current.format('YYYY-MM-DD');
    // const isUnavailable = unavailable_dates.some(date => date.date === dateString);
  
    return isUnavailable;
  }

  const openSuccessCartNotification = () => {
    notification.open({
      message: 'Package added to cart',
      icon: <ReactSVG src={require('@/resource/static/img/icon/shopping-cart.svg').default} className='text-green-400 mt-[1px]' width="12px" />,

    });
  };

  // ================> Function to scroll to a specific content section <================
  const bookingElementRef = useRef(null);

  const scrollToSection = (ref) => {
    ref.current.scrollIntoView({ behavior: 'smooth' });
  };

  // ================> Favirite <================
  const useFetcher = new UseFetcher();
  const [stateFavorite, setStateFavorite] = useState(
    {
      isLoading: false,
      data: null,
      message: null,
      success: false
    }
  )
  const apiUrl = "favorites/"
  const [isFavorite, setIsFavorite] = useState(product.favorite)

  const handleFavorite = (package_id) => {
    if (isFavorite) {
      setIsFavorite(false)
      removeFromFavorite(package_id);
      return
    }

    setIsFavorite(true)
    addToFavorite(package_id);
  }

  const addToFavorite = (package_id) => {
    const data = { package: package_id };
    useFetcher.post(apiUrl, setStateFavorite, data);
  }

  const removeFromFavorite = (package_id) => {
    const data = { package: package_id };
    useFetcher.put(apiUrl, setStateFavorite, data);
  }

  return (
    <div>
      <Heading
        className="text-dark dark:text-white87 text-3xl lg:text-[26px] sm:text-2xl font-semibold"
        as="h1"
      >
        {name}
      </Heading>
      <Rate className="relative -top-[3px] [&>li]:mr-0.5" allowHalf defaultValue={avg_rating} disabled />
      <span className="inline-block ltr:mr-1 ltr:ml-2 rtl:ml-1 rtl:mr-2 text-dark dark:text-white87 text-base font-semibold">
        {Number(avg_rating).toFixed(1)}
      </span>
      <span className="font-normal text-light dark:text-white60"> {amount_rating} នៃការវាយតម្លៃ</span>
      <p ref={bookingElementRef} className='my-1' >
        <span className="inline-block ltr:mr-1.5 rtl:ml-1.5 text-light dark:text-white60 text-base">
        ម​គ្គុ​ទេស​ក៍​ទេសចរណ៍
        </span>
        <span className="text-dark dark:text-white87 text-base font-medium">{user.fullname}</span>
      </p>
      <Link to={`${product.location_url}`} target='_blank'>
        <span className="inline-block ltr:mr-1.5 rtl:ml-1.5 mb-2 text-light dark:text-white60 text-base">
        🗺️ទីតាំង
        </span>
        <span className="text-primary hover:underline text-base font-medium">{product.address} </span>
      </Link>
      <Heading className="text-dark dark:text-white87 mt-[18px] mb-2 text-2xl font-medium" as="h3">
        <span className="text-base text-light dark:text-white60">$</span>
        <span>{(100 - percentage_discount) / 100 * showPrice}</span>
      </Heading>
      {parseFloat(percentage_discount) !== 0 && (
        <Heading className="text-dark dark:text-white87 mb-[22px] font-semibold inline-flex items-center" as="h6">
          <del className="text-base font-medium text-light dark:text-white60">${showPrice}</del>{' '}
          <span className="inline-block text-base ltr:ml-2 rtl:mr-2 text-primary">{percentage_discount}% Off</span>
        </Heading>
      )}
      <p className="max-w-[580px] mb-2 text-body dark:text-white60 text-[15px]">{description}</p>
      <div className="mt-[25px]">
        <p className="my-[30px] text-body dark:text-white60 flex flex-col gap-1">
          <span className="mr-[30px] text-secondary dark:text-white87 font-medium">សេវាកម្ម:</span>
          <Select
            className="[&>div]:border-normal w-[287px] dark:[&>div]:border-white10 [&>div]:rounded-6 [&>.ant-select-arrow]:text-theme-gray dark:[&>.ant-select-arrow]:text-white60 [&>div>div>div>span]:bg-transparent [&>div]:h-[38px] [&>div>div>div>span]:items-center [&>div>.ant-select-selection-item]:flex [&>div>.ant-select-selection-item]:items-center dark:[&>div>.ant-select-selection-item]:text-white60"
            defaultValue={package_service[0].id}
            onChange={onServiceChange}
            style={{ width: 120 }}
          >
            {
              package_service.map((service) => {
                return (
                  <Option value={service.id} key={service.id} disabled={service.is_close} >{service.detail} {`${service.price}${service.currency === "usd" ? "$" : service.currency}`}</Option>
                )
              })
            }
          </Select>
        </p>
        <p className=" text-body dark:text-white60 flex flex-col gap-1">
          <span className="mr-[30px] text-secondary dark:text-white87 font-medium">កាលបរិច្ឆេទកក់:</span>
          <DatePicker onChange={onDateChange} disabledDate={disabledDate} className='w-[287px]' />
        </p>
        <p className="my-[30px] text-body dark:text-white60">
          <span className="mr-[30px] text-secondary dark:text-white87 font-medium">ចំនួនភ្ញៀវទេសចរ:</span>

          { product?.charge_type?.name === "flat rate"  ? (
          <>
            <span className="-ml-4 text-light dark:text-white60 text-base font-medium">គិតតម្លៃម៉ៅ សម្រាប់អ្នកទេសចរ {product.max_people} នាក់</span>
          </>) : (
          <>
          <Button
            className="w-[38px] h-[38px] bg-section dark:bg-white10 mr-[15px] p-x-3 text-sm text-body dark:text-white60 font-semibold border-none rounded-[10px]"
            onClick={decrementCustomer_amount}
            type="default"
          >
            -
          </Button>
          {customer_amount}
          <Button
            className="w-[38px] h-[38px] bg-section dark:bg-white10 ml-[15px] p-x-3 text-sm text-body dark:text-white60 font-semibold border-none rounded-[10px]"
            onClick={incrementCustomer_amount}
            type="default"
            disabled={customer_amount >= product.max_people}
          >
            +
          </Button>
          <span className="ml-[15px] text-light dark:text-white60 text-base">អ្នកទេសចរ (ច្រើន​បំផុត {product.max_people} នាក់)</span>
          </>) }

        </p>
      </div>
      <div className="flex items-center flex-wrap mb-7 pb-[30px] border-b border-regular dark:border-white10 gap-[10px]">
        <div className="flex flex-wrap items-center gap-[10px]">
          <Button
            size="small"
            type="white"
            className="flex items-center gap-[6px] h-[44px] px-[30px] bg-secondary text-white dark:text-white87 text-sm font-semibold border-secondary rounded-[6px]"
            outlined
            onClick={addToCard}
          >
            <UilShoppingBag className="w-[14px] h-[14px]" />
            បញ្ចូលទៅក្នុងកន្ត្រក
          </Button>

          <Button
            onClick={() => handleFavorite(id)}
            className={` inline-flex items-center justify-center bg-gray-200 hover:bg-gray-300 dark:bg-white10 w-[40px] h-[40px] ltr:mr-[10px] rtl:ml-[10px] border-none rounded-full shadow-[0_5px_10px_rgba(160,160,260,0.13)] dark:shadow-[0_5px_30px_rgba(1,4,19,.60)] ${false ? 'text-danger' : 'text-body dark:text-white60'
              } `}
            size="default"
            raised
            type="white"
            shape="circle"
          >
            {isFavorite ? (
              <ReactSVG src={require(`@/resource/static/img/icon/heart-fill.svg`).default} />
            ) : (
              <UilHeart className="w-[14px] h-[14px]" />
            )}
          </Button>
        </div>
      </div>
      <ul className="mb-[10px]">
        <li>
          <span className="ltr:mr-[10px] rtl:ml-[10px] text-dark dark:text-white87 font-medium min-w-[66px] inline-block">
            Category:
          </span>
          <span className="text-body dark:text-white60">{category?.name || "None"}</span>
        </li>
        <li>
          <p className="mb-1 text-body dark:text-white60">
            <span className="mr-[10px] text-dark dark:text-white87 font-medium">Status:</span>
            <span className={`font-medium ${!is_close ? `text-success` : `text-danger`} `}>{!is_close ? `active` : `inactive`}</span>
          </p>
        </li>
      </ul>
    </div>
  );
});

DetailsRight.propTypes = {
  product: PropTypes.object,
};

export default DetailsRight;
