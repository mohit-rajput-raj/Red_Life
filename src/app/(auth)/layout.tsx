import { LayoutTextFlipDemo } from "@/components/anmetedUI/sign-upText";
import { ModeToggle } from "@/components/theme/themeTogle";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const layout = (props: Props) => {
  return (
    <div
      className="w-screen  flex justify-center items-center p-20 "
      style={{
        backgroundImage: "url(/image.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        backgroundBlendMode: "darken",
      }}
    >
      <div className="w-[600px] ld:w-full flex flex-col items-start   justify-center backdrop-blur-md bg-white/30 dark:bg-zinc-900/30 rounded-lg shadow-lg">
        {props.children}
      </div>
      <div className="hidden lg:flex flex-1 w-full max-h-full max-w-4000px overflow-hidden relative  flex-col pt-10 pl-24 gap-3">
    <LayoutTextFlipDemo />

        <h2 className="text-white md:text-4xl font-bold">
          Hi, this is a platform for humanity
        </h2>

        <p className="text-gray-400 md:text-sm mb-10">
          life is a platform for save lifes
          <br />
          something never done before 😉
        </p>
        <ModeToggle/>
      </div>
    </div>
  );
};

export default layout;
