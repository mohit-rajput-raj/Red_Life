import { chunkedInsert, getInsertedUsers } from "@/actions/auth/camps";
import { generateDummyUsers, generateSimplePersons } from "./[wid]/generate_blood-records";

export const generatSimpleUsers  =async ()=>{
    const users = generateDummyUsers(500);
  
  
  await chunkedInsert(
    "users",
    ["fullname", "clerk_id", "user_type", "email"],
    users
  );
  const clerkIds = users.map((u) => u.clerk_id);
  const insertedUsers = await getInsertedUsers(clerkIds);
    const simplePersons = generateSimplePersons(JSON.parse(JSON.stringify(insertedUsers)));
  
    await chunkedInsert(
      "simple_person",
      [
        "person_id",
        "blood_type",
        "medical_conditions",
        "last_donation_date",
        "total_donations",
      ],
      simplePersons
    );
}