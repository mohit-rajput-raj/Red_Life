'use server'
import { ca } from "date-fns/locale"
import {  dbMyAppoinments, getAllInstitutes, GetUserAddressById, GetUserByClerkId, getUserInstituteById, isProfileCompleted } from "../auth"
import { dbGetAllCampWorkFlow, dbGetBlood_requests, dbGetCampData, dbGetDonationRecord, dbGetMyRequests, dbSimplePerson, getInventoryByInstitution } from "../auth/camps"
// import { dbGetAllCampWorkFlow, dbGetCampData, dbGetDonationRecord } from "../auth/camps"
import { onCurrentUser } from "../user"


// export const is_profile_completed = async(user_id: number)=>{
//   try {

//     const res = await isProfileCompleted(user_id)
//     return {
//       status:200,
//       data:'current user institute fetching success',
//       res
//     }
//   } catch (error) {
//     console.log(error);
//   }
// }

export const GetMySimplePersonTable = async ({id}:{id:number}) =>{
  try {
    const res = await dbSimplePerson({id})
    if(res){
      return {
        status:200,
        message:'current user dbMyAppoinments fetching ssuccess',
        res
      }
    }
  }catch(error){
    console.log(error);
  }
}
export const GetBlood_requests = async ({id}:{id:number}) =>{
  try {
    const res = await dbGetBlood_requests({id})
    if(res){
      return {
        status:200,
        message:'current user dbGetAppointmentRecoards fetching ssuccess',
        res
      }
    }
  } catch (error) {
    console.log(error);
  }
}
export const GetDonationRecord = async (id: number) => {
  try {
    const res = await dbGetDonationRecord(id)
    if(res){
      return {
        status:200,
        message:'current user donation record fetching ssuccess',
        res
      }
    }
  }catch(error){
    console.log(error);
  }
}
export const GetCampData=async (id:number) =>{
  try {
    const res = await dbGetCampData(id)
    return {
      status:200,
      message:'current user institute fetching success',
      res
    }
  } catch (error) {
    console.log(error);
  }
}
export const getAllCampWorkFlow = async (id:number) => {
    try {
        const res = await dbGetAllCampWorkFlow(id)
        return {
          status:200,
          message:'current user institute fetching success',
          res
        }
      } catch (error) {
        console.log(error);
      }
}
export const GetMyRequests = async({id}:{id:number}) =>{
  try {
    const res = await dbGetMyRequests({id})
    if(res){
      return {
        status:200,
        message:'current user dbGetAppointmentRecoards fetching ssuccess',
        res
      }
    }
  } catch (error) {
    console.log(error);
  }
}
export const GetMyAppointments = async ({id}:{id:number}) =>{
  try {
    const res = await dbMyAppoinments({id})
    if(res){
      return {
        status:200,
        message:'current user dbGetAppointmentRecoards fetching ssuccess',
        res
      }
    }
  } catch (error) {
    console.log(error);
  }
    }
export const getAllInstitutionsName = async () => {
  try {
    const instuteData = await getAllInstitutes()
    if (instuteData){
      return {status:200,data:'current user institute fetching success',res:instuteData}
    }
    return {status:404,data:'Oops! something went wrong'}
  } catch (error) {
    return {status:500,data:'Internal server error'}
  }
}
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
export const getAllInventory = async () => {
  try {
    const inventory = await getInventoryByInstitution()
    if(inventory){
      return {status:200,data:'all inventory fetching success',res:inventory}
    }
  } catch (error) {
    console.log(error);
    
  }
}

export const getCurrentUserInstitute = async (id:number)=>{
  try {
    const instuteData = await getUserInstituteById(id)
    console.log(instuteData);
    
    if (instuteData){
      
      return {status:200,data:'current user institute fetching success',res:instuteData}
    }
    return {status:404,data:'Oops! something went wrong'}
    
  } catch (error) {
    return {status:500,data:'Internal server error'}
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



