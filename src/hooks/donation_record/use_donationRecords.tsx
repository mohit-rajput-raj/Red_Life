import { CampProps } from "@/schemas/camp.schemas";
import { DonationRecordProps, DonationRecordsSchema } from "@/schemas/donationRecordsForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export const useDonationRecords =()=>{
    const [loading, setLoading] = useState<boolean>(false);
    const methods = useForm<DonationRecordProps>({
        resolver: zodResolver(DonationRecordsSchema),
        defaultValues: {
          person_id: 0,
            recipient_id: 0,
            camp_id: 0,
            institution_id: 0,
            blood_type: "",
            status: "",
        },
        mode: "onChange",
      });
    
      const onHandleSubmit = methods.handleSubmit(async(data)=>{
        try {
            setLoading(true)
            
        } catch (error) {
            console.log(error);
            toast.message("something is wrong in useDonationRecoards submistions");
            
        }finally{
            setLoading(false);
        }
      })
      return {
        loading,
        onHandleSubmit,
        methods
      }
}