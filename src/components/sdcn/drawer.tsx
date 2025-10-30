"use client";

import * as React from "react";
import { Minus, Plus, Router } from "lucide-react";
import { Bar, BarChart, ResponsiveContainer } from "recharts";

import { Button } from "@/components/ui/button";
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
import { useUser, useAuth } from "@clerk/nextjs";
import { useWorkFlowContext } from "@/providers/workFlow/work-flow-provider";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalTrigger,
} from "../ui/animated-modal";
import { ChartBarMultiple } from "../chart/bar-chart-bloodPlasma";
import { useRouter } from "next/navigation";
import { useusersdataHook } from "@/context/user-values-updations";
import { CreateCampsProvider } from "../forms/CreateMoreCampsForm/CreateMoreCamps-provider";
import FormGenerator from "../forms/form-generatoe";
import { campsFormsvalues } from "@/constants/campsForms";
import { useFormContext } from "react-hook-form";
import { CampProps } from "@/schemas/camp.schemas";
import { useCampsCreator } from "@/hooks/camps/use-camps";
import { useEffect, useState } from "react";

const data = [
  {
    goal: 400,
  },
  {
    goal: 300,
  },
  {
    goal: 200,
  },
  {
    goal: 300,
  },
  {
    goal: 200,
  },
  {
    goal: 278,
  },
  {
    goal: 189,
  },
  {
    goal: 239,
  },
  {
    goal: 300,
  },
  {
    goal: 200,
  },
  {
    goal: 278,
  },
  {
    goal: 189,
  },
  {
    goal: 349,
  },
];

export const CreateMoreCamps = () => {
  const { flows, setFlows } = useWorkFlowContext();
  const [goal, setGoal] = React.useState(350);

  const { usersData } = useusersdataHook();
  const hasProfile = usersData?.res?.is_profile_completed;
  const router = useRouter();
  const { userId } = useAuth();
  const { show,created } = useCampsCreator();


  return (
    <Drawer >
      <DrawerTrigger asChild>
        <Button variant="outline" className="min-w-[120px]">
          Create Camp
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-[90vh] max-h-[90vh] flex flex-col">
        <CreateCampsProvider>
          <div className="flex flex-col h-full">
            <DrawerHeader className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b px-4 sm:px-6 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <DrawerTitle className="text-lg font-semibold">Create New Camp</DrawerTitle>
                  <DrawerDescription className="text-sm">
                    Fill in the details below to create a new camp
                  </DrawerDescription>
                </div>
                <DrawerClose asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 6L6 18" />
                      <path d="M6 6l12 12" />
                    </svg>
                    <span className="sr-only">Close</span>
                  </Button>
                </DrawerClose>
              </div>
            </DrawerHeader>
            
            <div className="flex-1 overflow-y-auto p-4 sm:p-6">
              <div className="max-w-2xl mx-auto w-full space-y-6">
                <CampFormInputes />
              </div>
            </div>

            <div className="sticky bottom-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-t p-4">
              <div className="max-w-2xl mx-auto w-full flex gap-3">
                <button  className="text-black dark:text-white flex-1"
            
                type="submit"
                >
                  Create Camp
                </button>
                <DrawerClose asChild className="flex-1">
                  <Button variant="outline" size="lg" className="w-full">
                    Cancel
                  </Button>
                </DrawerClose>
                {/* <DrawerClose asChild >
              {shouldClose 
                    }
                </DrawerClose> */}
                
              </div>
            </div>
          </div>
        </CreateCampsProvider>
      </DrawerContent>
    </Drawer>
  );
};

const CampFormInputes = () => {
  const {
    register,
    formState: { errors },
    getValues,
  } = useFormContext<CampProps>();
  // console.log(getValues());

  return (
    <>
      {campsFormsvalues.map((form) => (
        <FormGenerator
        {...form}
          disabled={form.disabled}
          key={form.id}
          name={form.name}
          label={form.label}
          placeholder={form.placeholder}
          type={form.type}
          register={register}
          errors={errors}
          inputType={form.inputType}
        />
      ))}
    </>
  );
};
