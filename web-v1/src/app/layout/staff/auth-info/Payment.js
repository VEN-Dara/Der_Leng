import { NavLink } from 'react-router-dom'
import { ReactSVG } from 'react-svg'
import UilWallet from '@iconscout/react-unicons/icons/uil-wallet'

function PaymentBox() {
  const path = "/payment";

  return (
    <>
      <NavLink to={`${path}`} className="flex w-10 h-10 justify-center items-center relative">
          <UilWallet
            className={(path !== window.location.pathname) ? "text-[#a0a0a0] dark:text-white60" : "text-primary"}
            // className="text-[#a0a0a0] dark:text-white60"
            src={require('../../../static/img/icon/shopping-cart.svg').default}
            size="25"
          />
          <p className='absolute right-[0px] rounded-full top-[2px] bg-success h-3 px-[4px] text-white text-[10px] leading-[10px] flex items-center justify-center'>3</p>
      </NavLink>
    </>
  )
}

export default PaymentBox;