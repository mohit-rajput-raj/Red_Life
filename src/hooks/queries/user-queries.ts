import { getCurrentUser } from "@/actions/automations"
import { useQuery } from "@tanstack/react-query"

export const useQueryUsersData = (id: string) => {
  return useQuery({
    queryKey: ['current-user'],
    queryFn: () => getCurrentUser(id),
    staleTime:60000,
    refetchOnWindowFocus:false,
    
    enabled:!!id,
  })
}