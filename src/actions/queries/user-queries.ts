import {
  getAllCampWorkFlow,
  getAllInstitutionsName,
  getAllInventory,
  GetBlood_requests,
  GetCampData,
  getCurrentUser,
  getCurrentUserAddress,
  getCurrentUserInstitute,
  GetDonationRecord,
  GetMyAppointments,
  GetMyRequests,
  GetMySimplePersonTable,
} from "@/actions/automations";
import { useQuery } from "@tanstack/react-query";
import { use } from "react";
import { getBloodGroup } from "../auth/camps";
export const useQuerieSimple = ({ id }: { id: number }) => {
  return useQuery({
    queryKey: ["Simple_person", id],
    queryFn: () => GetMySimplePersonTable({ id }),
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    enabled: !!id,
  });
}
export const useGetBlood_requests = ({ id }: { id: number }) => {
  return useQuery({
    queryKey: ["Appointment_record ", id],
    queryFn: () => GetBlood_requests({ id }),
    staleTime: 20000,
    refetchOnWindowFocus: false,
    enabled: !!id,
  });
};
export const useQuerigetBloodGroup = ({ id }: { id: number }) => {
  return useQuery({
    queryKey: ["GetBlood_Type ", id],
    queryFn: () => getBloodGroup({ id }),
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    enabled: !!id,
  });
}
export const useDonationRecord = (id: number) => {
  return useQuery({
    queryKey: ["Donation_record ", id],
    queryFn: () => GetDonationRecord(id),
    staleTime: 2000000,
    refetchOnWindowFocus: false,
    enabled: !!id,
  });
};

export const useGetCampData = (id: number) =>{

  return useQuery({
    queryKey: ["camp-data", id],
    queryFn: () => GetCampData(id),
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    enabled: !!id,
  })};

export const useGetAllCampWorkFlow = (id: number) => {
  console.log(id,"lalala");
  
  return useQuery({
    queryKey: ["camp-workflow", id],
    queryFn: () => getAllCampWorkFlow(id),
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    enabled: !!id,
  });
};
export const useQueryUsersData = (id: string) => {
  return useQuery({
    queryKey: ["current-user", id],
    queryFn: () => getCurrentUser(id),
    staleTime: Infinity,
    refetchOnWindowFocus: false,

    enabled: !!id,
  });
};

export const useQueryUsersAddress = (id: number) => {
  return useQuery({
    queryKey: ["address-data"],
    queryFn: () => getCurrentUserAddress(id),
    staleTime: Infinity,
    refetchOnWindowFocus: false,

    enabled: !!id,
  });
};
export const useQueryAllInventory = () =>{
  return useQuery({
    queryKey: ["all-inventory-data"],
    queryFn: () => getAllInventory(),   
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
}
export const useQueryInstituteData = (id: number) => {
  return useQuery({
    queryKey: ["institute-data"],
    queryFn: () => getCurrentUserInstitute(id),
    staleTime: Infinity,
    refetchOnWindowFocus: false,

    enabled: !!id,
  });
};

export const useQueriesInstitutes = <T = any>() => {
  return useQuery({
    queryKey: ["institute-data"],
    queryFn: () => getAllInstitutionsName(),
    staleTime: 2000000,
    refetchOnWindowFocus: false,
  });
};
export const useQueriesAppointments =<T = any>({id}:{id:number})=>{
  return useQuery({
    queryKey: ["all-appointments" , id],
    queryFn: () => GetMyAppointments({id}),
    staleTime: 2000000,
    refetchOnWindowFocus: false,
  });
}
export const useQueriesRequests = ({id}:{id:number})=>{
  return useQuery({
    queryKey: ["all-my-requests"],
    queryFn: () => GetMyRequests({id}),
    staleTime: 2000000,
    refetchOnWindowFocus: false,
    enabled: !!id,
  });
}


