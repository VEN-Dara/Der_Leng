import React, { lazy, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import AuthLayout from '../../resource/container/profile/authentication/Index';

const Login = lazy(() => import('../../resource/container/profile/authentication/overview/SignIn'));
const SignUp = lazy(() => import('../../resource/container/profile/authentication/overview/Signup'));
const ForgotPass = lazy(() => import('../../resource/container/profile/authentication/overview/ForgotPassword'));

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
      <Route path="*" element={<AuthRoot />} />
    </Routes>
  );
});

export default AuthLayout(FrontendRoutes);
