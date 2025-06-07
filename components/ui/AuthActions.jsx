"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AuthActions() {
  const { isLoaded, isSignedIn } = useUser();

  if (!isLoaded) return null; // Or a spinner while Clerk loads

  return (
    <div className="flex gap-4">
      {isSignedIn ? (
        <>
          <Link href="/dashboard">
            <Button>View Dashboard</Button>
          </Link>
          <UserButton />
        </>
      ) : (
        <>
          <Link href="/sign-up">
            <Button className="md:text-base font-light">
              New Patient
            </Button>
          </Link>
          <Link href="/sign-in">
            <Button
              variant="outline"
              className="md:text-base underline hover:text-blue-600"
            >
              Login to account
            </Button>
          </Link>
        </>
      )}
    </div>
  );
}
