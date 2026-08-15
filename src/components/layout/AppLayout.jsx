import React from 'react';
import Header from '../../components/app-components/header/Header';
import Footer from '../../components/app-components/Footer';
import { Outlet } from 'react-router-dom';

function AppLayout() {
  return (
    <>
    <Header />
        <Outlet />
    <Footer /> 
    </>
  )
}

export default AppLayout