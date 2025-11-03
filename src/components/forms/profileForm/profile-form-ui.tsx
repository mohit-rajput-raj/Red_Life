import React from "react";
import UsersProfileData from "@/components/profile/usersdata-profile";
import FormGenerator from "../form-generatoe";
import { useFormContext } from "react-hook-form";
import { USER_PROFILE_FORM } from "@/constants/forms";
import { useusersdataHook } from "@/context/user-values-updations";
import { UsersData } from "@/types/pgType";

type Props = {};

const ProfileFormUi = ({ usersData }: { usersData: UsersData }) => {
  const {
    register,
    formState: { errors },
    setValue,
  } = useFormContext();
  const {updateLoading} = useusersdataHook();
  const field = USER_PROFILE_FORM[3];
  if(updateLoading){
    return <div className="p-4 border rounded-md *:bg-gray-800 flex-wrap w-full">Updating...</div>
  }
  return (
    <>
      <figure className="p-1 rounded-sm border border-gray-700 flex sm:flex-row flex-col">
        {/* <img
          src="https://media.istockphoto.com/id/1372002650/photo/cropped-portrait-of-an-attractive-young-female-doctor-standing-with-her-arms-folded-in-the.jpg?s=612x612&w=0&k=20&c=o1QtStNsowOU0HSof6xQ_jZMglU8ZK565gHd655U6S4="
          alt="Album"
        /> */}
        <div>
          {usersData?.res?.profile_image ? (
            <img
              src={usersData?.res?.profile_image}
              className="w-[200px] h-[200px] object-cover rounded-full"
            />
            ) :<> </>}
            <FormGenerator
          key={field.id}
          {...field}
          errors={errors}
          register={register}
          name={field.name}
        />
        </div>
        

        <div className="w-full h-full">
          <UsersProfileData
            classname="gap-3"
            UsersData={usersData}
            phone={"90909090990"}
            dob={"12/12/12"}
            gender={"male"}
          />
        </div>
      </figure>
    </>
  );
};

export default ProfileFormUi;
