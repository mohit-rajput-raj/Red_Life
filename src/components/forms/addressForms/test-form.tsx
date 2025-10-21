"use client";
import { EditAddressForm } from "@/components/anmetedUI/Overlays-animated";
import { Skeleton } from "@/components/ui/skeleton";
import { useusersdataHook } from "@/context/user-values-updations";

import React from "react";

const AddressForm = () => {
 

  

  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border rounded-lg dark:bg-zinc-800 shadow-md bg-white"
    >
      <AddressFrameValues/>

           < EditAddressForm/>

      
    </div>
  );
};

export default AddressForm;

const AddressFrameValues = () => {
  const {usersAddressData}  =  useusersdataHook();
  // if(!usersAddressData){
  //   return (
  //     <Skeleton/>
  //   );
  // }
  return (
    <>
    <div>
        <label className="block mb-1 font-medium dark:text-gray-500">Country</label>
        <input
          type="text"
          className="w-full border rounded-md p-2"
          placeholder={usersAddressData?.res?.country}
          disabled

        />
      </div>

      <div>
        <label className="block mb-1 font-medium dark:text-gray-500">State/Province</label>
        <input
          type="text"
          className="w-full border rounded-md p-2"
          placeholder={usersAddressData?.res?.state || "State/Province"}
          disabled

        />
      </div>

      <div>
        <label className=" mb-1 font-medium dark:text-gray-500">City</label>
        <input
          disabled

          type="text"
          className="w-full border rounded-md p-2"
          placeholder={usersAddressData?.res?.city || "City"}
        />
      </div>

      <div>
        <label className="block mb-1 font-medium dark:text-gray-500">Postal Code</label>
        <input
          disabled

          type="text"
          className="w-full border rounded-md p-2"
          placeholder={usersAddressData?.res?.postal_code || "Postal Code"}
        />
      </div>

      <div className="md:col-span-2">
        <label className="block mb-1 font-medium dark:text-gray-500">Street Address</label>
        <input
          type="text"
          className="w-full border rounded-md p-2"
          placeholder={usersAddressData?.res?.address_line1 || "Address"}
          disabled

        />
      </div></>
  );
};
