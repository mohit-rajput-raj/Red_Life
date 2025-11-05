import { BreadcrumbWithCustomSeparator } from "@/components/breadCrumb/bread-crumb";
import { AppSidebar, RoomSidebar } from "@/components/sdcn/sidebar";
import { ModeToggle } from "@/components/theme/themeTogle";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

import React from "react";

type Props = {
  children: React.ReactNode;
};

const layout = async (props: Props) => {
  return (
    <div>
      <div className="h-screen ">
        <div className="w-screen min-w-[500px]">
          <SidebarProvider>
            <RoomSidebar />

            <div className="flex-1 flex flex-col w-full py-5 ">
              <div className="flex justify-between items-center p-1">
                <SidebarTrigger />
                <ModeToggle />
              </div>
              <BreadcrumbWithCustomSeparator />
              <hr className="my-2" />

              <div className="flex-1 p-2 overflow-y-auto">{props.children}</div>
            </div>
          </SidebarProvider>
        </div>
        {/* <RoomSidebar>

        <BreadcrumbWithCustomSeparator />
                  <hr className="my-2" />
        
                  <div className="flex-1 p-4 overflow-y-auto">{props.children}</div>
        </RoomSidebar> */}
      </div>
    </div>
  );
};

export default layout;
