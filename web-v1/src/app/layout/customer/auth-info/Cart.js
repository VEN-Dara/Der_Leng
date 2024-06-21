import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom'
import { ReactSVG } from 'react-svg'
import { getCart } from '../../../hooks/Product/useCartFetcher';

function CartBox() {
  const path = "/cart";
  const [state, setState] = useState({
    carts: [],
    isLoader: true
  })
  

  useEffect(() => {
    getCart(setState);
  }, [])

  return (
    <>
      <NavLink to={`${path}`} className="flex w-10 h-10 justify-center items-center relative">
          <ReactSVG
            className={(path !== window.location.pathname) ? "text-[#a0a0a0] dark:text-white60" : "text-primary"}
            src={require('../../../static/img/icon/shopping-cart.svg').default}
            width="20px"
          />
          <p className='absolute right-[0px] rounded-full top-[2px] bg-success h-3 px-[4px] text-white text-[10px] leading-[10px] flex items-center justify-center'>{state.carts.length}</p>
      </NavLink>
    </>
  )
}

export default CartBox;