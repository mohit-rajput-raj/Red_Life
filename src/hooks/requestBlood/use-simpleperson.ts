import { insertSimpleperson, setBloodRequest } from "@/actions/auth/request";
import { useusersdataHook } from "@/context/user-values-updations";
import { RequestBloodSchema , RequestBloodProps, simplePersonSchema, SimplePersonProps } from "@/schemas/request.schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export const useSimplePerson = () => {
    const {usersData , refetchUserData} = useusersdataHook();
    const [loading, setLoading] = React.useState(false);
const show = (vals:any) => {
    console.log(vals);
    
}
    const methods = useForm<SimplePersonProps>({
        resolver:zodResolver(simplePersonSchema),
        defaultValues: {
            blood_type: "",
            medical_conditions: "",
        },
        mode: "onChange",
    });
    const touched = methods.formState.touchedFields;
    console.log(touched);
    const [op , setop ] = React.useState(false);
    const onHandleSubmit = methods.handleSubmit(async (data:SimplePersonProps) => {
        try {
            setLoading(true);
            const res = await insertSimpleperson({data , personid:Number(usersData?.res?.user_id)});
            if(res?.status===200){
                setop(false);
                methods.reset();
                refetchUserData();
                toast.success("Request submitted successfully");
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    });
  return { methods, onHandleSubmit, loading , show , op , setop  };
};