"use client";
import {
  useQueriesAppointments,
  useQueriesInstitutes,
  useQueriesRequests,
} from "@/actions/queries/user-queries";
import { SkeletonCard } from "@/components/spinner/profile-skeleton";
import { useusersdataHook } from "@/context/user-values-updations";
import React from "react";

type Props = {};

const page = (props: Props) => {
  const { usersData } = useusersdataHook();
  const { data, isLoading, refetch, isRefetching } = useQueriesRequests({
    id: usersData?.res?.user_id || 0,
  });
  if (isLoading || isRefetching) {
    return <SkeletonCard />;
  }
  console.log(data);

  return (
    <div className="card lg:card-side bg-base-100 shadow-sm flex flex-col p-3  rounded-md dark:bg-zinc-800 bg-slate-100 ">
        <div className="card-body w-full flex lg:flex-row flex-col items-center items-between px-10">
        <button className="rounded-md dark:bg-zinc-900 bg-white p-3" disabled={isRefetching} onClick={()=>refetch()}>Reload</button>
      </div>
      <div className="card-body w-full flex  flex-col items-center items-between px-10">
        {data?.res?.length === 0 ? (
          <p>No Requests Found</p>
        ) : (
          data?.res?.map((reqs: any) => (
            <div
              key={reqs.request_id}
              className="border-b w-full p-2 flex justify-between"
            >
              <div>
                <label>institution_id
: {reqs?.institution_id
}    </label>
                <h1>Quantity : {reqs?.quantity}</h1>
              </div>
              <div>
                <p>Status: {reqs.status}</p>
              </div>
              <div>
                {/* <button className="p-3" >
                    cancel request
                </button> */}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default page;
