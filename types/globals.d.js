
// If you want to use the Role enum/values from Prisma, just import as needed.
import { Role } from "@prisma/client";

// In JavaScript, you don't need to define types or interfaces for roles or claims.

// Example usage: setting a role in a session claims object
// (just for demonstration—actual implementation depends on your auth logic)
const customJwtSessionClaims = {
  metadata: {
    role: Role.ADMIN, // or "admin", "doctor", etc., depending on your schema
  },
};

// If you need to export any utility or config, do it here (optional)
export {};
