import { chunkedInsert, getSimplePersons } from "@/actions/auth/camps";
import { randomItem } from "@/app/dashboard/camp/[wid]/generate_blood-records";
// import { randomItem } from "@/lib/utils";

export const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
export const requestStatuses = ["pending", "approved", "rejected"];

type Person = { person_id: number };

const generateBloodRequests = (
  persons: Person[],
  institutionIds: number[],
  count: number
) => {
  return Array.from({ length: count }, () => {
    const donor = randomItem(persons);
    const institution_id = randomItem(institutionIds);

    return {
      person_id: donor.person_id,
      institution_id,
      blood_type: randomItem(bloodTypes),
      quantity: Math.floor(Math.random() * 5) + 1,
      status: randomItem(requestStatuses),
    };
  });
};

export const generateBloodRequestsRecords = async ({id}:{id:number}) => {
  const persons = (await getSimplePersons()) || []; 
  console.log( persons);
  if (persons.length === 0) {
    console.log("No donors found.");
    return;
  }
  const institutionIds = [id];

  const bloodRequests = generateBloodRequests(persons, institutionIds, 500);

  await chunkedInsert(
    "blood_request",
    ["person_id", "institution_id", "blood_type", "quantity", "status"],
    bloodRequests
  );

  console.log("Generated blood requests:", bloodRequests.length);
};
