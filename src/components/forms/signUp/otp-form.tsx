"use client";
import OTPInput from "@/components/otp";
import React, { Dispatch, SetStateAction } from "react";

type Props = {
  setOTP: Dispatch<SetStateAction<string>>;
  onOTP: string;
};

const OTPForm = (props: Props) => {
  return (
    <>
      <h2 className="text-white md:text-4xl font-bold">Enter OTP</h2>
      <p className="text-gray-400 md:text-sm">
        Enter the one time password that was sent to your email.
      </p>
      {/* <div id="clerk-captcha"></div> */}
      <div>
        <OTPInput otp={props.onOTP} setOtp={props.setOTP} />
      </div>
    </>
  );
};

export default OTPForm;
