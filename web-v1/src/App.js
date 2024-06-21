import React, { useEffect, useState, lazy } from 'react';
import { Provider, useSelector } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import { ConfigProvider } from 'antd';
// import store from './resource/redux/store';   // resource store
import store from './app/redux/store';   // local store
import Customer from './app/routes/customer';
import TourGuide from './app/routes/tour_guide';
import Auth from './app/routes/auth/auth';
import './resource/static/css/style.css';
import config from './resource/config/config';
import ProtectedRoute from './resource/components/utilities/protectedRoute';
import 'antd/dist/antd.less';
import AuthorizeProtectedRoute from './app/components/utilities/authorizeProtectedRoute';
import { isTourGuideOrAbove } from './app/utility/function/permission';

const NotFound = lazy(() => import('./app/container/pages/404'));

const { theme } = config;

function ProviderConfig() {
  const { rtl, isLoggedIn, topMenu, mainContent } = useSelector((state) => {
    return {
      rtl: state.ChangeLayoutMode.rtlData,
      topMenu: state.ChangeLayoutMode.topMenu,
      mainContent: state.ChangeLayoutMode.mode,
      isLoggedIn: state.auth.login,
    };
  });

  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    let unmounted = false;
    if (!unmounted) {
      setPath(window.location.pathname);
    }
    // eslint-disable-next-line no-return-assign
    return () => (unmounted = true);
  }, [setPath]);

  return (
    <ConfigProvider direction={rtl ? 'rtl' : 'ltr'}>
      <ThemeProvider theme={{ ...theme, rtl, topMenu, mainContent }}>
        <Router basename={process.env.PUBLIC_URL}>
          {!isLoggedIn ? (
            <Routes>
              <Route path="/*" element={<Auth />} />{' '}
            </Routes>
          ) : (
            <Routes>
              <Route path="/tour-guide/*" element={<AuthorizeProtectedRoute path="/*" Component={TourGuide} isAuthorized={isTourGuideOrAbove()} />} />
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
    </ConfigProvider>
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
