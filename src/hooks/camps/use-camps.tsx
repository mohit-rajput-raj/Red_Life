import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { CampProps, CampSchema } from "@/schemas/camp.schemas";
import { useusersdataHook } from "@/context/user-values-updations";
import { CreateCampsqueries } from "@/actions/auth/camps";
import { toast } from "sonner";
import { useGetAllCampWorkFlow } from "@/actions/queries/user-queries";

export const useCampsCreator = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { usersData } = useusersdataHook();
  const [created, setShouldClose] = useState(false);
  const { refetch} = useGetAllCampWorkFlow(usersData?.res?.user_id ?? 0);
  const methods = useForm<CampProps>({
    resolver: zodResolver(CampSchema),
    defaultValues: {
      name: "",
      date: new Date(),
      end_date: new Date(),
      institution_id: "",
      organized_by: "",
      address_line1: "",
      city: "",
      state: "",
      country: "",
      postalCode: "",

      about: "this is for donation",
    },
    mode: "onChange",
  });
  const show = () => {
    // console.log(methods.watch());
    setShouldClose(true)
  };
  const onHandleSubmit = methods.handleSubmit(async (data: CampProps) => {
    
    try {
      
      setLoading(true);
      const res:any= await CreateCampsqueries(data);
      if(res.status===200){
        setShouldClose(true)
        toast.success(res.message)
        refetch();
      }
      methods.reset()
      console.log(res);
    } catch (error: any) {
      toast.error(error.message)
    } finally {

      setLoading(false);
    }
  });

  return {
    methods,
    onHandleSubmit,
    loading,
    show,
    created,
    setShouldClose
  };
};
