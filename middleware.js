import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { routeAccess } from "./lib/routes";






// Build matcher array for role-based access
const matchers = Object.keys(routeAccess).map((route) => ({
  matcher: createRouteMatcher([route]),
  allowedRoles: routeAccess[route],
}));

export default clerkMiddleware(async (auth, req) => {
  const { userId, sessionClaims } = await auth();
  const url = new URL(req.url);

  console.log("🟢 Clerk Middleware Debug:");
  // console.log('Cookies:', req.headers.get('cookie'));
// console.log('Session Claims:', sessionClaims);
  console.log("userId:", userId);
//   console.log("sessionClaims:", sessionClaims);
//   console.log("Calculated role:", sessionClaims?.metadata?.role);
  
  const role =
    userId && sessionClaims?.metadata?.role
      ? sessionClaims.metadata.role
      : userId
      ? "patient"
      : "sign-in";

  const matchingRoute = matchers.find(({ matcher }) => matcher(req));

  if (matchingRoute && !matchingRoute.allowedRoles.includes(role)) {
    // Redirect unauthorized roles to their respective default pages
    return NextResponse.redirect(new URL(`/${role}`, url.origin));
  }

  // Continue if the user is authorized
  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
