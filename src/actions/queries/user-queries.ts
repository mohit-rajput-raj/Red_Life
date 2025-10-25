import { getAllCampWorkFlow, getAllInstitutionsName, GetCampData, getCurrentUser, getCurrentUserAddress, getCurrentUserInstitute, GetDonationRecord } from "@/actions/automations"
import { useQuery } from "@tanstack/react-query"
import { use } from "react"



export const useDonationRecord  =(id:number) =>{
  
  return useQuery({
    queryKey: ['Donation_record ', id],
    queryFn: () => GetDonationRecord (id),
    staleTime: 200000,
    refetchOnWindowFocus: false,
    enabled: !!id,
  });
}

export const useGetCampData = (id: number) =>
  useQuery({
    queryKey: ['camp-data', id],
    queryFn: () => GetCampData(id),
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    enabled: !!id,
  });

export const useGetAllCampWorkFlow = (id:number) => {
  
    return useQuery({
        queryKey: ['camp-workflow', id],
        queryFn: () =>getAllCampWorkFlow(id),
        staleTime:Infinity,
        refetchOnWindowFocus:false,
        enabled:!!id,
    })
}
export const useQueryUsersData = (id: string) => {
  return useQuery({
    queryKey: ['current-user'],
    queryFn: () => getCurrentUser(id),
    staleTime:Infinity,
    refetchOnWindowFocus:false,
    
    enabled:!!id,
  })
}

export const useQueryUsersAddress = (id: number) => {
  return useQuery({
    queryKey: ['address-data'],
    queryFn: () => getCurrentUserAddress(id),
    staleTime:Infinity,
    refetchOnWindowFocus:false,
    
    enabled:!!id,
  })
}
export const useQueryInstituteData = (id: number) => {
  return useQuery({
    queryKey: ['institute-data'],
    queryFn: () => getCurrentUserInstitute(id),
    staleTime:Infinity,
    refetchOnWindowFocus:false,
    
    enabled:!!id,
  })
}

export  const useQueriesInstitutes = <T= any>() =>{
  staleTime:20000
  return useQuery({queryKey: ['institute-data'],queryFn:()=> getAllInstitutionsName(),staleTime:20000,refetchOnWindowFocus:false,})

}


