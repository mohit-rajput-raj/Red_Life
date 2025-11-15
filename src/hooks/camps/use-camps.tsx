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
  const {InstituteData} = useusersdataHook();
  const [created, setShouldClose] = useState(false);
  const { refetch} = useGetAllCampWorkFlow(usersData?.res?.user_id ?? 0);
  const today = new Date();
  
const threeMonthsLater = new Date();
threeMonthsLater.setMonth(today.getMonth() + 3);
  const methods = useForm<CampProps>({
    resolver: zodResolver(CampSchema),
    defaultValues: {
      name: "",
      date: today,
      end_date: threeMonthsLater,
      institution_id: InstituteData?.res[0]?.institution_id.toString() || "",
      organized_by: usersData?.res?.user_id.toString() || "",
      address_line1: "",
      city: "",
      state: "",
      country: "",
      postalCode: "",

      about: "",
    },
    mode: "onChange",
  });
  const show = () => {
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
