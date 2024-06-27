import React, { useState } from 'react';
import { Rate, Row, Col } from 'antd';
import UilShoppingBag from '@iconscout/react-unicons/icons/uil-shopping-bag';
import UilHeart from '@iconscout/react-unicons/icons/uil-heart';
import FontAwesome from 'react-fontawesome';
import { useDispatch } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { ReactSVG } from 'react-svg';

// ====================================> Local <====================================
import Heading from '../../../../resource/components/heading/heading';
import { Button } from '../../../../resource/components/buttons/buttons';
import { updateWishList } from '../../../../resource/redux/product/actionCreator';
import UseFetcher from '../../../hooks/useFetcher';

const ProductCardsList = React.memo(({ product }) => {
  const { id, name, amount_rating, avg_rating, default_price, percentage_discount, address, thumbnail, description, favorite } = product;
  const dispatch = useDispatch();
  const FILE_ENDPOINT = process.env.REACT_APP_FILE_ENDPOINT
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
  const [isFavorite, setIsFavorite] = useState(favorite)

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
    <div className="list-view" style={{ marginBottom: 20 }}>
      <div className="bg-white dark:bg-white10 p-5 rounded-[10px]">
        <Row gutter={15}>
          <Col md={6} xs={24}>
            <figure className="ltr:mr-[15px] rtl:ml-[15px] mb-0">
              <img className="w-full h-[200px] object-cover rounded-10" src={thumbnail ? `${FILE_ENDPOINT}${thumbnail}` : require(`@/app/static/img/default_img/travel-cambodia.png`)} alt={`img${id}`} />
            </figure>
          </Col>
          <Col md={12} xs={24}>
            <div className="product-single-description">
              <Heading className="mt-4 mb-3 text-lg font-semibold" as="h5">
                <NavLink
                  to={`/tour-service/${id}`}
                  className="text-dark hover:text-primary dark:text-white87 hover:dark:text-primary"
                >
                  {name}
                </NavLink>
              </Heading>
              <div className='overflow-hidden max-h-[112px]'>
                <p className="text-body dark:text-white60 text-[15px] overflow-hidden line-clamp-4">{description}</p>
              </div>
              <div className='flex'>
                <p
                  className="font-kantumruy-pro flex items-center h-[28px] px-2 bg-success text-white dark:text-white87 text-xs font-semibold border-primary overflow-hidden"
                >
                  <FontAwesome name="map" className="w-[14px] h-[14px] ltr:mr-1.5 rtl:ml-1.5" />
                  <span className='max-w-[95%] overflow-hidden text-ellipsis whitespace-nowrap'>{address}</span>
                </p>
              </div>
            </div>
          </Col>
          <Col md={6} xs={24}>
            <div className="mt-[25px]">
              <button
                onClick={() => handleFavorite(id)}
                className={` inline-flex items-center justify-center absolute min-3xl:ltr:right-5 min-3xl:rtl:left-5 ltr:right-0 rtl:left-0  min-3xl:top-[15px] top-0 bg-white dark:bg-white10 w-[34px] h-[34px] rounded-full shadow-[0_5px_10px_rgba(160,160,260,0.13)] ${isFavorite ? 'text-danger' : 'text-body dark:text-white60'
                  } `}
              >
                {isFavorite ? (
                  <ReactSVG src={require(`@/resource/static/img/icon/heart-fill.svg`).default} />
                ) : (
                  <UilHeart className="w-[14px] h-[14px]" />
                )}
              </button>
              <p className="flex items-center mb-[5px] flex-wrap gap-y-[5px] text-4xl">
                <span className="font-semibold text-primary">${(100 - percentage_discount) * default_price / 100}</span>
                {parseFloat(percentage_discount) !== 0 && (
                  <>
                    <del className="mx-[5px] text-light dark:text-white60 text-sm"> ${default_price} </del>
                    <span className="text-xs font-medium text-link"> {percentage_discount}% Off</span>
                  </>
                )}
              </p>
              <div className="flex items-center 3xl:flex-wrap 3xl:gap-[5px] mb-3 text-xs font-medium text-dark dark:text-white87">
                <Rate
                  className="relative -top-[2px] ltr:mr-[5px] rtl:ml-[5px] ltr:[&>li]:mr-0.5 rtl:[&>li]:ml-0.5"
                  allowHalf
                  defaultValue={avg_rating}
                  disabled
                />{' '}
                {Number(avg_rating).toFixed(1)}
                <span className="ltr:ml-1.5 rtl:mr-1.5 text-light dark:text-white60 font-normal"> {amount_rating} Reviews</span>
              </div>

              {/* ====================================> Buy and Add to Cart Btn <=============================== */}
              {/* <div className="flex items-start flex-col mt-5 -mx-[5px] -mb-[5px]">
                <Button
                  size="small"
                  type="white"
                  className="flex items-center h-[36px] m-[5px] px-5  text-body dark:text-white60 hover:text-primary text-xs font-semibold border-normal hover:border-primary dark:border-white10 hover:dark:border-primary dark:bg-transparent dark:hover:text-primary"
                  outlined
                >
                  <UilShoppingBag className="w-[14px] h-[14px] ltr:mr-1.5 rtl:ml-1.5" />
                  Add To Cart
                </Button>
                <Button
                  size="small"
                  type="primary"
                  className="flex items-center text-center justify-center min-w-[132px] h-[36px] m-[5px] px-6 bg-primary text-white dark:text-white87 text-xs font-semibold border-primary"
                >
                  Buy Now
                </Button>
              </div> */}
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
});

ProductCardsList.propTypes = {
  product: PropTypes.object,
};

export default ProductCardsList;
