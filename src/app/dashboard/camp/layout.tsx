
// import router from "next/router";
import React, { use } from "react";

type Props = {
  children: React.ReactNode;
  params: { role: string; wid: string };
};

const layout = async (props: Props) => {
  const routeParams = await Promise.resolve(props.params);
  return (
    <div className="flex flex-col gap-4 h-[400px] pb-20 w-100%">
     
      {props.children }
    </div>
  );
};

export default layout;
