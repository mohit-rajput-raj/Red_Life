"use client";
import React from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalTrigger,
  ProfileModalBody,
} from "../ui/animated-modal";

import { motion } from "motion/react";
import { ChartBarMultiple } from "../chart/bar-chart-bloodPlasma";
import { ChartRadarDots } from "../chart/radarchart";
import ProfileFormUi from "../forms/profileForm/profile-form-ui";
import ProfileFormProvider from "../forms/profileForm/profile-form-provider";
import { set } from "zod";
import { User } from "@clerk/nextjs/server";
import { UsersData } from "@/types/pgType";
import AddressFormProvider  from "../forms/addressForms/address-form-provider";
import EditableAddressForm from "../forms/addressForms/editable-address-form";
import { toast } from "sonner";
import { useUsersAddressForm } from "@/hooks/profile/users-addressForm";

export function RadarChart() {
  return (
    <div className="  flex items-center justify-center">
      <Modal>
        <ModalTrigger className="bg-zinc-100 dark:bg-zinc-800 dark:text-white text-black flex justify-center group/modal-btn">
          <span className="group-hover/modal-btn:translate-x-40 text-center transition duration-500">
            radar chart
          </span>
          <div className="-translate-x-40 group-hover/modal-btn:translate-x-0 flex items-center justify-center absolute inset-0 transition duration-500 text-white z-20">
            🩸
          </div>
        </ModalTrigger>
        <ModalBody>
          <ModalContent>
            <ChartRadarDots />
          </ModalContent>
          <ModalFooter className="gap-4">
            <button className="px-2 py-1 bg-gray-200 text-black dark:bg-black dark:border-black dark:text-white border border-gray-300 rounded-md text-sm w-28">
              Cancel
            </button>
            <button className="bg-black text-white dark:bg-white dark:text-black text-sm px-2 py-1 rounded-md border border-black w-28">
              Book Now
            </button>
          </ModalFooter>
        </ModalBody>
      </Modal>
    </div>
  );
}
export function BarChartBloodPlasma() {
  return (
    <div className="  flex items-center justify-center">
      <Modal>
        <ModalTrigger className="bg-zinc-100 dark:bg-zinc-800 dark:text-white text-black flex justify-center group/modal-btn">
          <span className="group-hover/modal-btn:translate-x-40 text-center transition duration-500">
            bar chart
          </span>
          <div className="-translate-x-40 group-hover/modal-btn:translate-x-0 flex items-center justify-center absolute inset-0 transition duration-500 text-white z-20">
            🩸
          </div>
        </ModalTrigger>
        <ModalBody>
          <ModalContent>
            <ChartBarMultiple />
          </ModalContent>
          <ModalFooter className="gap-4">
            <button className="px-2 py-1 bg-gray-200 text-black dark:bg-black dark:border-black dark:text-white border border-gray-300 rounded-md text-sm w-28">
              Cancel
            </button>
            <button className="bg-black text-white dark:bg-white dark:text-black text-sm px-2 py-1 rounded-md border border-black w-28">
              Book Now
            </button>
          </ModalFooter>
        </ModalBody>
      </Modal>
    </div>
  );
}
export function CompleteProfile() {
  return (
    <div className="  flex items-center justify-center">
      <Modal>
        <ModalTrigger className="bg-zinc-100 dark:bg-zinc-800 dark:text-white text-black flex justify-center group/modal-btn">
          <span className="group-hover/modal-btn:translate-x-40 text-center transition duration-500">
            bar chart
          </span>
          <div className="-translate-x-40 group-hover/modal-btn:translate-x-0 flex items-center justify-center absolute inset-0 transition duration-500 text-white z-20">
            🩸
          </div>
        </ModalTrigger>
        <ModalBody>
          <ModalContent>
            <ChartBarMultiple />
          </ModalContent>
          <ModalFooter className="gap-4">
            <button className="px-2 py-1 bg-gray-200 text-black dark:bg-black dark:border-black dark:text-white border border-gray-300 rounded-md text-sm w-28">
              Cancel
            </button>
            <button className="bg-black text-white dark:bg-white dark:text-black text-sm px-2 py-1 rounded-md border border-black w-28">
              Book Now
            </button>
          </ModalFooter>
        </ModalBody>
      </Modal>
    </div>
  );
}
export function EditProfileForm({ usersData }: { usersData: UsersData }) {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="  flex items-center justify-center">
      <Modal >
        <ModalTrigger className="bg-zinc-100 dark:bg-zinc-800 dark:text-white text-black flex justify-center group/modal-btn">
          <span className="group-hover/modal-btn:translate-x-40 text-center transition duration-500">
            edit profile
          </span>
          <div className="-translate-x-40 group-hover/modal-btn:translate-x-0 flex items-center justify-center absolute inset-0 transition duration-500 text-white z-20">
            click
          </div>
        </ModalTrigger>
        <ProfileFormProvider>
          <ProfileModalBody>
            <ModalContent>
              <ProfileFormUi usersData={usersData} />
            </ModalContent>
            <ModalFooter className="gap-4">
              {/* <button  className="px-2 py-1 bg-gray-200 text-black dark:bg-black dark:border-black dark:text-white border border-gray-300 rounded-md text-sm w-28">
                Cancel
              </button> */}
              <button
                type="submit"
                className="bg-black text-white dark:bg-white dark:text-black text-sm px-2 py-1 rounded-md border border-black w-28"
              >
                update
              </button>
            </ModalFooter>
          </ProfileModalBody>
        </ProfileFormProvider>
      </Modal>
    </div>
  );
}
export function EditAddressForm() {
  return (
    <div className="  flex items-center justify-center">
      <Modal >
        <ModalTrigger className="bg-zinc-100 dark:bg-zinc-800 dark:text-white text-black flex justify-center group/modal-btn">
          <span className="group-hover/modal-btn:translate-x-40 dark:bg-zinc-900 w-35 h-10 rounded-sm text-center transition duration-500">
            edit address
          </span>
          <div className="-translate-x-40 group-hover/modal-btn:translate-x-0 flex items-center justify-center absolute inset-0 transition duration-500 text-white z-20">
            click
          </div>
        </ModalTrigger>
        <AddressFormProvider>
          <ProfileModalBody>
            <ModalContent>
              <EditableAddressForm/>
            </ModalContent>
            <ModalFooter className="gap-4">
              {/* <button  className="px-2 py-1 bg-gray-200 text-black dark:bg-black dark:border-black dark:text-white border border-gray-300 rounded-md text-sm w-28">
                Cancel
              </button> */}
              <button
                // onClick={showdata}
                // onClick={() => toast.success("Address updated successfully!")}
                type="submit" 
                className="bg-gray-200 text-white dark:bg-white dark:text-black text-sm px-2 py-1 rounded-md border border-black w-28"
              >
                update
              </button>
            </ModalFooter>
          </ProfileModalBody>
        </AddressFormProvider>
      </Modal>
    </div>
  );
}
