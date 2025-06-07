import { auth } from "@clerk/nextjs/server";

// Checks if the current user's role matches the given role (case-insensitive)
export const checkRole = async (role) => {
  const { sessionClaims } = await auth();
  return sessionClaims?.metadata?.role === role.toLowerCase();
};

// Gets the current user's role or "patient" as a default
export const getRole = async () => {
  const { sessionClaims } = await auth();
  // Use optional chaining and fallback to "patient"
  const role = sessionClaims?.metadata?.role
    ? sessionClaims.metadata.role.toLowerCase()
    : "patient";
  return role;
};
