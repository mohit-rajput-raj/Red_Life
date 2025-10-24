// useFormHooksProvider.ts
import { useDoctorForm } from "@/hooks/profile/useDoctorForm";
import { useWorkerForm } from "@/hooks/profile/useWorkerForm";

export const useFormHooksProvider = (key: string) => {
  switch (key) {
    case "Doctor":
      return useDoctorForm();
    
    
    default:
      throw new Error(`Unknown form key: ${key}`);
  }
};
