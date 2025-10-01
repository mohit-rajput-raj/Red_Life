import React from "react";
import { DocoroOrOther } from "./work-field-selector";

type Props = {};

const ProfileFormUi = (props: Props) => {
  return (
    <>
      <figure className="p-1 rounded-sm border border-gray-700">
        <img
          src="https://img.daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.webp"
          alt="Album"
        />
      </figure>
      <div className="card-body">
        <div>
          {/* <DocoroOrOther/> */}
        </div>
      </div>
    </>
  );
};

export default ProfileFormUi;
