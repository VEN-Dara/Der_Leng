import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import NotFound from '../../container/pages/404';

function AuthorizeProtectedRoute({ Component, path, isAuthorized }) {
  const isLoggedIn = useSelector((state) => state.auth.login);

  return (
    <Routes>
      {isLoggedIn ? (
        isAuthorized ? (
          <Route path={path} element={<Component />} />
        ) : (
          <Route path={path} element={<NotFound />} />
        )
      ) : (
        <Route path="*" element={<Navigate to="/" />} />
      )}
    </Routes>
  );
}

AuthorizeProtectedRoute.propTypes = {
  Component: PropTypes.elementType.isRequired,
  path: PropTypes.string.isRequired,
  isAuthorized: PropTypes.bool.isRequired,
};

export default AuthorizeProtectedRoute;
