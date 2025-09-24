import React from "react";

type Props = {
  children: React.ReactNode;
};

const layout = (props: Props) => {
  return (
    <div
      className="w-screen h-screen flex justify-center items-center p-20 "
      style={{
        backgroundImage: "url(/image.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        backgroundBlendMode: "darken",
      }}
    >
      <div className="w-[600px] ld:w-full flex flex-col items-start  p-6 justify-center  ">
        {props.children}
      </div>
      <div className="hidden lg:flex flex-1 w-full max-h-full max-w-4000px overflow-hidden relative  flex-col pt-10 pl-24 gap-3">
        <h2 className="text-white md:text-4xl font-bold">
          Hi, this is a platform for humanity
        </h2>
        <p className="text-gray-400 md:text-sm mb-10">
          life is a platform for save lifes
          <br />
          something never done before 😉
        </p>
      </div>
    </div>
  );
};

export default layout;
