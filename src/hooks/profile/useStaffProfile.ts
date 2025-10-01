'use client'

import { StaffProps, StaffSchema } from "@/schemas/docs.schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";



export const useStaffProfile = () => {
    const [loading, setLoading] = React.useState(false);
    const methods = useForm<StaffProps>({
        resolver: zodResolver(StaffSchema),
        defaultValues:{
            role: 'Other'
        },
        mode: "onChange",})
    
    const onHandleSubmit = methods.handleSubmit(async(data)=>{
        try{
            setLoading(true);
        }catch(error){
            console.error("Profile update error:", error);
            toast.error("An error occurred while updating the profile.");
        }finally{
            setLoading(false);
        }
    })



    return{
        methods,
        loading,
        onHandleSubmit
    }
}