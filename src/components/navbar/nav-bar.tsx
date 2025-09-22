import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'
import { ModeToggle } from '../theme/themeTogle'
import { NavigationMenuDemo } from './scn-nav-bar'

type Props = {}

const NavBar = (props: Props) => {
  return (
    <header className="flex justify-end items-center gap-6 h-16 px-6 
                    top-0 w-full z-50 
                   bg-red-300/30 dark:bg-red-800/30 
                   backdrop-blur-md border-b border-white/20 
                   shadow-lg">
            
            <SignedIn>
              <Button asChild>
                <Link href="/dashboard">Dashboard</Link>
              </Button>
              <UserButton />
              <ModeToggle/>

            </SignedIn>
            
          </header>
  )
}
export const NavBarSignout = (props: Props) => {
  return (
    // <div className='w-full p-3'>
      <header className="flex fixed  justify-end   items-center gap-6 h-16 px-6 
                    top-0 w-full z-50  text-white
                   bg-red-300/60 dark:bg-red-800/60 
                   backdrop-blur-md border-b border-white/20 
                   shadow-lg">
                    {/* <div className='w-full flex justify-center'>
                        <NavigationMenuDemo/>
                    </div> */}
            
          {/* <div className='flex justify-end w-full'>  */}
            <SignedOut>
              <SignInButton />
              <SignUpButton>
                <button className=" rounded-2xl bg-red-300 dark:bg-red-700 pointer h-[30px] w-[120px]">
                  Sign Up
                </button>
              </SignUpButton>
            </SignedOut>
            {/* // </div> */}
            
          </header>
    // </div>
  )
}

export default NavBar