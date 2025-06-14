
import { Button } from "@/components/ui/button";
import { getRole } from "@/utils/roles";
import { auth } from "@clerk/nextjs/server";
import { redirect } from 'next/navigation';
import AuthActions from "@/components/ui/AuthActions";
export default async function Home() {
  const { userId } = await auth();
  const role = await getRole();

  if (userId && role) {
    redirect(`/${role}`);
  }
  console.log("Database URL:", process.env.DATABASE_URL);

  return (
    <div className="flex flex-col items-center justify-center h-screen p-6">
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-center">
            Welcome to <br />
            <span className="text-blue-700 text-5xl md:text-6xl">
              Kinda HMS
            </span>
          </h1>
        </div>

        <div className="text-center max-w-xl flex flex-col items-center justify-center">
          <p className="mb-8">
            
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse maxime
            quae numquam possimus dolor. Illum, ipsam laudantium. Reprehenderit
          </p>

          {/* 👇 INSTANTLY UPDATES ON LOGIN/SIGNOUT */}
          <AuthActions />
        </div>
      </div>
      <footer className="mt-8">
        <p className="text-center text-sm">
          &copy; 2024 Kinda Hospital Management System. All rights reserved.
        </p>
      </footer>
    </div>
  );
}