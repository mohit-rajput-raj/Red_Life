import { DoctorFormProps, StaffFormProps } from "@/schemas/institute.schemas";

export interface User {
  user_id: number;
  clerk_id: string;
  name: string;
  email: string;
  phone: string;
  dob: string;
  gender: string;
  blood_type: string;
}
export type usersdata = {
  dob: Date;
  gender: string;
  phone: string;
  profile_image?: string;
};
export type UsersData = {
  status: number;
  data: string;
  res: {
    user_id: number;
    clerk_id: string;
    fullname: string;
    email: string;
    password: string;
    phone: string;
    dob: Date | string;
    gender: string;
    profile_image: string | null;
    is_profile_completed: boolean;
    address_id: number | null;
    user_type: "docs" | "user";
  };
};
// Represents a single institution
export type InstitutionItem = {
  institution_id: number;
  name: string;
  image: string | null;
  type: "Hospital" | "BloodBank" | "StorageCenter";
  address_id: number;
  contact_no: string;
  managed_by: number;
};

// Represents your API response
export type InstitutionResponse = {
  res: InstitutionItem[];
};

export type usersaddressdata = {
  address_line1: string;
  address_line2: string | null;
  city: string;
  state: string;
  country: string;
  postal_code: string;
}
export type UsersAddessData = {
  status: number;
  data: string;
  res: {
    address_id: number;           
  address_line1?: string;   
  address_line2?: string | null;       
  area?: string;                
  city: string;      
  district?: string; 
  state: string;               
  country?: string;             
  postal_code?: string,
  latitude?: number;            
  longitude?: number;           
  timezone?: string; 
  };
};
