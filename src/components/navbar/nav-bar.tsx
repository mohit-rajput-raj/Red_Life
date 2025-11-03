'use client'
import { SignedIn, SignedOut, SignInButton, SignUpButton, useAuth, UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { Button } from '../ui/button'
import { ModeToggle } from '../theme/themeTogle'
// import { NavigationMenuDemo } from './scn-nav-bar'
// import { auth } from '@clerk/nextjs/server'
import pool from '@/lib/db'
import { Skeleton } from '../ui/skeleton'
// import (pool)

type Props = {}


const NavBar = (props: Props) => {
  const { isLoaded } = useAuth(); 

  if (!isLoaded) {
    return (
      <header className="flex fixed justify-end items-center gap-6 h-16 px-6 
                    top-0 w-full z-50 text-white
                   bg-red-300/60 dark:bg-red-800/60 
                   backdrop-blur-md border-b border-white/20 shadow-lg">
        <div className="flex gap-4">
          <Skeleton className="h-8 w-24 rounded-lg" />
          <Skeleton className="h-8 w-24 rounded-lg" />
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>
      </header>
    );
  }
  return (
    <aside className="fixed top-0 left-0 h-full w-20 
                  flex flex-col justify-between items-center 
                  gap-6 py-6 px-2
                  bg-red-300/30 dark:bg-red-800/30
                  backdrop-blur-md border-r border-white/20
                  shadow-lg z-50">

  <div className="flex flex-col items-center gap-6">
    <SignedIn>
      
      <Link href="/dashboard/user/" className="w-full flex justify-center"> 
          Dashboard
        </Link>

      <UserButton />
      <ModeToggle />
    </SignedIn>
  </div>

  <div className="flex flex-col items-center gap-4">

  </div>
</aside>

  )
}

export const NavBarSignout =(props: Props) => {
  const { isLoaded, isSignedIn } =useAuth();

  if (!isLoaded ) {
    
    return (
      <header className="flex fixed justify-end items-center gap-6 h-16 px-6 
                    top-0 w-full z-50 text-white
                   bg-red-800/60 
                   backdrop-blur-md border-b border-white/20 shadow-lg">
        <div className="flex gap-4">
          <Skeleton className="h-8 w-24 rounded-lg" />
          <Skeleton className="h-8 w-24 rounded-lg" />
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>
      </header>
    );
  }
  return (
      <header className="flex fixed  justify-end   items-center gap-6 h-16 px-6 
                    top-0 w-full z-50  text-white
                  bg-red-800/60 
                   backdrop-blur-md border-b border-white/20 
                   shadow-lg">
                  
            
            <SignedOut>
              <SignInButton />

              <SignUpButton>
                <button className=" rounded-2xl bg-red-600 pointer h-[30px] w-[120px]">
                  Sign Up
                </button>

              </SignUpButton>
              <ModeToggle />
            </SignedOut>
            <SignedIn>
              <Button asChild>
                <Link href="/auth-redirect">Dashboard</Link>
              </Button>
              <ModeToggle />
              <UserButton />

            </SignedIn>
            
          </header>
  )
}

export default NavBar