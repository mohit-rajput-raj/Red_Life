"use client";
import {
  Calendar,
  Home,
  Inbox,
  Landmark,
  Search,
  User2,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
} from "@radix-ui/react-dropdown-menu";
import { UserButton } from "@clerk/nextjs";
import { ModeToggle } from "../theme/themeTogle";
import { useRouter } from "next/navigation";
import React from "react";

const items = [
  {
    title: "Camp",
    url: "/dashboard/camp",
    icon: Home,
  },
  {
    title: "Appointments",
    url: "/dashboard/appointment",
    icon: Inbox,
  },
  // {
  //   title: "Calendar",
  //   url: "#",
  //   icon: Calendar,
  // },
  // {
  //   title: "Search",
  //   url: "#",
  //   icon: Search,
  // },
  {
    title: "Profile",
    url: "/dashboard/profile",
    icon: User2,
  },
  {
    title: "Bank",
    url: "/dashboard/institution",
    icon: Landmark,
  },
];

export function AppSidebar() {
  const router = useRouter();
  return (
    // <SidebarProvider>
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a
                      className="cursor-pointer"
                      onClick={() => {
                        router.push(item.url);
                      }}
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <div className="flex justify-items-start items-center gap-3 p-2">
                <UserButton />
                <ModeToggle />
              </div>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
    // </SidebarProvider>
  );
}

const Roomitems = [
  {
    title: "Bank",
    url: "/room/bloodbank",
    icon: Landmark,
  },
  {
    title:"Profile",
    url:"/room/profile",
    icon:User2,
  },
  {
    title:"Requests",
    url:"/room/requests",
    icon:Inbox
  }
];
export function RoomSidebar() {
  const router = useRouter();
  return (
    // <SidebarProvider>
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {Roomitems.map((item) => (
                <SidebarMenuItem key={item.title} className="cursor-pointer">
                  <SidebarMenuButton asChild>
                    <a
                    className="cursor-pointer"
                      onClick={() => {
                        router.push(item.url);
                      }}
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <div className="flex justify-items-start items-center gap-3 p-2">
                <UserButton />
                <ModeToggle />
              </div>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
    // </SidebarProvider>
  );
}
