import { getCurrentUser, getCurrentUserAddress, getCurrentUserInstitute } from "@/actions/automations"
import { useQuery } from "@tanstack/react-query"

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