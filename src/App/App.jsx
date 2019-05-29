import React, { useState, useEffect } from 'react';
// routing
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { loadReCaptcha } from 'react-recaptcha-google';
// components
import { HomePage } from '../HomePage';
import { Comparison } from '../Comparison';
import { Weight } from '../Weight';
import { Subscriptions } from '../Subscriptions';
import { Exchange } from '../Exchange';
import { Login } from '../LoginPage';
import { PrivateRoute } from './PrivateRoute';
import { ResetPassword } from '../ResetPassword';
import { ForgotPassword } from '../ForgotPassword';

export const App = () => {
  const init = () =>{
    loadReCaptcha();
  }
  init();
  // returning application
  return (
    <Router>
      <div>
        <PrivateRoute p="/" c={HomePage} />
        <PrivateRoute p="/comp" c={Comparison} />
        <PrivateRoute p="/weight" c={Weight} />
        <PrivateRoute p="/subscriptions" c={Subscriptions} />
        <PrivateRoute p="/exchange" c={Exchange} />
        <Route path="/login" component={Login} />
        <Route path="/forgot-password" component={ForgotPassword} />
        <Route path="/reset-password" component={ResetPassword} />
      </div>
    </Router>
  );
};