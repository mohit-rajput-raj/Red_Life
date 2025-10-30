'use client'
import { useState } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateHospitalFormProps, CeateHospitalFormSchema } from "@/schemas/institute.schemas";
import { createInstitution } from "@/actions/auth";
import { useusersdataHook } from "@/context/user-values-updations";
import { set } from "zod";
import { useQueryInstituteData } from "@/actions/queries/user-queries";
export const useCreateInstitute = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [created , serCreated] = useState<boolean>(false);
    const {usersData} = useusersdataHook();
   const {refetch , isRefetching} = useQueryInstituteData(usersData?.res?.user_id || 0);
    const showpopup = () => {
      console.log(methods.getValues());
      

        
    }
    const methods = useForm<CreateHospitalFormProps >({
        resolver: zodResolver(CeateHospitalFormSchema),
        defaultValues: {
            // type:"Hospital",
            // name: "vyas",
            // address_line1: "yoyo sdfsdfsdf",
            // city: "gwalior",
            // state: "mp",
            // country: "india",
            // postal_code: "66987",
            // contact_no: "9089786756",
            type:"Hospital",
            name: "",
            address_line1: "",
            city: "",
            state: "",
            country: "",
            postal_code: "7",
            contact_no: "",
        },
        
        mode: 'onChange',
    });
    const onHandleSubmit = methods.handleSubmit(async (formData: CreateHospitalFormProps) => {
        console.log(formData);
        
        try {
            console.log("running");
            
            setLoading(true);
            const managed_by = usersData?.res?.user_id?.toString();
            const response = await createInstitution({
                data: formData,
                managed_by: managed_by || ""
            });
            console.log(response);
            
            if(response?.status === 200) {
                serCreated(true);
                console.log(created , "hahahahaha");
                refetch();
                methods.reset();
                toast.success("Institute created successfully!");
            }
        } catch (error) {
            console.error("Profile update error:", error);
            toast.error("An error occurred while creating the institute.");
        } finally {
            setLoading(false);
        }
    });
    
    return {methods, onHandleSubmit, loading, showpopup, created};
    
    
}