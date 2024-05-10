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
import { DataService } from '../config/dataService/dataService';

function TopMenu() {
  const [categories, setCategories] = useState(null)
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
              Categories
            </Link>
            {
              !categories ? (
                <ul className='subMenu w-[600px] md:w-[200px] h-[200px] flex items-center justify-center'>
                  No categories☹️
                </ul>
              ) : (
                <ul className="subMenu w-[600px] md:w-[200px] grid grid-cols-3 md:grid-cols-1">
                  {
                    categories.map((category) => (
                      <li key={category.id}>
                        <NavLink to={`${path}/${category.name}`} onClick={addParentActive}>
                          {category.name}
                        </NavLink>
                      </li>
                    ))
                  }
                </ul>
              )
            }
          </li>

          {/* <li className="mega-item has-subMenu">
            <Link to="#" className="parent">
              Categories
            </Link>
            <ul className="megaMenu-wrapper megaMenu-small">
              <li>
                <ul>
                  <li>
                    <NavLink onClick={addParentActive} to={`${path}/settings`}>
                      Settings
                    </NavLink>
                  </li>
                  <li>
                    <NavLink onClick={addParentActive} to={`${path}/gallery`}>
                      Gallery
                    </NavLink>
                  </li>
                  <li>
                    <NavLink onClick={addParentActive} to={`${path}/pricing`}>
                      Pricing
                    </NavLink>
                  </li>
                  <li>
                    <NavLink onClick={addParentActive} to={`${path}/banners`}>
                      Banners
                    </NavLink>
                  </li>
                  <li>
                    <NavLink onClick={addParentActive} to={`${path}/testimonials`}>
                      Testimonials
                    </NavLink>
                  </li>
                  <li>
                    <NavLink onClick={addParentActive} to={`${path}/faq`}>
                      Faq`s
                    </NavLink>
                  </li>
                  <li>
                    <NavLink onClick={addParentActive} to={`${path}/pages/search`}>
                      Search Results
                    </NavLink>
                  </li>
                </ul>
              </li>
              <li>
                <ul>
                  <li>
                    <NavLink onClick={addParentActive} to={`${path}pages//starter`}>
                      Blank Page
                    </NavLink>
                  </li>
                  <li>
                    <NavLink onClick={addParentActive} to={`${path}/pages/maintenance`}>
                      Maintenance
                    </NavLink>
                  </li>

                  <li>
                    <NavLink onClick={addParentActive} to={`${path}/pages/404`}>
                      404
                    </NavLink>
                  </li>
                  <li>
                    <NavLink onClick={addParentActive} to={`${path}/pages/comingSoon`}>
                      Coming Soon
                    </NavLink>
                  </li>
                  <li>
                    <NavLink onClick={addParentActive} to={`${path}/pages/termCondition`}>
                      Terms & Conditions
                    </NavLink>
                  </li>
                  <li>
                    <NavLink onClick={addParentActive} to={`${path}/pages/changelog`}>
                      Changelog
                    </NavLink>
                  </li>
                </ul>
              </li>
              <li>
                <ul>
                  <li>
                    <NavLink onClick={addParentActive} to={`${path}/knowledgebase/plugins`}>
                      Knowledgebase
                    </NavLink>
                  </li>
                  <li>
                    <NavLink onClick={addParentActive} to={`${path}/all-articles`}>
                      All Article
                    </NavLink>
                  </li>
                  <li>
                    <NavLink onClick={addParentActive} to={`${path}/knowledgebaseSingle/1`}>
                      Single Article
                    </NavLink>
                  </li>
                  <li>
                    <NavLink onClick={addParentActive} to={`${path}/pages/blog/blogone`}>
                      Blog One
                    </NavLink>
                  </li>
                  <li>
                    <NavLink onClick={addParentActive} to={`${path}/pages/blog/blogtwo`}>
                      Blog Two
                    </NavLink>
                  </li>
                  <li>
                    <NavLink onClick={addParentActive} to={`${path}/pages/blog/blogthree`}>
                      Blog Three
                    </NavLink>
                  </li>
                  <li>
                    <NavLink onClick={addParentActive} to={`${path}/pages/blog/details`}>
                      Blog Details
                    </NavLink>
                  </li>
                </ul>
              </li>
            </ul>
          </li> */}
          
        </ul>
      </div>
    </TopMenuStyle>
  );
}

export default TopMenu;
