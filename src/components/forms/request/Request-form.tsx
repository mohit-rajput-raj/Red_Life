"use client";


import {  requestFormInputes } from "@/constants/campsForms";
import { useFormContext } from "react-hook-form";

import FormGenerator from "../form-generatoe";
import { RequestBloodProps } from "@/schemas/request.schemas";
import { useRequestForm } from "@/hooks/requestBlood/use-request";



// export const RequestForm = () => {

  
//   const { show } = useRequestForm();

//   return (
//     <Drawer >
//       <DrawerTrigger asChild>
//         <Button variant="outline" className="min-w-[120px]">
//             Request Blood
//         </Button>
//       </DrawerTrigger>
//       <RequestFormProvider>
//       <DrawerContent className="h-[90vh] max-h-[90vh] flex flex-col dark:bg-zinc-900">
//           <div className="flex flex-col h-full">
//             <DrawerHeader className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b px-4 sm:px-6 py-4">
//               <div className="flex items-center justify-between">
//                 <div className="flex justify-center items-center w-9/10 ">
//                   <div className="flex flex-col justify-center items-center">
//                     <DrawerTitle className="text-lg font-semibold">Create New Camp</DrawerTitle>
//                   <DrawerDescription className="text-sm">
//                     Fill in the details below to REQUEST BLOOD
//                   </DrawerDescription>
//                   </div>
//                 </div>
//                 <DrawerClose asChild className="absulate right-0" >
//                   <Button variant="ghost" size="icon" className="h-8 w-8">
//                     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                       <path d="M18 6L6 18" />
//                       <path d="M6 6l12 12" />
//                     </svg>
//                     <span className="sr-only">Close</span>
//                   </Button>
//                 </DrawerClose>
//               </div>
//             </DrawerHeader>
            
//             <div className="flex-1 overflow-y-auto p-4 sm:p-6">
//               <div className="max-w-2xl mx-auto w-full space-y-6 p-4 border rounded-md px-10 flex-wrap">
//                 <RequestFormInputes />
//               </div>
//             </div>

//             <div className="sticky bottom-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-t p-4">
//               <div className="max-w-2xl mx-auto w-full flex gap-3">
//                 <button  className="text-black dark:text-white flex-1"
//                 onClick={show}
//                 // type="submit"
//                 >
//                   send request
//                 </button>
//                 <DrawerClose asChild className="flex-1">
//                   <Button variant="outline" size="lg" className="w-full">
//                     Cancel
//                   </Button>
//                 </DrawerClose>
//                 {/* <DrawerClose asChild >
//               {shouldClose 
//                     }
//                 </DrawerClose> */}
                
//               </div>
//             </div>
//           </div>
//       </DrawerContent>
//       </RequestFormProvider>
//     </Drawer>
//   );
// };
export const RequestFormInputes = () => {
  const {
    register,
    formState: { errors },
    getValues,
    handleSubmit
  } = useFormContext<RequestBloodProps>();
console.log(getValues());

  return (
    <>
      {requestFormInputes.map((f) => (
        
         <FormGenerator
        {...f}
        options={bloodTypes}
          disabled={f.disabled}
          key={f.id}
          name={f.name}
          label={f.label}
          placeholder={f.placeholder}
          type={f.type}
          register={register}
          errors={errors}
          inputType={f.inputType}
        />
      ))}
    </>
  );
};

export const bloodTypes: { label: string; value: string }[] = [
  { label: "A+", value: "A+" },
  { label: "A-", value: "A-" },
  { label: "B+", value: "B+" },
  { label: "B-", value: "B-" },
  { label: "AB+", value: "AB+" },
  { label: "AB-", value: "AB-" },
  { label: "O+", value: "O+" },
  { label: "O-", value: "O-" },
] as const;
