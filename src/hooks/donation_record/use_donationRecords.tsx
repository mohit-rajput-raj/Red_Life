import { insertDonationRecord } from "@/actions/auth/camps";
import { useDonationRecord } from "@/actions/queries/user-queries";
import { CampProps } from "@/schemas/camp.schemas";
import { DonationRecordProps, DonationRecordsSchema } from "@/schemas/donationRecordsForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export const useDonationRecords =({id ,c}:{id:number ,c:number})=>{
    const [loading, setLoading] = useState<boolean>(false);
    const {
        isRefetching: drRefatching,
        refetch: donationRefetch,
      } = useDonationRecord(c);
    const methods = useForm<DonationRecordProps>({
        resolver: zodResolver(DonationRecordsSchema),
        defaultValues: {
          person_id: "",
            recipient_id: "",
            camp_id: c,
            institution_id: id,
            blood_type: "",
            status: "done",
        },
        mode: "onChange",
      });
    
      const onHandleSubmit = methods.handleSubmit(async(data)=>{
        try {
            setLoading(true)
            const res = await insertDonationRecord({data});
            if(res?.status===200){
                toast.success(res?.message);
                console.log(res);
                
            methods.reset();
            // donationRefetch();
            }else if(res?.status===500){
                toast.error(res?.message);
            }
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