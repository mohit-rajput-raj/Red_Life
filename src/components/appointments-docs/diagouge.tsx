import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { FieldDemo } from "./setAppointmentFormUi"
import AppontmentFormProvider from "../forms/appointmentapprove/AppointmentFormApprove"
import { cn } from "@/lib/utils"
import { useApproveAppointment } from "@/hooks/approveFormhook/useApproveForm"

export const AlertDialogDemo=({id,email ,person_id}:{id:string ,email:string ,person_id:string})=> {
  const { created , setCreated} = useApproveAppointment();
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Fix Appontment</Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="dark:bg-zinc-800">
        <AppontmentFormProvider>
          <Created>
            
        <AlertDialogHeader>
          <AlertDialogTitle>Fixing Appontment</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
          <FieldDemo id={id} email={email} person_id={person_id}/>
        </AlertDialogHeader>
          </Created>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={()=>setCreated(false)} className="dark:bg-zinc-800">Cancel</AlertDialogCancel>
          <button disabled={created} className="dark:bg-zinc-800 dark:text-white" type="submit">approve</button>
          {/* <AlertDialogAction className="dark:bg-zinc-800 dark:text-white" >Approve</AlertDialogAction> */}

        </AlertDialogFooter>
        </AppontmentFormProvider>
      </AlertDialogContent>
    </AlertDialog>
  )
}


const Created =({children , created , className}:{children:React.ReactNode , created?:boolean , className?:string})=>{
  if (created) {
    return (
      <div className={cn(className || 'w-full py-5 flex justify-center')}>
        <div className='flex p-3'>
          <h1>
            <b>Form submited , u can close the form , </b>
          </h1>
        </div>
      </div>
    )
  }
  return <>
  {children}</>
}
