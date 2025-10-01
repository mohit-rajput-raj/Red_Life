import { BreadcrumbWithCustomSeparator } from "@/components/breadCrumb/bread-crumb";
import { AppSidebar } from "@/components/sdcn/sidebar";
import { ModeToggle } from "@/components/theme/themeTogle";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

import React from "react";

type Props = {
  children: React.ReactNode;
};

const Layout = async ({ children }: Props) => {
  return (
    <div className="flex h-screen w-full">
      <div className="w-screen min-w-[500px]">
        <SidebarProvider>
          <AppSidebar />
          
          <div className="flex-1 flex flex-col w-full py-5">
            <div className="flex justify-between items-center p-1">
            <SidebarTrigger />
          <ModeToggle />
          </div>
            <BreadcrumbWithCustomSeparator />
            <hr className="my-2" />

            <div className="flex-1 p-2 overflow-y-auto">{children}</div>
          </div>
        </SidebarProvider>
      </div>
      {/* <SidebarDemo>
        <div className="flex-1 flex flex-col">
          <BreadcrumbWithCustomSeparator />
          <hr className="my-2" />

          <div className="flex-1 p-4 overflow-y-auto">{children}</div>
        </div>
      </SidebarDemo> */}
    </div>
  );
};

export default Layout;
