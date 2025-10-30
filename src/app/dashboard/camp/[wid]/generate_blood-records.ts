export const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const donationStatuses = ["completed", "pending", "expired"];
import { chunkedInsert, getDatesOfCamp, getInsertedUsers, getSimplePersons } from "@/actions/auth/camps";
import { useusersdataHook } from "@/context/user-values-updations";
import { v4 as uuidv4 } from "uuid";

export const randomItem = <T>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];
const randomDate = (start: Date, end: Date) =>
  new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
const firstNames = [
  "Mohit",
  "Ananya",
  "Rohan",
  "Priya",
  "Amit",
  "Sneha",
  "Karan",
  "Isha",
  "Raj",
  "Simran",
];
const lastNames = [
  "Sharma",
  "Verma",
  "Patel",
  "Gupta",
  "Singh",
  "Kaur",
  "Mehta",
  "Chopra",
  "Kapoor",
  "Joshi",
];

export const generateDummyUsers = (count: number) => {
  return Array.from({ length: count }, () => {
    const first = randomItem(firstNames);
    const last = randomItem(lastNames);
    const fullname = `${first} ${last}`;
    return {
      fullname,
      clerk_id: uuidv4() + Math.floor(Math.random() * 100),
      user_type: "user",
      email: `${first.toLowerCase()}.${last.toLowerCase()}.${uuidv4().slice(
        0,
        6
      )}@example.com`,
    };
  });
};
export const generateSimplePersons = (users: { user_id: number }[]) => {
  return users.map((u) => ({
    person_id: u.user_id,
    blood_type: randomItem(bloodTypes),
    medical_conditions: "None",
    last_donation_date: randomDate(new Date(2022, 0, 1), new Date()),
    total_donations: Math.floor(Math.random() * 10),
  }));
};
type Dates = { camp_id: number; date: string; end_date: string };

export const generateDonationRecords = (
  persons: { person_id: number }[],
  campIds: number[],
  institutionIds: number[],
  validDates: { camp_id: number; date: string | Date; end_date: string | Date }[],
  count: number
) => {
  console.log(persons);
  
  const randomDate = (start: Date, end: Date) => {
    const startTime = start.getTime();
    const endTime = end.getTime();
    const randomTime = startTime + Math.random() * (endTime - startTime);
    return new Date(randomTime);
  };

  return Array.from({ length: count }, () => {
    const donor = randomItem(persons);
    const recipient = Math.random() > 0.7 ? randomItem(persons) : null;

    const campId = randomItem(campIds);
    const campDate = validDates.find((c) => c.camp_id === campId);

    const donationDate =
      campDate && campDate.date && campDate.end_date
        ? randomDate(new Date(campDate.date), new Date(campDate.end_date))
        : new Date();

    return {
      person_id: donor.person_id,
      recipient_id: recipient ? recipient.person_id : null,
      camp_id: campId,
      institution_id: randomItem(institutionIds),
      date: donationDate,
      blood_type: randomItem(bloodTypes),
      status: randomItem(donationStatuses),
    };
  });
};


export const generatDonationsRecors = async ({id, iid}:{id:number, iid:number}) => {


 

  const simplePersons = (await getSimplePersons()) ?? [];

  if (simplePersons.length === 0) {
    throw new Error("No simple persons found for camp generation");
  }
  
  const campIds = [id]; 

  
  const institutionIds = [iid]; 
  const validDtes = await getDatesOfCamp({ ids: institutionIds });
  const donationRecords = generateDonationRecords(
    simplePersons as any[],
    campIds,
    institutionIds,
    validDtes,
    2000
  );

  await chunkedInsert(
    "donation_record",
    [
      "person_id",
      "recipient_id",
      "camp_id",
      "institution_id",
      "date",
      "blood_type",
      "status",
    ],
    donationRecords
  );

};
