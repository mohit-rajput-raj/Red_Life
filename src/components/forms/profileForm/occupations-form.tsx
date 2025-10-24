import { Occupation } from "@/components/fields/occupation-selection";
import {
  Modal,
  ModalContent,
  ModalFooter,
  ModalTrigger,
  ProfileModalBody,
} from "@/components/ui/animated-modal";
import { DoctorForm, WorkerForm } from "@/constants/doctor-worker-form";
import { UsersData } from "@/types/pgType";
import { DoctorFormProvider, WorkerFormProvider } from "./profile-setup-drawer";
import { Institutions } from "@/components/fields/instititution-field";
import OccupationFormProvider from "./complete-occupation-form-provider";
import { ResponsisProfile } from "./responsis-profile";
import { useFormHooksProvider } from "@/components/forms-hooks-provider.tsx/form-hooks-provider";
import FormGenerator from "../form-generatoe";
import { peoples } from "@/schemas/docs.schemas";
import { RegisterOptions, UseFormRegisterReturn } from "react-hook-form";

export function OccupationsForm({
  usersData,
  occupation,
  setOccupation,
  
}: {
  usersData: UsersData;
  occupation: string;
  setOccupation: React.Dispatch<React.SetStateAction<string>>;
}) {
  const { show } = useFormHooksProvider(occupation);
  return (
    <div className="flex items-center justify-center w-full dark:text-zinc-300">
      <Modal>
        <ModalTrigger className="bg-zinc-100 dark:bg-zinc-800 dark:text-white text-black flex justify-center group/modal-btn ">
          <span className="group-hover/modal-btn:translate-x-40 text-center transition duration-500">
            Complete ooc
          </span>
          <div className="-translate-x-40 group-hover/modal-btn:translate-x-0 flex items-center justify-center absolute inset-0 transition duration-500 text-white z-20">
            click
          </div>
        </ModalTrigger>

        <ProfileModalBody>
          <OccupationFormProvider occupation={occupation}>
            <div className="w-full">
              <ModalContent>
                {usersData?.res?.phone && (
                  <div className="w-full flex  gap-4 p-4">
                    <div className="w-1/2 flex flex-col gap-4 p-4">
                      <Occupation setOccupation={setOccupation}
                       />
                     
                      {occupation === "Doctor" ? (
                        <DoctorFormProvider DoctorForm={DoctorForm} />
                      ) : (
                        <WorkerFormProvider WorkerForm={WorkerForm} />
                      )}

                      {Institutions(occupation)}
                    </div>
                    <ResponsisProfile />
                  </div>
                )}
              </ModalContent>
              <ModalFooter className="gap-4 w-full">
                {
                  <button
                    onClick={show}
                    // type="submit"
                    className="bg-black text-white dark:bg-white dark:text-black text-sm px-2 py-1 rounded-md border border-black w-28"
                  >
                    done
                  </button>
                }
              </ModalFooter>
            </div>
          </OccupationFormProvider>
        </ProfileModalBody>
      </Modal>
    </div>
  );
}
