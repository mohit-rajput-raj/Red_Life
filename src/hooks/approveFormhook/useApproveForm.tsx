import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { CampProps, CampSchema } from "@/schemas/camp.schemas";
import { useusersdataHook } from "@/context/user-values-updations";
import { CreateCampsqueries } from "@/actions/auth/camps";
import { toast } from "sonner";
import { useGetAllCampWorkFlow, useGetBlood_requests } from "@/actions/queries/user-queries";
import { ApproveFormProps, ApproveFormSchema } from "@/schemas/approveForm.schemas";
import { createAppointments } from "@/actions/auth/request";


export const useApproveAppointment = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [created , setCreated] = useState<boolean>(false);
  const {InstituteData} = useusersdataHook();
  const {data , isLoading, refetch , isRefetching} = useGetBlood_requests({id:InstituteData?.res[0]?.institution_id || 0});
  const methods = useForm<ApproveFormProps>({
    resolver: zodResolver(ApproveFormSchema),
    defaultValues: {
      date: new Date(),
     
    },
    mode: "onChange",
  });
  
  const onHandleSubmit = methods.handleSubmit(async (data: ApproveFormProps) => {
    
    try {
      
      setLoading(true);
      const res= await createAppointments({data , id:InstituteData?.res[0]?.institution_id || 0});
      if(res?.status===200){
        toast.success(res?.message);
        setCreated(true);
        refetch();
      }else if(res?.status===500){
        toast.error(res?.message);
      }
     
      methods.reset()
    } catch (error: any) {
      toast.error(error.message)
    } finally {
      setCreated(false);
      setLoading(false);
    }
  });

  return {
    methods,
    onHandleSubmit,
    loading,
    created,
    setCreated
   
  };
};
