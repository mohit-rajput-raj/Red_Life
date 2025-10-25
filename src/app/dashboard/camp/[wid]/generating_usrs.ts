import { bulkInsertUsers } from "@/actions/auth/camps";
import pool from "@/lib/db";
import { usersaddressdata } from "@/types/pgType";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { set } from "zod";
export const generateAddress = async () => {
  try {
    const randomItem = <T>(arr: T[]): T =>
      arr[Math.floor(Math.random() * arr.length)];

    const cities = [
      "Mumbai",
      "Delhi",
      "Bangalore",
      "Hyderabad",
      "Chennai",
      "Kolkata",
      "Pune",
      "Jaipur",
      "Ahmedabad",
      "Lucknow",
      "Indore",
      "Surat",
      "Nagpur",
      "Bhopal",
      "Coimbatore",
      "Kochi",
      "Visakhapatnam",
      "Patna",
      "Vadodara",
      "Noida",
    ];

    const states = [
      "Maharashtra",
      "Delhi",
      "Karnataka",
      "Telangana",
      "Tamil Nadu",
      "West Bengal",
      "Gujarat",
      "Rajasthan",
      "Uttar Pradesh",
      "Madhya Pradesh",
      "Kerala",
      "Andhra Pradesh",
      "Bihar",
      "Punjab",
      "Haryana",
      "Odisha",
      "Assam",
      "Chandigarh",
      "Jharkhand",
      "Goa",
    ];

    const countries = [
      "India",
      "USA",
      "UK",
      "Canada",
      "Australia",
      "Germany",
      "France",
      "Italy",
      "Japan",
      "South Korea",
      "Brazil",
      "Mexico",
      "Russia",
      "Singapore",
      "UAE",
      "South Africa",
      "New Zealand",
      "Switzerland",
      "Spain",
      "Netherlands",
    ];

    const postalCodes = [
      "400001",
      "110001",
      "560001",
      "500001",
      "600001",
      "700001",
      "411001",
      "302001",
      "380001",
      "226001",
      "452001",
      "395003",
      "440001",
      "462001",
      "641001",
      "682001",
      "530001",
      "800001",
      "390001",
      "201301",
    ];

    const Address_arr: any[] = [];

    for (let index = 0; index < 10000; index++) {
      Address_arr.push({
        address_line1: `Street ${uuidv4()}`,
        address_line2: `Building ${Math.floor(Math.random() * 100) + 1}`,
        city: randomItem(cities),
        state: randomItem(states),
        country: randomItem(countries),
        postal_code: randomItem(postalCodes),
      });
    }

    console.log(Address_arr.slice(0, 5)); // preview first 5 addresses
  } catch (error) {
    console.log(error);
  }
};

export const generateUsers = async () => {

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
    "Vikram",
    "Neha",
    "Aditya",
    "Pooja",
    "Siddharth",
    "Riya",
    "Arjun",
    "Sanya",
    "Rahul",
    "Tanya",
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
    "Reddy",
    "Nair",
    "Iyer",
    "Malhotra",
    "Bhat",
    "Desai",
    "Saxena",
    "Agarwal",
    "Jain",
    "Bose",
  ];

  const randomItem = <T>(arr: T[]) =>
    arr[Math.floor(Math.random() * arr.length)];

  const dummyUsers = Array.from({ length: 1000 }, () => {
    const firstName = randomItem(firstNames);
    const lastName = randomItem(lastNames);
    const fullName = `${firstName} ${lastName}`;
    return {
      name: fullName,
      clerk_id: uuidv4() + Math.floor(Math.random() * 100),
      user_type: "user",
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}.${uuidv4().slice(
        0,
        6
      )}@example.com`,
    };
  });

  console.log(dummyUsers.slice(0, 5));

  const res = await bulkInsertUsers(dummyUsers, 500); 
  return res
};
