import React, { useState } from 'react';
import { Rate } from 'antd';
import UilShoppingBag from '@iconscout/react-unicons/icons/uil-shopping-bag';
import FontAwesome from 'react-fontawesome';
import UilHeart from '@iconscout/react-unicons/icons/uil-heart';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { ReactSVG } from 'react-svg';

// ====================================> Local <====================================
import Heading from '../../../../resource/components/heading/heading';
import { Button } from '../../../../resource/components/buttons/buttons';
import { updateWishList } from '@/resource/redux/product/actionCreator';
import UseFetcher from '../../../hooks/useFetcher';

function ProductCards({ product }) {
  const { id, name, amount_rating, avg_rating, default_price, percentage_discount, favorite, address, thumbnail } = product;
  const dispatch = useDispatch();
  const useFetcher = new UseFetcher();
  const FILE_ENDPOINT = process.env.REACT_APP_FILE_ENDPOINT
  const [stateFavorite, setStateFavorite] = useState(
    {
      isLoading: false,
      data: null,
      message: null, 
      success: false
    }
  )
  const apiUrl = "favorites/"
  const [isFavorite, setIsFavorite] = useState(favorite)

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

  return (
    <div className="relative bg-white dark:bg-white10 mb-[30px] rounded-[10px] shadow-[0_5px_20px_rgba(173,181,217,0,1)]">
      <figure className="mb-0">
        <img className="w-full h-[200px] object-cover rounded-t-[10px]" src={ thumbnail ? `${FILE_ENDPOINT}${thumbnail}` : require(`@/resource/static/img/default_img/travel-cambodia.png`)} alt={`img${id}`} />
      </figure>
      <figcaption className="pt-5 px-5 pb-[26px]">
        <button
          onClick={() => handleFavorite(id)}
          className={` inline-flex items-center justify-center absolute ltr:right-5 rtl:left-5 top-[15px] bg-white dark:bg-white10 w-[34px] h-[34px] rounded-full shadow-[0_5px_10px_rgba(160,160,260,0.13)] ${
            isFavorite ? 'text-danger' : 'text-body dark:text-dark'
          } `}
        >
          {isFavorite ? (
            <ReactSVG src={require(`@/resource/static/img/icon/heart-fill.svg`).default} />
          ) : (
            <UilHeart className="w-[14px] h-[14px]" />
          )}
        </button>
        <Heading className="mb-1 text-lg font-semibold" as="h5">
          <Link
            to={`/tour-service/${id}`}
            className="text-dark hover:text-primary dark:text-white87 hover:dark:text-primary"
          >
            {name}
          </Link>
        </Heading>
        <div className="flex items-center gap-[5px] mb-3 text-xs font-medium text-dark dark:text-white87">
          <Rate
            className="relative -top-[2px] flex items-center ltr:[&>li]:mr-0.5 rtl:[&>li]:ml-0.5 [&>li.ant-rate-star-zero>div>div>span>svg]:text-[#c6d0dc]"
            allowHalf
            defaultValue={avg_rating}
            disabled
          />{' '}
          {Number(avg_rating).toFixed(1)}
          <span className="ltr:ml-1.5 rtl:mr-1.5 text-light dark:text-white60 font-normal"> {amount_rating} Reviews</span>
        </div>
        <p className="flex items-center mb-[5px]">
          <span className="font-semibold text-primary">${(100-percentage_discount) * default_price / 100} </span>
          {parseFloat(percentage_discount) !== 0 && (
            <>
              <del className="mx-[5px] text-light dark:text-white60 text-sm"> ${default_price} </del>
              <span className="text-xs font-medium text-link"> {percentage_discount}% Off</span>
            </>
          )}
        </p>
        <div className='flex'>
          <p
            className="font-kantumruy-pro flex items-center h-[28px] px-2 bg-success text-white dark:text-white87 text-xs font-semibold border-primary overflow-hidden"
          > 
            <FontAwesome name="map" className="w-[14px] h-[14px] ltr:mr-1.5 rtl:ml-1.5" />
            <span className='max-w-[95%] overflow-hidden text-ellipsis whitespace-nowrap'>{address}</span>
          </p>
        </div>

      
        {/* ============================================> Button Buy and Cart <============================================> */}
        {/* <div className="flex items-center flex-wrap -mx-[5px] -mb-[5px]">
          <Button
            size="small"
            className="flex items-center h-[36px] m-[5px] px-5  text-body dark:text-white60 hover:text-primary text-xs font-semibold border-normal hover:border-primary dark:border-white10 hover:dark:border-primary dark:bg-transparent dark:hover:text-primary"
            outlined
          >
            <UilShoppingBag className="w-[14px] h-[14px] ltr:mr-1.5 rtl:ml-1.5" />
            Add To Cart
          </Button>
          <Button
            size="small"
            type="primary"
            className="flex items-center h-[36px] m-[5px] px-5 bg-primary text-white dark:text-white87 text-xs font-semibold border-primary"
          >
            Buy Now
          </Button>
        </div> */}
      </figcaption>
    </div>
  );
}

ProductCards.propTypes = {
  product: PropTypes.object,
};

export default ProductCards;
