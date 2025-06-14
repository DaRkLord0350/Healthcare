import { checkRole } from "@/utils/roles";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { Card } from "./ui/card";
import { ProfileImage } from "./profile-image";
import { daysOfWeek } from "@/utils";
import { cn } from "@/lib/utils";

// Get today's day string ("monday", etc.)
const getToday = () => {
  const today = new Date().getDay();
  return daysOfWeek[today];
};

const todayDay = getToday();

// Utility: return working hours for today, or "Not Available"
export const availableDays = ({ data }) => {
  const isTodayWorkingDay = data?.find(
    (dayObj) => dayObj?.day?.toLowerCase() === todayDay
  );
  return isTodayWorkingDay
    ? `${isTodayWorkingDay?.start_time} - ${isTodayWorkingDay?.close_time}`
    : "Not Available";
};

// AvailableDoctors component
export const AvailableDoctors = async ({ data }) => {
  console.log("AvailableDoctors received data:", data);

  // Visual debug in browser:
  // Remove later!
  // const debugBlock = (
  //   <div className="my-2">
  //     <p className="text-xs text-gray-400">Doctor data debug:</p>
  //     <pre className="text-xs bg-gray-100">{JSON.stringify(data, null, 2)}</pre>
  //   </div>
  // );

  if (!data || !Array.isArray(data)) {
    return (
      <div className="bg-white rounded-xl p-4">
        <h1 className="text-lg font-semibold">Available Doctors</h1>
        <p className="text-red-600">No data prop received! (Check parent fetch code)</p>
        {debugBlock}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-lg font-semibold">Available Doctors</h1>
        {(await checkRole("ADMIN")) && (
          <Button
            asChild
            variant="outline"
            disabled={data.length === 0}
            className="disabled:cursor-not-allowed disabled:text-gray-200"
          >
            <Link href="/record/doctors">View all</Link>
          </Button>
        )}
      </div>
      {/* {debugBlock} */}
      <div className="w-full space-y-5 md:space-y-0 md:gap-6 flex flex-col md:flex-row md:flex-wrap">
        {data.length === 0 ? (
          <p>No doctors available!</p>
        ) : (
          data.map((doc, id) => (
            <Card
              key={id}
              className="border-none w-full md:w-[300px] min-h-28 xl:w-full p-4 flex gap-4 odd:bg-emerald-600/5 even:bg-yellow-600/5"
            >
              <ProfileImage
                url={doc?.img}
                name={doc?.name}
                className="md:flex min-w-14 min-h-14 md:min-w-16 md:min-h-16"
                textClassName="text-2xl font-semibold text-black"
                bgColor={doc?.colorCode}
              />
              <div>
                <h2 className="font-semibold text-lg md:text-xl">{doc?.name}</h2>
                <p className="text-base capitalize text-gray-600">
                  {doc?.specialization}
                </p>
                <p className="text-sm flex items-center">
                  <span className="hidden lg:flex">Available Time:</span>
                  {availableDays({ data: doc?.working_days })}
                </p>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};
