import {
  getAllCampWorkFlow,
  getAllInstitutionsName,
  GetBlood_requests,
  GetCampData,
  getCurrentUser,
  getCurrentUserAddress,
  getCurrentUserInstitute,
  GetDonationRecord,
} from "@/actions/automations";
import { useQuery } from "@tanstack/react-query";
import { use } from "react";

export const useGetBlood_requests = ({ id }: { id: number }) => {
  return useQuery({
    queryKey: ["Appointment_record ", id],
    queryFn: () => GetBlood_requests({ id }),
    staleTime: 200000,
    refetchOnWindowFocus: false,
    enabled: !!id,
  });
};
export const useDonationRecord = (id: number) => {
  return useQuery({
    queryKey: ["Donation_record ", id],
    queryFn: () => GetDonationRecord(id),
    staleTime: 200000,
    refetchOnWindowFocus: false,
    enabled: !!id,
  });
};

export const useGetCampData = (id: number) =>
  useQuery({
    queryKey: ["camp-data", id],
    queryFn: () => GetCampData(id),
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    enabled: !!id,
  });

export const useGetAllCampWorkFlow = (id: number) => {
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


