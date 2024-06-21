import {
  UilCreateDashboard,
  UilSetting,
  UilBell,
  UilArchive,
  UilBox,
  UilCube,
  UilStar,
  UilDollarSign
} from '@iconscout/react-unicons';
import { Menu } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import UilEllipsisV from '@iconscout/react-unicons/icons/uil-ellipsis-v';
import propTypes from 'prop-types';
import { NavTitle } from './Style';
import versions from '../../../resource/demoData/changelog.json';
import { changeDirectionMode, changeLayoutMode, changeMenuMode } from '../../../resource/redux/themeLayout/actionCreator';

function MenuItems({ toggleCollapsed }) {
  const { t } = useTranslation();

  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }

  const { topMenu } = useSelector((state) => {
    return {
      topMenu: state.ChangeLayoutMode.topMenu,
    };
  });

  const dispatch = useDispatch();

  const path = '/tour-guide';

  const pathName = window.location.pathname;
  const pathArray = pathName.split(path);
  const mainPath = pathArray[1];
  const mainPathSplit = mainPath.split('/');

  const [openKeys, setOpenKeys] = React.useState(
    !topMenu ? [`${mainPathSplit.length > 2 ? mainPathSplit[1] : 'dashboard'}`] : [],
  );

  const onOpenChange = (keys) => {
    setOpenKeys(keys[keys.length - 1] !== 'recharts' ? [keys.length && keys[keys.length - 1]] : keys);
  };

  const onClick = (item) => {
    if (item.keyPath.length === 1) setOpenKeys([]);
  };

  const changeLayout = (mode) => {
    dispatch(changeLayoutMode(mode));
  };
  const changeNavbar = (topMode) => {
    const html = document.querySelector('html');
    if (topMode) {
      html.classList.add('hexadash-topmenu');
    } else {
      html.classList.remove('hexadash-topmenu');
    }
    dispatch(changeMenuMode(topMode));
  };
  const changeLayoutDirection = (rtlMode) => {
    if (rtlMode) {
      const html = document.querySelector('html');
      html.setAttribute('dir', 'rtl');
    } else {
      const html = document.querySelector('html');
      html.setAttribute('dir', 'ltr');
    }
    dispatch(changeDirectionMode(rtlMode));
  };

  const darkmodeActivated = () => {
    document.body.classList.add('dark');
  };

  const darkmodeDiactivated = () => {
    document.body.classList.remove('dark');
  };

  const items = [
    getItem(
      <NavLink onClick={toggleCollapsed} to={`${path}/dashboard`} className='font-kantumruy-pro font-meduim text-sm'>
        {t('ផ្ទាំងព័ត៍មាន')}
      </NavLink>,
      'ផ្ទាំងព័ត៍មាន',
      !topMenu &&  <UilCreateDashboard className='h-5 w-5' />,
    ),
    getItem(
      <NavLink onClick={toggleCollapsed} to={`${path}/tour-package`} className='font-kantumruy-pro font-meduim text-sm'>
        {t('កញ្ចប់ទេសចរណ៍')}
      </NavLink>,
      'កញ្ចប់ទេសចរណ៍',
      !topMenu &&  <UilBox className='h-5 w-5' />,
    ),
    getItem(
      <p className='font-kantumruy-pro font-meduim text-sm m-0 p-0'>{t('កញ្ចប់បានកក់')}</p>,
      'កញ្ចប់បានកក់' ,
       !topMenu && <UilDollarSign className='h-5 w-5'/>, [
      getItem(
        <NavLink onClick={toggleCollapsed} to={`${path}/accept-booking`} className='font-kantumruy-pro font-normal text-sm'>
          {t('រងចាំទទួលព្រម')}
        </NavLink>,
        'រងចាំទទួលព្រម',
        null,
      ),
      getItem(
        <NavLink onClick={toggleCollapsed} to={`${path}/history-sale`} className='font-kantumruy-pro font-normal text-sm'>
          {t('បញ្ជីបានកក់')}
        </NavLink>,
        'បញ្ជីបានកក់',
        null,
      ),
    ]),
    getItem(
      <NavLink onClick={toggleCollapsed} to={`${path}/my-review`} className='font-kantumruy-pro font-meduim text-sm'>
        {t('ការវាយតម្លៃ')}
      </NavLink>,
      'ការវាយតម្លៃ',
      !topMenu &&  <UilStar className='h-5 w-5' />,
    ),
    getItem(
      <NavLink onClick={toggleCollapsed} to={`${path}/profile/myProfile/setting/info`} className='font-kantumruy-pro font-meduim text-sm'>
        {t('ការកំណត់')}
      </NavLink>,
      'ការកំណត់',
      !topMenu &&  <UilSetting className='h-5 w-5' />,
    ),

    // =====================================>> Other nav for later usage <<=========================================
        // getItem(
    //   <NavLink onClick={toggleCollapsed} to={`${path}/dashboard`} className='font-kantumruy-pro font-meduim text-sm'>
    //     {t('ផ្ញើ​សារ')}
    //   </NavLink>,
    //   'ផ្ញើ​សារ',
    //   !topMenu &&  <UilCommentAltMessage className='h-5 w-5' />,
    // ),
    // getItem(
    //   <NavLink onClick={toggleCollapsed} to={`${path}/dashboard`} className='font-kantumruy-pro font-meduim text-sm'>
    //     {t('សារជូនដំណឹង')}
    //   </NavLink>,
    //   'សារជូនដំណឹង',
    //   !topMenu &&  <UilBell className='h-5 w-5' />,
    // ),
  ];

  return (
    <Menu
      onOpenChange={onOpenChange}
      onClick={onClick}
      mode={!topMenu || window.innerWidth <= 991 ? 'inline' : 'horizontal'}
      // // eslint-disable-next-line no-nested-ternary
      defaultSelectedKeys={
        !topMenu
          ? [
              `${
                mainPathSplit.length === 1 ? 'home' : mainPathSplit.length === 2 ? mainPathSplit[1] : mainPathSplit[2]
              }`,
            ]
          : []
      }
      defaultOpenKeys={!topMenu ? [`${mainPathSplit.length > 2 ? mainPathSplit[1] : 'dashboard'}`] : []}
      overflowedIndicator={<UilEllipsisV />}
      openKeys={openKeys}
      items={items}
    />
  );
}

MenuItems.propTypes = {
  toggleCollapsed: propTypes.func,
};

export default MenuItems;
