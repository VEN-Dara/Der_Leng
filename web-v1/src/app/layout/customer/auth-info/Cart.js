import { NavLink } from 'react-router-dom'
import { ReactSVG } from 'react-svg'

function CartBox() {
  const path = "/cart";

  return (
    <>
      <NavLink to={`${path}`} className="flex w-10 h-10 justify-center items-center relative">
          <ReactSVG
            className={`${(path !== window.location.pathname) ? "text-[#a0a0a0] dark:text-white60" : "text-primary"} flex relative before:absolute before:bg-success before:w-1.5 before:h-1.5 before:rounded-full before:-top-1 before:right-0 before:shadow-dot`}
            src={require('../../../static/img/icon/shopping-cart.svg').default}
            width="20px"
          />
      </NavLink>
    </>
  )
}

export default CartBox;