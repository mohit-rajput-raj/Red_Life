"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useMediaQuery } from "@/hooks/isdesktop";
// import { FormValues, UsersData } from "@/types/pgType";
import { Occupation } from "@/components/fields/occupation-selection";
import { ResponsisProfile } from "./responsis-profile";
import { v4 as uuidv4 } from "uuid";
import { useFormContext } from "react-hook-form";
import FormGenerator from "../form-generatoe";

import { useFormHooksProvider } from "@/components/forms-hooks-provider.tsx/form-hooks-provider";
import {
  DoctorForm,
  inputProps,
  WorkerForm,
} from "@/constants/doctor-worker-form";
import { Institutions } from "@/components/fields/instititution-field";
import { DoctorFormProps, StaffFormProps } from "@/schemas/institute.schemas";
import { UsersData } from "@/types/pgType";
import { get } from "http";
import { peoples } from "@/schemas/docs.schemas";
export type FormValues = DoctorFormProps | StaffFormProps;
// export function DrawerDialogDemo({
//   usersData,
//   occupation,
//   setOccupation,
// }: {
//   usersData: UsersData;
//   occupation: string;
//   setOccupation: React.Dispatch<React.SetStateAction<string>>;
// }) {
//   const [open, setOpen] = React.useState(false);
//   const isDesktop = useMediaQuery("(min-width: 768px)");
//   const key = React.useMemo(() => uuidv4().replace(/-/g, "").slice(0, 12), []);

//   if (isDesktop) {
//     return (
//       <Dialog open={open} onOpenChange={setOpen}>
//         <DialogTrigger asChild>
//           <Button variant="outline">complete profile</Button>
//         </DialogTrigger>
//         <DialogContent className="sm:max-w-[1025px] ">
//           <DialogTitle>your work</DialogTitle>
//           {usersData?.res?.phone && (
//             <div className="w-full flex  gap-4 p-4">
//               <div className="w-1/2 flex flex-col gap-4 p-4">
//                 <Occupation setOccupation={setOccupation} />
//                 {occupation === "Doctor" ? (
//                   <DoctorFormProvider DoctorForm={DoctorForm} />
//                 ) : (
//                   <WorkerFormProvider WorkerForm={WorkerForm} />
//                 )}

//                 {Institutions(occupation)}
//               </div>
//               <ResponsisProfile />
//             </div>
//           )}
//           <DialogDescription>
//             Make changes to your profile here. Click save when you&apos;re done.
//           </DialogDescription>
//           <ProfileForm occupation={occupation} />
//         </DialogContent>
//       </Dialog>
//     );
//   }

//   return (
//     <Drawer open={open} onOpenChange={setOpen}>
//       <DrawerTrigger asChild>
//         <Button variant="outline">complete profile</Button>
//       </DrawerTrigger>
//       <DrawerContent className="overflow-y-scroll flex flex-col ">
//         <DrawerTitle>your work</DrawerTitle>
//         <ProfileForm occupation={occupation} />

//         <DrawerDescription>
//           Make changes to your profile here. Click save when you&apos;re done.
//         </DrawerDescription>
//         {usersData?.res?.phone && (
//           <div className="w-full flex  gap-4 items-center sm:flex-col">
//             <div className="w-1/2 flex flex-col gap-4 p-4">
//               <Occupation setOccupation={setOccupation} />
//               {occupation === "Doctor" ? (
//                 <DoctorFormProvider DoctorForm={DoctorForm} />
//               ) : (
//                 <WorkerFormProvider WorkerForm={WorkerForm} />
//               )}
//               {Institutions(occupation)}
//             </div>
//             <ResponsisProfile />
//           </div>
//         )}
//         <DrawerFooter className="pt-2">
//           <DrawerClose asChild>
//             <Button variant="outline">Cancel</Button>
//           </DrawerClose>
//         </DrawerFooter>
//       </DrawerContent>
//     </Drawer>
//   );
// }
export const DoctorFormProvider = ({
  DoctorForm,
}: {
  DoctorForm: inputProps[];
}) => {
  const {
    register,
    getValues,
    formState: { errors },
  } = useFormContext<DoctorFormProps>();

  return (
    <>
      {DoctorForm.map((form) => (
        <FormGenerator
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
       <button onClick={()=>console.log(getValues())
       }>vals</button>
    </>
  );
};
export const WorkerFormProvider = ({
  WorkerForm,
}: {
  WorkerForm: inputProps[];
}) => {
  const {
    register,
    getValues,
    formState: { errors },
  } = useFormContext<StaffFormProps>();
  return (
    <>
      {WorkerForm.map((form, i) => (
        <FormGenerator
          key={i}
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
function ProfileForm({ occupation }: { occupation: string }) {
  const { show } = useFormHooksProvider(occupation);
  return (
    <Button
      onClick={show}
      // type="submit"

      className=" dark:text-zinc-300"
    >
      done
    </Button>
  );
}
