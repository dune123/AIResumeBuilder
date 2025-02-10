import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import React from 'react'
import Home from './home/index.jsx'
import Dashboard from './dashboard/index.jsx'
import SignInPage from './auth/sign-in/index.jsx'
import { ClerkProvider } from '@clerk/clerk-react'
import { createBrowserRouter } from 'react-router-dom'
import { RouterProvider } from 'react-router-dom'
import EditResume from './Dashboard/resume/[resumeId]/index.jsx'
import View from './my-resume/[resumeId]/view/index.jsx'
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

const router=createBrowserRouter([
  {
    path:'/',
    element:<Home/>
  },
  {
    element:<App/>,
    children:[
      {
        path:'/dashboard',
        element:<Dashboard/>
      },
      {
        path:'/dashboard/resume/:resumeId/edit',
        element:<EditResume/>
      },
    ]
  },
 ,
  {
    path:'/auth/sign-in',
    element:<SignInPage/>
  },
  {
    path:'/my-resume/:resumeId/view',
    element:<View/>
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
  <RouterProvider router={router} />
    </ClerkProvider>
  </StrictMode>,
)
