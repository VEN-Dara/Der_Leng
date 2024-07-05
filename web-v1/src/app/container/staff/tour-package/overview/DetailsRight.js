import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import { ReactSVG } from 'react-svg';

// ==============================> Library <==============================
import { Rate, DatePicker, Select, message, notification } from 'antd';
import moment from 'moment';
import UilHeart from '@iconscout/react-unicons/icons/uil-heart';
import UilShareAlt from '@iconscout/react-unicons/icons/uil-share-alt';
import UilShoppingBag from '@iconscout/react-unicons/icons/uil-shopping-bag';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import UilTrashAlt from '@iconscout/react-unicons/icons/uil-trash-alt';

// =============================================> Local <====================================
import Heading from '@/resource/components/heading/heading';
import { updateWishList } from '@/resource/redux/product/actionCreator';
import { Button } from '@/resource/components/buttons/buttons';
import { postCart } from '../../../../hooks/Product/useCartFetcher';
import UseFetcher from '../../../../hooks/useFetcher';
import ApiService from '../../../../config/api/apiService';
import { alertModal } from '../../../../../resource/components/modals/antd-modals';

const { Option, OptGroup } = Select;

const DetailsRight = React.memo(({ product }) => {
  const [state, setState] = useState({
    customer_amount: 1,
    service: null,
    booking_date: null
  });  

  const { id, name, description, percentage_discount, tour_place_coordinate, address, video_url, is_close, create_at, category, user, package_image, package_schedule, package_service, avg_rating, amount_rating } = product;
  const { customer_amount } = state;
  const [showPrice, setShowPrice] = useState(package_service[0].price)
  const [serviceData, setServiceData] = useState(package_service || [])

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
    setState({ ...state, service})
    const serviceObj = package_service.find(service_obj => service_obj.id === service)
    setShowPrice(serviceObj.price)
  };

  const addToCard = () => {
    if(state.service===null) {
      message.error('Please select tour service.');
      scrollToSection(bookingElementRef);
      return
    }
    if(state.booking_date===null) {
      message.error('Please select booking date.');
      return
    }
    if(state.customer_amount===0) {
      message.error('Please tourist can not be 0.');
      return
    }
    postCart(state) && openSuccessCartNotification();
  }

  function disabledDate(current) {
    return current && current < moment().startOf('day');
  }

  const openSuccessCartNotification = () => {
    notification.open({
      message: 'Package added to cart',
      icon: <ReactSVG src={require('@/resource/static/img/icon/shopping-cart.svg').default} className='text-green-400 mt-[1px]' width="12px"/>,

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
  const api = new ApiService()

  const handleFavorite = (package_id) => {
    if(isFavorite) {
      setIsFavorite(false)
      removeFromFavorite(package_id);
      return
    }
    
    setIsFavorite(true)
    addToFavorite(package_id);
  }
  
  const addToFavorite = (package_id) => {
    const data = {package: package_id};
    useFetcher.post(apiUrl, setStateFavorite, data);
  }

  const removeFromFavorite = (package_id) => {
    const data = {package: package_id};
    useFetcher.put(apiUrl, setStateFavorite, data);
  }

  const removeService = async (service_id) => {
    alertModal.confirm({
      title: 'តើអ្នកពិតជាចង់លុបសេវាកម្មនេះមែនទេ?',
      content: '',
      className: 'font-kantumruy-pro',
      okText: 'បាទ, ចាស',
      okType: 'danger',
      cancelText: 'ទេ អរគុណ',
      async onOk() {
        try {
          const response = await api.delete(`/package-services/${service_id}/`);
          setServiceData(serviceData.filter(s => s.id != service_id));
        } catch (error) {
          console.log(error.response)
        }
      },
      onCancel() { }
    });
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
      <span className="inline-block ltr:mr-1 ltr:ml-2 rtl:ml-1 rtl:mr-2 text-dark dark:text-white87 text-[15px] font-semibold">
        {Number(avg_rating).toFixed(1)}
      </span>
      <span className="font-normal text-light dark:text-white60"> {amount_rating} Reviews</span>
      <p ref={bookingElementRef} >
        <span className="inline-block ltr:mr-1.5 rtl:ml-1.5 mb-2 text-light dark:text-white60 text-[13px]">
          Tour Guide
        </span>
        <span className="text-dark dark:text-white87 text-[13px] font-medium">{user.fullname}</span>
      </p>
      <Heading className="text-dark dark:text-white87 mt-[18px] mb-2 text-[22px] font-medium" as="h3">
        <span className="text-sm text-light dark:text-white60">$</span>
        <span>{(100 - percentage_discount) / 100 * showPrice}</span>
      </Heading>
      {parseFloat(percentage_discount) !== 0 && (
        <Heading className="text-dark dark:text-white87 mb-[22px] font-semibold inline-flex items-center" as="h6">
          <del className="text-base font-normal text-light dark:text-white60">${showPrice}</del>{' '}
          <span className="inline-block text-xs ltr:ml-2 rtl:mr-2 text-primary">{percentage_discount}% Off</span>
        </Heading>
      )}
      <p className="max-w-[580px] mb-2 text-body dark:text-white60 text-[15px]">{description}</p>
      <div className="mt-[25px]">
        <p className="my-[30px] text-body dark:text-white60 flex flex-col gap-1">
          <span className="mr-[30px] text-secondary dark:text-white87 font-medium">សេវាកម្ម:</span>
          {
            serviceData && serviceData.map(service => (
              <div key={service.id} className='flex gap-2 items-center mb-2'>
              <div className='flex flex-grow-0 justify-between border border-primary border-dashed hover:text-primary rounded-lg p-2 px-4 w-[80%] min-md:w-[380px] font-medium'>
                <p className='m-0 w-[70%] min-md:w-[85%] whitespace-nowrap overflow-hidden text-ellipsis'>{service.detail}</p>
                <p className='m-0'>$ {service.price}</p>            
              </div>
              <div className='h-[36px] w-[36px]'>
                <Button
                  onClick={() => removeService(service.id)}
                  className="bg-gray-100 dark:bg-white10 h-[36px] w-[36px] mb-6 px-[11px] text-body dark:text-white60 border-none shadow-none hover:bg-danger-transparent hover:text-danger"
                  to="#"
                  size="default"
                  type="danger"
                  shape="circle"
                  transparented
                  disabled = {serviceData?.length === 1}
                >
                  <UilTrashAlt className="w-[14px] h-[14px]" />
                </Button>
              </div>
              </div>
            ))
          }
        </p>
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
