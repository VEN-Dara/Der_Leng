import React, { useEffect, useState, lazy } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { ConfigProvider as ConfigProvider5 } from 'antd-v5';
// import store from './resource/redux/store';   // resource store
import store from './app/redux/store';   // local store
import Customer from './app/routes/customer';
import TourGuide from './app/routes/tour_guide';
import Staff from './app/routes/staff';
import Auth from './app/routes/auth/auth';
import './resource/static/css/style.css';
import config from './resource/config/config';
import ProtectedRoute from './resource/components/utilities/protectedRoute';
import 'antd/dist/antd.less';
import AuthorizeProtectedRoute from './app/components/utilities/authorizeProtectedRoute';
import { isStaffOrAbove, isTourGuideOrAbove } from './app/utility/function/permission';
import { refreshToken } from './app/redux/authentication/actionCreator';
import { fetchUser } from './app/redux/user-info/actionCreators';

const NotFound = lazy(() => import('./app/container/pages/404'));

const { theme } = config;

function ProviderConfig() {
  const { rtl, isLoggedIn, topMenu, mainContent, userFetchStatus, user } = useSelector((state) => {
    return {
      rtl: state.ChangeLayoutMode.rtlData,
      topMenu: state.ChangeLayoutMode.topMenu,
      mainContent: state.ChangeLayoutMode.mode,
      isLoggedIn: state.auth.login,
      userFetchStatus: state.userReducer.status,
      user: state.userReducer.user,
    };
  });
  const dispatch = useDispatch();
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    let unmounted = false;
    if (!unmounted) {
      setPath(window.location.pathname);
    }

    // :: Fetch auth info ::
    if(userFetchStatus === 'idle') {
      dispatch(fetchUser());
    }

    // :: Refresh Token every 15 minutes ::
    const interval = setInterval(refreshToken, 15 * 60 * 1000);
    return () => {
      unmounted = true;
      clearInterval(interval);
    };
  }, [setPath]);

  return (
    <ConfigProvider5 prefixCls="ant5" direction={rtl ? 'rtl' : 'ltr'}>
      <ThemeProvider theme={{ ...theme, rtl, topMenu, mainContent }}>
        <Router basename={process.env.PUBLIC_URL}>
          {!isLoggedIn ? (
            <Routes>
              <Route path="/*" element={<Auth />} />{' '}
            </Routes>
          ) : (
            <Routes>
              <Route path="/tour-guide/*" element={<AuthorizeProtectedRoute path="/*" Component={TourGuide} isAuthorized={isTourGuideOrAbove(user.role)} />} />
              <Route path="/staff/*" element={<AuthorizeProtectedRoute path="/*" Component={Staff} isAuthorized={isStaffOrAbove(user.role)} />} />
              <Route path="/*" element={<ProtectedRoute path="/*" Component={Customer} />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          )}
          {isLoggedIn && (path === process.env.PUBLIC_URL || path === `${process.env.PUBLIC_URL}/`) && (
            <Routes>
              <Route path="/" element={<Navigate to="/" />} />
            </Routes>
          )}
        </Router>
      </ThemeProvider>
    </ConfigProvider5>
  );
}

function App() {
  return (
    <Provider store={store}>
      <ProviderConfig />
    </Provider>
  );
}

export default App;
