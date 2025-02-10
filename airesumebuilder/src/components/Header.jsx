import { UserButton, useUser } from '@clerk/clerk-react'
import { Button } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
    const {user,isSignedIn}=useUser();

  return (
    <div className='p-3 px-5 flex justify-between shadow-md'>
        <h1 className='text-3xl font-bold italic'>AI Resume Builder</h1>
        {
            isSignedIn?
            <div className='flex gap-2 items-center'>
                <Link to={'/dashboard'}>
                    <Button color="purple" variant="outlined">Dashboard</Button>
                </Link>
                <UserButton/>
            </div>
            :(<Link to={'/auth/sign-in'}>
            <Button color="purple" variant="solid">Get Started</Button>
        </Link>)
        }
    </div>
  )
}

export default Header

/*9F5BFF */