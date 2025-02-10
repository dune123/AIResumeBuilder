import React from 'react'
import { Outlet } from 'react-router-dom'
import { Navigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import Header from './components/Header';

const App = () => {
  const {user,isLoaded,isSignedIn}=useUser();

  if(!isSignedIn&&isLoaded)
  {
    return <Navigate to={'/auth/sign-in'} />
  }

  return (
    <>
      <Header/>
      <Outlet/>
    </>
  )
}

export default App