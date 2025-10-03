'use server'
import { GetUserAddressById, GetUserByClerkId } from "../auth"
import { onCurrentUser } from "../user"

export const getCurrentUser = async (id?: string) => {
  const user = await onCurrentUser()
  try {
    const userData = await GetUserByClerkId(user.id)
    if (userData){
        return { status: 200, data: "current user fetching success" , res: userData }
    }
    return { status: 404, data: 'Oops! something went wrong' }
  } catch (error) {
    return { status: 500, data: 'Internal server error' }
  }
}



export const getCurrentUserAddress = async (id: number) => {
    if(id===0){
        return { status: 200, data: "No address found" , res: null }
    }
    try {
      const userData = await GetUserAddressById(id)
      if (userData){
          return { status: 200, data: "Address fetching success" , res: userData }
      }
      return { status: 404, data: 'Oops! something went wrong' }
    } catch (error) {
      
    }
    }