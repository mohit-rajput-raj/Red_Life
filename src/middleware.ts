import { auth, clerkClient } from "@clerk/nextjs/server";
import {
  clerkMiddleware,
  createRouteMatcher,
  currentUser,
} from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
interface CustomMetadata {
  user_type?: string;
}
const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/blood(.*)",
  "/availablity(.*)",
  "/donate(.*)"
]);

const dashboardRoute = createRouteMatcher(["/dashboard(.*)"]);
const roomRoute = createRouteMatcher(["/room(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  let role: string | undefined;
  const { userId, sessionClaims } = await auth();
  if (userId) {
    const client = await clerkClient();
    const user = await client.users.getUser(userId!);
    role = user.publicMetadata?.user_type as string | undefined;
    console.log("User Role from Middleware:", role);
  }

  if (isPublicRoute(req)) return NextResponse.next();

  if (!userId) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  if (dashboardRoute(req) && role !== "docs") {
    return NextResponse.rewrite(new URL("/404", req.url));
  }

  if (roomRoute(req) && role !== "user") {
    return NextResponse.rewrite(new URL("/404", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
