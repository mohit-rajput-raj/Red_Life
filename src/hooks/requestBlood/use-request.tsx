import { setBloodRequest } from "@/actions/auth/request";
import { useusersdataHook } from "@/context/user-values-updations";
import { RequestBloodSchema , RequestBloodProps } from "@/schemas/request.schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export const useRequestForm = ({id}:{id:number}) => {
    const {usersData , simplePerson} = useusersdataHook();
    console.log(simplePerson);
    
    const [loading, setLoading] = React.useState(false);
const show = (vals:any) => {
    console.log(vals);
    
}
    const methods = useForm<RequestBloodProps>({
        resolver:zodResolver(RequestBloodSchema),
        defaultValues: {
            blood_type: simplePerson?.res?.blood_type || "",
            quantity: "",
            institution_id: String(id),
        },
        mode: "onChange",
    });
    const touched = methods.formState.touchedFields;
    console.log(touched);
    
    const onHandleSubmit = methods.handleSubmit(async (data:RequestBloodProps) => {
        try {
            setLoading(true);
            const res = await setBloodRequest({data  , personid:Number(usersData?.res?.user_id)});
            if(res?.status===200){
                methods.reset();
                toast.success("Request submitted successfully");
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    });
  return { methods, onHandleSubmit, loading , show};
};