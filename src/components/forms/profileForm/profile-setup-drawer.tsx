"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
// import { useMediaQuery } from "@/hooks/use-mobile"
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useIsMobile } from "@/hooks/use-mobile";
import { useMediaQuery } from "@/hooks/isdesktop";
import { UsersData } from "@/types/pgType";
import { Occupation } from "@/components/fields/occupation-selection";
import { ResponsisProfile } from "./responsis-profile";
import { v4 as uuidv4 } from "uuid";
import { useFormContext } from "react-hook-form";
import FormGenerator from "../form-generatoe";
import { Methods } from "openai/resources/fine-tuning/methods.mjs";
import { get } from "http";
export function DrawerDialogDemo({ usersData, occupation,setOccupation }: { usersData: UsersData, occupation: string, setOccupation: React.Dispatch<React.SetStateAction<string>> }) {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const key = React.useMemo(() => uuidv4().replace(/-/g, "").slice(0, 12), []);
  // const t  = useIsMobile()
  const {
    register,
    formState: { errors },
    setValue,
    getValues
  } = useFormContext();
  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">complete profile</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[1025px]">
          <DialogTitle>your work</DialogTitle>
          {usersData?.res?.phone && (
            <div className="w-full flex  gap-4 p-4">
              <div className="w-1/2 flex flex-col gap-4 p-4">
                <Occupation  setOccupation={setOccupation} />
                
              </div>
              <ResponsisProfile />
            </div>
          )}
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
          <ProfileForm />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline">complete profile</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerTitle>your work</DrawerTitle>
        <DrawerDescription>
          Make changes to your profile here. Click save when you&apos;re done.
        </DrawerDescription>
        {usersData?.res?.phone && (
          <div className="w-full flex  gap-4 items-center sm:flex-col">
            <div className="w-1/2 flex flex-col gap-4 p-4">
              <Occupation setOccupation={setOccupation} />
              <FormGenerator
                disabled
                name="key"
                label="key"
                placeholder="key"
                type="text"
                register={register}
                errors={errors}
                inputType={"input"}
                defaultValue={key}
              />
              {/* <Button onClick={regenereateKey}>regenerate</Button> */}

              {/* <FieldChoiceCard/> */}
            </div>
            <ResponsisProfile />
          </div>
        )}
        <ProfileForm className="px-4" />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

function ProfileForm({ className }: React.ComponentProps<"form">) {

  return (
    <Button type="submit"  className=" dark:text-zinc-300">
      done
    </Button>
  );
}
