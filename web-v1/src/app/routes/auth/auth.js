import React, { lazy, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import AuthLayout from '../../container/authentication/AuthLayout';
import SyncTelegram from '../../container/authentication/overview/SyncTelegram';

const Login = lazy(() => import('../../container/authentication/overview/SignIn'));
const SignUp = lazy(() => import('../../container/authentication/overview/Signup'));
const ForgotPass = lazy(() => import('../../container/authentication/overview/ForgotPassword'));

const AuthRoot = () => {
  const navigate = useNavigate();

  useEffect(() => navigate('/'));
};

const FrontendRoutes = React.memo(() => {
  return (
    <Routes>
      <Route index element={<Login />} />
      <Route path="forgotPassword" element={<ForgotPass />} />
      <Route path="register" element={<SignUp />} />
      <Route path="sync-telegram" element={<SyncTelegram/>} />
      <Route path="*" element={<AuthRoot />} />
    </Routes>
  );
});

export default AuthLayout(FrontendRoutes);
