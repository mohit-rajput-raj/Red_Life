"use server";

import { clerkClient } from "@clerk/nextjs/server";

export async function updateUserRole(userId: string, role: "docs" | "user") {
  const client = await clerkClient();
  await client.users.updateUserMetadata(userId, {
    publicMetadata: { user_type: role },
  });
}
