'use client'
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { Button } from '../ui/button'
import { ModeToggle } from '../theme/themeTogle'
// import { NavigationMenuDemo } from './scn-nav-bar'
// import { auth } from '@clerk/nextjs/server'
import pool from '@/lib/db'
// import (pool)

type Props = {}


const NavBar = (props: Props) => {
  return (
    <aside className="fixed top-0 left-0 h-full w-20 
                  flex flex-col justify-between items-center 
                  gap-6 py-6 px-2
                  bg-red-300/30 dark:bg-red-800/30
                  backdrop-blur-md border-r border-white/20
                  shadow-lg z-50">

  <div className="flex flex-col items-center gap-6">
    <SignedIn>
      
      <Link href="/dashboard/user/" className="w-full flex justify-center"> {/* optional: center icon/text */}
          Dashboard
        </Link>

      <UserButton />
      <ModeToggle />
    </SignedIn>
  </div>

  {/* Optional: Add bottom content here */}
  <div className="flex flex-col items-center gap-4">
    {/* e.g., logout button or extra links */}
  </div>
</aside>

  )
}

export const NavBarSignout = (props: Props) => {
  
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       // const { userId } = auth.getAuth();
  //      const result = await pool.query("SELECT * FROM users");
  //   return new Response(JSON.stringify(result.rows), { status: 200 });
          
  //     } catch (error) {
  //       console.error('Error fetching user data:', error);
  //     }
  //   };
  //   fetchData();
  // }, []); 
  
  return (
      <header className="flex fixed  justify-end   items-center gap-6 h-16 px-6 
                    top-0 w-full z-50  text-white
                   bg-red-300/60 dark:bg-red-800/60 
                   backdrop-blur-md border-b border-white/20 
                   shadow-lg">
                  
            
            <SignedOut>
              <SignInButton />
              {/* <button onClick={()=>{clerkk()}}>clerk</button> */}

              <SignUpButton>
                <button className=" rounded-2xl bg-red-300 dark:bg-red-700 pointer h-[30px] w-[120px]">
                  Sign Up
                </button>

              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <Button asChild>
                <Link href="/auth-redirect">Dashboard</Link>
              </Button>
              <UserButton />
              {/* <ModeToggle/> */}

            </SignedIn>
            
          </header>
  )
}

export default NavBar