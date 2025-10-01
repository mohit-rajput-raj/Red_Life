"use client";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import { useState } from "react";
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'
import { Button } from "../ui/button";
import Link from "next/link";
import { ModeToggle } from "../theme/themeTogle";

export function NavbarDemo() {
  const navItems = [
    {
      name: "Features",
      link: "#features",
    },
    {
      name: "Pricing",
      link: "#pricing",
    },
    {
      name: "Contact",
      link: "#contact",
    },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
   
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} />
          <div className="flex items-center justify-end gap-4 w-full ">
            <SignedOut>
                          <SignInButton />
                          <SignUpButton>
                            <NavbarButton variant="secondary">signup</NavbarButton>
                          </SignUpButton>
                        </SignedOut>
                        <SignedIn>
                          {/* <Button asChild>
                            <Link href="/dashboard/user/">Dashboard</Link>
                          </Button> */}
                          <UserButton />
                          <ModeToggle/>
            
                        </SignedIn>
            
            {/* <NavbarButton variant="primary">Book a call</NavbarButton> */}
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems.map((item, idx) => (
              <a
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative text-neutral-600 dark:text-neutral-300"
              >
                <span className="block">{item.name}</span>
              </a>
            ))}
            <div className="flex w-full flex-col gap-4">
              <SignedOut>
                          <SignInButton />
                          <SignUpButton>
                            <NavbarButton variant="secondary">signup</NavbarButton>
                          </SignUpButton>
                        </SignedOut>
                        <SignedIn>
                          <div className="flex items-center justify-between gap-4 w-full">
                            <Button asChild>
                            <Link href="/dashboard/user/">Dashboard</Link>
                          </Button>
                          <UserButton />
                          </div>
                          {/* <ModeToggle/> */}
            
                        </SignedIn>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
      
  );
}


