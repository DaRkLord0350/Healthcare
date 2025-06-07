import { PrismaClient } from "@prisma/client";

// Create a singleton PrismaClient instance
const prismaClientSingleton = () => {
  return new PrismaClient();
};

// Attach to globalThis in development to avoid multiple instances during hot reload
const globalForPrisma = globalThis;

const db = globalForPrisma.prismaGlobal ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") globalForPrisma.prismaGlobal = db;

export default db;
