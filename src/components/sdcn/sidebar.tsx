'use client'
import { Calendar, ChevronUp, Home, Inbox, Landmark, Search, Settings, User2 } from "lucide-react"

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
  SidebarProvider,
} from "@/components/ui/sidebar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import { UserButton } from "@clerk/nextjs"
import { ModeToggle } from "../theme/themeTogle"
import { DialogDemo } from "../camp-auth/camp-auth-overlay"
import { useRouter } from "next/navigation"

// import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
// import { AppSidebar } from "@/components/app-sidebar"

// export default function Layout({ children }: { children: React.ReactNode }) {
//   return (
//     <SidebarProvider>
//       <AppSidebar />
//       <main>
//         <SidebarTrigger />
//         {children}
//       </main>
//     </SidebarProvider>
//   )
// }

// Menu items.
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
  {
    title: "Calendar",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Profile",
    url: "/dashboard/profile",
    icon: User2,
  },
  {
    title: "Bank",
    url: "/dashboard/blood-bank",
    icon: Landmark,
  },
]

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
                    <a onClick={()=>{router.push(item.url)}}>
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
  )
}



const Roomitems = [
  
  {
    title: "Bank",
    url: "/room/bloodbank",
    icon: Landmark,
  },
]
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
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a onClick={()=>{router.push(item.url)}}>
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
  )
}