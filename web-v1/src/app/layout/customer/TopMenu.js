import React, { useEffect, useLayoutEffect, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
// import {
//   UilEnvelope,
//   UilChat,
//   UilShoppingCart,
//   Uil500px,
//   UilBagAlt,
//   UilCalendarAlt,
//   UilUsersAlt,
//   UilAt,
//   UilClipboardAlt,
//   // UilExpandArrowsAlt,
//   UilCheckSquare,
//   UilExchange,
//   UilFile,
//   UilHeadphones,
//   UilChartBar,
//   UilCompactDisc,
//   UilTable,
//   UilSquareFull,
//   UilApps,
//   UilEdit,
//   UilMap,
// } from '@iconscout/react-unicons';
import { TopMenuStyle } from './Style';
import { DataService } from '../../config/dataService/dataService';
import { useDispatch, useSelector } from 'react-redux';
import { changeMenuMode } from '../../redux/themeLayout/actionCreator';

function TopMenu() {
  const [categories, setCategories] = useState(null)
  const dispatch = useDispatch();
  const { topMenu } = useSelector((state) => {
    return {
      topMenu: state.ChangeLayoutMode.topMenu,
    };
  });
  const path = '/category';

  useLayoutEffect(() => {
    const active = document.querySelector('.hexadash-top-menu a.active');
    const activeDefault = () => {
      const megaMenu = active.closest('.megaMenu-wrapper');
      const hasSubMenuLeft = active.closest('.has-subMenu-left');
      if (!megaMenu) {
        active.closest('ul').previousSibling.classList.add('active');
        if (hasSubMenuLeft) hasSubMenuLeft.closest('ul').previousSibling.classList.add('active');
      } else {
        active.closest('.megaMenu-wrapper').previousSibling.classList.add('active');
      }
    };
    window.addEventListener('load', active && activeDefault);
    
    // :: Add layout mode ::
    const setNavbarTopMenu = () => {
      if(!topMenu) {
        const html = document.querySelector('html');
        html.classList.add('hexadash-topmenu');
        dispatch(changeMenuMode(true));
      }
    };
    setNavbarTopMenu();

    return () => window.removeEventListener('load', activeDefault);
  }, []);

  const addParentActive = (event) => {
    document.querySelectorAll('.parent').forEach((element) => {
      element.classList.remove('active');
    });

    const hasSubMenuLeft = event.currentTarget.closest('.has-subMenu-left');
    const megaMenu = event.currentTarget.closest('.megaMenu-wrapper');
    if (!megaMenu) {
      event.currentTarget.closest('ul').previousSibling.classList.add('active');
      if (hasSubMenuLeft) hasSubMenuLeft.closest('ul').previousSibling.classList.add('active');
    } else {
      event.currentTarget.closest('.megaMenu-wrapper').previousSibling.classList.add('active');
    }
  };

  useEffect(() => {
    const listCetegory = async () => {
      try {
        const response = await DataService.get("/categories")
        setCategories(response.data.results)
      } catch (error) {
        console.log("Error category..")
      }
    } 

    listCetegory();

  }, [])
  return (
    <TopMenuStyle>
      <div className="hexadash-top-menu ltr:pl-[20px] rtl:pr-[20px] xl:ltr:pl-[10px] xl:rtl:pr-[10px]">
        <ul>
          <li className="has-subMenu">
            <Link to="#" className="parent">
              ប្រភេទទេសចរណ៍
            </Link>
            {
              !categories ? (
                <ul className='subMenu w-[600px] md:w-[200px] h-[200px] flex items-center justify-center'>
                  មិនមានប្រភេទទេសចរណ៍ទេ☹️
                </ul>
              ) : (
                <ul className="subMenu w-[600px] md:w-[200px] grid grid-cols-3 md:grid-cols-1">
                  {
                    categories.map((category) => (
                      <li key={category.id}>
                        <NavLink to={`${path}/${category.name}`} onClick={addParentActive} className="font-medium" >
                          {category.kh_name}
                        </NavLink>
                      </li>
                    ))
                  }
                </ul>
              )
            }
          </li>
        </ul>
      </div>
    </TopMenuStyle>
  );
}

export default TopMenu;
