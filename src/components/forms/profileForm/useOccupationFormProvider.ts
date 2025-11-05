import { useDoctorForm } from "@/hooks/profile/useDoctorForm";
import { useWorkerForm } from "@/hooks/profile/useWorkerForm";

export const useOccupationFormProvider = ({ occupation }: { occupation: string }) => {
  const doctorResult = useDoctorForm();
  const workerResult = useWorkerForm();

  return occupation === "Worker" ? workerResult : doctorResult;
};
