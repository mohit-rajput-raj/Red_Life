export const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const donationStatuses = ["completed", "pending", "expired"];
import {
  chunkedInsert,
  getDatesOfCamp,
  getInsertedUsers,
  getSimplePersons,
  InsertInventoryRecords,
} from "@/actions/auth/camps";
import { useusersdataHook } from "@/context/user-values-updations";
import { v4 as uuidv4 } from "uuid";

export const randomItem = <T>(arr: T[]) =>
  arr[Math.floor(Math.random() * arr.length)];
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

// export const generateDonationRecords = (
//   persons: { person_id: number }[],
//   campIds: number[],
//   institutionIds: number[],
//   validDates: any,
//   count: number
// ) => {
//   const randomItem = <T,>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];

//   const randomDate = (start: Date, end: Date) => {
//     const s = start.getTime();
//     const e = end.getTime();
//     const randomTime = s + Math.random() * (e - s + 1);
//     return new Date(randomTime);
//   };

//   const resolveRangeForCamp = (campId: number) => {
//     if (Array.isArray(validDates)) {
//       const found = validDates.find((c: any) => Number(c.camp_id) === Number(campId));
//       if (found) {
//         const d = found.data ?? found;
//         return { start: new Date(d.date), end: new Date(d.end_date) };
//       }
//       return null;
//     }
//     if (validDates && typeof validDates === "object") {
//       const d = validDates.data ?? validDates;
//       return { start: new Date(d.date), end: new Date(d.end_date) };
//     }

//     return null;
//   };

//   return Array.from({ length: count }, () => {
//     const donor = randomItem(persons);
//     const recipient = Math.random() > 0.7 ? randomItem(persons) : null;

//     const campId = randomItem(campIds);
//     const range = resolveRangeForCamp(campId);

//     let donationDate = new Date();
//     if (range) {
//       const { start, end } = range;
//       if (!isNaN(start.getTime()) && !isNaN(end.getTime()) && end.getTime() >= start.getTime()) {
//         donationDate = randomDate(start, end);
//       }
//     }

//     return {
//       person_id: donor.person_id,
//       recipient_id: recipient ? recipient.person_id : null,
//       camp_id: campId,
//       institution_id: randomItem(institutionIds),
//       date: donationDate,
//       blood_type: randomItem(bloodTypes),
//       status: randomItem(donationStatuses),
//     };
//   });
// };

// ----------------------
// Generate Donation Records
// ----------------------
type Inventory = {
  units: number;
  blood_type: string;
};
export const generateDonationRecords = (
  persons: { person_id: number }[],
  campIds: number[],
  institutionIds: number[],
  validDates: { date: string | Date; end_date: string | Date },
  count: number
) => {
  const randomItem = <T>(arr: T[]) =>
    arr[Math.floor(Math.random() * arr.length)];

  const randomDate = (start: Date, end: Date) => {
    const startMs = start.getTime();
    const endMs = end.getTime();

    if (isNaN(startMs) || isNaN(endMs) || endMs <= startMs) {
      return start;
    }

    const randomMs = startMs + Math.random() * (endMs - startMs);
    return new Date(randomMs);
  };
  const inventory: Inventory[] = [
    {
      units: 0,
      blood_type: "A+",
    },
    {
      units: 0,
      blood_type: "A-",
    },
    {
      units: 0,
      blood_type: "B+",
    },
    {
      units: 0,
      blood_type: "B-",
    },
    {
      units: 0,
      blood_type: "AB+",
    },
    {
      units: 0,
      blood_type: "AB-",
    },
    {
      units: 0,
      blood_type: "O+",
    },
    {
      units: 0,
      blood_type: "O-",
    },
  ];
  const records =  Array.from({ length: count }, () => {
    const donor = randomItem(persons);
    const recipient = Math.random() > 0.7 ? randomItem(persons) : null;

    const campId = randomItem(campIds);
    const institutionId = randomItem(institutionIds);

    const start = new Date(validDates.date);
    const end = new Date(validDates.end_date);

    const donationDate = randomDate(start, end);
    const bt = randomItem(bloodTypes);
    inventory.forEach((inv) => {
      if (inv.blood_type === bt) {
        inv.units += 1;
      }
    });
    return {
      person_id: donor.person_id,
      recipient_id: recipient ? recipient.person_id : null,
      camp_id: campId,
      institution_id: institutionId,
      date: donationDate,
      blood_type: bt,
      status: randomItem(donationStatuses),
      
    };
  });
  return { records , inventory };
};

export const generatDonationsRecors = async ({
  id,
  iid,
  data,
}: {
  id: number;
  iid: number;
  data: any;
}) => {
  console.log(iid);
  // return;
  
  const simplePersons = (await getSimplePersons()) ?? [];

  if (simplePersons.length === 0) {
    throw new Error("No simple persons found for camp generation");
  }

  const campIds = [id];
  const institutionIds = [iid];

  const { records: donationRecords  , inventory} = generateDonationRecords(
    simplePersons as any[],
    campIds,
    institutionIds,
    { date: data?.res?.date, end_date: data?.res?.end_date },
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
  await InsertInventoryRecords({ iid, inventory });
};
